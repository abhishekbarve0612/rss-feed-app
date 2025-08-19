from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db import Base, engine
from app.feeds.routes import router as feeds_router
from app.jobs.scheduler import start_scheduler

app = FastAPI(title="RSS Reader Backend")

Base.metadata.create_all(bind=engine)
app.include_router(feeds_router, prefix="/feeds", tags=["feeds"])



@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = start_scheduler()
    print("Scheduler started")

    Base.metadata.create_all(bind=engine)

    yield

    scheduler.shutdown()
    print("Scheduler stopped")
    
    
@app.get("/")
def root():
    return {"msg": "RSS Reader API running"}