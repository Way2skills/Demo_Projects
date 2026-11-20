from functools import lru_cache
from urllib.parse import quote
from uuid import uuid4

import boto3
from botocore.config import Config
from botocore.exceptions import BotoCoreError, ClientError

from app.config import settings


class RustFSConfigurationError(RuntimeError):
    pass


class RustFSOperationError(RuntimeError):
    pass


class RustFSObjectNotFound(RustFSOperationError):
    pass


def _read_required_settings(names: dict[str, str]) -> dict[str, str]:
    values = {attribute: getattr(settings, attribute) for attribute in names}
    missing = [name for attribute, name in names.items() if not isinstance(values[attribute], str) or not values[attribute].strip()]
    if missing:
        raise RustFSConfigurationError(
            f"Missing RustFS configuration in backend/.env: {', '.join(missing)}"
        )
    return {attribute: value.strip() for attribute, value in values.items()}


def _required_client_settings() -> dict[str, str]:
    return _read_required_settings({
        "rustfs_endpoint": "RUSTFS_ENDPOINT",
        "rustfs_access_key": "RUSTFS_ACCESS_KEY",
        "rustfs_secret_key": "RUSTFS_SECRET_KEY",
        "rustfs_region": "RUSTFS_REGION",
    })


def bucket_name() -> str:
    return _read_required_settings({"rustfs_bucket": "RUSTFS_BUCKET"})["rustfs_bucket"]


@lru_cache(maxsize=1)
def get_rustfs_client():
    values = _required_client_settings()
    return boto3.client(
        "s3",
        endpoint_url=values["rustfs_endpoint"],
        aws_access_key_id=values["rustfs_access_key"],
        aws_secret_access_key=values["rustfs_secret_key"],
        region_name=values["rustfs_region"],
        config=Config(
            signature_version="s3v4",
            s3={"addressing_style": "path"},
            connect_timeout=5,
            read_timeout=30,
            retries={"max_attempts": 2},
        ),
    )


def _operation_error(operation: str, exc: BotoCoreError | ClientError) -> RustFSOperationError:
    code = "network error"
    if isinstance(exc, ClientError):
        code = str(exc.response.get("Error", {}).get("Code") or code)
    return RustFSOperationError(f"RustFS {operation} failed ({code})")


def verify_bucket() -> None:
    try:
        _read_required_settings({
            "rustfs_endpoint": "RUSTFS_ENDPOINT",
            "rustfs_access_key": "RUSTFS_ACCESS_KEY",
            "rustfs_secret_key": "RUSTFS_SECRET_KEY",
            "rustfs_bucket": "RUSTFS_BUCKET",
            "rustfs_region": "RUSTFS_REGION",
        })
        get_rustfs_client().head_bucket(Bucket=bucket_name())
    except (BotoCoreError, ClientError) as exc:
        raise _operation_error("bucket verification", exc) from exc


def put_media_object(
    content: bytes,
    category: str,
    suffix: str,
    original_filename: str,
    content_type: str,
) -> str:
    object_key = f"media/{category}/{uuid4().hex}{suffix}"
    try:
        get_rustfs_client().put_object(
            Bucket=bucket_name(),
            Key=object_key,
            Body=content,
            ContentType=content_type,
            Metadata={
                "original-filename": quote(original_filename, safe=""),
                "resource": category,
            },
        )
    except (BotoCoreError, ClientError) as exc:
        raise _operation_error("image upload", exc) from exc
    return object_key


def get_media_object(object_key: str) -> bytes:
    try:
        response = get_rustfs_client().get_object(Bucket=bucket_name(), Key=object_key)
        with response["Body"] as body:
            return body.read()
    except ClientError as exc:
        code = str(exc.response.get("Error", {}).get("Code", ""))
        if code in {"NoSuchKey", "NotFound", "404"}:
            raise RustFSObjectNotFound("RustFS image object was not found") from exc
        raise _operation_error("image retrieval", exc) from exc
    except BotoCoreError as exc:
        raise _operation_error("image retrieval", exc) from exc


def delete_media_object(object_key: str) -> None:
    try:
        get_rustfs_client().delete_object(Bucket=bucket_name(), Key=object_key)
    except (BotoCoreError, ClientError) as exc:
        raise _operation_error("image deletion", exc) from exc
