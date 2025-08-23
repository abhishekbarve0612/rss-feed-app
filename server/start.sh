#!/bin/bash

# Exit on any error
set -e

echo "Starting RSS Reader Backend..."

# Run database migrations
echo "Running database migrations..."
alembic upgrade head

# Start the application
echo "Starting FastAPI application..."
exec uvicorn app.main:app --host ${API_HOST:-0.0.0.0} --port ${API_PORT:-8000}