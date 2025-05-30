import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql+asyncpg://mikrotik:supersecret@db:5432/mikrotikdb"
    redis_url: str = "redis://redis:6379/0"
    encryption_key: str = "PLEASE_SET_A_STRONG_KEY"
    jwt_secret: str = "PLEASE_CHANGE_THIS"
    jwt_algorithm: str = "HS256"
    admin_email: str = "admin@local"
    admin_password: str = "admin"  # Only for first run/init

    class Config:
        env_file = ".env"

settings = Settings()