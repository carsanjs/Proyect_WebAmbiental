from fastapi import HTTPException, Depends
from models.ConWebsoPush import ConnectSocket
from api.dependencies.user_deps import get_current_user,verify_token
from typing import Dict, Optional, List
from models.Persona import Persona
from models.Salones import LivingRoom
from services.lroom_service import lroomService
from core.config import settings
from uuid import UUID
from schemas.devices_schema import DeviceInput, DeviceUpdate
import pymongo
import beanie
from datetime import datetime

class ServiceConnecteSocketio:
    """✔"""
    @staticmethod
    async def CreateCacheSocket(sid: str, room: str, token: str) -> ConnectSocket:

        try:
            user = get_current_user(token)
            new_createCacheSocketio = ConnectSocket(
                websokcetio=sid,
                room_assignment=room,
                user_id=user,
                timestamp=datetime.now(),
            )
            # insertamos device
            await new_createCacheSocketio.create()
            return new_createCacheSocketio
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error: {str(e)}",
            )
        except beanie.exceptions.RevisionIdWasChanged:
            raise HTTPException(
                status_code=500,
                detail="Error when trying to create. Please try again",
            )
        except pymongo.errors.DuplicateKeyError:
            raise HTTPException(
                status_code=400,
                detail="******* erro de clave id duplicated",
            )
