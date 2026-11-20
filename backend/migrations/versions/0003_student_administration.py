"""Add student management fields."""

from datetime import date, datetime
from decimal import Decimal

from alembic import op
import sqlalchemy as sa

revision = "0003_student_administration"
down_revision = "0002_trainer_profiles"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    existing_columns = {column["name"] for column in sa.inspect(bind).get_columns("students")}
    missing_columns = {
        "student_code": sa.Column("student_code", sa.String(6), nullable=True),
        "course_id": sa.Column("course_id", sa.Integer(), nullable=True),
        "total_course_fee": sa.Column("total_course_fee", sa.Numeric(10, 2), nullable=False, server_default="0"),
        "amount_paid": sa.Column("amount_paid", sa.Numeric(10, 2), nullable=False, server_default="0"),
        "fee_status": sa.Column("fee_status", sa.String(10), nullable=False, server_default="Pending"),
        "date_of_join": sa.Column("date_of_join", sa.Date(), nullable=True),
    }

    with op.batch_alter_table("students") as batch:
        for name, column in missing_columns.items():
            if name not in existing_columns:
                batch.add_column(column)

        unique_constraints = {constraint.get("name") for constraint in sa.inspect(bind).get_unique_constraints("students")}
        if "uq_students_student_code" not in unique_constraints:
            batch.create_unique_constraint("uq_students_student_code", ["student_code"])

        foreign_keys = {foreign_key.get("name") for foreign_key in sa.inspect(bind).get_foreign_keys("students")}
        if "fk_students_course_id_courses" not in foreign_keys:
            batch.create_foreign_key("fk_students_course_id_courses", "courses", ["course_id"], ["id"], ondelete="SET NULL")

        indexes = {index["name"] for index in sa.inspect(bind).get_indexes("students")}
        if "ix_students_course_id" not in indexes:
            batch.create_index("ix_students_course_id", ["course_id"], unique=False)

    student_table = sa.table(
        "students",
        sa.column("id", sa.Integer),
        sa.column("created_at", sa.DateTime),
        sa.column("course_id", sa.Integer),
        sa.column("total_course_fee", sa.Numeric(10, 2)),
        sa.column("date_of_join", sa.Date),
    )
    enrollment_table = sa.table(
        "enrollments",
        sa.column("student_id", sa.Integer),
        sa.column("course_id", sa.Integer),
        sa.column("created_at", sa.DateTime),
        sa.column("id", sa.Integer),
    )
    course_table = sa.table(
        "courses",
        sa.column("id", sa.Integer),
        sa.column("fee", sa.Numeric(10, 2)),
    )
    for student in bind.execute(sa.select(student_table)).mappings():
        if student["date_of_join"] is not None:
            continue
        enrollment = bind.execute(
            sa.select(enrollment_table.c.course_id, enrollment_table.c.created_at)
            .where(enrollment_table.c.student_id == student["id"])
            .order_by(enrollment_table.c.created_at.desc(), enrollment_table.c.id.desc())
            .limit(1)
        ).mappings().first()
        joined_at = enrollment["created_at"] if enrollment else student["created_at"]
        join_date = joined_at.date() if isinstance(joined_at, datetime) else date.fromisoformat(str(joined_at)[:10])
        values = {"date_of_join": join_date}
        if enrollment:
            course_fee = bind.execute(
                sa.select(course_table.c.fee).where(course_table.c.id == enrollment["course_id"])
            ).scalar_one_or_none()
            values["course_id"] = enrollment["course_id"]
            values["total_course_fee"] = course_fee if course_fee is not None else Decimal("0")
        bind.execute(student_table.update().where(student_table.c.id == student["id"]).values(**values))

    date_is_nullable = next(
        column["nullable"] for column in sa.inspect(bind).get_columns("students") if column["name"] == "date_of_join"
    )
    if date_is_nullable:
        with op.batch_alter_table("students") as batch:
            batch.alter_column("date_of_join", existing_type=sa.Date(), nullable=False)


def downgrade():
    with op.batch_alter_table("students") as batch:
        batch.drop_index("ix_students_course_id")
        batch.drop_constraint("fk_students_course_id_courses", type_="foreignkey")
        batch.drop_constraint("uq_students_student_code", type_="unique")
        batch.drop_column("date_of_join")
        batch.drop_column("fee_status")
        batch.drop_column("amount_paid")
        batch.drop_column("total_course_fee")
        batch.drop_column("course_id")
        batch.drop_column("student_code")
