
from schemas.variables_schema import TEMPERATURA_C, LLUVIA, CO, CO2, HUMEDAD, LDR, UV
from services.sensors_service import SensorsService
from api.auth.Bases.Chat_boxTelegram import bot
from decimal import Decimal
from typing import Dict
import json
from datetime import datetime
class PushNotification:

    @staticmethod
    async def push_umbral_notification(data: Dict):

        if data.get("temperatura (°C)") is not None:
            try:
                temperatura = Decimal(data["temperatura (°C)"])
                print("temperatura", temperatura)
                for umbral, mensaje in TEMPERATURA_C.items():
                    if umbral[0] <= temperatura <= umbral[1]:
                        menssage_ = f"{mensaje} Temperatura actual: {temperatura}°C"
                        print(menssage_)
                        bot.enviar_mensaje_telegram(menssage_)
                        # await sm.emit('notification', menssage_)
            except ValueError:
                print("Error: La temperatura no es un número entero")
        if data.get("UV") is not None:
            try:
                uv_index = int(data["UV"])
                for umbral, categoria in UV.items():
                    if uv_index <= umbral:
                        print(
                            {
                                "uv_index": uv_index,
                                "categoria": categoria["categoria"],
                                "mensaje": categoria["mensaje"],
                                "sensor_id": data["sensor_id"],
                            }
                        )
            except:
                print("Error: La Radiacion UV no es un número entero")

        if data.get("humedad") is not None:
            try:
                humedad = int(data["humedad"])
                for umbral, info in HUMEDAD.items():
                    if humedad >= umbral:
                        print(
                            {
                                "variable": "humedad",
                                "valor": humedad,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                                "sensor_id": data["sensor_id"],
                            }
                        )
            except:
                print("Error: La humedad no es un número entero")

        if data.get("CO2 (ppm)") is not None:
            try:
                co2 = int(data["CO2 (ppm)"])
                for umbral, info in CO2.items():
                    if co2 >= umbral:
                        print(
                            {
                                "variable": "CO2",
                                "valor": co2,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                            }
                        )
            except:
                print("Error: el CO2 no es un número entero")

        if data.get("CO (ppm)") is not None:
            try:
                co = int(data["CO (ppm)"])
                for umbral, info in CO.items():
                    if co >= umbral:
                        print(
                            {
                                "variable": "CO",
                                "valor": co,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                            }
                        )
            except:
                print("Error: el CO no es un número entero")

        if data.get("lluvia") is not None:
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
            except:
                print("Error: la lluvia no es un número entero")

        if data.get("ldr") is not None:
            try:
                ldr = int(data["ldr"])
                for umbral, info in LDR.items():
                    if ldr >= umbral:
                        print(
                            {
                                "variable": "ldr",
                                "valor": ldr,
                                "categoria": info["categoria"],
                                "mensaje": info["mensaje"],
                            }
                        )
            except:
                print("Error: el LDR no es un número entero")
        return data

    @staticmethod
    async def umbral_NotificationWebsocket():
        data_ = await SensorsService.list_historyexcept()
        data_dicts = []
        for obj in data_:
            data_dict = {
                "id_history": str(obj.id_history),
                "sensor_id": str(obj.sensor_id),
                "timestamp": obj.timestamp.isoformat(),
                "data": obj.data,
            }
            data_dicts.append(data_dict)
        json_data = json.dumps(data_dicts)
        loaded_data = json.loads(json_data)
        print("loaded data", loaded_data)
        for item in loaded_data:
            temperature_data = item["data"].get("temperatura (°C)")
            timestamp = item["timestamp"]
            # temperature_data = item["data"].get("temperatura (°C)")
            if temperature_data is not None:
                try:
                    temperatura = Decimal(temperature_data)
                    print("temperatura:", temperatura)
                    for umbral, mensaje in TEMPERATURA_C.items():
                        if umbral[0] <= temperatura <= umbral[1]:
                            message = f"{mensaje} Temperatura actual:{temperatura}°C"
                            timestamp = timestamp 
                            break
                except ValueError:
                    print("Error: La temperatura no es un número decimal")
        # datajson = json.dumps(data_)
        # print("data json: " , datajson)
        # for item in datajson:
        #     data = item["data"].get("temperatura (C):")
        #     if data is not None:
        #         try:
        #             temperatura =Decimal(data["temperatura (°C)"])
        #             print("temperatura", temperatura)
        #             for umbral, mensaje in TEMPERATURA_C.items():
        #                 if temperatura < umbral:
        #                     menssage_ = f"{mensaje} Temperatura actual: {temperatura}°C en el sensor"
        #                     print(menssage_)
        #                 # await sm.emit('notification', menssage_)
        #         except ValueError:
        #             print("Error: La temperatura no es un número entero")
        # if data.get("temperatura (°C)") is not None:
        #     try:
        #         temperatura =Decimal(data["temperatura (°C)"])
        #         print("temperatura", temperatura)
        #         for umbral, mensaje in TEMPERATURA_C.items():
        #             if temperatura < umbral:
        #                 menssage_ = f"{mensaje} Temperatura actual: {temperatura}°C en el sensor"
        #                 print(menssage_)
        #                 # await sm.emit('notification', menssage_)
        #     except ValueError:
        #         print("Error: La temperatura no es un número entero")
        # if data.get("UV") is not None:
        #     try:
        #         uv_index = int(data["UV"])
        #         for umbral, categoria in UV.items():
        #             if uv_index <= umbral:
        #                 print(
        #                     {
        #                         "uv_index": uv_index,
        #                         "categoria": categoria["categoria"],
        #                         "mensaje": categoria["mensaje"],
        #                         "sensor_id": data["sensor_id"],
        #                     }
        #                 )
        #     except:
        #         print("Error: La Radiacion UV no es un número entero")

        # if data.get("humedad") is not None:
        #     try:
        #         humedad = int(data["humedad"])
        #         for umbral, info in HUMEDAD.items():
        #             if humedad >= umbral:
        #                 print(
        #                     {
        #                         "variable": "humedad",
        #                         "valor": humedad,
        #                         "categoria": info["categoria"],
        #                         "mensaje": info["mensaje"],
        #                         "sensor_id": data["sensor_id"],
        #                     }
        #                 )
        #     except:
        #         print("Error: La humedad no es un número entero")

        # if data.get("CO2 (ppm)") is not None:
        #     try:
        #         co2 = int(data["CO2 (ppm)"])
        #         for umbral, info in CO2.items():
        #             if co2 >= umbral:
        #                 print(
        #                     {
        #                         "variable": "CO2",
        #                         "valor": co2,
        #                         "categoria": info["categoria"],
        #                         "mensaje": info["mensaje"],
        #                     }
        #                 )
        #     except:
        #         print("Error: el CO2 no es un número entero")

        # if data.get("CO (ppm)") is not None:
        #     try:
        #         co = int(data["CO (ppm)"])
        #         for umbral, info in CO.items():
        #             if co >= umbral:
        #                 print(
        #                     {
        #                         "variable": "CO",
        #                         "valor": co,
        #                         "categoria": info["categoria"],
        #                         "mensaje": info["mensaje"],
        #                     }
        #                 )
        #     except:
        #         print("Error: el CO no es un número entero")

        # if data.get("lluvia") is not None:
        #     try:
        #         lluvia = int(data["lluvia"])
        #         for umbral, info in LLUVIA.items():
        #             if lluvia >= umbral:
        #                 print(
        #                     {
        #                         "variable": "lluvia",
        #                         "valor": lluvia,
        #                         "categoria": info["categoria"],
        #                         "mensaje": info["mensaje"],
        #                     }
        #                 )
        #     except:
        #         print("Error: la lluvia no es un número entero")

        # if data.get("ldr") is not None:
        #     try:
        #         ldr = int(data["ldr"])
        #         for umbral, info in LDR.items():
        #             if ldr >= umbral:
        #                 print(
        #                     {
        #                         "variable": "ldr",
        #                         "valor": ldr,
        #                         "categoria": info["categoria"],
        #                         "mensaje": info["mensaje"],
        #                     }
        #                 )
        #     except:
        #         print("Error: el LDR no es un número entero")

        return message, timestamp

