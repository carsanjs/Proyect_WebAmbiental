# The code snippet is importing necessary modules and classes for the `Settings` class.
from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from decouple import config

class Settings(BaseSettings):
    # The code snippet is defining a class called `Settings` that inherits from `BaseSettings` class.
    # This class is used to store and access various settings and configurations for an application.
    API_V1_STR: str ="/api"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY:str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 #1440 minutos = 24 horas
    REFRESH_TOKEN_EXPIRE_MINUTES: int = 60 * 24  * 7  # 7 dias
    # BACKEND_CORS_ORIGINS:List[AnyHttpUrl] = [
    #     "http://127.0.0.1:3000"
    # ]
    PROYECT_NAME: str = "Vambiental | App"
    ROOT_URL: str = config("ROOT_URL", default="http://localhost:8000")
    
   # The above class defines a configuration with a case sensitivity setting and a MongoDB connection
    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)
    print("config x", MONGO_CONNECTION_STRING )
    
    class Config:
        case_sensitive = True
        
settings = Settings()