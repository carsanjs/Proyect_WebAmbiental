from typing import Dict, Optional, Any
from pydantic import BaseModel, Field,validator
from beanie import Link
from uuid import UUID
from datetime import datetime

"""✔"""
class SensorSent(BaseModel):
    name_sensor: str = Field(..., min_length=4, max_length=30, description="Sensor Name")
    description: str = Field(..., description="Description", min_length=5, max_length=200, title="Description Sensor")
    size: str = Field (..., description=" Size Sensor (format: widthxheight)")
    
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

"""✔"""
class CountSensorUpdate(BaseModel):
    amount_sensors: int

"""✔"""
class SensorUpdate(BaseModel):
    name_sensor: Optional[str] 
    description :Optional[str] 
    size:Optional[str]
    updated_at:Optional[datetime]
    
"""✔"""
class SensorsDetail(BaseModel):
    id_sensor:UUID
    name_sensor: Optional[str]
    description :Optional[str]
    device_id:UUID
    is_active:Optional[bool] 
    size: Optional[str] 
    data:Optional[Dict[str, Any]]
    updated_at: Optional[datetime]
    create_at:datetime


"""✔"""
class Historydata(BaseModel):
    id_history:UUID
    sensor_id:UUID
    timestamp: datetime
    data:Optional[Dict[str, Any]]
