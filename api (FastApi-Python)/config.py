from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Api"

    class Config:
        env_file = ".env"
