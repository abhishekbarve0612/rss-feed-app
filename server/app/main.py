from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.db import Base, engine
from app.feeds.routes import router as feeds_router
from app.jobs.scheduler import start_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler = start_scheduler()
    print("Scheduler started")

    Base.metadata.create_all(bind=engine)

    yield

    scheduler.shutdown()
    print("Scheduler stopped")

app = FastAPI(title="RSS Reader Backend", lifespan=lifespan)

app.include_router(feeds_router, prefix="/feeds")



@app.get("/")
def root():
    return {"msg": "RSS Reader API running"}