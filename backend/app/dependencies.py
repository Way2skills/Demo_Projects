from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.entities import Admin, RevokedToken, Student
from app.utils.security import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/admin/login")
optional_oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/admin/login", auto_error=False)


def current_principal(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired authentication", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = decode_access_token(token)
    except ValueError:
        raise credentials_error
    if not payload.get("sub") or not payload.get("jti") or db.get(RevokedToken, payload["jti"]):
        raise credentials_error
    role = payload.get("role")
    model = Student if role == "student" else Admin if role in {"super_admin", "admin", "staff"} else None
    if model is None:
        raise credentials_error
    account = db.get(model, int(payload["sub"]))
    if not account or not account.is_active:
        raise credentials_error
    return {
        "id": account.id,
        "role": role,
        "email": account.email,
        "account": account,
        "jti": payload["jti"],
        "expires_at": payload["exp"],
    }


def optional_principal(token: str | None = Depends(optional_oauth2_scheme), db: Session = Depends(get_db)):
    if token is None:
        return None
    return current_principal(token=token, db=db)


def require_admin(principal=Depends(current_principal)):
    if principal["role"] not in {"super_admin", "admin", "staff"}:
        raise HTTPException(status_code=403, detail="Administrator access required")
    return principal


def require_editor(principal=Depends(current_principal)):
    if principal["role"] not in {"super_admin", "admin"}:
        raise HTTPException(status_code=403, detail="Administrator editing access required")
    return principal


def require_student(principal=Depends(current_principal)):
    if principal["role"] != "student":
        raise HTTPException(status_code=403, detail="Student access required")
    return principal
