import logging

import httpx

from app.config import settings
from app.models.entities import ContactMessage

logger = logging.getLogger(__name__)


def send_contact_confirmation(message: ContactMessage) -> bool:
    if not settings.apps_script_web_app_url or not settings.apps_script_shared_secret:
        logger.warning(
            "Contact confirmation email is not configured "
            "(web app URL configured: %s; shared secret configured: %s)",
            bool(settings.apps_script_web_app_url),
            bool(settings.apps_script_shared_secret),
        )
        return False

    try:
        response = httpx.post(
            settings.apps_script_web_app_url,
            json={
                "secret": settings.apps_script_shared_secret,
                "name": message.name,
                "email": message.email,
                "phone": message.phone,
                "subject": message.subject,
                "message": message.message,
            },
            timeout=10,
            follow_redirects=True,
        )
    except httpx.TimeoutException:
        logger.warning("Apps Script contact email request timed out")
        return False
    except httpx.RequestError as exc:
        logger.warning("Apps Script contact email request failed: %s", type(exc).__name__)
        return False

    try:
        response.raise_for_status()
    except httpx.HTTPStatusError as exc:
        logger.warning("Apps Script returned HTTP status %d", exc.response.status_code)
        return False

    try:
        result = response.json()
    except ValueError:
        logger.warning("Apps Script returned a non-JSON response (HTTP %d)", response.status_code)
        return False

    if not isinstance(result, dict):
        logger.warning("Apps Script returned an unexpected JSON response")
        return False
    if result.get("ok") is not True:
        error = result.get("error")
        if isinstance(error, str) and error in {
            "Unauthorized",
            "Missing required contact details",
            "Email delivery failed",
        }:
            logger.warning("Apps Script rejected contact confirmation: %s", error)
        else:
            logger.warning("Apps Script did not accept contact confirmation")
        return False

    logger.info("Apps Script accepted contact confirmation request (HTTP %d)", response.status_code)
    return True
