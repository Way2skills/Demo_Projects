from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_admin
from app.models.entities import (
    Certificate, ContactMessage, Course, CourseEnquiry, InternshipApplication,
    Student, Trainer,
)

router = APIRouter(prefix="/dashboard", tags=["admin"])


@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db), principal=Depends(require_admin)):
    return {
        "students": db.query(Student).count(),
        "courses": db.query(Course).count(),
        "enquiries": db.query(CourseEnquiry).count(),
        "pending_enquiries": db.query(CourseEnquiry).filter(CourseEnquiry.status == "pending").count(),
        "internship_applications": db.query(InternshipApplication).count(),
        "certificates_issued": db.query(Certificate).filter(Certificate.status == "issued").count(),
        "trainers": db.query(Trainer).count(),
        "contact_messages": db.query(ContactMessage).count(),
    }
