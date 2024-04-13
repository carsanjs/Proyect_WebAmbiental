from fastapi import APIRouter, Depends, HTTPException, Body, Cookie
from fastapi.security import OAuth2PasswordRequestForm
from typing import Any
from services.user_service import UserService
from core.security import create_refresh_token, create_access_token_

from schemas.auth_schema import TokenSchema, TokenPayload
from schemas.user_schema import UserDetail
from models.Persona import Persona
from api.dependencies.user_deps import get_current_user, verify_token
from core.config import settings
from jose.exceptions import JWTError
from datetime import datetime, timedelta
from fastapi.responses import JSONResponse

auth_router = APIRouter()

@auth_router.post("/login", summary="Creando Access Token (Login) ✔", response_model=TokenSchema)
async def login(user: OAuth2PasswordRequestForm = Depends()) -> Any:
    try:
        if not user.username or not user.password or user.password == "" or user.username == "":
            raise HTTPException(
                status_code=400,
                detail="REQUIRED_FIELDS",
            )
        
        usuario = await UserService.authenticate(correo=user.username, passw=user.password)
        
        if not usuario: 
                raise HTTPException(
                status_code=400,
                detail="LOGIN_BAD_CREDENTIALS",
                headers={"WWW-Authenticate": "Bearer"},
                               )

        access_token = create_access_token_(usuario.user_id)
        refresh_token = create_refresh_token(usuario.user_id)

        tiempo_acceso = datetime.now()
        time_Expired = tiempo_acceso + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

        tiempo_acceso_str = f"Tiempo de acceso: {tiempo_acceso}"
        tiempo_expiracion_str = f"Tiempo de expiración: {time_Expired}"

    
        response = JSONResponse(
               content={
            "message": "Login successful",
            "tiempo_acceso": tiempo_acceso_str,
            "tiempo_expiracion": tiempo_expiracion_str,
            "access_token": access_token,
            "refresh_token": refresh_token,
                       }
                                )
        return response

    except Exception :
        raise HTTPException( 
                status_code=400,
                detail="No se encontró ningún usuario con las credenciales proporcionadas",
                headers={"WWW-Authenticate": "Bearer"})
    
@auth_router.post("/test-token", summary="testenado un token ✔", response_model=UserDetail)
async def test_token(user: Persona = Depends(get_current_user)):
   try:
       return user
   except:
       raise HTTPException(
               status_code=400,
               detail="No se encontró ningún usuario con las credenciales proporcionadas",
               headers={"WWW-Authenticate": "Bearer"}) 

@auth_router.post("/refresh", summary="Refresh token ✔", response_model=TokenSchema)
async def refresh_token(refresh_token: str = Body(...)):
    try:
        payload = verify_token(
            refresh_token,
            settings.JWT_REFRESH_SECRET_KEY,
        )
        if not payload:
            raise HTTPException(
                status_code=403,
                detail="Token inválido",
                headers={"WWW-Authenticate": "Bearer"},
            )
        token_data = TokenPayload(**payload)
        user = await UserService.get_user_by_id(token_data.sub)
        if not user:
            raise HTTPException(
                status_code=404,
                detail="No es posible encontrar al usuario",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Crear nuevos tokens de acceso y actualización
        new_access_token = create_access_token_(user.user_id)
        new_refresh_token = create_refresh_token(user.user_id)

        return {"access_token": new_access_token,
                 "refresh_token": new_refresh_token
                 }

    except JWTError as e:
        print(f"Error al decodificar el token: {e}")
        raise HTTPException(
            status_code=403,
            detail="Token inválido",
            headers={"WWW-Authenticate": "Bearer"},
        )
