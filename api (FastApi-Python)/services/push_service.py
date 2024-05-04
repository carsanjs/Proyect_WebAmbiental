from schemas.variables_schema import (
    TEMPERATURA_C,
    LLUVIA,
    CO,
    CO2,
    HUMEDAD,
    LUMINOSIDAD,
    CALIDAD_AIRE,
    UV,
)
from api.auth.Bases.Chat_boxTelegram import bot
from decimal import Decimal
from typing import Dict
import json
from datetime import datetime


class PushNotification:

    @staticmethod
    async def push_umbral_notification(name:str, data: Dict):

        if data.get("Temperatura") is not None:
            try:
                temperatura = Decimal(data["Temperatura"])
                print("temperatura", temperatura)
                for umbral, value in TEMPERATURA_C.items():
                    if umbral[0] <= temperatura <= umbral[1]:
                        ta = f"{temperatura}°C"
                        menssage_ = {
                                "Aula": name,
                                "Indice": value["Indice"],
                                "Temperatura actual":ta,
                                "Mensaje": value["Mensaje"],                        
                            }        
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except ValueError:
                print("Error: La temperatura no es un número entero")
        if data.get("Radiación UV") is not None:
            try:
                uv_index = Decimal(data["Radiación UV"])
                for umbral, categoria in UV.items():
                    if umbral[0] <= uv_index <= umbral[1]:
                        m = f" {uv_index} µW/cm²"
                        menssage_ ={
                                "Zona": name,
                                "Indice": categoria["Indice"],
                                "Radiacion UV":m,
                                "Mensaje": categoria["Mensaje"],
                            }                     
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: La Radiacion UV no es un número entero")

        if data.get("Humedad") is not None:
            try:
                humedad = Decimal(data["Humedad"])
                for umbral, info in HUMEDAD.items():
                    if humedad >= umbral:
                        print(
                            {
                                 "Zona": name,
                                "Indice": info["Indice"],
                                "Humedad":humedad,
                                "Mensaje": info["Mensaje"],
                            }
                        )
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: La humedad no es un número entero")

        if data.get("CO2") is not None:
            try:
                co2 = int(data["CO2"])
                for umbral, info in CO2.items():
                    if umbral[0] <= co2 <= umbral[1]:
                        m = f"{co2} (ppm)"
                        menssage_ ={
                                 "Zona": name,
                                "Indice": info["Indice"],
                                "CO2":m,
                                "Mensaje": info["Mensaje"],
                            }                       
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: el CO2 no es un número entero")

        if data.get("CO") is not None:
            try:
                co = int(data["CO"])
                for umbral, info in CO.items():
                    if umbral[0] <= co <= umbral[1]:
                        m = f"{co} (ppm)"
                        menssage_={
                                "Aula": name,
                                "Indice": info["Indice"],
                                "CO":m,
                                "Mensaje": info["Mensaje"],
                            }
                        
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: el CO no es un número entero")

        if data.get("Precipitación") is not None:
            try:
                lluvia = int(data["lluvia"])
                for umbral, info in LLUVIA.items():
                    if lluvia >= umbral:
                        print(
                            {
                                "variable": "lluvia",
                                "valor": lluvia,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                            }
                        )
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: la lluvia no es un número entero")
        
        if data.get("Calidad del aire") is not None:
            try:
                lluvia = int(data["lluvia"])
                for umbral, info in LLUVIA.items():
                    if lluvia >= umbral:
                        print(
                            {
                                "variable": "lluvia",
                                "valor": lluvia,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                            }
                        )
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: la lluvia no es un número entero")

        if data.get("Luminosidad") is not None:
            try:
                ldr = int(data["Luminosidad"])
                for umbral, info in LUMINOSIDAD.items():
                    if umbral[0] <= ldr <= umbral[1]:
                        m = f"{ldr} cd"
                        menssage_ ={
                                "Aula": name,
                                "Indice": info["Indice"],
                                "Luminocidad":m,
                                "Mensaje": info["Mensaje"],
                            }
                        mensaje_str = "\n".join([f"{key}: {val}" for key, val in menssage_.items()])
                        bot.enviar_mensaje_telegram(
                            bot.BOT_TOKEN, bot.BOT_ID_TOKEN, mensaje_str
                        )
            except:
                print("Error: el LDR no es un número entero")
        return data