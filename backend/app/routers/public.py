from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.limits import limiter

from app.database import get_db
from app.models.entities import (
    Branch, Certificate, ContactMessage, Course, CourseCategory, CourseEnquiry,
    FAQ, Gallery, InstitutionSetting, InternshipApplication, KidsCourse,
    PlacementCompany, Testimonial, Trainer, AuthorizedProgram, Workshop, Internship,
)
from app.schemas.auth import ContactSubmission, CourseEnquirySubmission
from app.utils.contact_email import send_contact_confirmation

router = APIRouter(tags=["public"])


def records(query):
    return query.all()


@router.get("/settings")
def public_settings(db: Session = Depends(get_db)):
    setting = db.query(InstitutionSetting).order_by(InstitutionSetting.id).first()
    if setting:
        return {key: getattr(setting, key) for key in ("institution_name", "address", "phone", "email", "website", "logo_url", "about_content", "social_links")}
    return {"institution_name": "Decode Institution", "address": "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia", "phone": "+91 63812 43416", "email": None, "website": None, "logo_url": None, "about_content": None, "social_links": None}


@router.get("/courses")
def list_courses(category_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(Course).filter(Course.is_active.is_(True))
    if category_id is not None:
        query = query.filter(Course.category_id == category_id)
    result = []
    for course in query.order_by(Course.name).all():
        category = db.get(CourseCategory, course.category_id) if course.category_id else None
        result.append({"id": course.id, "category_id": course.category_id, "category_name": category.name if category else None, "name": course.name, "slug": course.slug, "description": course.description, "syllabus": course.syllabus, "duration_hours": course.duration_hours, "fee": course.fee, "image_url": course.image_url, "batch_availability": course.batch_availability})
    return {"items": result}


@router.get("/courses/{course_id}")
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id, Course.is_active.is_(True)).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    category = db.get(CourseCategory, course.category_id) if course.category_id else None
    return {"id": course.id, "category_id": course.category_id, "category_name": category.name if category else None, "name": course.name, "slug": course.slug, "description": course.description, "syllabus": course.syllabus, "duration_hours": course.duration_hours, "fee": course.fee, "image_url": course.image_url, "batch_availability": course.batch_availability}


@router.get("/course-categories")
def list_categories(db: Session = Depends(get_db)):
    items = db.query(CourseCategory).filter(CourseCategory.is_active.is_(True)).order_by(CourseCategory.sort_order, CourseCategory.name).all()
    return {"items": [{"id": x.id, "name": x.name, "slug": x.slug, "description": x.description, "ai_tools": x.ai_tools} for x in items]}


