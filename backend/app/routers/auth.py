from fastapi import APIRouter, Depends, HTTPException, Request, status
from datetime import datetime, timezone
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.limits import limiter

from app.database import get_db
from app.dependencies import current_principal
from app.models.entities import Admin, RevokedToken, Student
from app.schemas.auth import LoginRequest, StudentRegistration
from app.utils.security import create_access_token, hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["authentication"])


def token_response(db: Session, account, role: str, full_name: str):
    token, _, expires_at = create_access_token(str(account.id), role)
    return {
        "access_token": token,
        "token_type": "bearer",
        "expires_at": expires_at.isoformat(),
        "user": {"id": account.id, "email": account.email, "full_name": full_name, "role": "admin" if role != "student" else "student"},
    }


@router.post("/admin/login")
@limiter.limit("10/minute")
def admin_login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    account = db.query(Admin).filter(func.lower(Admin.email) == payload.email.lower()).first()
    if not account or not account.is_active or not verify_password(payload.password, account.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email or password is incorrect")
    return token_response(db, account, account.role, account.full_name)


@router.post("/student/register", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
def student_register(request: Request, payload: StudentRegistration, db: Session = Depends(get_db)):
    email = str(payload.email).lower()
    if db.query(Student.id).filter(func.lower(Student.email) == email).first():
        raise HTTPException(status_code=409, detail="An account with this email already exists")
    account = Student(full_name=payload.full_name.strip(), email=email, phone=payload.phone.strip(), password_hash=hash_password(payload.password))
    db.add(account)
    db.commit()
    db.refresh(account)
    return token_response(db, account, "student", account.full_name)


@router.post("/student/login")
@limiter.limit("10/minute")
def student_login(request: Request, payload: LoginRequest, db: Session = Depends(get_db)):
    account = db.query(Student).filter(func.lower(Student.email) == payload.email.lower()).first()
    if not account or not account.is_active or not verify_password(payload.password, account.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email or password is incorrect")
    return token_response(db, account, "student", account.full_name)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(principal=Depends(current_principal), db: Session = Depends(get_db)):
    db.merge(RevokedToken(jti=principal["jti"], expires_at=datetime.fromtimestamp(principal["expires_at"], tz=timezone.utc)))
    db.commit()
