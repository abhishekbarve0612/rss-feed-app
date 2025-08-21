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
    plain_text: Optional[str]
    html_text: Optional[str]

class ArticleContentOut(BaseModel):
    id: int
    plain_text: Optional[str]
    html_text: Optional[str]
    is_fetched: int
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
