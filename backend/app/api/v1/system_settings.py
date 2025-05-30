from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, insert, update
from app.db import get_db
from app.models.system_settings import SystemSettings
from app.schemas.system_settings import TwoFASettings

router = APIRouter(prefix="/api/v1/settings", tags=["settings"])

@router.get("/2fa", response_model=TwoFASettings)
async def get_2fa_settings(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SystemSettings).where(SystemSettings.key == "2fa"))
    row = result.scalar_one_or_none()
    if row:
        return row.value
    # Default settings if not found
    return TwoFASettings(type="local", enforce=False, duo=None)

@router.put("/2fa", response_model=TwoFASettings)
async def update_2fa_settings(settings: TwoFASettings, db: AsyncSession = Depends(get_db)):
    # Try update, or insert if not exists
    stmt = (
        update(SystemSettings)
        .where(SystemSettings.key == "2fa")
        .values(value=settings.model_dump())
        .execution_options(synchronize_session=False)
    )
    result = await db.execute(stmt)
    if result.rowcount == 0:
        await db.execute(
            insert(SystemSettings).values(key="2fa", value=settings.model_dump())
        )
    await db.commit()
    return settings