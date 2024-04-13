from fastapi.security import OAuth2PasswordBearer
from core.config import settings
from fastapi import Depends, HTTPException
from models.Persona import Persona
from jose import jwt
from schemas.auth_schema import TokenPayload
from datetime import datetime, timezone
from pydantic import ValidationError
from services.user_service import UserService
from typing import Union,Dict


oauth_reusavel = OAuth2PasswordBearer(
    tokenUrl = f"{settings.API_V1_STR}/auth/login",
    scheme_name = "JWT"
)

async def get_current_user(token:str = Depends(oauth_reusavel)) -> Persona:
    try:
        payload = jwt.decode(token,settings.JWT_SECRET_KEY,settings.ALGORITHM)
        token_data = TokenPayload(**payload)
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code =401,
                detail= 'Token ha sido expirado',
                headers={'WWW-Authenticate': 'Bearer',
                         "Content-Type":"application/json"}
            )
    except(jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code = 403,
            detail = 'Error, validacion del token',
            headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
        )
    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code = 404,
            detail = "no es posible encontrar el usuario",
            headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
        )
    return user
    
async def get_current_active_superuser(current_user: Persona = Depends(get_current_user)):
    if current_user.is_superuser:
        raise HTTPException(status_code=400, detail="The user doesn't have enough privileges")
    return current_user


def verify_token(token: str, secret_key: str) -> Union[dict, None]:
    try:
        payload = jwt.decode(token, secret_key, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.JWTError :
        print("Token expirado")
        return None
    except jwt.JWTError :
        print("Token inválido")
        return None

async def get_current_user_role(token: str = Depends(verify_token)):
    payload = token
    user_rol = payload.get("rol")
    if user_rol is None:
        raise HTTPException(
            status_code=403,
            detail="Credenciales inválidas",
        )
    return user_rol

async def check_admin_role(current_user_role: Persona = Depends(get_current_user_role)) -> Persona:
    if current_user_role.rol != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only admin users can access history data.",
        )

async def get_current_userid(token:str = Depends(oauth_reusavel)) -> Persona:
    try:
        payload = jwt.decode(token,settings.JWT_SECRET_KEY,settings.ALGORITHM)
        print("payload: ", payload)
        token_data = TokenPayload(**payload)
        print("token_data: ", token_data)
        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
            status_code =401,
            detail= 'Token ha sido expirado',
            headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
            )
        user = await UserService.get_user_by_id(token_data.sub)
        print("user------->: ", user)
        if not user:
            raise HTTPException(
            status_code = 404,
            detail = "no es posible encontrar el usuario",
            headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
        )
        return user
    except (jwt.JWTError, ValidationError):
        raise HTTPException(status_code=403,detail='Error, validacion del token',headers={'WWW-Authenticate': 'Bearer', "Content-Type": "application/json"})
# async def get_token_active(token: str = Depends(verify_token)) -> bool:
#     try:
#         payload = jwt.decode(token,settings.JWT_SECRET_KEY,settings.ALGORITHM)
#         token_data = TokenPayload(**payload)
#         if datetime.fromtimestamp(token_data.exp) < datetime.now():
#             raise HTTPException(
#                 status_code =401,
#                 detail= 'Token ha sido expirado',
#                 headers={'WWW-Authenticate': 'Bearer',
#                          "Content-Type":"application/json"}
#             )
#     except(jwt.JWTError, ValidationError):
#         raise HTTPException(
#             status_code = 403,
#             detail = 'Error, validacion del token',
#             headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
#         )
#     user = await UserService.get_user_by_id(token_data.sub)
#     if not user:
#         raise HTTPException(
#             status_code = 404,
#             detail = "no es posible encontrar el usuario",
#             headers={'WWW-Authenticate': 'Bearer',"Content-Type":"application/json"}
#         )
#     return user
