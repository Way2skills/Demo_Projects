import os
from io import BytesIO

import pytest

os.environ.setdefault("DATABASE_URL", "sqlite:///./decode_test.db")
os.environ.setdefault("SECRET_KEY", "test-only-signing-key-not-for-production-123")


@pytest.fixture
def fake_rustfs(monkeypatch):
    from app.config import settings

    class MemoryS3:
        def __init__(self):
            self.objects = {}

        def head_bucket(self, **kwargs):
            return {}

        def put_object(self, Bucket, Key, Body, ContentType, Metadata):
            self.objects[Key] = {"body": Body, "content_type": ContentType, "metadata": Metadata}
            return {}

        def get_object(self, Bucket, Key):
            stored = self.objects[Key]
            return {"Body": BytesIO(stored["body"]), "ContentType": stored["content_type"]}

        def delete_object(self, Bucket, Key):
            self.objects.pop(Key, None)
            return {}

    storage = MemoryS3()
    monkeypatch.setattr(settings, "rustfs_bucket", "test-bucket")
    monkeypatch.setattr("app.utils.rustfs.get_rustfs_client", lambda: storage)
    return storage
