import json

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.dependencies import require_admin, require_editor
from app.main import app
from app.models.entities import Admin

PNG_IMAGE = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000b49444154789c636000020000050001a5f645400000000049454e44ae426082"
)


@pytest.fixture
def client(fake_rustfs):
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    test_sessions = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

    with test_sessions() as db:
        db.add(Admin(id=1, full_name="Test Admin", email="admin@example.test", password_hash="test-hash"))
        db.commit()

    def override_get_db():
        with test_sessions() as db:
            yield db

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()


def authorize_admin_edits():
    principal = {"id": 1, "role": "admin", "email": "admin@example.test"}
    app.dependency_overrides[require_admin] = lambda: principal
    app.dependency_overrides[require_editor] = lambda: principal


def create_trainer(client, name, is_active="true"):
    return client.post(
        "/api/v1/admin/trainers",
        data={
            "name": name,
            "experience_years": "3",
            "designation": "Technical Trainer",
            "expertise": json.dumps(["Core Programming", "Full Stack"]),
            "is_active": is_active,
        },
        files={"photo": ("trainer.png", PNG_IMAGE, "image/png")},
    )


def test_trainer_write_actions_require_admin_authentication(client):
    response = create_trainer(client, "Unauthenticated Trainer")
    assert response.status_code == 401


def test_trainer_crud_photo_storage_and_public_active_filter(client, fake_rustfs):
    authorize_admin_edits()
    first = create_trainer(client, "Asha Trainer")
    second = create_trainer(client, "Bala Trainer")
    inactive = create_trainer(client, "Inactive Trainer", "false")

    assert first.status_code == 201
    assert second.status_code == 201
    assert inactive.status_code == 201
    first_record = first.json()
    first_photo_path = first_record["image_url"]
    assert first_photo_path.startswith("/api/v1/media/")
    assert client.get(first_photo_path).content == PNG_IMAGE
    assert len(fake_rustfs.objects) == 3
    assert first_record["experience_years"] == 3
    assert first_record["expertise"] == ["Core Programming", "Full Stack"]

    public_trainers = client.get("/api/v1/trainers").json()["items"]
    assert [trainer["name"] for trainer in public_trainers] == ["Asha Trainer", "Bala Trainer"]
    assert all(trainer["image_url"].startswith("/api/v1/media/") for trainer in public_trainers)

    updated = client.put(
        f"/api/v1/admin/trainers/{first_record['id']}",
        data={
            "name": "Asha Updated",
            "experience_years": "5",
            "designation": "Senior Technical Trainer",
            "expertise": json.dumps(["Python", "Mentoring"]),
            "is_active": "true",
        },
        files={"photo": ("updated.png", PNG_IMAGE, "image/png")},
    )
    assert updated.status_code == 200
    updated_record = updated.json()
    assert updated_record["name"] == "Asha Updated"
    assert updated_record["expertise"] == ["Python", "Mentoring"]
    assert client.get(first_photo_path).status_code == 404
    assert client.get(updated_record["image_url"]).content == PNG_IMAGE

    deactivated = client.patch(
        f"/api/v1/admin/trainers/{updated_record['id']}/status",
        json={"is_active": False},
    )
    assert deactivated.status_code == 200
    assert [trainer["name"] for trainer in client.get("/api/v1/trainers").json()["items"]] == ["Bala Trainer"]

    reactivated = client.patch(
        f"/api/v1/admin/trainers/{updated_record['id']}/status",
        json={"is_active": True},
    )
    assert reactivated.status_code == 200
    assert len(client.get("/api/v1/trainers").json()["items"]) == 2

    removed = client.delete(f"/api/v1/admin/trainers/{updated_record['id']}")
    assert removed.status_code == 204
    assert len(client.get("/api/v1/trainers").json()["items"]) == 1
    assert client.get(updated_record["image_url"]).status_code == 404

    deleted_inactive = client.delete(f"/api/v1/admin/trainers/{inactive.json()['id']}")
    assert deleted_inactive.status_code == 204


def test_trainer_creation_rejects_missing_expertise_and_invalid_image(client):
    authorize_admin_edits()
    missing_expertise = client.post(
        "/api/v1/admin/trainers",
        data={
            "name": "Trainer",
            "experience_years": "0",
            "designation": "Technical Trainer",
            "expertise": "[]",
        },
        files={"photo": ("trainer.png", PNG_IMAGE, "image/png")},
    )
    assert missing_expertise.status_code == 422

    invalid_image = client.post(
        "/api/v1/admin/trainers",
        data={
            "name": "Trainer",
            "experience_years": "-1",
            "designation": "Technical Trainer",
            "expertise": json.dumps(["Programming"]),
        },
        files={"photo": ("trainer.png", b"not an image", "image/png")},
    )
    assert invalid_image.status_code == 422


def test_trainer_creation_and_update_reject_duplicate_names(client):
    authorize_admin_edits()
    first = create_trainer(client, "Asha Trainer")
    assert first.status_code == 201

    duplicate = create_trainer(client, "asha trainer")
    assert duplicate.status_code == 409
    assert duplicate.json()["detail"] == "A trainer with this name already exists"

    second = create_trainer(client, "Bala Trainer")
    assert second.status_code == 201
    updated = client.put(
        f"/api/v1/admin/trainers/{second.json()['id']}",
        data={
            "name": "ASHA TRAINER",
            "experience_years": "2",
            "designation": "Technical Trainer",
            "expertise": json.dumps(["Python"]),
            "is_active": "true",
        },
    )
    assert updated.status_code == 409