# class PushNotification:
#     async def push_umbral_notification(data: Dict):

#         if data.get("temperatura (°C)") is not None:
#             try:
#                 temperatura = int(data["temperatura (°C)"])
#                 for umbral, mensaje in TEMPERATURA_C.items():
#                     if temperatura > umbral:
#                         menssage_ = f"{mensaje} Temperatura actual: {temperatura}°C en el sensor"
#                         print(menssage_)
#                         bot.enviar_mensaje_telegram(bot.BOT_TOKEN, bot.BOT_ID_TOKEN,menssage_)
#                         await sm.emit('notification', menssage_)

#             except ValueError:
#                 print("Error: La temperatura no es un número entero")

#         if data.get("UV") is not None:
#             try:
#                 uv_index = int(data["UV"])
#                 for umbral, categoria in UV.items():
#                     if uv_index <= umbral:
#                         print(
#                             {
#                                 "uv_index": uv_index,
#                                 "categoria": categoria["categoria"],
#                                 "mensaje": categoria["mensaje"],
#                                 "sensor_id": data["sensor_id"],
#                             }
#                         )
#             except:
#                 print("Error: La Radiacion UV no es un número entero")

#         if data.get("humedad") is not None:
#             try:
#                 humedad = int(data["humedad"])
#                 for umbral, info in HUMEDAD.items():
#                     if humedad >= umbral:
#                         print(
#                             {
#                                 "variable": "humedad",
#                                 "valor": humedad,
#                                 "categoria": info["categoria"],
#                                 "mensaje": info["mensaje"],
#                                 "sensor_id": data["sensor_id"],
#                             }
#                         )
#             except:
#                 print("Error: La humedad no es un número entero")

