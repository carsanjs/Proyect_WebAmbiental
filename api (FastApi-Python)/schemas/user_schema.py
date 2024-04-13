from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from typing import Optional, Annotated
from datetime import datetime
from beanie import Indexed
"""✔"""
class UserAuth(BaseModel):
    """User register."""
    user_name: str = Field(..., min_length=4, max_length=40, description="Name user")
    nombre:str = Field(..., min_length= 4, max_length=40, description="Name")
    correo: EmailStr = Field(..., description="E-Mail user")
    carrera: str = Field (..., description="Insert race")
    passw: str = Field(..., min_length=5, max_length=20, description="Password user")
    # rol: Optional[str] = Field(None, description="Rol" )
   

class UserUpdate(BaseModel):
    """User update."""
    user_name:Optional[str]
    nombre: Optional[str]
    correo: Optional[EmailStr]
    carrera: Optional[str]
    rol: Optional[str]
    

class UserOut(UserUpdate):
    """User fields returned to the client."""
    correo:Annotated[str, Indexed(EmailStr, unique=True)]
    disabled:bool = False

class LastLogin(UserUpdate):
    """User return last login."""
    last_login:datetime

"""✔"""
class UserDetail(BaseModel):
    """User detail."""
    user_id: UUID
    user_name: str
    nombre: str
    correo: EmailStr
    carrera: str
    rol: str
    updated_at: datetime
    created_at: datetime
    is_superuser:bool 
    is_verified:bool 
    last_login:datetime
    is_active:bool

    

    
    