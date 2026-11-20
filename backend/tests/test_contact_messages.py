import logging
from unittest.mock import Mock
from uuid import uuid4

import httpx
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.database import Base, get_db
from app.dependencies import require_admin, require_editor
from app.limits import limiter
from app.main import app
from app.config import settings
from app.models.entities import Admin, ContactMessage
from app.utils.contact_email import send_contact_confirmation


@pytest.fixture
def contact_client():
    limiter.reset()
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
        yield client

    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)
    engine.dispose()
    limiter.reset()


def contact_payload(**overrides):
    payload = {
        "submission_id": str(uuid4()),
        "name": "Asha Contact",
        "email": "contact.person@example.com",
        "phone": "+91 9876543210",
        "subject": "Course enquiry",
        "message": "Please call me about the next course batch.",
    }
    payload.update(overrides)
    return payload


def test_contact_submission_is_persisted_and_admin_actions_preserve_status_and_date(contact_client):
    submitted = contact_client.post("/api/v1/contact", json=contact_payload())

    assert submitted.status_code == 201, submitted.text
    assert submitted.json()["status"] == "Unchecked"
    message_id = submitted.json()["id"]

    listed = contact_client.get("/api/v1/admin/contact_messages")
    assert listed.status_code == 200
    saved = listed.json()["items"][0]
    assert saved["id"] == message_id
    assert saved["name"] == "Asha Contact"
    assert saved["email"] == "contact.person@example.com"
    assert saved["phone"] == "+91 9876543210"
    assert saved["message"] == "Please call me about the next course batch."
    assert saved["status"] == "Unchecked"
    original_created_at = saved["created_at"]

    checked = contact_client.patch(f"/api/v1/admin/contact_messages/{message_id}/status")
    assert checked.status_code == 200
    assert checked.json()["status"] == "Checked"

    updated = contact_client.put(
        f"/api/v1/admin/contact_messages/{message_id}",
        json={
            "name": "Asha Updated",
            "email": "asha.updated@example.com",
            "phone": "+91 9876500000",
            "message": "Please call me after 5 PM.",
        },
    )
    assert updated.status_code == 200, updated.text
    assert updated.json()["name"] == "Asha Updated"
    assert updated.json()["email"] == "asha.updated@example.com"
    assert updated.json()["phone"] == "+91 9876500000"
    assert updated.json()["message"] == "Please call me after 5 PM."
    assert updated.json()["created_at"] == original_created_at
    assert updated.json()["status"] == "Checked"

    attempted_revert = contact_client.put(
        f"/api/v1/admin/contact_messages/{message_id}",
        json={
            "name": "Asha Updated",
            "email": "asha.updated@example.com",
            "phone": "+91 9876500000",
            "message": "Please call me after 5 PM.",
            "status": "Unchecked",
        },
    )
    assert attempted_revert.status_code == 422
    assert contact_client.patch(f"/api/v1/admin/contact_messages/{message_id}/status").json()["status"] == "Checked"

    refreshed = contact_client.get("/api/v1/admin/contact_messages").json()["items"][0]
    assert refreshed["status"] == "Checked"
    assert refreshed["created_at"] == original_created_at

    deleted = contact_client.delete(f"/api/v1/admin/contact_messages/{message_id}")
    assert deleted.status_code == 204
    assert contact_client.get("/api/v1/admin/contact_messages").json()["total"] == 0


def test_contact_submission_requires_a_phone_number(contact_client):
    payload = contact_payload()
    payload.pop("phone")

    response = contact_client.post("/api/v1/contact", json=payload)

    assert response.status_code == 422
    assert contact_client.get("/api/v1/admin/contact_messages").json()["total"] == 0


def test_contact_submission_rejects_invalid_email(contact_client):
    response = contact_client.post(
        "/api/v1/contact",
        json=contact_payload(email="not-an-email"),
    )

    assert response.status_code == 422
    assert contact_client.get("/api/v1/admin/contact_messages").json()["total"] == 0


