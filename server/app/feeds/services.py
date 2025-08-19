import feedparser
from datetime import datetime
from sqlalchemy.orm import Session
from app.feeds import models
from app.feeds.utils import slug_from_url, slugify

def fetch_feed(db: Session, feed: models.FeedURL):
    """Fetch and update a feed, store new entries."""
    parsed = feedparser.parse(feed.url)

    if "title" in parsed.feed:
        feed.title = parsed.feed.title
        feed.slug = slugify(parsed.feed.title, slug_from_url(feed.url))
    elif not feed.slug:
        feed.slug = slug_from_url(feed.url)

    feed.last_fetched = datetime.now()

    for entry in parsed.entries:
        exists = db.query(models.FeedEntry).filter_by(link=entry.link).first()
        if not exists:
            new_entry = models.FeedEntry(
                feed_id=feed.id,
                title=entry.get("title", "No title"),
                link=entry.link,
                published_date=(
                    datetime(*entry.published_parsed[:6])
                    if hasattr(entry, "published_parsed")
                    else datetime.now()
                ),
                summary=entry.get("summary", ""),
            )
            db.add(new_entry)

    db.commit()
    db.refresh(feed)
    return feed
