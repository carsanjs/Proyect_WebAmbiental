from pydantic import Field
from typing import  Dict, Any
from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document


class SensorDataHistory(Document):
    id_history: UUID = Field(default_factory = uuid4)  
    sensor_id: UUID
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    data: Dict[str, Any] = {}

    def __repr__(self) -> str:
        return f"<SensorDataHistory {self.id_history}>"

    def __str__(self) -> str:
        return f"{self.id_history}"

    def __hash__(self) -> int:
        return hash(self.id_history)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, SensorDataHistory):
            return ( self.id_history) == (other.id_history)
        return False

    