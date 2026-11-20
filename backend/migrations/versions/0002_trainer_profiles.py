"""Add structured trainer experience and expertise."""

import re

from alembic import op
import sqlalchemy as sa

revision = "0002_trainer_profiles"
down_revision = "0001_initial"
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    existing_columns = {column["name"] for column in sa.inspect(bind).get_columns("trainers")}
    added_experience = "experience_years" not in existing_columns
    added_expertise = "expertise" not in existing_columns

    if added_experience:
        op.add_column("trainers", sa.Column("experience_years", sa.Integer(), nullable=True))
    if added_expertise:
        op.add_column("trainers", sa.Column("expertise", sa.JSON(), nullable=True))

    trainer_table = sa.table(
        "trainers",
        sa.column("id", sa.Integer),
        sa.column("experience", sa.String),
        sa.column("specialization", sa.String),
        sa.column("experience_years", sa.Integer),
        sa.column("expertise", sa.JSON),
    )
    for trainer in bind.execute(sa.select(
        trainer_table.c.id,
        trainer_table.c.experience,
        trainer_table.c.specialization,
    )).mappings():
        match = re.search(r"\d+", trainer["experience"] or "")
        years = int(match.group()) if match else 0
        expertise = [area.strip() for area in (trainer["specialization"] or "").split(",") if area.strip()]
        bind.execute(
            trainer_table.update().where(trainer_table.c.id == trainer["id"]).values(
                experience_years=years,
                expertise=expertise,
            )
        )

    with op.batch_alter_table("trainers") as batch:
        if added_experience:
            batch.alter_column("experience_years", existing_type=sa.Integer(), nullable=False)
        if added_expertise:
            batch.alter_column("expertise", existing_type=sa.JSON(), nullable=False)


def downgrade():
    with op.batch_alter_table("trainers") as batch:
        batch.drop_column("expertise")
        batch.drop_column("experience_years")
