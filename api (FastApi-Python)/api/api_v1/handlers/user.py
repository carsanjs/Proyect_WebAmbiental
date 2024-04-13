from fastapi import (APIRouter, HTTPException, Depends, Body, Response)
from api.auth.Bases.EmailUtils import send_password_reset_email,user_from_token,send_verification_email
from schemas.user_schema import UserAuth, UserDetail, UserUpdate, UserOut
from services.user_service import UserService
from core.security import get_password, access_security
from pymongo.errors import DuplicateKeyError
from models.Persona import Persona
from api.dependencies.user_deps import get_current_user
from uuid import UUID
from pydantic import EmailStr
user_router = APIRouter()

@user_router.post("/register/", summary="Add new user ✔", response_model=UserDetail, status_code=202, response_model_exclude_unset = True,
response_model_exclude_none= True,)
async def creating_user(User: UserAuth):

    if User.carrera not in ("Ingeniería Sistemas","Ingeniería Ambiental","Ingeniería Agroindustrial","Contaduría Publica", "Administración de Empresa","Tecnología Agroindustrial"):
        raise HTTPException(
            status_code=400,
            detail="CAREER_IS_REQUIRED",
        )
    if not User.passw:
        raise HTTPException(
             status_code=400, detail="PASSWORD_IS_REQUIRED",
        )
    
    if not User.nombre:
        raise HTTPException(
            status_code=400, detail="NAME_IS_REQUIRED",
        ) 
    try: 
        
        await UserService.create_user(User)
        correo = User.correo
        user = await Persona.by_correo(correo)

        if user is None:
         raise HTTPException(404,"NOT_USER_FOUND_WITH_THAT_EMAIL")
        
        token = access_security.create_access_token(subject=user.jwt_subject)
        nombre =user.nombre

        await send_verification_email(correo,token,nombre)
        return Response(status_code=200)
    
    except DuplicateKeyError:
        raise HTTPException(400, "EMAIL_PROVIDED_IS ALREADY_REGISTERED")

@user_router.get("/users/", summary="list of the all user ✔", response_model=list[UserDetail])
async def list_all(current_user:Persona = Depends(get_current_user)):
    try:
        if current_user.rol == "admin":
         all_list = await UserService.list_users()
         return all_list
        else:
            raise HTTPException(
            status_code=403,
            detail="You don't have permissions to get the full list of users."
        )
    except:
        raise HTTPException(
            status_code=403,
            detail="You don't have permissions to get the full list of users."
        )
    
@user_router.get("/detail/logged", summary="detail of the user logged ✔", response_model=UserDetail)
async def get_me(current_user: Persona = Depends(get_current_user)):
    try:
       return current_user
    except:
        raise HTTPException(
            status_code=403,
            detail="You don't have permissions to get the detail of the user logged."
        )


@user_router.get("/detail/{user_id}", summary="detail of the user by id ✔", response_model=UserDetail)
async def detail_id(user_id:UUID, current_user:Persona = Depends(get_current_user)):
    try:
        user = await UserService.get_user_by_id(user_id)
        if user is not None and current_user.rol == "admin":
            return user
        elif user is None:
            raise HTTPException(
                status_code=404,
                detail=f"User {user_id} not found"
            )
        else:
            raise HTTPException(
                status_code=403,  # 403 indica Forbidden (Prohibido)
                detail=f"User {current_user.id} does not have admin privileges"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
    

@user_router.put("/edit/{user_id}", summary="update user by id", response_model=UserDetail)
async def update(user_id:UUID, data:UserUpdate , current_user:Persona =Depends(get_current_user)):
    try:
      user = await UserService.update_(user_id, data)
      if user is not None and current_user.rol == "admin":
          return {
              "data update of the user":user
          }
      elif user is None:
            raise HTTPException(
                status_code=404,
                detail=f"User {user_id} not found"
            )
      else:
            raise HTTPException(
                status_code=403,  # 403 indica Forbidden (Prohibido)
                detail=f"User {current_user.id} does not have admin privileges"
            )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )


@user_router.delete("/delet/{user_id}", summary="Delete o exclude User ✔")
async def delete(user_id:UUID, current_user:Persona = Depends(get_current_user)):
    try:
       await UserService.delete_users(current_user, user_id)
       return HTTPException(status_code=204)
    except:
        raise HTTPException(status_code=404, detail=f"User not found")


#olvide mi contraseña
@user_router.post("/forgot-password", summary=" sent email forgot-password ✔")
async def forgot_password(correo: EmailStr = Body(..., embed=True)) -> Response:
    """Send password reset email."""
    user = await Persona.by_correo(correo)
    if user is None:
        raise HTTPException(404, "No user found with that email")
    # if user.email_confirmed_at is not None:
    #     raise HTTPException(400, "Email is already verified")
    if user.is_active:
        raise HTTPException(400, "Your account is disabled")
    nombre = user.nombre
    token =  access_security.create_access_token(subject=user.jwt_subject)
    await send_password_reset_email(correo, token, nombre)
    return Response(status_code=200)

#cambiar contraseña
@user_router.post("/reset-password/{token}", response_model=UserOut)
async def reset_password(token: str, passw: str = Body(..., embed=True)):  # type: ignore[no-untyped-def]
    """Reset user password from token value."""
    user = await user_from_token(token)
    print("user reset password token", user)
    if user is None:
        raise HTTPException(404, "No user found with that email")
    if user.email_confirmed_at is None:
       raise HTTPException(400, "Email is not yet verified")
    if user.is_active:
       raise HTTPException(400, "Your account is disabled")
    oass = user.passw = get_password(passw)
    print("reset password", oass)
    await user.save()
    return user
