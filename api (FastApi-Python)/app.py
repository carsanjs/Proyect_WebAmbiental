from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, FastAPI, Response, Depends
from typing import Dict
from api.dependencies.user_deps import get_current_user, get_current_userid
import uuid
from mqtt.mqtt_listener import mqtt
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi_socketio import SocketManager
import time
from services.conecteSocket import ServiceConnecteSocketio
from beanie import init_beanie
from core.config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from models.Persona import Persona
from models.Salones import LivingRoom
from models.Dispositivos import Devices
from models.ConWebsoPush import ConnectSocket
from models.Sensores import Sensors
from models.History import SensorDataHistory
from api.api_v1.router import router
from services.push_service import PushNotification

# ================ Authentication Middleware =======================
# ----------- Here authentication is based on basic scheme,
# ---------- the application (as decribed in FastAPI oficial documentation)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    cliente_db = AsyncIOMotorClient(
        settings.MONGO_CONNECTION_STRING
    ).vambientalapp  # name of the database
    app.state.db = cliente_db
    await mqtt.mqtt_startup()  # connecte with MQTTt
    # add models
    await init_beanie(
        database=cliente_db,
        document_models=[
            Persona,
            LivingRoom,
            Devices,
            Sensors,
            SensorDataHistory,
            ConnectSocket,
        ],
    )  # models
    yield
    await mqtt.mqtt_shutdown()  # desconnect MQTT


app = FastAPI(
    root_path=settings.ROOT_URL,
    title=settings.PROYECT_NAME,
    swagger_ui_parameters={"tryItOutEnabled": True},
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Backend para monitoreo ambiental con protocolo MQTT.",
    summary="Implementación de sensores MQTT para medir variables ambientales, respaldada por un backend eficiente en la gestión y análisis de datos.",
    version="0.0.1",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def authenticate_time_header(request: Request, call_next):
    session_id = has_session_id = request.cookies.get("fast-auth-session")
    start_time = time.time()
    if session_id is None:
        session_id = str(uuid.uuid4())
    request.cookies.setdefault("fast-auth-session", session_id)
    response: Response = await call_next(request)
    process_time = time.time() - start_time
    if has_session_id is None:
        response.headers["X-Process-Time"] = str(process_time)
        response.headers["Set-Cookie"] = (
            f"fast-auth-session={session_id}; Path=/; HttpOnly"
        )
    return response


# Initialize Socket.IO manager
_sio = SocketManager(app)


@_sio.on("connect")
async def handle_connect(sid, *args, **kwargs):
    # print(f"handle_my_event connect", token)
    # room_ = await _sio.enter_room(sid, f"{token}" + "/room/" + f"{sid}")
    # print(f"room asignad client token {room_} asig al id server {sid}")
    # await ServiceConnecteSocketio.CreateCacheSocket(sid,room_,token)
    print(f"I'm connected!👋 👋:", {"sid": sid})


@_sio.on("disconnect")
async def handle_disconected(sid, *args, **kwargs):
    print(f"handle_disconected", sid)
    # await _sio.emit("my_response", {"data":"disconnected"}, room=sid)
    await _sio.disconnect(sid=sid)


@_sio.on("my_event")
async def handle_my_event(sid, token:str, *args, **kwargs):
    print(f"handle_my_event event", token)
    # await ServiceConnecteSocketio.CreateCacheSocket(sid,f"room-",token)
    data_ = await PushNotification.umbral_NotificationWebsocket()
    message = data_[0]
    timestamp = data_[1]
    await _sio.emit(
        "my_response",
        {"sid": sid, "message": message, "timestamp": timestamp},
        room=sid,
    )
    print(f"event data", data_)


@_sio.on("error")
async def handle_error():
    print(f"handle_error")


# Include router
app.include_router(router, prefix=settings.API_V1_STR)
# Event handler for startup
app.add_event_handler("startup", lifespan(app))


# Root route
@app.get("/", tags=["Documentacion-root"], description="root", status_code=200)
async def inicio():
    return {"mensaje": "Iniciando prueba con fastapi y NEXTJS "}

    # userid = current_user
    # print("userid ", userid)
    # if userid:
    #     # print(f"User {userid} connected with SID: {sid}")
    #     resultroom = await _sio.enter_room(sid, f"{userid}/room/{sid}")
    #     print(resultroom, "resultado room")
    #     await ServiceConnecteSocketio.CreateCacheSocket(sid, resultroom,userid)

    # else:
    #     # Si el usuario no está autenticado,se desconecta la conexión
    #     await _sio.disconnect(sid)


# @_sio.on("authenticate")
# async def authenticate(sid, user_id):
#     # Add the user to a room based on their user ID
#     # join_room(user_id)
#     print(f"User {user_id} authenticated and joined room")


#  try:
#         data_data_json = json.dumps(data["data"])  # Serializa solo "data"
#     except Exception as e:
#         print(f"Error al serializar 'data': {e}")
#         data_data_json = None

#     try:
#         data_json = json.dumps(data_)  # Serializa solo "data_"
#     except Exception as e:
#         print(f"Error al serializar 'data_': {e}")
#         data_json = None
