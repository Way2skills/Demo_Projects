"""Persist fixed batch availability on courses."""

from alembic import op
import sqlalchemy as sa

revision = "0008_course_batches"
down_revision = "0007_contact_idem"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    course_columns = {column["name"] for column in sa.inspect(bind).get_columns("courses")}
    if "batch_availability" not in course_columns:
        op.add_column(
            "courses",
            sa.Column(
                "batch_availability",
                sa.JSON(),
                nullable=False,
                server_default=sa.text(
                    """'{"batch_1": false, "batch_2": false, "batch_3": false, "batch_4": false}'"""
                ),
            ),
        )


def downgrade():
    bind = op.get_bind()
    course_columns = {column["name"] for column in sa.inspect(bind).get_columns("courses")}
    if "batch_availability" in course_columns:
        op.drop_column("courses", "batch_availability")
