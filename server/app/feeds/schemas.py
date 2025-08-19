from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class FeedCreate(BaseModel):
    url: str

class FeedOut(BaseModel):
    id: int
    url: str
    title: Optional[str]
    last_fetched: Optional[datetime]

    class Config:
        orm_mode = True

class FeedEntryOut(BaseModel):
    id: int
    title: str
    link: str
    published_date: datetime
    summary: Optional[str]

    class Config:
        orm_mode = True