@router.post("/enquiries", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def submit_enquiry(request: Request, payload: CourseEnquirySubmission, db: Session = Depends(get_db)):
    course_id = payload.course_id
    if course_id is not None and not db.query(Course.id).filter(Course.id == course_id, Course.is_active.is_(True)).first():
        raise HTTPException(status_code=404, detail="Course not found")
    message = CourseEnquiry(course_id=course_id, name=payload.name.strip(), email=str(payload.email).lower(), phone=payload.phone.strip() if payload.phone else None, message=payload.message.strip() if payload.message else None)
    db.add(message)
    db.commit()
    return {"id": message.id, "status": message.status}


@router.get("/testimonials")
def list_testimonials(db: Session = Depends(get_db)):
    items = db.query(Testimonial).filter(Testimonial.is_approved.is_(True)).order_by(Testimonial.created_at.desc()).all()
    return {"items": [{"id": x.id, "student_name": x.student_name, "designation": x.designation, "company": x.company, "quote": x.quote, "image_url": x.image_url} for x in items]}


@router.get("/faqs")
def list_faqs(db: Session = Depends(get_db)):
    items = db.query(FAQ).filter(FAQ.is_active.is_(True)).order_by(FAQ.sort_order, FAQ.id).all()
    return {"items": [{"id": x.id, "question": x.question, "answer": x.answer} for x in items]}


@router.get("/trainers")
def list_trainers(request: Request, db: Session = Depends(get_db)):
    items = db.query(Trainer).filter(Trainer.is_active.is_(True)).order_by(Trainer.name).all()
    return {"items": [{
        "id": x.id,
        "name": x.name,
        "designation": x.designation,
        "qualification": x.qualification,
        "experience": x.experience,
        "experience_years": x.experience_years,
        "specialization": x.specialization,
        "expertise": x.expertise or [],
        "biography": x.biography,
        "image_url": f"{str(request.base_url).rstrip('/')}{x.image_url}" if x.image_url and x.image_url.startswith("/uploads/") else x.image_url,
    } for x in items]}


@router.get("/gallery")
def list_gallery(db: Session = Depends(get_db)):
    items = db.query(Gallery).filter(Gallery.is_active.is_(True)).order_by(Gallery.created_at.desc()).all()
    return {"items": [{"id": x.id, "title": x.title, "category": x.category, "image_url": x.image_url, "alt_text": x.alt_text} for x in items]}


@router.get("/branches")
def list_branches(db: Session = Depends(get_db)):
    items = db.query(Branch).filter(Branch.is_active.is_(True), Branch.is_verified.is_(True)).all()
    return {"items": [{"id": x.id, "name": x.name, "address": x.address, "phone": x.phone, "google_maps_url": x.google_maps_url} for x in items]}


@router.get("/internships")
def list_internships(db: Session = Depends(get_db)):
    items = db.query(Internship).filter(Internship.is_active.is_(True)).order_by(Internship.id).all()
    return {"items": [{"id": x.id, "title": x.title, "description": x.description, "eligibility": x.eligibility, "duration": x.duration, "skills": x.skills, "image_url": x.image_url} for x in items]}


@router.get("/workshops")
def list_workshops(db: Session = Depends(get_db)):
    items = (
        db.query(Workshop)
        .join(Trainer, Trainer.id == Workshop.trainer_id)
        .filter(
            Workshop.is_active.is_(True),
            Workshop.admission_start_date.isnot(None),
            Workshop.admission_end_date.isnot(None),
            Workshop.program_start_date.isnot(None),
            Workshop.program_end_date.isnot(None),
            Workshop.mode.isnot(None),
            Workshop.start_time.isnot(None),
            Workshop.end_time.isnot(None),
        )
        .order_by(Workshop.program_start_date, Workshop.id)
        .all()
    )
    return {"items": [{
        "id": item.id,
        "trainer_name": db.get(Trainer, item.trainer_id).name,
        "program": item.title,
        "duration": item.duration,
        "admission_start_date": item.admission_start_date.isoformat(),
        "admission_end_date": item.admission_end_date.isoformat(),
        "program_start_date": item.program_start_date.isoformat(),
        "program_end_date": item.program_end_date.isoformat(),
        "mode": item.mode,
        "start_time": item.start_time.isoformat(),
        "end_time": item.end_time.isoformat(),
    } for item in items]}


@router.get("/kids-courses")
def list_kids_courses(db: Session = Depends(get_db)):
    items = db.query(KidsCourse).filter(KidsCourse.is_active.is_(True)).order_by(KidsCourse.name).all()
    return {"items": [{"id": x.id, "name": x.name, "description": x.description, "minimum_age": x.minimum_age, "maximum_age": x.maximum_age, "duration_hours": x.duration_hours} for x in items]}


@router.get("/authorized-programs")
def list_programs(db: Session = Depends(get_db)):
    items = db.query(AuthorizedProgram).filter(AuthorizedProgram.is_active.is_(True)).order_by(AuthorizedProgram.category, AuthorizedProgram.name).all()
    return {"items": [{"id": x.id, "category": x.category, "name": x.name, "description": x.description, "duration_hours": x.duration_hours, "syllabus": x.syllabus} for x in items]}


@router.get("/placement-companies")
def list_placements(db: Session = Depends(get_db)):
    items = db.query(PlacementCompany).filter(PlacementCompany.is_active.is_(True), PlacementCompany.is_verified.is_(True)).all()
    return {"items": [{"id": x.id, "name": x.name, "logo_url": x.logo_url, "display_content": x.display_content} for x in items]}


@router.post("/contact", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def send_contact(request: Request, payload: ContactSubmission, db: Session = Depends(get_db)):
    submission_id = str(payload.submission_id)
    existing = db.query(ContactMessage).filter(ContactMessage.submission_id == submission_id).first()
    if existing:
        return {
            "id": existing.id,
            "status": existing.status,
            "email_sent": existing.email_sent,
        }

    message = ContactMessage(
        submission_id=submission_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        subject=payload.subject,
        message=payload.message,
        status="Unchecked",
    )
    db.add(message)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        existing = db.query(ContactMessage).filter(ContactMessage.submission_id == submission_id).first()
        if existing is None:
            raise
        return {
            "id": existing.id,
            "status": existing.status,
            "email_sent": existing.email_sent,
        }
    db.refresh(message)
    email_sent = send_contact_confirmation(message)
    message.email_sent = email_sent
    db.commit()
    return {"id": message.id, "status": message.status, "email_sent": message.email_sent}


@router.get("/certificates/verify/{certificate_number}")
def verify_certificate(certificate_number: str, db: Session = Depends(get_db)):
    certificate = db.query(Certificate).filter(Certificate.certificate_number == certificate_number.strip()).first()
    if not certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    if certificate.status != "issued":
        raise HTTPException(status_code=410, detail="Certificate is not currently valid")
    return {"certificate_number": certificate.certificate_number, "student_name": certificate.student_name, "course_name": certificate.course_name, "issue_date": certificate.issue_date.isoformat(), "status": certificate.status}