@pytest.mark.parametrize(
    "customer_email",
    ["first.customer@example.com", "Second.Customer@EXAMPLE.NET"],
)
def test_contact_confirmation_uses_each_submitted_customer_email(contact_client, monkeypatch, customer_email):
    monkeypatch.setattr(settings, "apps_script_web_app_url", "https://script.google.com/macros/s/test/exec")
    monkeypatch.setattr(settings, "apps_script_shared_secret", "test-shared-secret")
    response = Mock()
    response.status_code = 200
    response.json.return_value = {"ok": True}
    post = Mock(return_value=response)
    monkeypatch.setattr("app.utils.contact_email.httpx.post", post)

    submitted = contact_client.post(
        "/api/v1/contact",
        json=contact_payload(email=customer_email),
    )

    assert submitted.status_code == 201
    assert submitted.json()["email_sent"] is True
    saved = contact_client.get("/api/v1/admin/contact_messages").json()["items"][0]
    assert saved["email"] == customer_email
    post.assert_called_once()
    assert post.call_args.args == ("https://script.google.com/macros/s/test/exec",)
    request = post.call_args.kwargs
    assert request["json"] == {
        "secret": "test-shared-secret",
        "name": "Asha Contact",
        "email": customer_email,
        "phone": "+91 9876543210",
        "subject": "Course enquiry",
        "message": "Please call me about the next course batch.",
    }
    assert request["timeout"] == 10
    assert request["follow_redirects"] is True


def test_contact_is_persisted_if_apps_script_email_fails(contact_client, monkeypatch):
    monkeypatch.setattr(settings, "apps_script_web_app_url", "https://script.google.com/macros/s/test/exec")
    monkeypatch.setattr(settings, "apps_script_shared_secret", "test-shared-secret")
    httpx_post = Mock(side_effect=httpx.ConnectError("unavailable"))
    monkeypatch.setattr(
        "app.utils.contact_email.httpx.post",
        httpx_post,
    )

    payload = contact_payload()
    submitted = contact_client.post("/api/v1/contact", json=payload)
    retried = contact_client.post("/api/v1/contact", json=payload)

    assert submitted.status_code == 201
    assert submitted.json()["email_sent"] is False
    assert retried.status_code == 201
    assert retried.json()["id"] == submitted.json()["id"]
    assert retried.json()["email_sent"] is False
    assert contact_client.get("/api/v1/admin/contact_messages").json()["total"] == 1
    assert httpx_post.call_count == 1


def test_contact_submission_retries_do_not_send_duplicate_confirmation(contact_client, monkeypatch):
    monkeypatch.setattr(settings, "apps_script_web_app_url", "https://script.google.com/macros/s/test/exec")
    monkeypatch.setattr(settings, "apps_script_shared_secret", "test-shared-secret")
    response = Mock()
    response.status_code = 200
    response.json.return_value = {"ok": True}
    httpx_post = Mock(return_value=response)
    monkeypatch.setattr("app.utils.contact_email.httpx.post", httpx_post)
    payload = contact_payload(email="retry.customer@example.com")

    submitted = contact_client.post("/api/v1/contact", json=payload)
    retried = contact_client.post("/api/v1/contact", json=payload)

    assert submitted.status_code == 201
    assert retried.status_code == 201
    assert retried.json()["id"] == submitted.json()["id"]
    assert retried.json()["email_sent"] is True
    assert contact_client.get("/api/v1/admin/contact_messages").json()["total"] == 1
    httpx_post.assert_called_once()
    listed = contact_client.get("/api/v1/admin/contact_messages")
    assert listed.json()["total"] == 1


def test_apps_script_failure_logging_does_not_expose_url_or_secret(monkeypatch, caplog):
    endpoint = "https://script.google.com/macros/s/private-deployment/exec?token=private-query"
    secret = "private-shared-secret"
    monkeypatch.setattr(settings, "apps_script_web_app_url", endpoint)
    monkeypatch.setattr(settings, "apps_script_shared_secret", secret)
    response = Mock()
    response.json.return_value = {"ok": False, "error": "Unauthorized"}
    monkeypatch.setattr("app.utils.contact_email.httpx.post", Mock(return_value=response))
    message = ContactMessage(
        name="Asha Contact",
        email="contact.person@example.com",
        subject="Course enquiry",
        message="Please call me.",
        status="Unchecked",
    )

    with caplog.at_level(logging.WARNING, logger="app.utils.contact_email"):
        assert send_contact_confirmation(message) is False

    assert "Unauthorized" in caplog.text
    assert endpoint not in caplog.text
    assert "private-deployment" not in caplog.text
    assert "private-query" not in caplog.text
    assert secret not in caplog.text


def test_contact_messages_require_admin_authentication(contact_client):
    admin_override = app.dependency_overrides.pop(require_admin)
    editor_override = app.dependency_overrides.pop(require_editor)
    try:
        response = contact_client.get("/api/v1/admin/contact_messages")
    finally:
        app.dependency_overrides[require_admin] = admin_override
        app.dependency_overrides[require_editor] = editor_override

    assert response.status_code == 401
