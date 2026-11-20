import json
import logging
import re
import secrets
from datetime import date, datetime, time
from decimal import Decimal
from pathlib import Path
from urllib.parse import urlsplit

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, Request, Response, UploadFile
from pydantic import ValidationError
from sqlalchemy import Boolean, func, or_
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from sqlalchemy.orm import Session
from starlette.datastructures import UploadFile as StarletteUploadFile

from app.config import settings
from app.database import get_db
from app.dependencies import require_admin, require_editor
from app.models import entities
from app.models.entities import AuditLog, MediaAsset
from app.schemas.admin import CourseAdminPayload, CourseBatchAvailabilityPayload, ContactMessageUpdate, StudentAdminPayload, StudentFeeStatusPayload, WorkshopAdminPayload
from app.utils.security import hash_password
from app.utils.rustfs import (
    RustFSConfigurationError,
    RustFSOperationError,
    delete_media_object,
    put_media_object,
)

router = APIRouter(prefix="/admin", tags=["admin"])
logger = logging.getLogger(__name__)
TRAINER_IMAGES = {
    ".png": ("image/png", lambda content: content.startswith(b"\x89PNG\r\n\x1a\n")),
    ".jpg": ("image/jpeg", lambda content: content.startswith(b"\xff\xd8\xff")),
    ".jpeg": ("image/jpeg", lambda content: content.startswith(b"\xff\xd8\xff")),
    ".webp": ("image/webp", lambda content: len(content) >= 12 and content[:4] == b"RIFF" and content[8:12] == b"WEBP"),
}
MEDIA_IMAGE_MODELS = {entities.Internship, entities.Gallery}
IMAGE_MODELS = {entities.Course, entities.Trainer, entities.Internship, entities.Gallery}

RESOURCES = {
    "students": entities.Student,
    "course_categories": entities.CourseCategory,
    "courses": entities.Course,
    "course_enquiries": entities.CourseEnquiry,
    "enrollments": entities.Enrollment,
    "internships": entities.Internship,
    "internship_applications": entities.InternshipApplication,
    "certificates": entities.Certificate,
    "trainers": entities.Trainer,
    "gallery": entities.Gallery,
    "testimonials": entities.Testimonial,
    "branches": entities.Branch,
    "contact_messages": entities.ContactMessage,
    "faqs": entities.FAQ,
    "workshops": entities.Workshop,
    "notifications": entities.Notification,
    "institution_settings": entities.InstitutionSetting,
    "kids_courses": entities.KidsCourse,
    "authorized_programs": entities.AuthorizedProgram,
    "placement_companies": entities.PlacementCompany,
}
PROTECTED_FIELDS = {"id", "created_at", "updated_at", "password_hash"}


def get_model(resource: str):
    model = RESOURCES.get(resource)
    if model is None:
        raise HTTPException(status_code=404, detail="Admin resource not found")
    return model


def serialize(row):
    result = {}
    for column in row.__table__.columns:
        if column.name == "password_hash":
            continue
        value = getattr(row, column.name)
        if isinstance(value, (datetime, date, time)):
            value = value.isoformat()
        elif isinstance(value, Decimal):
            value = float(value)
        result[column.name] = value
    return result


def audit(db: Session, principal: dict, action: str, resource: str, resource_id: int):
    db.add(AuditLog(admin_id=principal["id"], action=action, resource=resource, resource_id=str(resource_id)))


def ensure_unique_trainer_name(db: Session, name: str, trainer_id: int | None = None) -> None:
    query = db.query(entities.Trainer.id).filter(func.lower(entities.Trainer.name) == name.lower())
    if trainer_id is not None:
        query = query.filter(entities.Trainer.id != trainer_id)
    if query.first():
        raise HTTPException(status_code=409, detail="A trainer with this name already exists")


