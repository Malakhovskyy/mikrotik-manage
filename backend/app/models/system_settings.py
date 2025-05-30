from sqlalchemy import Column, String, JSON
from app.db import Base

class SystemSettings(Base):
    __tablename__ = "system_settings"

    key = Column(String(50), primary_key=True)
    value = Column(JSON, nullable=False)