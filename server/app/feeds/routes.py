from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db import get_db
from app.feeds import models, schemas, services
from app.jobs.scheduler import fetch_all_feeds

router = APIRouter()

@router.post("/", response_model=schemas.FeedOut)
async def add_feed(feed: schemas.FeedCreate, db: Session = Depends(get_db)):
    db_feed = db.query(models.FeedURL).filter_by(url=feed.url).first()
    if db_feed:
        raise HTTPException(status_code=400, detail="Feed already exists")

    new_feed = models.FeedURL(url=feed.url)
    db.add(new_feed)
    db.commit()
    db.refresh(new_feed)
    return new_feed

@router.get("/", response_model=List[schemas.FeedOut])
async def list_feeds(db: Session = Depends(get_db)):
    return db.query(models.FeedURL).all()

@router.get("/{slug}/entries", response_model=List[schemas.FeedEntryOut])
async def get_feed_entries(slug: str, db: Session = Depends(get_db)):
    feed = db.query(models.FeedURL).filter_by(slug=slug).first()
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    return feed.entries

@router.post("/{slug}/refresh", response_model=schemas.FeedOut)
async def refresh_feed(slug: str, db: Session = Depends(get_db)):
    feed = db.query(models.FeedURL).filter_by(slug=slug).first()
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    return services.fetch_feed(db, feed)


@router.post("/refresh-all")
def refresh_all_feeds(db: Session = Depends(get_db)):
    fetch_all_feeds()
    return {"status": "Triggered feed refresh"}