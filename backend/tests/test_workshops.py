import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.dependencies import require_admin, require_editor
from app.main import app
from app.models.entities import Admin, Trainer


@pytest.fixture
def workshop_client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    test_sessions = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

    with test_sessions() as db:
        db.add(Admin(id=1, full_name="Test Admin", email="admin@example.test", password_hash="test-hash"))
        db.add(Trainer(id=1, name="Asha Trainer"))
        db.commit()

    def override_get_db():
        with test_sessions() as db:
            yield db

    principal = {"id": 1, "role": "admin", "email": "admin@example.test"}
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[require_admin] = lambda: principal
    app.dependency_overrides[require_editor] = lambda: principal

    with TestClient(app) as client:
        yield client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()


def workshop_payload(**overrides):
    payload = {
        "trainer_id": 1,
        "program": "Full Stack Development",
        "duration": "2 Months",
        "admission_start_date": "2026-03-01",
        "admission_end_date": "2026-03-15",
        "program_start_date": "2026-04-01",
        "program_end_date": "2026-05-31",
        "mode": "Offline",
        "start_time": "10:00",
        "end_time": "17:00",
        "is_active": True,
    }
    payload.update(overrides)
    return payload


def test_workshop_crud_public_listing_and_application_flow(workshop_client):
    created = workshop_client.post("/api/v1/admin/workshops", json=workshop_payload())
    assert created.status_code == 201, created.text
    record = created.json()
    assert record["program"] == "Full Stack Development"
    assert record["trainer_name"] == "Asha Trainer"
    assert record["start_time"] == "10:00:00"
    workshop_id = record["id"]

    listed = workshop_client.get("/api/v1/admin/workshops")
    assert listed.status_code == 200
    assert listed.json()["items"][0]["program"] == "Full Stack Development"

    public = workshop_client.get("/api/v1/workshops")
    assert public.status_code == 200
    assert public.json()["items"] == [{
        "id": workshop_id,
        "trainer_name": "Asha Trainer",
        "program": "Full Stack Development",
        "duration": "2 Months",
        "admission_start_date": "2026-03-01",
        "admission_end_date": "2026-03-15",
        "program_start_date": "2026-04-01",
        "program_end_date": "2026-05-31",
        "mode": "Offline",
        "start_time": "10:00:00",
        "end_time": "17:00:00",
    }]

    application = workshop_client.post(
        "/api/v1/internships/apply",
        data={
            "internship_title": "Full Stack Development",
            "full_name": "Test Applicant",
            "email": "applicant@example.com",
            "phone": "9876543210",
        },
    )
    assert application.status_code == 201, application.text

    updated = workshop_client.put(
        f"/api/v1/admin/workshops/{workshop_id}",
        json=workshop_payload(program="Data Analytics", mode="Online", is_active=False),
    )
    assert updated.status_code == 200, updated.text
    assert updated.json()["program"] == "Data Analytics"
    assert updated.json()["mode"] == "Online"
    assert workshop_client.get("/api/v1/workshops").json()["items"] == []

    deleted = workshop_client.delete(f"/api/v1/admin/workshops/{workshop_id}")
    assert deleted.status_code == 204
    assert workshop_client.get("/api/v1/admin/workshops").json()["items"] == []


@pytest.mark.parametrize(
    "overrides",
    [
        {"admission_start_date": "2026-03-16", "admission_end_date": "2026-03-15"},
        {"program_start_date": "2026-06-01", "program_end_date": "2026-05-31"},
    ],
)
def test_workshop_rejects_reversed_date_ranges(workshop_client, overrides):
    response = workshop_client.post(
        "/api/v1/admin/workshops",
        json=workshop_payload(**overrides),
    )
    assert response.status_code == 422
    assert workshop_client.get("/api/v1/admin/workshops").json()["items"] == []


def test_workshop_requires_an_existing_trainer(workshop_client):
    response = workshop_client.post(
        "/api/v1/admin/workshops",
        json=workshop_payload(trainer_id=999),
    )
    assert response.status_code == 404