def ensure_unique_student_details(db: Session, payload: StudentAdminPayload, student_id: int | None = None) -> None:
    code_query = db.query(entities.Student.id).filter(entities.Student.student_code == payload.student_code)
    email_query = db.query(entities.Student.id).filter(func.lower(entities.Student.email) == str(payload.email).lower())
    if student_id is not None:
        code_query = code_query.filter(entities.Student.id != student_id)
        email_query = email_query.filter(entities.Student.id != student_id)
    if code_query.first():
        raise HTTPException(status_code=409, detail="A student with this Student ID already exists")
    if email_query.first():
        raise HTTPException(status_code=409, detail="A student with this email address already exists")


def student_record_payload(student: entities.Student, course_name: str | None) -> dict:
    return {
        "id": student.id,
        "student_code": student.student_code,
        "full_name": student.full_name,
        "email": student.email,
        "phone": student.phone,
        "course_id": student.course_id,
        "course_name": course_name,
        "total_course_fee": float(student.total_course_fee),
        "amount_paid": float(student.amount_paid),
        "fee_status": student.fee_status,
        "date_of_join": student.date_of_join.isoformat() if student.date_of_join else None,
        "created_at": student.created_at.isoformat(),
    }


def workshop_record_payload(workshop: entities.Workshop, db: Session) -> dict:
    result = serialize(workshop)
    result["program"] = result.pop("title")
    trainer = db.get(entities.Trainer, workshop.trainer_id) if workshop.trainer_id else None
    result["trainer_name"] = trainer.name if trainer else None
    return result


def validate_workshop_payload(payload: dict, db: Session) -> WorkshopAdminPayload:
    try:
        workshop_payload = WorkshopAdminPayload.model_validate(payload)
    except ValidationError as exc:
        raise HTTPException(
            status_code=422,
            detail=exc.errors(include_url=False, include_context=False),
        ) from exc
    if not db.get(entities.Trainer, workshop_payload.trainer_id):
        raise HTTPException(status_code=404, detail="Trainer not found")
    return workshop_payload


def workshop_values(payload: WorkshopAdminPayload) -> dict:
    return {
        "trainer_id": payload.trainer_id,
        "title": payload.program,
        "duration": payload.duration,
        "admission_start_date": payload.admission_start_date,
        "admission_end_date": payload.admission_end_date,
        "program_start_date": payload.program_start_date,
        "program_end_date": payload.program_end_date,
        "mode": payload.mode,
        "start_time": payload.start_time,
        "end_time": payload.end_time,
        "is_active": payload.is_active,
    }


def ensure_student_enrollment(db: Session, student: entities.Student) -> None:
    enrollment = db.query(entities.Enrollment.id).filter(
        entities.Enrollment.student_id == student.id,
        entities.Enrollment.course_id == student.course_id,
    ).first()
    if not enrollment:
        db.add(entities.Enrollment(student_id=student.id, course_id=student.course_id, status="active"))


def parse_trainer_expertise(value: str) -> list[str]:
    try:
        entries = json.loads(value)
    except json.JSONDecodeError as exc:
        raise HTTPException(status_code=422, detail="Expertise must be a JSON array of tags") from exc
    if not isinstance(entries, list):
        raise HTTPException(status_code=422, detail="At least one expertise tag is required")
    tags = []
    seen = set()
    for entry in entries:
        if not isinstance(entry, str):
            raise HTTPException(status_code=422, detail="Expertise tags must be text")
        tag = entry.strip()
        if not tag:
            continue
        if len(tag) > 64:
            raise HTTPException(status_code=422, detail="Expertise tags must be 64 characters or fewer")
        normalized = tag.casefold()
        if normalized not in seen:
            tags.append(tag)
            seen.add(normalized)
    if not tags:
        raise HTTPException(status_code=422, detail="Add at least one expertise tag")
    if len(tags) > 15:
        raise HTTPException(status_code=422, detail="A trainer can have at most 15 expertise tags")
    return tags


