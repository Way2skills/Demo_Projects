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
def course_client(fake_rustfs):
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
    principal = {"id": 1, "role": "admin", "email": "admin@example.test"}
    app.dependency_overrides[require_admin] = lambda: principal
    app.dependency_overrides[require_editor] = lambda: principal
    with TestClient(app) as client:
        yield client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()


def create_course(client, name="Python", fee="2500.00", syllabus="Python, data structures", image=PNG_IMAGE):
    return client.post(
        "/api/v1/admin/courses",
        data={"name": name, "fee": fee, "syllabus": syllabus},
        files={"course_image": (f"{name}.png", image, "image/png")},
    )


def test_admin_course_image_upload_and_public_sync(course_client, fake_rustfs):
    created = create_course(course_client)
    assert created.status_code == 201, created.text
    course = created.json()
    assert course["id"] > 0
    assert course["image_url"].startswith("/api/v1/media/")
    image_path = course["image_url"]
    assert course_client.get(image_path).content == PNG_IMAGE
    assert len(fake_rustfs.objects) == 1

    public = course_client.get("/api/v1/courses")
    assert public.status_code == 200
    assert public.json()["items"][0]["image_url"] == course["image_url"]

    updated = course_client.put(
        f"/api/v1/admin/courses/{course['id']}",
        data={"name": "Python Advanced", "fee": "3750.50", "syllabus": "Python APIs, testing"},
        files={"course_image": ("advanced.png", PNG_IMAGE, "image/png")},
    )
    assert updated.status_code == 200, updated.text
    updated_course = updated.json()
    assert updated_course["name"] == "Python Advanced"
    assert updated_course["fee"] == 3750.5
    assert updated_course["syllabus"] == "Python APIs, testing"
    assert course_client.get(image_path).status_code == 404
    assert len(fake_rustfs.objects) == 1

    listed_course = course_client.get("/api/v1/courses").json()["items"][0]
    assert listed_course["image_url"] == updated_course["image_url"]
    assert listed_course["name"] == "Python Advanced"
    assert listed_course["fee"] == 3750.5
    assert listed_course["syllabus"] == "Python APIs, testing"


def test_course_json_update_keeps_existing_image(course_client):
    created = create_course(course_client)
    course = created.json()
    image_path = course["image_url"]

    updated = course_client.put(
        f"/api/v1/admin/courses/{course['id']}",
        json={"name": "Python", "fee": 2750, "syllabus": "Python, functions"},
    )

    assert updated.status_code == 200, updated.text
    assert updated.json()["id"] == course["id"]
    assert updated.json()["fee"] == 2750
    assert updated.json()["syllabus"] == "Python, functions"
    assert updated.json()["image_url"] == course["image_url"]
    assert course_client.get(image_path).content == PNG_IMAGE


def test_batch_availability_is_persisted_per_course_and_returned_by_public_api(course_client):
    courses = []
    for index in range(10):
        response = create_course(course_client, name=f"Course {index + 1}")
        assert response.status_code == 201, response.text
        courses.append(response.json())

    unavailable = {
        "batch_1": False,
        "batch_2": False,
        "batch_3": False,
        "batch_4": False,
    }
    assert all(course["batch_availability"] == unavailable for course in courses)

    first_status = {"batch_1": True, "batch_2": False, "batch_3": True, "batch_4": False}
    second_status = {"batch_1": False, "batch_2": True, "batch_3": False, "batch_4": True}
    first_update = course_client.patch(
        f"/api/v1/admin/courses/{courses[0]['id']}/batches",
        json=first_status,
    )
    second_update = course_client.patch(
        f"/api/v1/admin/courses/{courses[1]['id']}/batches",
        json=second_status,
    )
    assert first_update.status_code == 200, first_update.text
    assert second_update.status_code == 200, second_update.text
    assert first_update.json()["batch_availability"] == first_status
    assert second_update.json()["batch_availability"] == second_status
    assert first_update.json()["name"] == courses[0]["name"]
    assert first_update.json()["fee"] == courses[0]["fee"]
    assert first_update.json()["syllabus"] == courses[0]["syllabus"]

    course_edit = course_client.put(
        f"/api/v1/admin/courses/{courses[0]['id']}",
        json={
            "name": courses[0]["name"],
            "fee": courses[0]["fee"],
            "syllabus": courses[0]["syllabus"],
        },
    )
    assert course_edit.status_code == 200, course_edit.text
    assert course_edit.json()["batch_availability"] == first_status

    public_courses = {
        course["id"]: course
        for course in course_client.get("/api/v1/courses").json()["items"]
    }
    expected_statuses = [first_status, second_status, *([unavailable] * 8)]
    for course, expected_status in zip(courses, expected_statuses):
        assert public_courses[course["id"]]["batch_availability"] == expected_status
    assert course_client.get(f"/api/v1/courses/{courses[0]['id']}").json()["batch_availability"] == first_status

    incomplete = course_client.patch(
        f"/api/v1/admin/courses/{courses[0]['id']}/batches",
        json={"batch_1": True},
    )
    extra_status = course_client.patch(
        f"/api/v1/admin/courses/{courses[0]['id']}/batches",
        json={**first_status, "batch_5": True},
    )
    assert incomplete.status_code == 422
    assert extra_status.status_code == 422


def test_course_upload_validation_active_limit_and_lan_cors(course_client):
    invalid_fee = create_course(course_client, fee="-1")
    assert invalid_fee.status_code == 422

    invalid_image = create_course(course_client, name="Invalid", image=b"not an image")
    assert invalid_image.status_code == 415

    for index in range(10):
        created = create_course(course_client, name=f"Course {index + 1}")
        assert created.status_code == 201, created.text

    over_limit = create_course(course_client, name="Course 11")
    assert over_limit.status_code == 409
    assert over_limit.json()["detail"] == "A maximum of 10 active courses is allowed"

    cors = course_client.options(
        "/api/v1/admin/courses",
        headers={
            "Origin": "http://192.168.1.25:5173",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "authorization,content-type",
        },
    )
    assert cors.status_code == 200
    assert cors.headers["access-control-allow-origin"] == "http://192.168.1.25:5173"
