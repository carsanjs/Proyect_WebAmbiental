from pydantic import BaseModel,Field, EmailStr
from datetime import datetime
from typing import Any
from beanie import Document, Indexed, before_event, Insert, Replace
from uuid import UUID, uuid4
from typing import Optional
from bson import ObjectId
from datetime import datetime, timedelta


class Persona(Document):
    user_id: UUID = Field(default_factory=uuid4)
    user_name: Indexed(str, unique=True)
    nombre: str
    correo: Indexed(EmailStr, unique=True)
    carrera: str
    rol:str
    is_active : Optional[bool] = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    last_login: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    emailValidated: bool = False
    email_confirmed_at: datetime | None = None
    totpSecret: bool = False
    totpCounter: Optional[str] = None
    accessToken: Optional[str] = None
    refreshToken: Optional[str] = None
    is_superuser:Optional[bool] = False
    is_verified:Optional[bool] = False
    passw: str
        
    def __repr__(self) -> str:
        return f"<Persona {self.correo}>"

    def __str__(self) -> str:
        return self.correo

    def __hash__(self) -> int:
        return hash(self.correo)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Persona):
            return self.correo == other.correo
        return False
    
    @property
    def create(self) -> datetime:
        return self.id.generation_time
    
    @property
    def jwt_subject(self) -> dict[str, Any]:
        """JWT subject fields."""
        return {"username": self.correo}
    
    @classmethod
    async def by_correo(self, correo: str) -> "Persona":
        return await self.find_one(self.correo == correo)
    
    def update_email(self, new_email: str) -> None:
        """Update email logging and replace."""
        # Add any pre-checks here
        self.correo = new_email
    
    @before_event([Replace, Insert])
    def sync_update_at(self):
       self.updated_at = datetime.utcnow()
