from fastapi import APIRouter, HTTPException, status, Depends, Body
from schemas.lroom_schema import LroomDetail, LroomInput, LroomUpdate
import pymongo
from models.Salones import LivingRoom
from services.lroom_service import lroomService
from api.dependencies.user_deps import get_current_user, check_admin_role
from models.Persona import Persona
from uuid import UUID
from datetime import datetime
from typing import List
lroom_router = APIRouter()

@lroom_router.post("/add", summary="Add Living Room ✔", response_model=LivingRoom)
async def add_living_room(data: LroomInput, current_user: Persona = Depends(get_current_user)):
    await check_admin_role(current_user)
    try:
        return await lroomService.create_living_room(data, current_user)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Number of the Living room, it already exits",
        )
        

@lroom_router.get("/get/", summary="Detail of the Livin Room ✔", response_model=List[LroomDetail])
async def get_list(current_user: Persona = Depends(get_current_user)):
    try:
       return await lroomService.list_lroom(current_user)
    except:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Living room not found",
        ) 


@lroom_router.get("/detail/{id_lroom}", summary="detail of the living room by id ✔", response_model=LroomDetail)
async def get_detail(id_lroom:UUID, current_user:Persona = Depends(get_current_user)):
   try:
       return await lroomService.detail(current_user, id_lroom)
   except:
       raise HTTPException(
           status_code=status.HTTP_404_NOT_FOUND,
           detail="Living room not found",
       ) 
       

@lroom_router.put("/update/{id_lroom}", summary="update living room", response_model=LroomDetail)
async def update(id_lroom:UUID, data:LroomUpdate, current_user:Persona =Depends(get_current_user)):
    try:
       return await lroomService.update_all(current_user, id_lroom, data)
    except HTTPException as e:
        raise print("error", e)
   
"""✔"""
@lroom_router.delete("/delete/{id_lroom}", summary="Delete o exclude living room ✔")
async def delete(id_lroom:UUID, current_user:Persona = Depends(get_current_user)):
    try:
        await lroomService.delete_lroom(current_user, id_lroom)
        return HTTPException(status_code=204)
    except HTTPException as e:
        raise print("error", e)
