from fastapi import HTTPException, Depends
from models.Dispositivos import Devices
from api.dependencies.user_deps import get_current_user
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


class DeviceService:

    @staticmethod
    async def updateCountDevice(user: Persona) -> None:
        try:
            lrooms = await lroomService.list_lroom(user)
            for lroom in lrooms:
                devices = await Devices.find(
                    Devices.id_device == lroom.id_lroom
                ).to_list()
                device_count = len(devices)
                lroom.amount_devices = device_count
                await lroom.save()
        except Exception as e:
            raise (f"Error al actualizar el recuento de los dispositivos: {e}")

    """✔"""

    @staticmethod
    async def create_device(
        devices: DeviceInput,
        id_room: UUID,
        current_user: Persona = Depends(get_current_user)
    ) -> Devices:

        namedevice = devices.name_device
        search_lroom = await lroomService.detail(current_user, id_room)
        if search_lroom is None:
            raise HTTPException(
                status_code=404,
                detail="The device ID is not associated with any registered device",
            )
        new_index_key = f"Device_{namedevice}"
        try:
            new_devices = Devices(
                **devices.model_dump(),
                creator=current_user,
                is_active=True,
                created_at=datetime.now(),
                room_Assignment=id_room,
            )
            # insertamos device
            await new_devices.insert()
            # parse_obj use model validate   // pasar de un diccionario a objeto
            dict_obj = Devices.model_validate(new_devices)
            search_lroom.inf_device[new_index_key] = dict_obj
            await search_lroom.update({"$set": {"inf_device": search_lroom.inf_device}})
            await search_lroom.save()
            await DeviceService.updateCountDevice(current_user)
            return new_devices
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error the creating a device: {str(e)}",
            )
        except beanie.exceptions.RevisionIdWasChanged:
            raise HTTPException(
                status_code=500,
                detail="Error when trying to create a device. Please try again",
            )
        except pymongo.errors.DuplicateKeyError:
            raise HTTPException(
                status_code=400,
                detail="nombre de Salon ya está en uso. Por favor, elija otro.",
            )

    """✔"""

    @staticmethod
    async def list_device(user: Persona) -> List[Devices]:
        all_device = await Devices.find(
            Devices.creator.id == user.id, limit=50
        ).to_list()
        return all_device

    """✔"""

    @staticmethod
    async def detail(user: Persona, id_device: UUID):
        device_detail = await Devices.find_one(
            Devices.id_device == id_device, Devices.creator.id == user.id
        )
        return device_detail

    @staticmethod
    async def update_all(user: Persona, id_device: UUID, data: DeviceUpdate):
        device = await DeviceService.detail(user, id_device)
        try:
            await device.update({"$set": data.model_dump(exclude_unset=True)})
            await device.save()
            return device
        except HTTPException as exc:
            return print("error", str(exc))

    """✔"""

    @staticmethod
    async def delete_device(user: Persona, id_device: UUID) -> None:
        device = await DeviceService.detail(user, id_device)
        try:
            if device:
                await device.delete()
                return None
        except HTTPException as exc:
            return exc

    @staticmethod
    async def get_device_by_name(name_device: str) -> Optional[Devices]:
        devices = await Devices.find_one(Devices.name_device == name_device)
        return devices

    """✔"""

    @staticmethod
    async def get_device_by_id(id: UUID) -> Optional[Devices]:
        devices = await Devices.find_one(Devices.id_device == id)
        return devices

