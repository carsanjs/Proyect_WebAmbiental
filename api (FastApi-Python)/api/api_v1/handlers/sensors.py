from fastapi import APIRouter, HTTPException, Depends
from services.sensors_service import SensorsService
from schemas.sensors_schema import SensorsDetail, SensorSent, SensorUpdate, Historydata
from models.Persona import Persona
from models.Sensores import Sensors
from typing import List
from fastapi import Header
from uuid import UUID
import pymongo
from api.dependencies.user_deps import get_current_user, check_admin_role

sensors_router = APIRouter()


@sensors_router.post(
    "/preadd/{device_id}", summary="Sent data a the database ✔", response_model=Sensors
)
async def sent_sensor_data(
    device_id: UUID,
    sensors: SensorSent,
    current_user: Persona = Depends(get_current_user),
):
    await check_admin_role(current_user)
    try:
        return await SensorsService.sentData_sensors(device_id, sensors, current_user)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=400,
            detail="This sensor,it already exits",
        )


@sensors_router.get(
    "/getitems/", summary="Get data sensor", response_model=List[SensorsDetail]
)
async def get_items(current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        return await SensorsService.list_sensors(current_user)
    except:
        raise HTTPException(status_code=404, detail=f"User not found")


@sensors_router.get(
    "/history/", summary="Get history Sensors 2", response_model=List[Historydata]
)
async def get_history(current_user: Persona = Depends(get_current_user)):
    try:
        return await SensorsService.list_history(current_user)
    except:
        raise HTTPException(status_code=404, detail="Error getting history")


@sensors_router.delete("/history/{id_history}", summary="Delete a history")
async def deleteHistory(id_history: UUID):
    try:
        await SensorsService.delete_history(id_history)
        return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"history not found")


@sensors_router.delete("/historydelete/-all", summary="Delete all history")
async def delete_all_History(current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        await SensorsService.delete_all_history(current_user)
        return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"Documetns not found")








@sensors_router.get("/{id_sensor}", summary="detail of the sensors by id")
async def detail(id_sensor: UUID, current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        return await SensorsService.detail(current_user, id_sensor)
    except:
        raise HTTPException(status_code=404, detail=f"sensor not found")


@sensors_router.put(
    "/{id_sensor}", summary="update sensor", response_model=SensorsDetail
)
async def update(
    id_sensor: UUID,
    data: SensorUpdate,
    current_user: Persona = Depends(get_current_user),
):
    await check_admin_role(current_user)
    try:
        return await SensorsService.update_all(current_user, id_sensor, data)
    except:
        raise HTTPException(status_code=404, detail=f"sensor not found")


@sensors_router.delete("/{id_sensor}", summary="Delete o exclude sensor")
async def delete(id_sensor: UUID, current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        await SensorsService.delete_sensor(current_user, id_sensor)
        return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"sensor not found")
