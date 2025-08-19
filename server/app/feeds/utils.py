import re
import hashlib

def slugify(text: str, fallback: str) -> str:
    if text:
        slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
        return slug or fallback
    return fallback

def slug_from_url(url: str) -> str:
    return hashlib.sha1(url.encode("utf-8")).hexdigest()[:8]
