from fastapi import APIRouter, HTTPException, status, Depends,Query,Path
from schemas.lroom_schema import LroomDetail, LroomInput, LroomUpdate
import pymongo
from models.Salones import LivingRoom
from services.lroom_service import lroomService
from api.dependencies.user_deps import get_current_user, check_admin_role
from models.Persona import Persona
from uuid import UUID
from typing import List, Optional, Union
lroom_router = APIRouter()

"""✔"""
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
        
"""✔"""
@lroom_router.get("/get/", summary="Detail of the Livin Room ✔", response_model=List[LroomDetail])
async def get_list(current_user: Persona = Depends(get_current_user)):
    try:
       return await lroomService.list_lroom(current_user)
    except:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Living room not found",
        ) 

# @lroom_router.get("/name/{name}", summary="get name of the Livin Room ✔", response_model=List[LroomDetail])
# async def get_list(name:str,current_user: Persona = Depends(get_current_user)):
#     try:
#        return await lroomService.detail_lroom_name(name, current_user)
#     except:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="name of Living room not found",
#         ) 

# @lroom_router.get("/number/{number}", summary="get number of the Livin Room ✔", response_model=List[LroomDetail])
# async def get_list(number:int,current_user: Persona = Depends(get_current_user)):
#     print(number)
#     try:
#        return await lroomService.detail_lroom_number(current_user, number)
#     except:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="number of Living room not found",
#         ) 
    
@lroom_router.get("/filter-lroom", summary="filter by name and number", response_model=LivingRoom)
async def get_lroom_details(
    name:Optional[str] = Query(None, min_length=3),
    number:Optional[int] = Query(None, gt=0), 
    current_user: Persona = Depends(get_current_user)
):
    if name is None and number is None:
            raise HTTPException(status_code=400, detail="At least one parameter (name or number) is required")
    try:
        if name is not None:
            detail_lroom = await lroomService.filter_lroom(name, current_user)
            print(detail_lroom)
        else:
            detail_lroom = await lroomService.filter_lroom(number, current_user)
            print(detail_lroom)
        return detail_lroom
    except Exception as e:
        raise HTTPException(status_code=400, detail="Name or number not found")
    
"""✔"""
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
