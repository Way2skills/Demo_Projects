from decimal import Decimal

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.dependencies import require_admin, require_editor
from app.main import app
from app.models.entities import Admin, Course


@pytest.fixture
def student_admin_client():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    test_sessions = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)

    with test_sessions() as db:
        db.add(Admin(id=1, full_name="Test Admin", email="admin@example.test", password_hash="test-hash"))
        db.add_all([
            Course(name="Core Programming", slug="core-programming", fee=Decimal("2500.00")),
            Course(name="Full Stack Development", slug="full-stack-development", fee=Decimal("4500.00")),
        ])
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


def student_payload(student_code="D12345", email="student@example.com", **overrides):
    payload = {
        "student_code": student_code,
        "full_name": "Asha Student",
        "email": email,
        "phone": "9876543210",
        "course_id": 1,
        "total_course_fee": 2500,
        "amount_paid": 500,
        "fee_status": "Pending",
        "date_of_join": "2025-01-15",
    }
    payload.update(overrides)
    return payload


def test_student_admin_validates_ids_and_supports_search_crud_and_fee_status(student_admin_client):
    client = student_admin_client
    invalid_id = client.post("/api/v1/admin/students", json=student_payload(student_code="D1234"))
    assert invalid_id.status_code == 422

    created = client.post("/api/v1/admin/students", json=student_payload())
    assert created.status_code == 201, created.text
    first = created.json()
    assert first["student_code"] == "D12345"
    assert first["course_name"] == "Core Programming"
    assert first["total_course_fee"] == 2500
    assert first["date_of_join"] == "2025-01-15"

    duplicate_id = client.post(
        "/api/v1/admin/students",
        json=student_payload(student_code="D12345", email="another@example.org"),
    )
    assert duplicate_id.status_code == 409

    second = client.post(
        "/api/v1/admin/students",
        json=student_payload(student_code="D54321", email="second@example.org", full_name="Bala Student"),
    )
    assert second.status_code == 201

    search = client.get("/api/v1/admin/students", params={"search": "D12345"})
    assert search.status_code == 200
    assert search.json()["total"] == 1
    assert search.json()["items"][0]["id"] == first["id"]

    status_update = client.patch(
        f"/api/v1/admin/students/{first['id']}/fee-status",
        json={"fee_status": "Paid"},
    )
    assert status_update.status_code == 200
    assert status_update.json()["fee_status"] == "Paid"
    refreshed = client.get("/api/v1/admin/students").json()
    assert next(item for item in refreshed["items"] if item["id"] == first["id"])["fee_status"] == "Paid"

    updated = client.put(
        f"/api/v1/admin/students/{first['id']}",
        json=student_payload(
            student_code="D12345",
            full_name="Asha Updated",
            email="student@example.com",
            course_id=2,
            total_course_fee=4500,
            amount_paid=1200,
            fee_status="Unpaid",
            date_of_join="2025-02-20",
        ),
    )
    assert updated.status_code == 200
    assert updated.json()["full_name"] == "Asha Updated"
    assert updated.json()["course_name"] == "Full Stack Development"
    assert updated.json()["fee_status"] == "Unpaid"

    invalid_status = client.patch(
        f"/api/v1/admin/students/{first['id']}/fee-status",
        json={"fee_status": "Overdue"},
    )
    assert invalid_status.status_code == 422

    deleted = client.delete(f"/api/v1/admin/students/{first['id']}")
    assert deleted.status_code == 204
    remaining = client.get("/api/v1/admin/students").json()
    assert remaining["total"] == 1
    assert remaining["items"][0]["id"] == second.json()["id"]


def test_student_creation_accepts_courseid_alias_and_validates_student_fields(student_admin_client):
    payload = student_payload(student_code="D67890", email="legacy-courseid@example.com")
    payload["courseid"] = payload.pop("course_id")

    created = student_admin_client.post("/api/v1/admin/students", json=payload)

    assert created.status_code == 201, created.text
    record = created.json()
    assert record["course_id"] == 1
    assert record["total_course_fee"] == 2500
    assert record["amount_paid"] == 500
    assert record["fee_status"] == "Pending"
    assert record["date_of_join"] == "2025-01-15"
    persisted = student_admin_client.get("/api/v1/admin/students").json()["items"][0]
    assert persisted["id"] == record["id"]

    invalid_payloads = (
        {"total_course_fee": -1},
        {"amount_paid": "1.001"},
        {"fee_status": "Overdue"},
        {"date_of_join": "2025-02-30"},
    )
    for invalid_fields in invalid_payloads:
        response = student_admin_client.post(
            "/api/v1/admin/students",
            json=student_payload(
                student_code="D67890",
                email="legacy-courseid@example.com",
                **invalid_fields,
            ),
        )
        assert response.status_code == 422, response.text


def test_student_creation_uses_typed_handler_if_generic_admin_route_matches_first(student_admin_client):
    generic_route = next(
        route for route in app.router.routes
        if getattr(route, "path", None) == "/api/v1/admin/{resource}"
        and "POST" in getattr(route, "methods", set())
    )
    student_route = next(
        route for route in app.router.routes
        if getattr(route, "path", None) == "/api/v1/admin/students"
        and "POST" in getattr(route, "methods", set())
    )
    original_routes = app.router.routes[:]
    app.router.routes.remove(generic_route)
    app.router.routes.insert(app.router.routes.index(student_route), generic_route)

    try:
        created = student_admin_client.post(
            "/api/v1/admin/students",
            json=student_payload(student_code="D24680", email="generic-route@example.com"),
        )
    finally:
        app.router.routes[:] = original_routes

    assert created.status_code == 201, created.text
    assert created.json()["student_code"] == "D24680"
    saved = student_admin_client.get("/api/v1/admin/students").json()["items"][0]
    assert saved["id"] == created.json()["id"]