async def read_image_upload(image: UploadFile, label: str) -> tuple[bytes, str]:
    suffix = Path(image.filename or "").suffix.lower()
    image_type = TRAINER_IMAGES.get(suffix)
    if not image_type or image.content_type != image_type[0]:
        raise HTTPException(status_code=415, detail=f"Upload a PNG, JPEG or WebP {label}")
    content = await image.read(settings.max_upload_size_mb * 1024 * 1024 + 1)
    if len(content) > settings.max_upload_size_mb * 1024 * 1024:
        raise HTTPException(status_code=413, detail=f"{label.capitalize()} exceeds the {settings.max_upload_size_mb} MB limit")
    if not image_type[1](content):
        raise HTTPException(status_code=415, detail=f"{label.capitalize()} contents do not match the selected image type")
    return content, suffix


def store_media_asset(
    db: Session,
    content: bytes,
    suffix: str,
    original_filename: str,
    content_type: str,
    category: str,
    owner_id: int | None = None,
) -> MediaAsset:
    try:
        object_key = put_media_object(content, category, suffix, original_filename, content_type)
    except (RustFSConfigurationError, RustFSOperationError) as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    safe_filename = original_filename.replace("\\", "/").rsplit("/", 1)[-1]
    asset = MediaAsset(
        object_key=object_key,
        owner_type=category,
        owner_id=owner_id,
        original_filename=safe_filename[:255] or "image",
        content_type=content_type,
        size_bytes=len(content),
    )
    db.add(asset)
    try:
        db.flush()
    except SQLAlchemyError:
        db.rollback()
        remove_uploaded_object(object_key)
        raise
    return asset


def remove_uploaded_object(object_key: str) -> None:
    try:
        delete_media_object(object_key)
    except (RustFSConfigurationError, RustFSOperationError):
        logger.exception("Could not remove RustFS object after a failed database operation: %s", object_key)


def media_asset_url(asset: MediaAsset) -> str:
    return f"/api/v1/media/{asset.id}"


def remove_previous_media_asset(db: Session, image_url: str | None) -> None:
    if not image_url:
        return
    path = urlsplit(image_url).path
    prefix = "/api/v1/media/"
    asset_id_text = path[len(prefix):] if path.startswith(prefix) else ""
    if not asset_id_text.isdecimal():
        return
    asset = db.get(MediaAsset, int(asset_id_text))
    if asset is None:
        return
    try:
        delete_media_object(asset.object_key)
    except (RustFSConfigurationError, RustFSOperationError) as exc:
        logger.exception("RustFS cleanup failed for media asset %s", asset.id)
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    db.delete(asset)
    try:
        db.commit()
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail="The image was removed from storage, but its metadata could not be deleted") from exc


async def parse_record_request(request: Request) -> tuple[dict, dict[str, StarletteUploadFile]]:
    if request.headers.get("content-type", "").startswith("multipart/form-data"):
        form = await request.form()
        payload = {}
        uploads = {}
        for key, value in form.multi_items():
            if isinstance(value, StarletteUploadFile):
                uploads[key] = value
            else:
                payload[key] = value
        return payload, uploads
    try:
        payload = await request.json()
    except (ValueError, UnicodeDecodeError) as exc:
        raise HTTPException(status_code=422, detail="A JSON object or multipart form is required") from exc
    if not isinstance(payload, dict):
        raise HTTPException(status_code=422, detail="A JSON object or multipart form is required")
    return payload, {}


def normalize_multipart_booleans(model, payload: dict) -> dict:
    for column in model.__table__.columns:
        value = payload.get(column.name)
        if not isinstance(column.type, Boolean) or not isinstance(value, str):
            continue
        normalized = value.strip().lower()
        if normalized not in {"true", "false"}:
            raise HTTPException(status_code=422, detail=f"{column.name} must be true or false")
        payload[column.name] = normalized == "true"
    return payload


