import paho.mqtt.client as mqtt
import json
import base64
import uuid 
from fastapi_mqtt import FastMQTT, MQTTConfig
import json
from uuid import UUID
from services.push_service import PushNotification
from models.Salones import LivingRoom
from models.Sensores import Sensors
from services.sensors_service import SensorsService
from models.Dispositivos import Devices

client_id = uuid.uuid4().hex
MQTT_PORT = 1883 # Puerto MQTT por defecto
MQTT_BROKER_ADDRESS = "broker.emqx.io" # dirección IP del servidor Mosquitto

TOPIC = ["Externo/Upc/MQ-135/C02", "Externo/Upc/DHT11/TH", "Externo/Upc/FC-37/Lluvia","Externo/Upc/GYML8511/UV","Salon/112/MG811/C02","Salon/112/MQ7/C0","Salon/112/DHT11/TH","Salon/112/LDR/Ldr","Salon/112/DHT21/TH"] 

async def mqtt_startup():
    """Initial connection for MQTT client, for lifespan startup."""
    await mqtt.connection()
    await mqtt.on_connect()

    # Configuración del cliente MQTT y suscripción a los temas
mqtt_config = MQTTConfig(
    host=MQTT_BROKER_ADDRESS,
    port=MQTT_PORT,
    keepalive=60,
    username="admin",
    password="toor"
    )
mqtt = FastMQTT(config=mqtt_config, client_id=client_id)

@mqtt.on_connect()
def connect(client, flags, rc, properties):
    """ Decorator method used to handle the connection to MQTT."""
    global mqtt_connected
    if rc == 0:
        mqtt_connected = True
        for topic in TOPIC:
            mqtt.client.subscribe(topic, 2)
    elif rc == 1:
        print("Conexión rechazada - incorrect protocol version")
    elif rc == 2:
        print("Conexión rechazada - invalid client identifier")
    elif rc == 3:
        print("Conexión rechazada - server unavailable")
    elif rc == 4:
        print("Conexión rechazada - bad username or password")
    elif rc == 5:
        print("Conexión rechazada - not authorized")
    else:
        mqtt_connected = False
        print("Conexión rechazada - Código de retorno: %s" % {rc})

# # Callback que se ejecuta cuando se recibe un mensaje en un tema al que estamos suscritos
@mqtt.on_message()
async def message(client, topic, payload, qos, properties):
    """ The decorator method is used to subscribe to messages from all topics."""
    try:
        data = json.loads(payload.decode('utf-8'))
        if isinstance(data, list):
            for obj in data:
                json.dumps(obj, indent=4)  # Indentación para una salida legible
        await save_sensor_data(data)
    except json.JSONDecodeError as e:
        try:
            payload.decode('utf-8')
        except Exception as e:
            decoded_data = base64.b64decode(payload.decode('utf-8'))
            print(decoded_data.decode('utf-8'))
        print("El mensaje no es un JSON válido.")
        print("Mensaje recibido: %s" % payload.decode('utf-8'))
    print("Mensaje recibido en el tema: %s" % topic)
    print("Publicado", str(payload))

#dar de baja // Anular la subcripcion
@mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)

async def mqtt_shutdown():
    """Final disconnection for MQTT client, for lifespan shutdown."""
    await mqtt.on_disconnect()

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
            try:
                sensor = await Sensors.find_one({"id_sensor": sensor_id})
                if sensor:
                    await PushNotification.push_umbral_notification(data_dict)
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

