from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List

from app.db import get_db
from app.feeds import models, schemas, services
from app.jobs.scheduler import fetch_all_feeds

router = APIRouter()

@router.post("/", response_model=schemas.SourceOut)
async def add_source(source: schemas.SourceCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_source = db.query(models.Source).filter_by(url=source.url).first()
    if db_source:
        raise HTTPException(status_code=400, detail="Source already exists")

    new_source = models.Source(url=source.url)
    db.add(new_source)
    db.commit()
    background_tasks.add_task(services.fetch_source_by_id, new_source.id)
    db.refresh(new_source)
    return new_source

@router.get("/", response_model=List[schemas.SourceOut])
async def list_sources(db: Session = Depends(get_db)):
    return db.query(models.Source).all()

@router.get("/{slug}/articles", response_model=List[schemas.ArticleOut])
async def get_source_articles(slug: str, db: Session = Depends(get_db)):
    source = db.query(models.Source).filter_by(slug=slug).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source.articles

@router.post("/{slug}/refresh", response_model=schemas.SourceOut)
async def refresh_source(slug: str, db: Session = Depends(get_db)):
    source = db.query(models.Source).filter_by(slug=slug).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return services.fetch_source(db, source)


@router.post("/refresh-all")
def refresh_all_sources(db: Session = Depends(get_db)):
    fetch_all_feeds()
    return {"status": "Triggered source refresh"}


@router.get("/{source_slug}/articles/{article_slug}")
async def get_article_content_by_slug(source_slug: str, article_slug: str, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    # First verify the source exists
    source = db.query(models.Source).filter_by(slug=source_slug).first()
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    
    # Find the article within this source
    article = db.query(models.Article).filter_by(slug=article_slug, source_id=source.id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    
    content = db.query(models.ArticleContent).filter_by(article_id=article.id).first()
    
    if not content or content.is_fetched == 0:
        # Content not fetched yet, trigger background fetch
        background_tasks.add_task(services.fetch_article_content_by_id, article.id)
        
        if not content:
            # Create a placeholder content record
            content = models.ArticleContent(
                article_id=article.id,
                is_fetched=0
            )
            db.add(content)
            db.commit()
            db.refresh(content)
    
    elif content.is_fetched == -1:
        # Previous fetch failed, retry in background
        background_tasks.add_task(services.fetch_article_content_by_id, article.id)
    
    return content