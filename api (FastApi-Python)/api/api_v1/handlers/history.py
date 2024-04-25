from fastapi import APIRouter, HTTPException, Depends
from services.sensors_service import SensorsService
from schemas.sensors_schema import SensorsDetail, SensorSent, SensorUpdate, Historydata
from models.Persona import Persona
from typing import List
from uuid import UUID
from api.dependencies.user_deps import get_current_user, check_admin_role
from datetime import datetime
history_router = APIRouter()


@history_router.get("/filter/{date}", summary="Fecthhistory of Date", response_model=List[Historydata]
)
async def get_history(date:datetime | None, current_user: Persona = Depends(get_current_user)):
    #,
    try:
        return await SensorsService.list_history(current_user, date)
    except:
        raise HTTPException(status_code=404, detail="Error getting history")


@history_router.delete("/delet/{id_history}", summary="Delete a history")
async def deleteHistory(id_history: UUID):
    try:
        await SensorsService.delete_history(id_history)
        return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"history not found")


@history_router.delete("/historydelete", summary="Delete all history")
async def delete_all_History(current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        await SensorsService.delete_all_history(current_user)
        return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"Documetns not found")
