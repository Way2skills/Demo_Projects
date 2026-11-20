#---- CONFIGURATION TESTS ----
import json
from pathlib import Path

from app.config import Settings


def test_env_file_path_is_relative_to_backend_not_process_directory():
    assert Path(Settings.model_config["env_file"]) == Path(__file__).resolve().parents[1] / ".env"


def test_cors_origins_accept_comma_separated_environment_value(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgresql+psycopg://user:password@localhost/database")
    monkeypatch.setenv("SECRET_KEY", "a" * 48)
    monkeypatch.setenv("CORS_ORIGINS", "http://localhost:5173, http://127.0.0.1:5173")

    settings = Settings(_env_file=None)

    assert settings.cors_origins == ["http://localhost:5173", "http://127.0.0.1:5173"]


def test_cors_origins_accept_json_environment_value(monkeypatch):
    monkeypatch.setenv("DATABASE_URL", "postgresql+psycopg://user:password@localhost/database")
    monkeypatch.setenv("SECRET_KEY", "a" * 48)
    monkeypatch.setenv("CORS_ORIGINS", json.dumps(["http://localhost:5173"]))

    settings = Settings(_env_file=None)

    assert settings.cors_origins == ["http://localhost:5173"]
