from fastapi import APIRouter, HTTPException,status, Depends, Body, Response
from pydantic import EmailStr
from api.auth.Bases.EmailUtils import send_verification_email, user_from_token
from models.Persona import Persona
from datetime import datetime

email_router = APIRouter()

@email_router.get("/verify/{token}", summary="get token verify ✔")
async def verify_email(token: str) -> Response:
    """Verify the user's email with the supplied token."""
    user = await user_from_token(token)
    print("user verify token---", user)
    if user is None:
        raise HTTPException(404, "No user found with that email")
    user.email_confirmed_at = datetime.now()
    user.is_active = True
    user.emailValidated = True
    await user.save()
    return Response(
        status_code=200,
        content="Email verified successfully")