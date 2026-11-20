from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.entities import MediaAsset
from app.utils.rustfs import (
    RustFSConfigurationError,
    RustFSObjectNotFound,
    RustFSOperationError,
    get_media_object,
)

router = APIRouter(tags=["media"])


@router.get("/media/{asset_id}")
def get_image(asset_id: int, db: Session = Depends(get_db)):
    asset = db.get(MediaAsset, asset_id)
    if asset is None:
        raise HTTPException(status_code=404, detail="Image not found")
    try:
        content = get_media_object(asset.object_key)
    except RustFSObjectNotFound as exc:
        raise HTTPException(status_code=404, detail="Image not found") from exc
    except (RustFSConfigurationError, RustFSOperationError) as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc
    return Response(
        content=content,
        media_type=asset.content_type,
        headers={"Cache-Control": "public, max-age=31536000, immutable"},
    )
