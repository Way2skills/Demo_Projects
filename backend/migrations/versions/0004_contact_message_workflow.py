"""Use explicit contact message status and update institution contact defaults."""

from alembic import op
import sqlalchemy as sa

revision = "0004_contact_message_workflow"
down_revision = "0003_student_administration"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    bind.execute(
        sa.text(
            "UPDATE contact_messages SET status = 'Unchecked' "
            "WHERE lower(trim(status)) IN ('new', 'pending')"
        )
    )
    with op.batch_alter_table("contact_messages") as batch:
        batch.alter_column(
            "status",
            existing_type=sa.String(length=24),
            existing_nullable=False,
            server_default="Unchecked",
        )

    bind.execute(
        sa.text(
            "UPDATE institution_settings "
            "SET address = :new_address "
            "WHERE address = :old_address"
        ),
        {
            "new_address": "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia",
            "old_address": "4th Cut, Near New Bus Stand, Namakkal, Tamil Nadu, India.",
        },
    )
    bind.execute(
        sa.text(
            "UPDATE institution_settings SET phone = :new_phone WHERE phone = :old_phone"
        ),
        {"new_phone": "+91 63812 43416", "old_phone": "+91 6381243416"},
    )


def downgrade():
    bind = op.get_bind()
    bind.execute(
        sa.text(
            "UPDATE institution_settings "
            "SET address = :old_address "
            "WHERE address = :new_address"
        ),
        {
            "old_address": "4th Cut, Near New Bus Stand, Namakkal, Tamil Nadu, India.",
            "new_address": "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia",
        },
    )
    bind.execute(
        sa.text(
            "UPDATE institution_settings SET phone = :old_phone WHERE phone = :new_phone"
        ),
        {"old_phone": "+91 6381243416", "new_phone": "+91 63812 43416"},
    )
    bind.execute(
        sa.text("UPDATE contact_messages SET status = 'new' WHERE status = 'Unchecked'")
    )
    with op.batch_alter_table("contact_messages") as batch:
        batch.alter_column(
            "status",
            existing_type=sa.String(length=24),
            existing_nullable=False,
            server_default="new",
        )
