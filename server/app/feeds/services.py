import feedparser
from datetime import datetime
from sqlalchemy.orm import Session
from app.feeds import models
from app.feeds.utils import slug_from_url, slugify
from app.db import get_db

def fetch_source(db: Session, source: models.Source):
    """Fetch and update a source, store new articles."""
    parsed = feedparser.parse(source.url)

    if "title" in parsed.feed:
        source.title = parsed.feed.title
        source.slug = slugify(parsed.feed.title, slug_from_url(source.url))
    elif not source.slug:
        source.slug = slug_from_url(source.url)

    source.last_fetched = datetime.now()

    for entry in parsed.entries:
        exists = db.query(models.Article).filter_by(link=entry.link).first()
        if not exists:
            new_article = models.Article(
                source_id=source.id,
                title=entry.get("title", "No title"),
                link=entry.link,
                slug=slugify(entry.title, slug_from_url(entry.link)),
                published_date=(
                    datetime(*entry.published_parsed[:6])
                    if hasattr(entry, "published_parsed")
                    else datetime.now()
                ),
                summary=entry.get("summary", ""),
            )
            db.add(new_article)

    db.commit()
    db.refresh(source)
    return source

def fetch_source_by_id(source_id: int):
    """Fetch and update a source by ID in a background task."""
    db = next(get_db())
    source = db.query(models.Source).filter_by(id=source_id).first()
    if source:
        fetch_source(db, source)
