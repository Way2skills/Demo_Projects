from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field, TypeAdapter, ValidationError, field_validator

_email_adapter = TypeAdapter(EmailStr)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class StudentRegistration(LoginRequest):
    full_name: str = Field(min_length=2, max_length=120)
    phone: str = Field(min_length=7, max_length=30)


class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    submission_id: UUID
    name: str = Field(min_length=2, max_length=120)
    email: str = Field(min_length=5, max_length=254)
    phone: str = Field(min_length=7, max_length=30)
    subject: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=2, max_length=5000)

    @field_validator("email")
    @classmethod
    def validate_email(cls, value):
        try:
            _email_adapter.validate_python(value)
        except ValidationError as exc:
            raise ValueError("A valid email address is required") from exc
        return value


class CourseEnquirySubmission(BaseModel):
    model_config = ConfigDict(extra="forbid")
    course_id: int | None = Field(default=None, ge=1)
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str | None = Field(default=None, max_length=30)
    message: str | None = Field(default=None, max_length=5000)
