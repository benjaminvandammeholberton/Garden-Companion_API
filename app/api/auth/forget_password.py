""" Module for password reset functionality.
"""
from datetime import datetime, timedelta
from fastapi import FastAPI, HTTPException, APIRouter, status
from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from fastapi.responses import RedirectResponse
from starlette.responses import JSONResponse

from app.core.security import get_password, create_token
from app.core.config import settings
from app.models.user_model import User
from app.schemas.user_schema import UserResetPassword, EmailSchema

password_reset = APIRouter()

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=465,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_FROM_NAME=settings.PROJECT_NAME,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)


@password_reset.post("/")
async def send_reset_password_email(data: EmailSchema) -> JSONResponse:
    """
    Sends a password reset email to the provided email address.

    Args:
        data (EmailSchema): The email address to send the password reset
                                                                    email to.

    Returns:
        JSONResponse: A JSON response indicating the status of the email
                                                            sending process.
    """
    user = await User.find_one(User.email == data.email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="email fot found")
    _token = create_token(data.email)
    user.forget_password = _token
    user.expiration_forget_password = datetime.now()
    await user.save()
    html = f"""
            <h1 style="font-size: 1.5rem">Bonjour {user.username} !</h1>
            <p>Vous avez récemment demandé la réinitialisation de votre mot de
                passe pour votre compte sur <b>Garden Companion</b>.</p>
            <p>Pour procéder à la réinitialisation, veuillez suivre les étapes
                ci-dessous :<p>
            <ol>
            <li>Cliquez sur le boutton suivant pour accéder à la page de
                réinitialisation de mot de passe :<br><a
                href="http://127.0.0.1:5501/reset_password.html?token={_token}">
                <button>réinitialiser mon mot de passe
                </button></a></li>
            <li>Vous serez redirigé(e) vers une page où vous pourrez entrer
                votre nouveau mot de passe. Assurez-vous de choisir un mot de
                passe sécurisé et gardez-le confidentiel.</li>
            </ol>
            <p>Si vous n'avez pas demandé cette réinitialisation de mot de
                passe, veuillez ignorer cet e-mail. Votre compte restera
                sécurisé.</p>
            <p>Pour toute question, n'hésitez pas à nous contacter à
                contact@gardencompanion.fr</p>
            <p>À tout de suite 🥕</p>
            <p>Benjamin, créateur de Garden Companion</p>
            """

    message = MessageSchema(
        subject="Nouveau mot de passe",
        recipients=[data.email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200,
                        content={"message": "email has been sent"})


@password_reset.put("/")
async def update_password(data: UserResetPassword) -> JSONResponse:
    """
    Updates the password of the user associated with the provided token.

    Args:
        data (UserResetPassword): The token and new password for resetting
                                                                the password.

    Returns:
        JSONResponse: A JSON response indicating the status of the password
                                                                update process.
    """
    print(data.token)
    print(data.password)
    user = await User.find_one(User.forget_password == data.token)
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                            detail="The token provided is not valid")
    current_time = datetime.now()
    token_datetime = user.expiration_forget_password
    time_of_token = current_time - token_datetime
    expiration_time = timedelta(minutes=30)
    if time_of_token > expiration_time:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="The link has expired, ask for another one")
    hashed_password = get_password(data.password)
    user.hashed_password = hashed_password
    await user.save()
    return JSONResponse(status_code=200,
                        content={"message": "Password reset successfully."})
