from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile
from pydantic import EmailStr, TypeAdapter, ValidationError
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.dependencies import optional_principal
from app.limits import limiter
from app.models.entities import Internship, InternshipApplication, Workshop
from app.utils.uploads import upload_directory

router = APIRouter(tags=["internships"])
ALLOWED_RESUMES = {".pdf": {"application/pdf"}, ".doc": {"application/msword"}, ".docx": {"application/vnd.openxmlformats-officedocument.wordprocessingml.document"}}


@router.post("/internships/apply", status_code=201)
@limiter.limit("3/minute")
async def apply(
    request: Request,
    internship_title: str = Form(min_length=2, max_length=180),
    full_name: str = Form(min_length=2, max_length=120),
    email: str = Form(min_length=5, max_length=254),
    phone: str = Form(default="", max_length=30),
    resume: UploadFile | None = File(default=None),
    db: Session = Depends(get_db),
    principal=Depends(optional_principal),
):
    opportunity = db.query(Internship).filter(Internship.title == internship_title.strip(), Internship.is_active.is_(True)).first()
    if not opportunity:
        opportunity = db.query(Workshop).filter(
            Workshop.title == internship_title.strip(),
            Workshop.is_active.is_(True),
        ).first()
    if not opportunity:
        raise HTTPException(status_code=404, detail="Internship or workshop opportunity is not available")
    try:
        validated_email = str(TypeAdapter(EmailStr).validate_python(email)).lower()
    except ValidationError as exc:
        raise HTTPException(status_code=422, detail="A valid email address is required") from exc
    account = principal["account"] if principal and principal["role"] == "student" else None
    resume_path = None
    if resume:
        suffix = Path(resume.filename or "").suffix.lower()
        if suffix not in ALLOWED_RESUMES or resume.content_type not in ALLOWED_RESUMES[suffix]:
            raise HTTPException(status_code=415, detail="Resume must be a PDF, DOC or DOCX file")
        content = await resume.read(settings.max_upload_size_mb * 1024 * 1024 + 1)
        if len(content) > settings.max_upload_size_mb * 1024 * 1024:
            raise HTTPException(status_code=413, detail=f"Resume exceeds the {settings.max_upload_size_mb} MB limit")
        valid_signature = (
            suffix == ".pdf" and content.startswith(b"%PDF-")
            or suffix == ".doc" and content.startswith(bytes.fromhex("D0CF11E0A1B11AE1"))
            or suffix == ".docx" and content.startswith(b"PK\x03\x04")
        )
        if not valid_signature:
            raise HTTPException(status_code=415, detail="Resume contents do not match the selected file type")
        directory = upload_directory()
        directory.mkdir(parents=True, exist_ok=True)
        filename = f"{uuid4().hex}{suffix}"
        (directory / filename).write_bytes(content)
        resume_path = f"/uploads/{filename}"
    application = InternshipApplication(
        student_id=account.id if account else None,
        internship_title=opportunity.title,
        full_name=full_name.strip(),
        email=validated_email,
        phone=phone.strip() or None,
        resume_url=resume_path,
    )
    db.add(application)
    db.commit()
    return {"id": application.id, "status": application.status}
