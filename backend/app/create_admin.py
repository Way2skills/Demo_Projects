from getpass import getpass

from sqlalchemy import func

from app.database import SessionLocal
from app.models.entities import Admin
from app.utils.security import hash_password


def main():
    email = input("Super admin email: ").strip().lower()
    full_name = input("Full name: ").strip()
    password = getpass("Password (minimum 12 characters): ")
    confirmation = getpass("Confirm password: ")
    if "@" not in email or len(full_name) < 2:
        raise SystemExit("Enter a valid email address and full name.")
    if len(password) < 12:
        raise SystemExit("Password must contain at least 12 characters.")
    if password != confirmation:
        raise SystemExit("Passwords do not match.")

    with SessionLocal() as db:
        if db.query(Admin.id).filter(func.lower(Admin.email) == email).first():
            raise SystemExit("An administrator with this email already exists.")
        admin = Admin(full_name=full_name, email=email, password_hash=hash_password(password), role="super_admin", is_active=True)
        db.add(admin)
        db.commit()
    print(f"Super admin created for {email}.")


if __name__ == "__main__":
    main()
