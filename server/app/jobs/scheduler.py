from apscheduler.schedulers.background import BackgroundScheduler
from app.db import SessionLocal
from app.feeds import models, services

def fetch_all_feeds():
    db = SessionLocal()
    try:
        sources = db.query(models.Source).all()
        for source in sources:
            services.fetch_source(db, source)
    finally:
        db.close()

def fetch_pending_article_content():
    db = SessionLocal()
    try:
        # Find articles that don't have content or failed to fetch (retry failed ones)
        articles = db.query(models.Article).outerjoin(models.ArticleContent).filter(
            (models.ArticleContent.id.is_(None)) | 
            (models.ArticleContent.is_fetched == -1)
        ).limit(10).all()  # Process 10 articles at a time
        
        for article in articles:
            services.fetch_article_content(db, article)
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(fetch_all_feeds, "interval", hours=24)
    scheduler.add_job(fetch_pending_article_content, "interval", minutes=30)  # Check every 30 minutes
    scheduler.start()
    return scheduler
