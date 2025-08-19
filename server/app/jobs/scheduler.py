from apscheduler.schedulers.background import BackgroundScheduler
from app.db import SessionLocal
from app.feeds import models, services

def fetch_all_feeds():
    db = SessionLocal()
    try:
        feeds = db.query(models.FeedURL).all()
        for feed in feeds:
            services.fetch_feed(db, feed)
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(fetch_all_feeds, "interval", hours=24)
    scheduler.start()
    return scheduler
