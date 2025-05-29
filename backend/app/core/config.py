import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://mikrotik:supersecret@db:5432/mikrotikdb")
    redis_url: str = os.getenv("REDIS_URL", "redis://redis:6379/0")
    encryption_key: str = os.getenv("ENCRYPTION_KEY", "PLEASE_SET_A_STRONG_KEY")
    jwt_secret: str = os.getenv("JWT_SECRET", "PLEASE_CHANGE_THIS")
    jwt_algorithm: str = "HS256"
    admin_email: str = os.getenv("ADMIN_EMAIL", "admin@local")
    admin_password: str = os.getenv("ADMIN_PASSWORD", "admin")  # Only for first run/init

settings = Settings()