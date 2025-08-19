from fastapi import FastAPI
from app.db import Base, engine
from app.feeds.routes import router as feeds_router

app = FastAPI(title="RSS Reader Backend")

Base.metadata.create_all(bind=engine)
app.include_router(feeds_router, prefix="/feeds", tags=["feeds"])

@app.get("/")
def root():
    return {"msg": "RSS Reader API running"}