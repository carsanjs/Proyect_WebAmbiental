
from pydantic import Field
from typing import Optional, Dict
from datetime import datetime
from models.Persona import Persona
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, before_event, Insert, Replace
from .Sensores import Sensors

 
class Devices(Document):
    id_device: UUID = Field(default_factory = uuid4, unique=True)  
    name_device:Indexed(str)
    description : str
    size:str
    is_active : Optional[bool] = False
    room_Assignment:UUID
    creator : Link[Persona]
    battery: Optional[int] = 0
    sensors: Dict[str, Sensors]= {}
    amount_sensors:Optional[int] = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    
    def __repr__(self) -> str:
        return f"<Devices {self.name_device}"

    def __str__(self) -> str:
        return self.name_device

    def __hash__(self) -> int:
        return hash(self.name_device)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Devices):
            return (self.name_device) == (other.name_device)
        return False

    @before_event([Replace, Insert])
    def sync_update_at(self):
        self.updated_at = datetime.utcnow()