#         if data.get("CO2 (ppm)") is not None:
#             try:
#                 co2 = int(data["CO2 (ppm)"])
#                 for umbral, info in CO2.items():
#                     if co2 >= umbral:
#                         print(
#                             {
#                                 "variable": "CO2",
#                                 "valor": co2,
#                                 "categoria": info["categoria"],
#                                 "mensaje": info["mensaje"],
#                             }
#                         )
#             except:
#                 print("Error: el CO2 no es un número entero")

#         if data.get("CO (ppm)") is not None:
#             try:
#                 co = int(data["CO (ppm)"])
#                 for umbral, info in CO.items():
#                     if co >= umbral:
#                         print(
#                             {
#                                 "variable": "CO",
#                                 "valor": co,
#                                 "categoria": info["categoria"],
#                                 "mensaje": info["mensaje"],
#                             }
#                         )
#             except:
#                 print("Error: el CO no es un número entero")

#         if data.get("lluvia") is not None:
#             try:
#                 lluvia = int(data["lluvia"])
#                 for umbral, info in LLUVIA.items():
#                     if lluvia >= umbral:
#                         print(
#                             {
#                                 "variable": "lluvia",
#                                 "valor": lluvia,
#                                 "categoria": info["categoria"],
#                                 "mensaje": info["mensaje"],
#                             }
#                         )
#             except:
#                 print("Error: la lluvia no es un número entero")

#         if data.get("ldr") is not None:
#             try:
#                 ldr = int(data["ldr"])
#                 for umbral, info in LDR.items():
#                     if ldr >= umbral:
#                         print(
#                             {
#                                 "variable": "ldr",
#                                 "valor": ldr,
#                                 "categoria": info["categoria"],
#                                 "mensaje": info["mensaje"],
#                             }
#                         )
#             except:
#                 print("Error: el LDR no es un número entero")

#         # if data.get("temperatura (°C)") is not None:
#         #     temperatura = data["temperatura (°C)"]
#         #     print("inf: temperatura --->", temperatura)
#         #     for umbral, mensaje in UMBRALES_TEMPERATURA_C.items():
#         #         if temperatura > umbral:
#         #            print("inf: umbral --->")
#         #            return(f"{mensaje} Temperatura actual: {temperatura}°C en el sensor {data['sensor_id']}")

#     # # Comparar con el umbral y enviar notificación si es necesario
#     #  # Comparar con los umbrales y enviar notificación si es necesario
#     # if data.get("temperatura (°C)") is not None and data["temperatura (°C)"] > UMBRAL_TEMPERATURA_C:
#     #     return (f"¡Alerta! Temperatura superó el umbral en el sensor {data['sensor_id']}")
#     #     # await send_notification_to_all(f"¡Alerta! Temperatura superó el umbral en el sensor {data['sensor_id']}")

#     # if data.get("humedad") is not None and data["humedad"] > UMBRAL_HUMEDAD:
#     #     return (f"¡Alerta! Humeda superó el umbral en el sensor {data['sensor_id']}")

#     # if data.get("UV") is not None and data["UV"] > UMBRAL_UV:
#     #     return (f"¡Alerta! UV superó el umbral en el sensor {data['sensor_id']}")

#     # Agregar más comparaciones de acuerdo a tus necesidades y umbrales
