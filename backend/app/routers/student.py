from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_student
from app.models.entities import Certificate, Course, Enrollment, InternshipApplication, Notification

router = APIRouter(prefix="/students", tags=["students"])


@router.get("/me")
def student_profile(db: Session = Depends(get_db), principal=Depends(require_student)):
    student_id = principal["id"]
    applications = db.query(InternshipApplication).filter(InternshipApplication.student_id == student_id).order_by(InternshipApplication.created_at.desc()).all()
    certificates = db.query(Certificate).filter(Certificate.student_id == student_id).order_by(Certificate.issue_date.desc()).all()
    notifications = db.query(Notification).filter(Notification.student_id == student_id).order_by(Notification.created_at.desc()).all()
    enrollments = db.query(Enrollment, Course).join(Course, Course.id == Enrollment.course_id).filter(Enrollment.student_id == student_id).order_by(Enrollment.created_at.desc()).all()
    account = principal["account"]
    return {
        "id": account.id,
        "full_name": account.full_name,
        "email": account.email,
        "phone": account.phone,
        "internship_applications": [{"id": x.id, "internship_title": x.internship_title, "status": x.status, "created_at": x.created_at.isoformat()} for x in applications],
        "certificates": [{"id": x.id, "certificate_number": x.certificate_number, "course_name": x.course_name, "issue_date": x.issue_date.isoformat(), "status": x.status} for x in certificates],
        "notifications": [{"id": x.id, "title": x.title, "message": x.message, "is_read": x.is_read} for x in notifications],
        "enrolled_courses": [{"id": enrollment.id, "course_id": course.id, "name": course.name, "status": enrollment.status} for enrollment, course in enrollments],
    }
