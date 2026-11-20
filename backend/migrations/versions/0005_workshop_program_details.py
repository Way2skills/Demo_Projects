"""Add trainer-linked details to workshops and unpublish the seeded internship."""

from alembic import op
import sqlalchemy as sa

revision = "0005_workshop_program_details"
down_revision = "0004_contact_message_workflow"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("workshops") as batch:
        batch.add_column(sa.Column("trainer_id", sa.Integer(), nullable=True))
        batch.add_column(sa.Column("admission_start_date", sa.Date(), nullable=True))
        batch.add_column(sa.Column("admission_end_date", sa.Date(), nullable=True))
        batch.add_column(sa.Column("program_start_date", sa.Date(), nullable=True))
        batch.add_column(sa.Column("program_end_date", sa.Date(), nullable=True))
        batch.add_column(sa.Column("mode", sa.String(length=16), nullable=True))
        batch.add_column(sa.Column("start_time", sa.Time(), nullable=True))
        batch.add_column(sa.Column("end_time", sa.Time(), nullable=True))
        batch.create_foreign_key(
            "fk_workshops_trainer_id_trainers",
            "trainers",
            ["trainer_id"],
            ["id"],
            ondelete="SET NULL",
        )
        batch.create_index("ix_workshops_trainer_id", ["trainer_id"], unique=False)

    op.get_bind().execute(
        sa.text(
            "UPDATE internships SET is_active = :inactive "
            "WHERE title = :title AND description = :description AND duration = :duration"
        ),
        {
            "inactive": False,
            "title": "Free 1-Month Internship",
            "description": "Ask Decode Institution about current availability and eligible courses.",
            "duration": "1 Month",
        },
    )


def downgrade():
    with op.batch_alter_table("workshops") as batch:
        batch.drop_index("ix_workshops_trainer_id")
        batch.drop_constraint("fk_workshops_trainer_id_trainers", type_="foreignkey")
        batch.drop_column("end_time")
        batch.drop_column("start_time")
        batch.drop_column("mode")
        batch.drop_column("program_end_date")
        batch.drop_column("program_start_date")
        batch.drop_column("admission_end_date")
        batch.drop_column("admission_start_date")
        batch.drop_column("trainer_id")
