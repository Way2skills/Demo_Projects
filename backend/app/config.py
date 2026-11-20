#---- CONFIGURATION ----
from functools import lru_cache
import json
from pathlib import Path
from typing import Annotated

from pydantic import field_validator
from pydantic_settings import BaseSettings, NoDecode, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str
    secret_key: str
    access_token_expire_minutes: int = 30
    cors_origins: Annotated[list[str], NoDecode] = ["http://localhost:5173"]
    smtp_host: str | None = None
    smtp_port: int = 587
    smtp_username: str | None = None
    smtp_password: str | None = None
    smtp_from: str | None = None
    apps_script_web_app_url: str | None = None
    apps_script_shared_secret: str | None = None
    upload_dir: str = "uploads"
    max_upload_size_mb: int = 8
    rustfs_endpoint: str | None = None
    rustfs_access_key: str | None = None
    rustfs_secret_key: str | None = None
    rustfs_bucket: str | None = None
    rustfs_region: str | None = None
    model_config = SettingsConfigDict(
        env_file=Path(__file__).resolve().parents[1] / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @field_validator("cors_origins", mode="before")
    @classmethod
    def split_origins(cls, value):
        if isinstance(value, str):
            value = value.strip()
            if value.startswith("["):
                try:
                    origins = json.loads(value)
                except json.JSONDecodeError as exc:
                    raise ValueError("CORS_ORIGINS must be a comma-separated list or a JSON array") from exc
                if not isinstance(origins, list) or not all(isinstance(origin, str) for origin in origins):
                    raise ValueError("CORS_ORIGINS JSON value must be an array of strings")
                return [origin.strip() for origin in origins if origin.strip()]
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @field_validator("secret_key")
    @classmethod
    def require_secret_key(cls, value):
        if len(value) < 32 or value == "replace_with_a_long_random_value":
            raise ValueError("SECRET_KEY must be at least 32 characters and must not be the example value")
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
