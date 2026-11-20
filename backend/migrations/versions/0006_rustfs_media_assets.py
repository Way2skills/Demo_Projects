"""Add RustFS media metadata and internship images."""

from alembic import op
import sqlalchemy as sa

revision = "0006_rustfs_media_assets"
down_revision = "0005_workshop_program_details"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    internship_columns = {column["name"] for column in inspector.get_columns("internships")}
    if "image_url" not in internship_columns:
        with op.batch_alter_table("internships") as batch:
            batch.add_column(sa.Column("image_url", sa.String(length=500), nullable=True))

    if "media_assets" not in inspector.get_table_names():
        op.create_table(
            "media_assets",
            sa.Column("id", sa.Integer(), primary_key=True),
            sa.Column("object_key", sa.String(length=512), nullable=False, unique=True),
            sa.Column("owner_type", sa.String(length=40), nullable=False),
            sa.Column("owner_id", sa.Integer(), nullable=True),
            sa.Column("original_filename", sa.String(length=255), nullable=False),
            sa.Column("content_type", sa.String(length=100), nullable=False),
            sa.Column("size_bytes", sa.Integer(), nullable=False),
            sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
            sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        )
    index_names = {index["name"] for index in sa.inspect(bind).get_indexes("media_assets")}
    if "ix_media_assets_owner_id" not in index_names:
        op.create_index("ix_media_assets_owner_id", "media_assets", ["owner_id"], unique=False)


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "media_assets" in inspector.get_table_names():
        if "ix_media_assets_owner_id" in {index["name"] for index in inspector.get_indexes("media_assets")}:
            op.drop_index("ix_media_assets_owner_id", table_name="media_assets")
        op.drop_table("media_assets")
    internship_columns = {column["name"] for column in inspector.get_columns("internships")}
    if "image_url" in internship_columns:
        with op.batch_alter_table("internships") as batch:
            batch.drop_column("image_url")
