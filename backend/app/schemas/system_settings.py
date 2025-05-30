from pydantic import BaseModel
from typing import Optional

class DuoSettings(BaseModel):
    apiHost: Optional[str] = ""
    integrationKey: Optional[str] = ""
    secretKey: Optional[str] = ""
    applicationKey: Optional[str] = ""

class TwoFASettings(BaseModel):
    type: str  # "local" or "duo"
    enforce: bool
    duo: Optional[DuoSettings] = None