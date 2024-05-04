from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, FastAPI, Response, Depends
from api.dependencies.user_deps import get_current_user, get_current_userid
import uuid
from mqtt.mqtt_listener import mqtt
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import time
from beanie import init_beanie
from core.config import settings
from motor.motor_asyncio import AsyncIOMotorClient
from models.Persona import Persona
from models.Salones import LivingRoom
from models.Dispositivos import Devices
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

# Include router
app.include_router(router, prefix=settings.API_V1_STR)
# Event handler for startup
app.add_event_handler("startup", lifespan(app))


# Root route
@app.get("/", tags=["Documentacion-root"], description="root", status_code=200)
async def inicio():
    return {"mensaje": "Iniciando prueba con fastapi y NEXTJS "}
