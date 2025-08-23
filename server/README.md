# RSS Feed App Backend

A FastAPI-based RSS feed reader backend with automated feed parsing and content extraction.

## Features

- RSS feed parsing and storage
- Automated article content extraction
- Scheduled feed updates
- SQLite database with migrations
- CORS support for frontend integration

## Quick Start

The API will be available at `http://localhost:8000`

### Manual Setup

1. Install Python 3.13+ and Poetry
2. Install dependencies:
   ```bash
   poetry install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run database migrations:
   ```bash
   poetry run alembic upgrade head
   ```
5. Start the development server:
   ```bash
   poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

## Environment Variables

- `DATABASE_URL`: Database connection string (default: sqlite:///./rss_reader.db)
- `API_HOST`: Host to bind the server (default: 0.0.0.0)
- `API_PORT`: Port to run the server (default: 8000)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins
- `SCHEDULER_INTERVAL_MINUTES`: Feed update interval in minutes (default: 30)

## API Endpoints

- `GET /`: Health check
- `GET /feeds/`: List all feeds
- `POST /feeds/`: Add a new feed
- `GET /feeds/{feed_id}/articles`: Get articles for a feed

## Deployment Options

### Production

```bash
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Database Migrations

To create a new migration:

```bash
poetry run alembic revision --autogenerate -m "Description"
```

To apply migrations:

```bash
poetry run alembic upgrade head
```
