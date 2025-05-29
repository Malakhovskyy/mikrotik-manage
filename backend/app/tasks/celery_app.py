from celery import Celery
from app.core.config import settings

celery = Celery(
    "mikrotik_manager",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"],
)