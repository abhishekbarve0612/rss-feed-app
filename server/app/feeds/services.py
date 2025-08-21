import feedparser
import trafilatura
import requests
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

def fetch_article_content(db: Session, article: models.Article):
    """Fetch full content for an article using trafilatura."""
    try:
        # Download the webpage
        response = requests.get(article.link, timeout=30)
        response.raise_for_status()
        
        plain_text = trafilatura.extract(response.text)
        html_text = trafilatura.extract(response.text, output_format='html')
        
        content = db.query(models.ArticleContent).filter_by(article_id=article.id).first()
        
        if content:
            content.plain_text = plain_text
            content.html_text = html_text
            content.is_fetched = 1
            content.updated_at = datetime.now()
        else:
            content = models.ArticleContent(
                article_id=article.id,
                plain_text=plain_text,
                html_text=html_text,
                is_fetched=1
            )
            db.add(content)
        
        db.commit()
        return content
        
    except Exception as e:
        content = db.query(models.ArticleContent).filter_by(article_id=article.id).first()
        if content:
            content.is_fetched = -1
            content.updated_at = datetime.now()
        else:
            content = models.ArticleContent(
                article_id=article.id,
                is_fetched=-1
            )
            db.add(content)
        
        db.commit()
        print(f"Error fetching content for article {article.id}: {str(e)}")
        return None

def fetch_article_content_by_id(article_id: int):
    """Fetch article content by ID in a background task."""
    db = next(get_db())
    article = db.query(models.Article).filter_by(id=article_id).first()
    if article:
        return fetch_article_content(db, article)
    return None
