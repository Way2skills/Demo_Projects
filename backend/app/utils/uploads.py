import logging
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit
from uuid import uuid4

from app.config import settings

logger = logging.getLogger(__name__)


def upload_directory() -> Path:
    directory = Path(settings.upload_dir)
    if not directory.is_absolute():
        directory = Path(__file__).resolve().parents[2] / directory
    return directory.resolve()


def store_upload(content: bytes, suffix: str) -> str:
    directory = upload_directory()
    directory.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid4().hex}{suffix}"
    destination = directory / filename
    with destination.open("xb") as upload:
        upload.write(content)
    return filename


def remove_managed_upload(url: str | None) -> None:
    if not url:
        return
    filename = Path(unquote(urlsplit(url).path)).name
    if not re.fullmatch(r"[a-f0-9]{32}\.(?:png|jpe?g|webp)", filename):
        return
    try:
        (upload_directory() / filename).unlink(missing_ok=True)
    except OSError:
        logger.exception("Could not remove stored upload %s", filename)
