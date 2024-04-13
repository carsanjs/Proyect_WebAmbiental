from passlib.context import CryptContext
from typing import Union, Any
from datetime import datetime, timedelta
from jose import jwt
from core.config import settings
from fastapi_jwt import JwtAccessBearer

# Security: CryptContext for password hashing
passw_context = CryptContext(
    schemes = ["bcrypt"],
    deprecated = "auto"
)

access_security = JwtAccessBearer(settings.JWT_SECRET_KEY,  # La clave secreta utilizada para firmar y verificar los tokens JWT.
    access_expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES), # Duración del token de acceso.
    refresh_expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_MINUTES), # Duración del token de actualización (refresh token).
)

def get_password(passw:str) -> str:
    return passw_context.hash(passw)

def verify_password(passw:str, hashed_password:str) -> bool:
    return passw_context.verify(passw, hashed_password)

def create_access_token_(subject: Union[str, Any], expires_delta: int = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    inf_jwt = {
        "exp": expires_delta, 
        "sub": str(subject)
        }
    jwt_coded = jwt.encode(
        inf_jwt,
        settings.JWT_SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return jwt_coded

def create_refresh_token(subject: Union[str, Any], expires_delta: timedelta = None) -> str:
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRE_MINUTES)
    inf_jwt = {
       "exp": expires_delta, 
       "sub": str(subject)
    }

    jwt_coded = jwt.encode(
        inf_jwt,
        settings.JWT_REFRESH_SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return jwt_coded
    