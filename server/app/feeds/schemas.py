from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FeedCreate(BaseModel):
    url: str

class FeedOut(BaseModel):
    id: int
    url: str
    title: Optional[str]
    slug: Optional[str]
    last_fetched: Optional[datetime]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True

class FeedEntryOut(BaseModel):
    id: int
    title: str
    link: str
    slug: Optional[str]
    published_date: datetime
    summary: Optional[str]
    created_at: datetime
    updated_at: datetime
    class Config:
        orm_mode = True
