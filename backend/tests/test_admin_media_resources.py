import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.dependencies import require_admin, require_editor
from app.main import app
from app.models.entities import Admin, MediaAsset

PNG_IMAGE = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000b49444154789c636000020000050001a5f645400000000049454e44ae426082"
)


@pytest.fixture
def media_client(fake_rustfs):
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

    principal = {"id": 1, "role": "admin", "email": "admin@example.test"}
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[require_admin] = lambda: principal
    app.dependency_overrides[require_editor] = lambda: principal

    with TestClient(app) as client:
        client.app.state.media_test_sessions = test_sessions
        yield client

    del client.app.state.media_test_sessions
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()


def test_internship_and_gallery_images_upload_replace_retrieve_and_delete(media_client, fake_rustfs):
    internship = media_client.post(
        "/api/v1/admin/internships",
        data={"title": "Web Development Internship", "description": "Build web applications"},
        files={"image": ("internship.png", PNG_IMAGE, "image/png")},
    )
    assert internship.status_code == 201, internship.text
    internship_record = internship.json()
    internship_image = internship_record["image_url"]
    assert internship_image.startswith("/api/v1/media/")
    assert media_client.get(internship_image).content == PNG_IMAGE
    assert media_client.get("/api/v1/internships").json()["items"][0]["image_url"] == internship_image
    with media_client.app.state.media_test_sessions() as db:
        asset = db.get(MediaAsset, int(internship_image.rsplit("/", 1)[-1]))
        assert asset.object_key.startswith("media/internships/")
        assert asset.owner_type == "internships"
        assert asset.owner_id == internship_record["id"]
        assert asset.original_filename == "internship.png"
        assert asset.content_type == "image/png"
        assert asset.size_bytes == len(PNG_IMAGE)

    updated_internship = media_client.put(
        f"/api/v1/admin/internships/{internship_record['id']}",
        data={"title": "Updated Internship", "description": "Updated details"},
        files={"image": ("updated.png", PNG_IMAGE, "image/png")},
    )
    assert updated_internship.status_code == 200, updated_internship.text
    updated_internship_image = updated_internship.json()["image_url"]
    assert updated_internship_image != internship_image
    assert media_client.get(internship_image).status_code == 404
    assert media_client.get(updated_internship_image).content == PNG_IMAGE

    gallery = media_client.post(
        "/api/v1/admin/gallery",
        data={"title": "Classroom", "category": "Training", "alt_text": "Training room", "is_active": "true"},
        files={"image": ("gallery.png", PNG_IMAGE, "image/png")},
    )
    assert gallery.status_code == 201, gallery.text
    gallery_record = gallery.json()
    gallery_image = gallery_record["image_url"]
    assert media_client.get(gallery_image).content == PNG_IMAGE
    assert media_client.get("/api/v1/gallery").json()["items"][0]["image_url"] == gallery_image

    deleted = media_client.delete(f"/api/v1/admin/internships/{internship_record['id']}")
    assert deleted.status_code == 204
    assert media_client.get(updated_internship_image).status_code == 404
    assert len(fake_rustfs.objects) == 1
