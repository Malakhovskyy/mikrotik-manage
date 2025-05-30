#!/bin/bash
set -e

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

# Wait for PostgreSQL to be ready
until pg_isready -h "$DB_HOST" -p "$DB_PORT"; do
  echo "Waiting for database at $DB_HOST:$DB_PORT..."
  sleep 1
done

echo "Database is up!"

if [[ "${AUTO_MIGRATE:-false}" == "true" ]]; then
  echo "Running Alembic autogenerate..."
  alembic revision --autogenerate -m "Auto-migration $(date +%s)" || true
fi

echo "Running Alembic upgrade..."
alembic upgrade head

echo "Starting API..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000