import os
from dotenv import load_dotenv
from fastapi import FastAPI

load_dotenv()
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db import Base, engine
from app.feeds.routes import router as feeds_router
from app.jobs.scheduler import start_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # scheduler = start_scheduler()
    # print("Scheduler started")

    Base.metadata.create_all(bind=engine)

    yield

    # scheduler.shutdown()
    # print("Scheduler stopped")

app = FastAPI(title="RSS Reader Backend", lifespan=lifespan)

# CORS Configuration
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(feeds_router, prefix="/feeds")



@app.get("/")
def root():
    return {"msg": "RSS Reader API running"}