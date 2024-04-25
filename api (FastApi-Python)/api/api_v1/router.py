from fastapi import APIRouter
from .handlers import user, lroom, devices, sensors, email, history
from api.auth.jwt import auth_router

router = APIRouter()

router.include_router(
    user.user_router, 
    prefix="/users", 
    tags=["users"],
    responses={404: {"description": "Not found"}},
    )

router.include_router(
    auth_router,
    prefix="/auth", 
    responses={404: {"description": "Not found"}},
    tags=["auth"])

router.include_router(
    lroom.lroom_router,
    prefix= "/livingroom",
    responses={404: {"description": "Not found"}},
    tags=["livingroom"])

router.include_router(
    devices.device_router,
    prefix= "/device",
    responses={404: {"description": "Not found"}},
    tags=["device"])

router.include_router(
    sensors.sensors_router,
    prefix= "/sensors",
    responses={404: {"description": "Not found"}},
    tags=["sensors"])

router.include_router(
    history.history_router,
    prefix= "/history",
    responses={404: {"description": "Not found"}},
    tags=["history"])

router.include_router(
    email.email_router,
    prefix= "/email",
    responses={404: {"description": "Not found"}},
    tags=["email"])
