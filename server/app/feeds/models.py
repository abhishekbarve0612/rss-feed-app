from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db import Base

class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=True)
    slug = Column(String, unique=True, index=True, nullable=True)
    last_fetched = Column(DateTime, default=None)

    articles = relationship("Article", back_populates="source")
    

    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

class Article(Base):
    __tablename__ = "articles"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, ForeignKey("sources.id"))
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=True)
    link = Column(String, unique=True, nullable=False)
    published_date = Column(DateTime, default=datetime.now)
    summary = Column(Text, nullable=True)

    source = relationship("Source", back_populates="articles")
    content = relationship("ArticleContent", back_populates="article", uselist=False)
    
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)

class ArticleContent(Base):
    __tablename__ = "article_content"

    id = Column(Integer, primary_key=True, index=True)
    article_id = Column(Integer, ForeignKey("articles.id"), unique=True)
    plain_text = Column(Text, nullable=True)
    html_text = Column(Text, nullable=True)
    is_fetched = Column(Integer, default=0)  # 0: not fetched, 1: fetched successfully, -1: failed

    article = relationship("Article", back_populates="content")
    
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now)
