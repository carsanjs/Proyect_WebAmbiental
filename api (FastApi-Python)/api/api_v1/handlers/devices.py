from fastapi import APIRouter, HTTPException,Depends
from schemas.devices_schema import DeviceDetail, DeviceUpdate,DeviceInput
import pymongo
from uuid import UUID
from models.Dispositivos import Devices
from models.Salones import LivingRoom
from models.Persona import Persona
from services.devices_service import DeviceService
from api.dependencies.user_deps import get_current_user, check_admin_role
from typing import List
device_router = APIRouter()

@device_router.post("/creating/{id_lroom}/", summary="Creating device ✔", response_model=Devices)
async def creating_device(id_lroom:UUID, data: DeviceInput,current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        return await DeviceService.create_device(data, id_lroom ,current_user)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="This device has already been created",
        )
        
@device_router.get("/get", summary="Detail of the device ✔", response_model=List[DeviceDetail])
async def get_me(current_user:Persona = Depends(get_current_user)):
    return await DeviceService.list_device(current_user)

@device_router.get("/detail/{id_device}", summary="detail of the device by id ✔")
async def detail(id_device:UUID, current_user:Persona = Depends(get_current_user)):
    try:
        device = await DeviceService.detail(current_user, id_device)
        if device is not None and current_user.rol == "admin":
            return device
        elif device is None:
            raise HTTPException(
                status_code=404,
                detail=f"Device not found"
            )
        else:
            raise HTTPException(
                status_code=403,  # 403 indica Forbidden (Prohibido)
                detail=f"User does not have admin privileges"
            )
    except  Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
    

@device_router.put("/edit/{id_device}", summary="update device", response_model=DeviceDetail)
async def update(id_device:UUID, data:DeviceUpdate, current_user:Persona =Depends(get_current_user)):
    try:
       return await DeviceService.update_all(current_user, id_device, data)
    except HTTPException as e:
        raise print("error", e)

   
@device_router.delete("/delet/{id_device}", summary="Delete o exclude device ✔")
async def delete(id_device:UUID, current_user:Persona = Depends(get_current_user)):
    await DeviceService.delete_device(current_user, id_device)
    return HTTPException(status_code=204)


