from pydantic import Field
from typing import  Dict, Any
from datetime import datetime
from uuid import UUID, uuid4
from beanie import Document,Link
from models.Persona import Persona

class ConnectSocket(Document):
    id_Websocket: UUID = Field(default_factory = uuid4)  
    user_id: Link[Persona]
    websokcetio:str
    room_assignment:str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    notification: Dict[str, Any] = {}

    
    def __repr__(self) -> str:
        return f"<ConnectSocket {self.id_Websocket}>"

    def __str__(self) -> str:
        return f"{self.id_Websocket}"

    def __hash__(self) -> int:
        return hash(self.id_Websocket)

    def __eq__(self, other: object) -> bool:
        if isinstance(other, ConnectSocket):
            return ( self.id_Websocket) == (other.id_Websocket)
        return False
