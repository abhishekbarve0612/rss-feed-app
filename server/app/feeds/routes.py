from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db import get_db
from app.feeds import models, schemas, services

router = APIRouter()

@router.post("/", response_model=schemas.FeedOut)
def add_feed(feed: schemas.FeedCreate, db: Session = Depends(get_db)):
    db_feed = db.query(models.FeedURL).filter_by(url=feed.url).first()
    if db_feed:
        raise HTTPException(status_code=400, detail="Feed already exists")

    new_feed = models.FeedURL(url=feed.url)
    db.add(new_feed)
    db.commit()
    db.refresh(new_feed)
    return new_feed

@router.get("/", response_model=List[schemas.FeedOut])
def list_feeds(db: Session = Depends(get_db)):
    return db.query(models.FeedURL).all()

@router.get("/{feed_id}/entries", response_model=List[schemas.FeedEntryOut])
def get_feed_entries(feed_id: int, db: Session = Depends(get_db)):
    feed = db.query(models.FeedURL).filter_by(id=feed_id).first()
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    return feed.entries

@router.post("/{feed_id}/refresh", response_model=schemas.FeedOut)
def refresh_feed(feed_id: int, db: Session = Depends(get_db)):
    feed = db.query(models.FeedURL).filter_by(id=feed_id).first()
    if not feed:
        raise HTTPException(status_code=404, detail="Feed not found")
    return services.fetch_feed(db, feed)
