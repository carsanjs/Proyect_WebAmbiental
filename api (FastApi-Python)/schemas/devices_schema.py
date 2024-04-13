from typing import Dict, Optional, Any
from pydantic import BaseModel, Field, validator
from datetime import datetime
from beanie import Link
from models.Persona import Persona
from models.Sensores import Sensors
from uuid import UUID

"""✔"""
class DeviceInput(BaseModel):
    name_device: str = Field(..., min_length=3, max_length=30, description="Device Name")
    description: str = Field(..., description="Description Device", min_length=5, max_length=127)
    size: str = Field (..., description=" Size Device (format: widthxheight)")

    @validator("size")
    def validate_size_format(cls, value):
        if not value or not isinstance(value, str):
            raise ValueError("Invalid size format")
        parts = value.split("x")
        if len(parts) != 2:
            raise ValueError("Invalid size format")
        try:
            int(parts[0])
            int(parts[1])
        except ValueError:
            raise ValueError("Invalid size format")
        return value


class DeviceUpdate(BaseModel):
    name_device: Optional[str]
    description : Optional[str]
    size:Optional[str]
    sensors:Optional[Dict[str, Sensors]] = {}

"""✔"""
class DeviceDetail(BaseModel):
    id_device:UUID
    name_device: str 
    description : str
    size:str
    is_active: Optional[bool]
    battery: Optional[int] 
    sensors:Optional[Dict[str,Sensors]]
    amount_sensors:Optional[int] 
    room_Assignment:UUID
    created_at: datetime
    creator:Link[Persona]
    updated_at:datetime