import paho.mqtt.client as mqtt
import json
import uuid 
from fastapi_mqtt import FastMQTT, MQTTConfig
from uuid import UUID
from services.sensors_service import SensorsService
from fastapi import HTTPException
client_id = uuid.uuid4().hex #id client
MQTT_PORT = 1883 # Puerto MQTT por defecto
MQTT_BROKER_ADDRESS = "broker.emqx.io" # dirección IP del servidor Mosquitto

TOPIC = ["Externo/Upc/MQ-135/CO2", "Externo/Upc/DHT11/TH", "Externo/Upc/FC-37/Lluvia","Externo/Upc/GYML8511/UV","Salon/112/MG811/CO2","Salon/112/MQ7/CO","Salon/112/DHT11/TH","Salon/112/LDR/Ldr","Salon/112/DHT21/TH", "Externo/Upc/Ds18b20/ds"] 

async def mqtt_startup():
    """Initial connection for MQTT client, for lifespan startup."""
    await mqtt.connection()
    await mqtt.on_connect()

    # Configuración del cliente MQTT y suscripción a los temas
mqtt_config = MQTTConfig(
    host=MQTT_BROKER_ADDRESS,
    port=MQTT_PORT,
    keepalive=60,
    username="pube",
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
        data = None
        decoders = ['utf-8', 'utf-16', 'utf-32']
        for encoding in decoders:
            try:
                # cleaned_payload = ''.join(char for char in encoding if char.isprintable())
                # data = json.loads(cleaned_payload)
                data = json.loads(payload.decode(encoding))
                if isinstance(data, list):
                    for obj in data:
                        json.dumps(obj, indent=4)
                await SensorsService.save_sensor_data(data)
                break  # Si la decodificación tiene éxito, salimos del bucle
            except UnicodeDecodeError:
                continue  # Si la decodificación falla, intentamos con el siguiente encoding
        if data is None:
            raise HTTPException(status_code=400,detail="Error saving sensor data incompatible with payload",)
    except json.JSONDecodeError as e:
        print("El mensaje no es un JSON válido.") 
    print("Mensaje recibido en el tema: %s" % topic)
    print("Publicado", str(payload))

#dar de baja // Anular la subcripcion
@mqtt.on_subscribe()
def subscribe(client, mid, qos, properties):
    print("subscribed", client, mid, qos, properties)

async def mqtt_shutdown():
    """Final disconnection for MQTT client, for lifespan shutdown."""
    await mqtt.on_disconnect()



