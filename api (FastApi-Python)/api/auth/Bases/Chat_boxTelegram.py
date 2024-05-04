import requests
from decouple import config
from pydantic_settings import BaseSettings

BOT_TOKEN: str = config("BOT_TOKEN", cast=str)
BOT_ID_TOKEN: str = config("BOT_ID_TOKEN", cast=str)


class Bot(BaseSettings):
    BOT_TOKEN: str = config("BOT_TOKEN", cast=str)
    BOT_ID_TOKEN: str = config("BOT_ID_TOKEN", cast=str)
    
    def enviar_mensaje_telegram(self,token, chat_id, mensaje):
        url = f"https://api.telegram.org/bot{token}/sendMessage"
        print(url,"url telegram:")
        params = {"chat_id": chat_id,"text": mensaje}
        print(params,"params telegram:") 
        response = requests.post(url, json=params)
        print(response,"response telegram:")
        return response.json()   

bot = Bot()
