from fastapi import HTTPException, status, Depends
from models.Salones import LivingRoom
from api.dependencies.user_deps import get_current_user
from typing import Dict, Optional, List
from uuid import UUID
from schemas.lroom_schema import LroomInput,LroomUpdate, LroomInfDeviceUpdate
import pymongo
from models.Persona import Persona
import beanie
from datetime import datetime

class lroomService:
    
    """✔"""
    @staticmethod
    async def create_living_room(lroom: LroomInput, current_user: Persona = Depends(get_current_user)) -> LivingRoom:
        # Verifica el rol del usuario antes de permitir la creación
        if current_user.rol != "admin":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="No tienes permisos para realizar esta acción",
            )
        try:
            lroomadd = LivingRoom(
                **lroom.model_dump(), 
                creator= current_user,
                is_active=True,
                created_at=datetime.now()
                )
            await lroomadd.insert()
            return lroomadd
        except Exception as e:
            print(f"Error al guardar el salon: {e}")
            
        except beanie.exceptions.RevisionIdWasChanged:
            raise HTTPException(
            status_code=500,
            detail="Error al intentar crear un salon. Por favor, inténtelo de nuevo.",
        )
        
        except pymongo.errors.DuplicateKeyError:
            raise HTTPException(
            status_code=400,
            detail="El nombre de Salon ya está en uso. Por favor, elija otro.",
        )
        
    """✔"""
    @staticmethod
    async def list_lroom(user:Persona) -> List[LivingRoom]:
        all_lroom = await LivingRoom.find(LivingRoom.creator.id == user.id, limit=50).to_list()
        return all_lroom
    
    """✔"""
    @staticmethod
    async def detail(user:Persona,id_lroom:UUID):
      all_detail = await LivingRoom.find_one(LivingRoom.id_lroom == id_lroom, LivingRoom.creator.id == user.id)
      if all_detail is None: raise HTTPException(status_code=404,detail=f"Living Room with ID {id_lroom} not found for user {user.user_id}")
      print("all detail detail", all_detail.model_dump())
      return all_detail
    
    @staticmethod
    async def update_inf_device(user:Persona, dv_key:str, data:LroomInfDeviceUpdate):
        try:

            instaLroom = LivingRoom(inf_device=["inf_device"])
            type_ = instaLroom.inf_device[dv_key] = data.inf_device
            print("type", type(type_))
            return await instaLroom.model_dump()


            # inf_data = instaLroom.inf_device["Device_"] = data.model_dump()
            # return inf_data
            # await detail.update({"$set":{"inf_device": inf_data}})
            # return detail.save()
        except HTTPException as exc:
            print("Exception:", exc)

    @staticmethod
    async def update_all(user:Persona, id_lroom:UUID, data:LroomUpdate):
       try:
            
            lroom = await lroomService.detail(user,id_lroom)
            current_data = lroom.model_dump()
            print("datos actuales ante de update", current_data)

            update_data = data.model_dump(exclude_unset=True, by_alias=True)
            print("datos que se actualizaram", update_data)
            
            if current_data == update_data:
                raise HTTPException(status_code=status.HTTP_304_NOT_MODIFIED, detail="Los datos son iguales, no se realizará la actualización.")
            else:
               await lroom.update({
                         "$set": update_data
                                  })
               await lroom.save()
            return lroom
       except Exception as e:
            raise HTTPException(
            status_code=500,
            detail=f"Error durante la actualización: {str(e)}"
                                 )
    
    """✔"""
    @staticmethod
    async def delete_lroom(user : Persona, id_lroom:UUID)-> None:
        lroom = await lroomService.detail(user, id_lroom)
        if user.rol != "admin":
            raise HTTPException(status_code=403,detail="No tienes permisos para realizar esta acción")
        try:
         if lroom:
             await lroom.delete()
             return None
        except HTTPException as exc:
            return exc

    @staticmethod
    async def get_lroom_by_name(name_lroom: str) -> Optional[LivingRoom]:
        lroom = await LivingRoom.find_one(LivingRoom.name_lroom == name_lroom)
        return lroom

    @staticmethod
    async def get_lroom_by_id(id: UUID) -> Optional[LivingRoom]:
        lroom = await LivingRoom.find_one(LivingRoom.id_lroom == id)
        return lroom

    @staticmethod
    async def remove_device_from_lroom(current_user: Persona, id_room: UUID, device_id: UUID):
        search_lroom = await lroomService.detail(current_user, id_room)
        obtener_inf_device = search_lroom.inf_device.get('inf_device', {})

        for key, value in obtener_inf_device.items():
            if value.id == device_id:
                del search_lroom.inf_device[key]
                await search_lroom.update({
                    '$set': {
                        'inf_device': search_lroom.inf_device
                    }
                })
                break



    
