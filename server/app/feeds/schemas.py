from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SourceCreate(BaseModel):
    url: str

class SourceOut(BaseModel):
    id: int
    url: str
    title: Optional[str]
    slug: Optional[str]
    last_fetched: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class ArticleContentCreate(BaseModel):
    content: Optional[str]
    content_type: str = "html"

class ArticleContentOut(BaseModel):
    id: int
    content: Optional[str]
    content_type: str
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class ArticleOut(BaseModel):
    id: int
    title: str
    link: str
    slug: Optional[str]
    published_date: datetime
    summary: Optional[str]
    content: Optional[ArticleContentOut]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True
