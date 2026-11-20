"""Add idempotent Contact Us submissions and email status."""

from alembic import op
import sqlalchemy as sa

revision = "0007_contact_idem"
down_revision = "0006_rustfs_media_assets"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "contact_messages",
        sa.Column("submission_id", sa.String(length=36), nullable=True),
    )
    op.create_index(
        "ix_contact_messages_submission_id",
        "contact_messages",
        ["submission_id"],
        unique=True,
    )
    op.add_column(
        "contact_messages",
        sa.Column("email_sent", sa.Boolean(), server_default=sa.false(), nullable=False),
    )


def downgrade():
    op.drop_column("contact_messages", "email_sent")
    op.drop_index("ix_contact_messages_submission_id", table_name="contact_messages")
    op.drop_column("contact_messages", "submission_id")
