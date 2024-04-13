import requests
from decouple import config
from pydantic_settings import BaseSettings

BOT_TOKEN: str = config("BOT_TOKEN", cast=str)
BOT_ID_TOKEN: str = config("BOT_ID_TOKEN", cast=str)


class Bot(BaseSettings):
    def enviar_mensaje_telegram(self, mensaje):
        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        params = {"chat_id": BOT_ID_TOKEN, "text": mensaje}
        response = requests.post(url, json=params)
        return response.json()


bot = Bot()