def validate_course_payload(payload: dict) -> CourseAdminPayload:
    try:
        return CourseAdminPayload.model_validate(payload)
    except ValidationError as exc:
        raise HTTPException(
            status_code=422,
            detail=exc.errors(include_url=False, include_context=False),
        ) from exc


def unique_course_slug(db: Session, name: str, course_id: int | None = None) -> str:
    base_slug = re.sub(r"[^a-z0-9]+", "-", name.casefold()).strip("-") or "course"
    base_slug = base_slug[:180].strip("-") or "course"
    slug = base_slug
    suffix = 2
    while True:
        query = db.query(entities.Course.id).filter(entities.Course.slug == slug)
        if course_id is not None:
            query = query.filter(entities.Course.id != course_id)
        if not query.first():
            return slug
        ending = f"-{suffix}"
        slug = f"{base_slug[:200 - len(ending)].rstrip('-')}{ending}"
        suffix += 1


async def create_course_record(payload: dict, uploads: dict[str, StarletteUploadFile], db: Session, principal: dict):
    if set(uploads) - {"course_image"}:
        raise HTTPException(status_code=422, detail="Only a course image upload is supported")
    course_payload = validate_course_payload(payload)
    image = uploads.get("course_image")
    if image is None or not image.filename:
        raise HTTPException(status_code=422, detail="Choose a course image before saving")
    if db.query(entities.Course.id).filter(entities.Course.is_active.is_(True)).count() >= 10:
        raise HTTPException(status_code=409, detail="A maximum of 10 active courses is allowed")
    content, suffix = await read_image_upload(image, "course image")
    asset = store_media_asset(db, content, suffix, image.filename or "course-image", image.content_type or "application/octet-stream", "courses")
    record = entities.Course(
        name=course_payload.name,
        slug=unique_course_slug(db, course_payload.name),
        fee=course_payload.fee,
        syllabus=course_payload.syllabus,
        image_url=media_asset_url(asset),
        is_active=True,
    )
    db.add(record)
    try:
        db.flush()
        asset.owner_id = record.id
        audit(db, principal, "create", "courses", record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=409, detail="The course conflicts with existing data or violates a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=500, detail="The course could not be saved") from exc
    return serialize(record)


async def update_course_record(record: entities.Course, payload: dict, uploads: dict[str, StarletteUploadFile], db: Session, principal: dict):
    if set(uploads) - {"course_image"}:
        raise HTTPException(status_code=422, detail="Only a course image upload is supported")
    course_payload = validate_course_payload(payload)
    image = uploads.get("course_image")
    new_asset = None
    if image and image.filename:
        content, suffix = await read_image_upload(image, "course image")
        new_asset = store_media_asset(
            db, content, suffix, image.filename, image.content_type or "application/octet-stream", "courses", record.id
        )
    previous_image_url = record.image_url
    if course_payload.name != record.name:
        record.slug = unique_course_slug(db, course_payload.name, record.id)
    record.name = course_payload.name
    record.fee = course_payload.fee
    record.syllabus = course_payload.syllabus
    if new_asset:
        record.image_url = media_asset_url(new_asset)
    try:
        audit(db, principal, "update", "courses", record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        if new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=409, detail="The course update conflicts with a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        if new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=500, detail="The course update could not be saved") from exc
    if new_asset:
        remove_previous_media_asset(db, previous_image_url)
    return serialize(record)


@router.post("/trainers", status_code=201)
async def create_trainer(
    name: str = Form(..., min_length=1, max_length=120),
    experience_years: int = Form(..., ge=0),
    designation: str = Form(..., min_length=1, max_length=160),
    expertise: str = Form(...),
    is_active: bool = Form(default=True),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    name = name.strip()
    designation = designation.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Trainer name is required")
    if not designation:
        raise HTTPException(status_code=422, detail="Trainer designation is required")
    ensure_unique_trainer_name(db, name)
    expertise_tags = parse_trainer_expertise(expertise)
    content, suffix = await read_image_upload(photo, "trainer photo")
    asset = store_media_asset(
        db, content, suffix, photo.filename or "trainer-photo", photo.content_type or "application/octet-stream", "trainers"
    )
    record = entities.Trainer(
        name=name,
        designation=designation,
        experience=f"{experience_years} years",
        experience_years=experience_years,
        specialization=", ".join(expertise_tags),
        expertise=expertise_tags,
        image_url=media_asset_url(asset),
        is_active=is_active,
    )
    db.add(record)
    try:
        db.flush()
        asset.owner_id = record.id
        audit(db, principal, "create", "trainers", record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=409, detail="The trainer could not be saved because of a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=500, detail="The trainer could not be saved") from exc
    return serialize(record)


@router.put("/trainers/{trainer_id}")
async def update_trainer(
    trainer_id: int,
    name: str = Form(..., min_length=1, max_length=120),
    experience_years: int = Form(..., ge=0),
    designation: str = Form(..., min_length=1, max_length=160),
    expertise: str = Form(...),
    is_active: bool = Form(default=True),
    photo: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    record = db.get(entities.Trainer, trainer_id)
    if not record:
        raise HTTPException(status_code=404, detail="Trainer not found")
    name = name.strip()
    designation = designation.strip()
    if not name:
        raise HTTPException(status_code=422, detail="Trainer name is required")
    if not designation:
        raise HTTPException(status_code=422, detail="Trainer designation is required")
    ensure_unique_trainer_name(db, name, trainer_id)
    expertise_tags = parse_trainer_expertise(expertise)

    previous_photo = record.image_url
    new_asset = None
    if photo and photo.filename:
        content, suffix = await read_image_upload(photo, "trainer photo")
        new_asset = store_media_asset(
            db, content, suffix, photo.filename, photo.content_type or "application/octet-stream", "trainers", record.id
        )

    record.name = name
    record.designation = designation
    record.experience = f"{experience_years} years"
    record.experience_years = experience_years
    record.specialization = ", ".join(expertise_tags)
    record.expertise = expertise_tags
    record.is_active = is_active
    if new_asset:
        record.image_url = media_asset_url(new_asset)
    try:
        audit(db, principal, "update", "trainers", record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        if new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=409, detail="The trainer update conflicts with a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        if new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=500, detail="The trainer update could not be saved") from exc
    if new_asset:
        remove_previous_media_asset(db, previous_photo)
    return serialize(record)


@router.patch("/trainers/{trainer_id}/status")
def update_trainer_status(
    trainer_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    if set(payload) != {"is_active"} or type(payload["is_active"]) is not bool:
        raise HTTPException(status_code=422, detail="Provide an is_active boolean")
    record = db.get(entities.Trainer, trainer_id)
    if not record:
        raise HTTPException(status_code=404, detail="Trainer not found")
    record.is_active = payload["is_active"]
    try:
        audit(db, principal, "update", "trainers", record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The trainer status could not be updated") from exc
    return serialize(record)


@router.delete("/trainers/{trainer_id}", status_code=204)
def delete_trainer(
    trainer_id: int,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    record = db.get(entities.Trainer, trainer_id)
    if not record:
        raise HTTPException(status_code=404, detail="Trainer not found")
    image_url = record.image_url
    audit(db, principal, "delete", "trainers", record.id)
    db.delete(record)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The trainer could not be deleted") from exc
    remove_previous_media_asset(db, image_url)
    return Response(status_code=204)


@router.get("/students")
def list_students(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    search: str | None = Query(None, max_length=120),
    db: Session = Depends(get_db),
    principal=Depends(require_admin),
):
    query = db.query(entities.Student)
    if search and search.strip():
        term = f"%{search.strip()}%"
        course_ids = db.query(entities.Course.id).filter(entities.Course.name.ilike(term))
        query = query.filter(or_(
            entities.Student.student_code.ilike(term),
            entities.Student.full_name.ilike(term),
            entities.Student.email.ilike(term),
            entities.Student.phone.ilike(term),
            entities.Student.course_id.in_(course_ids),
        ))
    total = query.count()
    students = query.order_by(entities.Student.id.desc()).offset((page - 1) * page_size).limit(page_size).all()
    course_ids = {student.course_id for student in students if student.course_id is not None}
    courses = {
        course.id: course.name
        for course in db.query(entities.Course).filter(entities.Course.id.in_(course_ids)).all()
    } if course_ids else {}
    return {
        "items": [student_record_payload(student, courses.get(student.course_id)) for student in students],
        "page": page,
        "page_size": page_size,
        "total": total,
    }


@router.post("/students", status_code=201)
def create_student(
    payload: StudentAdminPayload,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    ensure_unique_student_details(db, payload)
    if not db.get(entities.Course, payload.course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    student = entities.Student(
        student_code=payload.student_code,
        full_name=payload.full_name,
        email=str(payload.email).lower(),
        phone=payload.phone,
        password_hash=hash_password(secrets.token_urlsafe(32)),
        course_id=payload.course_id,
        total_course_fee=payload.total_course_fee,
        amount_paid=payload.amount_paid,
        fee_status=payload.fee_status,
        date_of_join=payload.date_of_join,
    )
    db.add(student)
    try:
        db.flush()
        ensure_student_enrollment(db, student)
        audit(db, principal, "create", "students", student.id)
        db.commit()
        db.refresh(student)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The student conflicts with existing data or violates a database constraint") from exc
    course = db.get(entities.Course, student.course_id)
    return student_record_payload(student, course.name if course else None)


@router.put("/students/{student_id}")
def update_student(
    student_id: int,
    payload: StudentAdminPayload,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    student = db.get(entities.Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    ensure_unique_student_details(db, payload, student.id)
    if not db.get(entities.Course, payload.course_id):
        raise HTTPException(status_code=404, detail="Course not found")
    student.student_code = payload.student_code
    student.full_name = payload.full_name
    student.email = str(payload.email).lower()
    student.phone = payload.phone
    student.course_id = payload.course_id
    student.total_course_fee = payload.total_course_fee
    student.amount_paid = payload.amount_paid
    student.fee_status = payload.fee_status
    student.date_of_join = payload.date_of_join
    try:
        ensure_student_enrollment(db, student)
        audit(db, principal, "update", "students", student.id)
        db.commit()
        db.refresh(student)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The student update conflicts with existing data or violates a database constraint") from exc
    course = db.get(entities.Course, student.course_id)
    return student_record_payload(student, course.name if course else None)


@router.patch("/students/{student_id}/fee-status")
def update_student_fee_status(
    student_id: int,
    payload: StudentFeeStatusPayload,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    student = db.get(entities.Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    student.fee_status = payload.fee_status
    try:
        audit(db, principal, "update", "students", student.id)
        db.commit()
        db.refresh(student)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The student fee status could not be updated") from exc
    course = db.get(entities.Course, student.course_id)
    return student_record_payload(student, course.name if course else None)


@router.delete("/students/{student_id}", status_code=204)
def delete_student(
    student_id: int,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    student = db.get(entities.Student, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    audit(db, principal, "delete", "students", student.id)
    db.delete(student)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="The student could not be deleted") from exc
    return Response(status_code=204)


@router.patch("/contact_messages/{message_id}/status")
def check_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    message = db.get(entities.ContactMessage, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Contact message not found")
    if message.status != "Checked":
        message.status = "Checked"
        audit(db, principal, "update", "contact_messages", message.id)
        db.commit()
        db.refresh(message)
    return serialize(message)


@router.get("/{resource}/schema")
def resource_schema(resource: str, principal=Depends(require_admin)):
    model = get_model(resource)
    return {
        "fields": [
            {"name": column.name, "type": str(column.type), "required": not column.nullable and column.default is None and column.server_default is None}
            for column in model.__table__.columns
            if column.name not in PROTECTED_FIELDS
        ]
    }


@router.patch("/courses/{course_id}/batches")
def update_course_batch_availability(
    course_id: int,
    payload: CourseBatchAvailabilityPayload,
    db: Session = Depends(get_db),
    principal=Depends(require_editor),
):
    course = db.get(entities.Course, course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")

    course.batch_availability = payload.model_dump()
    try:
        audit(db, principal, "update", "courses", course.id)
        db.commit()
        db.refresh(course)
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="Batch availability could not be saved") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        raise HTTPException(status_code=500, detail="Batch availability could not be saved") from exc
    return serialize(course)


@router.get("/{resource}")
def list_records(
    resource: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=1, le=100),
    search: str | None = Query(None, max_length=120),
    db: Session = Depends(get_db),
    principal=Depends(require_admin),
):
    model = get_model(resource)
    query = db.query(model)
    if search:
        searchable = [column for column in model.__table__.columns if str(column.type).upper().startswith(("VARCHAR", "TEXT"))]
        if searchable:
            query = query.filter(or_(*(column.ilike(f"%{search.strip()}%") for column in searchable)))
    total = query.count()
    rows = query.order_by(model.id.desc()).offset((page - 1) * page_size).limit(page_size).all()
    items = [
        workshop_record_payload(row, db) if model is entities.Workshop else serialize(row)
        for row in rows
    ]
    result = {"items": items, "page": page, "page_size": page_size, "total": total}
    if model is entities.Course:
        result["active_count"] = db.query(entities.Course.id).filter(entities.Course.is_active.is_(True)).count()
    return result


@router.post("/{resource}", status_code=201)
async def create_record(resource: str, request: Request, db: Session = Depends(get_db), principal=Depends(require_editor)):
    model = get_model(resource)
    if model is entities.ContactMessage:
        raise HTTPException(status_code=405, detail="Contact messages can only be submitted through the public contact form")
    payload, uploads = await parse_record_request(request)
    if model is entities.Student:
        try:
            student_payload = StudentAdminPayload.model_validate(payload)
        except ValidationError as exc:
            raise HTTPException(
                status_code=422,
                detail=exc.errors(include_url=False, include_context=False),
            ) from exc
        return create_student(student_payload, db, principal)

    if model is entities.Course:
        return await create_course_record(payload, uploads, db, principal)
    if model in MEDIA_IMAGE_MODELS:
        if request.headers.get("content-type", "").startswith("multipart/form-data"):
            payload = normalize_multipart_booleans(model, payload)
        if set(uploads) - {"image"}:
            raise HTTPException(status_code=422, detail="Only one image upload is supported for this record")
    elif uploads:
        raise HTTPException(status_code=422, detail="File uploads are only supported for image records")
    if model is entities.Workshop:
        workshop_payload = validate_workshop_payload(payload, db)
        record = entities.Workshop(**workshop_values(workshop_payload))
    else:
        asset = None
        image = uploads.get("image")
        if image and image.filename:
            content, suffix = await read_image_upload(image, f"{resource.rstrip('s')} image")
            asset = store_media_asset(
                db,
                content,
                suffix,
                image.filename,
                image.content_type or "application/octet-stream",
                resource,
            )
            payload["image_url"] = media_asset_url(asset)
        fields = {column.name for column in model.__table__.columns} - PROTECTED_FIELDS
        unexpected = set(payload) - fields
        if unexpected:
            if asset:
                db.rollback()
                remove_uploaded_object(asset.object_key)
            raise HTTPException(status_code=422, detail=f"Unsupported fields: {', '.join(sorted(unexpected))}")
        record = model(**payload)
    db.add(record)
    try:
        db.flush()
        if model in MEDIA_IMAGE_MODELS and asset:
            asset.owner_id = record.id
        audit(db, principal, "create", resource, record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        if model in MEDIA_IMAGE_MODELS and asset:
            remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=409, detail="The record conflicts with existing data or violates a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        if model in MEDIA_IMAGE_MODELS and asset:
            remove_uploaded_object(asset.object_key)
        raise HTTPException(status_code=500, detail="The record could not be saved") from exc
    return workshop_record_payload(record, db) if model is entities.Workshop else serialize(record)


@router.put("/{resource}/{record_id}")
async def update_record(resource: str, record_id: int, request: Request, db: Session = Depends(get_db), principal=Depends(require_editor)):
    model = get_model(resource)
    record = db.get(model, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    payload, uploads = await parse_record_request(request)
    if model is entities.ContactMessage:
        try:
            updates = ContactMessageUpdate.model_validate(payload)
        except ValidationError as exc:
            raise HTTPException(
                status_code=422,
                detail=exc.errors(include_url=False, include_context=False),
            ) from exc
        record.name = updates.name
        record.email = str(updates.email).lower()
        record.phone = updates.phone
        record.message = updates.message
    elif model is entities.Workshop:
        workshop_payload = validate_workshop_payload(payload, db)
        for key, value in workshop_values(workshop_payload).items():
            setattr(record, key, value)
    elif model is entities.Course:
        return await update_course_record(record, payload, uploads, db, principal)
    else:
        if model in MEDIA_IMAGE_MODELS:
            if request.headers.get("content-type", "").startswith("multipart/form-data"):
                payload = normalize_multipart_booleans(model, payload)
            if set(uploads) - {"image"}:
                raise HTTPException(status_code=422, detail="Only one image upload is supported for this record")
        elif uploads:
            raise HTTPException(status_code=422, detail="File uploads are only supported for image records")
        new_asset = None
        previous_image_url = record.image_url if model in MEDIA_IMAGE_MODELS else None
        image = uploads.get("image")
        if image and image.filename:
            content, suffix = await read_image_upload(image, f"{resource.rstrip('s')} image")
            new_asset = store_media_asset(
                db,
                content,
                suffix,
                image.filename,
                image.content_type or "application/octet-stream",
                resource,
                record.id,
            )
            payload["image_url"] = media_asset_url(new_asset)
        fields = {column.name for column in model.__table__.columns} - PROTECTED_FIELDS
        unexpected = set(payload) - fields
        if unexpected:
            if new_asset:
                db.rollback()
                remove_uploaded_object(new_asset.object_key)
            raise HTTPException(status_code=422, detail=f"Unsupported fields: {', '.join(sorted(unexpected))}")
        for key, value in payload.items():
            setattr(record, key, value)
    try:
        audit(db, principal, "update", resource, record.id)
        db.commit()
        db.refresh(record)
    except IntegrityError as exc:
        db.rollback()
        if model in MEDIA_IMAGE_MODELS and new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=409, detail="The update conflicts with existing data or violates a database constraint") from exc
    except SQLAlchemyError as exc:
        db.rollback()
        if model in MEDIA_IMAGE_MODELS and new_asset:
            remove_uploaded_object(new_asset.object_key)
        raise HTTPException(status_code=500, detail="The update could not be saved") from exc
    if model in MEDIA_IMAGE_MODELS and new_asset:
        remove_previous_media_asset(db, previous_image_url)
    return workshop_record_payload(record, db) if model is entities.Workshop else serialize(record)


@router.delete("/{resource}/{record_id}", status_code=204)
def delete_record(resource: str, record_id: int, db: Session = Depends(get_db), principal=Depends(require_editor)):
    model = get_model(resource)
    record = db.get(model, record_id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    image_url = record.image_url if model in IMAGE_MODELS else None
    audit(db, principal, "delete", resource, record.id)
    db.delete(record)
    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(status_code=409, detail="This record is referenced by other data and cannot be deleted") from exc
    if image_url:
        remove_previous_media_asset(db, image_url)
    return Response(status_code=204)
