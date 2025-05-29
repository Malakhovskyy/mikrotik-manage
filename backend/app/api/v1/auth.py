from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_db
from app.models.user import User
from app.core.security import verify_password, create_access_token
import pyotp

router = APIRouter()

@router.post("/login")
async def login(email: str, password: str, otp_code: str = None, db: AsyncSession = Depends(get_db)):
    result = await db.execute(User.__table__.select().where(User.email == email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    if user.otp_secret:
        if not otp_code:
            raise HTTPException(status_code=401, detail="2FA code required")
        totp = pyotp.TOTP(user.otp_secret)
        if not totp.verify(otp_code):
            raise HTTPException(status_code=401, detail="Invalid 2FA code")
    access_token = create_access_token({"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}