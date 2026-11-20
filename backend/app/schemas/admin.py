from datetime import date, time
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, model_validator


class StudentAdminPayload(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    @model_validator(mode="before")
    @classmethod
    def normalize_course_id(cls, values: object) -> object:
        if not isinstance(values, dict) or "courseid" not in values:
            return values
        if "course_id" in values:
            raise ValueError("Provide course_id or courseid, not both")
        normalized = values.copy()
        normalized["course_id"] = normalized.pop("courseid")
        return normalized

    student_code: str = Field(min_length=6, max_length=6, pattern=r"^D[0-9]{5}$")
    full_name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    course_id: int = Field(ge=1)
    total_course_fee: Decimal = Field(ge=0, max_digits=10, decimal_places=2)
    amount_paid: Decimal = Field(ge=0, max_digits=10, decimal_places=2)
    fee_status: Literal["Paid", "Unpaid", "Pending"]
    date_of_join: date


class StudentFeeStatusPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    fee_status: Literal["Paid", "Unpaid", "Pending"]


class CourseAdminPayload(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = Field(min_length=1, max_length=180)
    fee: Decimal = Field(ge=0, max_digits=10, decimal_places=2)
    syllabus: str = Field(min_length=1)


class CourseBatchAvailabilityPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    batch_1: bool
    batch_2: bool
    batch_3: bool
    batch_4: bool


class WorkshopAdminPayload(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    trainer_id: int = Field(ge=1)
    program: str = Field(min_length=1, max_length=180)
    duration: str = Field(min_length=1, max_length=100)
    admission_start_date: date
    admission_end_date: date
    program_start_date: date
    program_end_date: date
    mode: Literal["Online", "Offline"]
    start_time: time
    end_time: time
    is_active: bool = True

    @model_validator(mode="after")
    def validate_date_ranges(self):
        if self.admission_end_date < self.admission_start_date:
            raise ValueError("Admission end date cannot be earlier than admission start date")
        if self.program_end_date < self.program_start_date:
            raise ValueError("Program end date cannot be earlier than program start date")
        return self


class ContactMessageUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=7, max_length=30)
    message: str = Field(min_length=2, max_length=5000)
