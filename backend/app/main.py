from fastapi import FastAPI
from app.api.v1 import auth
from app.core.config import settings
from app.models.user import User, Base
from app.core.security import get_password_hash
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
import asyncio

app = FastAPI(title="Mikrotik Manager")

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])

# DB setup (duplicate from app/db.py just for initial admin create)
engine = create_async_engine(settings.database_url, echo=True)
AsyncSessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

@app.on_event("startup")
async def create_admin():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # Ensure table exists

    async with AsyncSessionLocal() as session:
        result = await session.execute(
            User.__table__.select().where(User.email == settings.admin_email)
        )
        user = result.scalar_one_or_none()
        if not user:
            # Create the admin user
            admin = User(
                email=settings.admin_email,
                hashed_password=get_password_hash(settings.admin_password),
                is_active=True,
                is_admin=True,
            )
            session.add(admin)
            await session.commit()
            print(f"[+] Admin user created: {settings.admin_email}")
        else:
            print("[+] Admin user already exists.")