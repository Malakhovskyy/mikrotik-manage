from cryptography.fernet import Fernet
from app.core.config import settings

class EncryptionManager:
    def __init__(self, key: str):
        self.fernet = Fernet(key.encode() if isinstance(key, str) else key)

    def encrypt(self, data: str) -> str:
        return self.fernet.encrypt(data.encode()).decode()

    def decrypt(self, token: str) -> str:
        return self.fernet.decrypt(token.encode()).decode()

encryption_manager = EncryptionManager(settings.encryption_key)