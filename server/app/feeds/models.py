from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class FeedURL(Base):
    __tablename__ = "feeds"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=True)
    slug = Column(String, unique=True, index=True, nullable=True)
    last_fetched = Column(DateTime, default=None)

    entries = relationship("FeedEntry", back_populates="feed")

class FeedEntry(Base):
    __tablename__ = "feed_entries"

    id = Column(Integer, primary_key=True, index=True)
    feed_id = Column(Integer, ForeignKey("feeds.id"))
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=True)
    link = Column(String, unique=True, nullable=False)
    published_date = Column(DateTime, default=datetime.utcnow)
    summary = Column(Text, nullable=True)

    feed = relationship("FeedURL", back_populates="entries")
