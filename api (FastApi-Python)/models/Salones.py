from pydantic import Field

from beanie import Document, Link,Replace, Insert, before_event, Indexed
from typing import Dict
from uuid import UUID, uuid4
from datetime import datetime
from typing import Optional
from .Dispositivos import Devices
from models.Persona import Persona

# cuando esta en basemodel, no deja usar la propiedad de save, tiene que ser con el Document

class LivingRoom(Document):
    id_lroom: UUID = Field(default_factory = uuid4)  
    name_lroom: Indexed(str, unique=True)
    number_lroom:Indexed(int)
    inf_device:Dict[str, Devices]= {}
    amount_devices:Optional[int] = 0
    is_active: Optional[bool] = False
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    creator:Link[Persona]
    
    def __repr__(self) -> str:
        return f"<LivingRoom f{self.name_lroom}>"

    def __str__(self) -> str:
        return self.name_lroom

    def __hash__(self) -> int:
        return hash(self.name_lroom)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, LivingRoom):
            return (self.id_lroom) == (other.id_lroom,)
        return False

    @before_event([Replace, Insert])
    def sync_update_at(self):
        self.updated_at = datetime.utcnow()
