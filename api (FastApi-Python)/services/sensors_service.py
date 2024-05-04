from schemas.sensors_schema import SensorSent, SensorUpdate
from api.dependencies.user_deps import get_current_user
from services.devices_service import DeviceService
from services.lroom_service import lroomService
from fastapi import HTTPException, Depends
from models.Sensores import Sensors
from models.Persona import Persona
from datetime import datetime
from uuid import UUID
import pymongo
import beanie
from models.History import SensorDataHistory
from fastapi import HTTPException
from typing import Dict, Optional, List
import json
from models.Dispositivos import Devices
from models.Salones import LivingRoom
from services.push_service import PushNotification


class SensorsService:
    """✔"""

    @staticmethod
    async def updateCountSensor(user: Persona) -> None:
        try:
            devices = await DeviceService.list_device(user)
            for device in devices:
                sensors = await Sensors.find(
                    Sensors.device_id == device.id_device
                ).to_list()
                sensor_count = len(sensors)
                device.amount_sensors = sensor_count
                await device.save()
        except Exception as e:
            print(f"Error updating sensor count: {e}")

    """✔"""

    @staticmethod
    async def sentData_sensors(
        device_id: UUID,
        sensors: SensorSent,
        current_user: Persona = Depends(get_current_user),
    ) -> Sensors:
        current_name_sensor = sensors.name_sensor
        print("name the sensors", current_name_sensor)
        search_device = await DeviceService.detail(current_user, device_id)

        if search_device is None:
            raise HTTPException(
                status_code=404,
                detail="The device ID is not associated with any registered device",
            )
        current_name_device = search_device.name_device
        id_lroom_asocie = search_device.room_Assignment
        search_lroom = await lroomService.detail(current_user, id_lroom_asocie)
        if search_lroom is None:
            raise HTTPException(
                status_code=404,
                detail="The lroom ID is not associated with any registered lroom",
            )
        index_key1 = f"Sensor_{current_name_sensor}"
        index_key2 = f"Device_{current_name_device}"
        try:
            sensorsent = Sensors(
                **sensors.model_dump(),
                creator=current_user,
                is_active=True,
                create_at=datetime.now(),
                device_id=device_id,
            )
            await sensorsent.insert()
            dict_obj = Sensors.model_validate(sensorsent)
            search_device.sensors[index_key1] = dict_obj
            search_lroom.inf_device[index_key2].sensors[index_key1] = dict_obj
            await search_device.update({"$set": {"sensors": search_device.sensors}})
            await search_lroom.update({"$set": {"inf_device": search_lroom.inf_device}})
            await search_device.save()
            await search_lroom.save()
            await SensorsService.updateCountSensor(current_user)
            return sensorsent
        except Exception as e:
            raise HTTPException(status_code=400, detail="Error when creating a Sensor:")
        except beanie.exceptions.RevisionIdWasChanged:
            raise HTTPException(
                status_code=500,
                detail="Error when trying to sent a sensor. Please try again",
            )
        except pymongo.errors.DuplicateKeyError:
            raise HTTPException(
                status_code=400,
                detail="the name of the sensors when in, plase, again try.",
            )

    """✔"""

    @staticmethod
    async def list_sensors(user: Persona) -> List[Sensors]:
        try:
            all_sensors = await Sensors.find(
                Sensors.creator.id == user.id, limit=50
            ).to_list()
            return all_sensors
        except HTTPException as e:
            raise (e)

    """✔"""

    @staticmethod
    async def detail(user: Persona, id_sensor: UUID):
        all_detail = await Sensors.find_one(
            Sensors.id_sensor == id_sensor, Sensors.creator.id == user.id
        )
        return all_detail

    @staticmethod
    async def update_all(user: Persona, id_sensor: UUID, data: SensorUpdate):
        sensor = await SensorsService.detail(user, id_sensor)
        await sensor.update({"$set": data.model_dump(exclude_unset=True)})
        await sensor.save()
        return sensor

    """✔"""

    @staticmethod
    async def delete_sensor(user: Persona, id_sensor: UUID) -> None:
        sensor = await SensorsService.detail(user, id_sensor)
        try:
            if sensor:
                await sensor.delete()
                return None
        except HTTPException as exc:
            return exc

    @staticmethod
    async def namelroom_telegram(id: UUID):
        try:
            sensorid = await Sensors.find_one(Sensors.id_sensor == id)
            if sensorid:
                deviceasocie = sensorid.device_id
                device = await Devices.find_one(Devices.id_device == deviceasocie)
                if device:
                    devicemodel = device.room_Assignment
                    lroom = await LivingRoom.find_one({"id_lroom": devicemodel})
                    if lroom:
                        return lroom.name_lroom
        except HTTPException:
            raise HTTPException(
                status_code=404,
                detail=f"{id} sensor not associated a classroom",
            )

    @staticmethod
    async def get_sensors_by_id(id_sensor: UUID) -> Sensors:
        try:
            sensor = await Sensors.find_one(Sensors.id_sensor == id_sensor)
            return sensor
        except HTTPException:
            raise HTTPException(
                status_code=404,
                detail=f"sensor with ID {id_sensor} not found",
            )
    
    @staticmethod
    async def inset_history(id_sensor: UUID, data: Dict) -> SensorDataHistory:
        try:
            history_entry = SensorDataHistory(
                sensor_id=id_sensor, timestamp=datetime.now(), data=data
            )
            await history_entry.insert()
            return history_entry
        except HTTPException:
            raise HTTPException(
                status_code=400, detail="Error when creating a history:"
            )

    @staticmethod
    async def detailhistory(id_history: UUID):
        all_detail = await SensorDataHistory.find_one(
            SensorDataHistory.id_history == id_history
        )
        return all_detail

    @staticmethod
    async def list_historyexcept() -> List[SensorDataHistory]:
        try:
            all_history = await SensorDataHistory.find(limit=50).to_list()
            return all_history
        except HTTPException as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_history(id_history: UUID) -> None:
        history = await SensorsService.detailhistory(id_history)
        try:
            if history:
                await history.delete()
                return None
        except HTTPException as exc:
            return exc

    @staticmethod
    async def delete_all_history(user: Persona) -> None:
        if user.rol != "admin":
            raise HTTPException(
                status_code=403, detail="No tienes permiso de administrador"
            )
        try:
            return await SensorDataHistory.delete_all()
        except HTTPException as exc:
            raise HTTPException(
                status_code=500, detail=f"No se pudo eliminar: {str(exc)}"
            )
    
    @staticmethod
    async def _history_content_sensors(current_user: Persona, history: SensorDataHistory) -> bool:
        sensor = await SensorsService.get_sensors_by_id(history.sensor_id)
        if sensor and sensor.creator:
            creator_persona = await sensor.creator.fetch()
            return creator_persona.correo == current_user.correo
        return False
    
    @staticmethod
    async def list_history(current_user: Persona, date: Optional[datetime]) -> List[SensorDataHistory]:
        try:
            date_now = date
            start_of_day = datetime(
                date_now.year, date_now.month, date_now.day, 0, 0, 0
            )
            end_of_day = datetime(
                date_now.year, date_now.month, date_now.day, 23, 59, 59
            )
            all_history = await SensorDataHistory.find(
                {"timestamp": {"$gte": start_of_day, "$lt": end_of_day}}, limit=300
            ).to_list()
            
            filtered_history = [
                history for history in all_history
                if await SensorsService._history_content_sensors(current_user, history)
            ]
            return filtered_history
        except HTTPException as e:
            raise HTTPException(status_code=500, detail=str(e))
        
    @staticmethod
    async def save_sensor_data(payload):
        try:
            if isinstance(payload, bytes):
                data = payload.decode()
            elif isinstance(payload, dict):
                data = json.dumps(payload)
            else:
                data = str(payload)
            data_dict = json.loads(data)
            sensor_id = UUID(data_dict.get("sensor_id"))
            namelroom: str = await SensorsService.namelroom_telegram(sensor_id)
            print("name type classroom", type(namelroom))
            print("name --->", namelroom)
            try:
                sensor = await Sensors.find_one({"id_sensor": sensor_id})
                if sensor:
                    await PushNotification.push_umbral_notification(
                        namelroom, data_dict
                    )
                    data_dict.pop("sensor_id", None)
                    await sensor.update({"$set": {"data": data_dict}})
                    await sensor.save()
                    await SensorsService.inset_history(sensor_id, data_dict)
                    device_id = sensor.device_id
                    try:
                        devices = await Devices.find_one({"id_device": device_id})
                        sensor_data = sensor.data  # Obtener los datos del sensor
                        if devices:
                            name_sensor = f"Sensor_{sensor.name_sensor}"
                            await devices.update(
                                {
                                    "$set": {
                                        "sensors." + name_sensor + ".data": sensor_data
                                    }
                                }
                            )
                            await devices.save()
                            lroom_id = devices.room_Assignment
                            try:
                                lroom = await LivingRoom.find_one(
                                    {"id_lroom": lroom_id}
                                )
                                if lroom:
                                    name_device_ = f"Device_{devices.name_device}"
                                    await lroom.update(
                                        {
                                            "$set": {
                                                f"inf_device.{name_device_}.sensors.{name_sensor}.data": sensor_data
                                            }
                                        }
                                    )
                                    await lroom.save()
                                else:
                                    print("No se encontró el lroom asociado al device.")
                            except Exception as e:
                                print(
                                    f"El device no tiene un ID de lroom asociado. {e}"
                                )
                        else:
                            print("No se encontró el dispositivo asociado al sensor.")
                    except Exception as e:
                        print(f"El sensor no tiene un ID de dispositivo asociado. {e}")
                else:
                    print(f"Sensor with id {sensor_id} not found.")
            except Exception as e:
                print(f"Error saving data to MongoDB: {e}")
        except Exception as e:
            print(f"Error processing sensor data: {e}")
