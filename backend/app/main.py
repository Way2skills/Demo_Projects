import logging
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.limits import limiter
from app.routers import admin, auth, dashboard, internships, media, public, student
from app.utils.uploads import upload_directory
from app.utils.rustfs import RustFSConfigurationError, RustFSOperationError, verify_bucket

logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="Decode Institution API",
    description="Public website, student portal and administration API.",
    version="1.0.0",
)
app.state.limiter = limiter
UPLOAD_DIRECTORY = upload_directory()
UPLOAD_DIRECTORY.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIRECTORY)), name="uploads")


@app.exception_handler(RateLimitExceeded)
def rate_limit_handler(request, exc):
    return JSONResponse(status_code=429, content={"detail": "Too many requests. Please try again later."})


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        *settings.cors_origins,
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
    ],
    allow_origin_regex=r"https?://(?:localhost|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2}):(?:4173|5173|5174|8080)",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

api = FastAPI()
app.include_router(auth.router, prefix="/api/v1")
app.include_router(public.router, prefix="/api/v1")
app.include_router(media.router, prefix="/api/v1")
app.include_router(internships.router, prefix="/api/v1")
app.include_router(student.router, prefix="/api/v1")
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(admin.router, prefix="/api/v1")


@app.get("/health", tags=["health"])
def health_check():
    try:
        verify_bucket()
    except (RustFSConfigurationError, RustFSOperationError) as exc:
        logging.getLogger(__name__).error("RustFS health check failed: %s", exc)
        return JSONResponse(status_code=503, content={"status": "error", "detail": str(exc)})
    return {"status": "ok"}


@app.get("/", include_in_schema=False)
def root():
    return {"name": "Decode Institution API", "docs": "/docs"}
