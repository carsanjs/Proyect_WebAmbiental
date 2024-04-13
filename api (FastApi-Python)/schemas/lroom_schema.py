from typing import Dict, Optional, Any
from pydantic import BaseModel, Field
from models.Dispositivos import Devices
from uuid import UUID
from datetime import datetime
from beanie import Link
from models.Persona import Persona

"""✔"""
class LroomInput(BaseModel):
    name_lroom: str = Field(..., min_length=5, max_length=50, description="Name Living Room")
    number_lroom: int = Field(...,description="Number Livings Room") 

class LroomUpdate(BaseModel):
    name_lroom: Optional[str]
    number_lroom: Optional[int]

class LroomInfDeviceUpdate(BaseModel):
    inf_device:Optional[Dict[str, Devices]]

"""✔"""
class LroomDetail(BaseModel):
    id_lroom: UUID
    name_lroom: Optional[str]
    number_lroom: Optional[int]
    inf_device:Optional[Dict[str, Devices]]
    is_active:Optional[bool] 
    updated_at: Optional[datetime]
    created_at : datetime
    creator:Link[Persona]
