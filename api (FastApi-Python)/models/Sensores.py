from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime
from models.Persona import Persona
from uuid import UUID, uuid4
from beanie import Document, Indexed, Link, before_event, Insert, Replace

class Sensors(Document):
    id_sensor: UUID = Field(default_factory = uuid4)  
    name_sensor:Indexed(str, unique=True)
    description:str
    device_id :UUID
    is_active: Optional[bool] = False
    creator:Link[Persona]
    size: str
    data :Optional[Dict[str, Any]] = {}
    create_at :datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    
    def __repr__(self) -> str:
        return f"<Sensors {self.name_sensor}>"

    def __str__(self) -> str:
        return f"{self.name_sensor}"

    def __hash__(self) -> int:
        return hash(self.name_sensor)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, Sensors):
            return ( self.id_sensor) == (other.id_sensor)
        return False

    @property
    def created_at(self) -> datetime:
        return self.id.generation_time
    
    @before_event([Replace, Insert])
    def sync_update_at(self):
        self.updated_at = datetime.utcnow()
