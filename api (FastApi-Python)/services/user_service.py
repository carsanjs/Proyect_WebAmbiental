from api.auth.Bases.EmailUtils import send_verification_email
from core.security import get_password, verify_password
from schemas.user_schema import UserAuth, UserUpdate
from fastapi import HTTPException, Depends, Security
from models.Persona import Persona
from datetime import datetime
from pydantic import EmailStr
from typing import Optional
from uuid import UUID
import beanie

class UserService:
    @staticmethod
    async def create_user(user: UserAuth):        
     try:
        user_data = user.model_dump()
        user_data["passw"] = get_password(user.passw)
        usuario = Persona (**user_data,
                           created_at=datetime.now(),
                           rol="user"
                           )
        await usuario.insert()
        return usuario
     except beanie.exceptions.RevisionIdWasChanged:
            raise HTTPException(
                status_code=500,
                detail="Error al intentar crear el usuario. Por favor, inténtelo de nuevo.",
            )
     except HTTPException as exc:
            raise exc

    @staticmethod
    async def get_user_by_correo(correo: EmailStr) -> Optional[Persona]:
        user = await Persona.find_one(Persona.correo == correo)
        return user

    @staticmethod
    async def get_user_by_id(user_id: UUID) -> Persona:
        try:
         user = await Persona.find_one(Persona.user_id == user_id)
         return user
        except HTTPException:
            raise HTTPException(
            status_code=404,
            detail=f"User with ID {user_id} not found",
        )
  
    @staticmethod
    async def list_users() -> list[Persona]: 
        try:
         all_user  = await Persona.find(limit=100).to_list()
         return all_user
        except HTTPException as e:
            return e
        
    @staticmethod
    async def detail(user_id:UUID, user:Persona):
        all_detail = await Persona.find_one(Persona.user_id == user_id)
        return all_detail

    @staticmethod
    async def delete_users(user: Persona, user_id:UUID)-> None:
        duser = await UserService.detail(user_id, user) 
        if not duser :
             raise HTTPException(
                 status_code=404,
                 detail="user no found",
                 headers={
                     "WWW-Authenticate": "Bearer"
                 }
             )
        if user.rol != "admin":
            raise HTTPException(
                status_code=403,
                detail="no tienes permiso de adminitrador"
            )
        try:
         if duser:
             await duser.delete()
             return None
        except HTTPException as exc:
            return exc
        
    @staticmethod
    async def update_(user_id:UUID, user_update:UserUpdate) :
        db_Colletion = {k:v for k, v in user_update.model_dump(exclude_none=True, by_alias=True).items() if v is not None}
        print("db colletion", db_Colletion)

        if len(db_Colletion) >= 1:
            db_Colletion.update(
                {"_id":user_id},
                {"$set": user_update.model_dump(exclude_unset=True)}
                )
            await db_Colletion.save()
            return db_Colletion

    @staticmethod
    async def authenticate(correo: str, passw: str) -> Optional[Persona]:
        user = await UserService.get_user_by_correo(correo=correo) 
        if not user:
            return None
        if not verify_password(passw=passw,hashed_password=user.passw):
            return None
        return user
    
    @staticmethod
    async def username_exists(user_name:str)-> bool:
        verify_database = await Persona.find_one({'user_name':user_name})
        return verify_database is not None
