""" Module for email verification functionality.
"""
from fastapi import HTTPException, APIRouter
from fastapi_mail import (FastMail,
                          MessageSchema,
                          ConnectionConfig,
                          MessageType)
from fastapi.responses import RedirectResponse, JSONResponse

from app.core.config import settings
from app.core.email_token_handler import EmailTokenHandler
from app.models.user_model import User
from app.schemas.user_schema import UserAuth

email_verification_router = APIRouter()

handler = EmailTokenHandler()

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


async def send_verification_email(
    email: str,
    user: UserAuth
) -> JSONResponse:
    """
    Sends a verification email to the provided email address.

    Args:
        email (EmailSchema): The email address to send the verification
            email to.
        user (User): The user object associated with the email address.

    Returns:
        JSONResponse: A JSON response indicating the status of the email
            sending process.
    """
    username = user.username
    _token = handler.create_token(email)
    html = f"""
            <h1 style="font-size: 1.5rem">Bonjour {username} !</h1>
            <p>Bienvenue dans la communauté <b>Garden Companion</b> !</p>
            <p>Afin de confirmer votre adresse email et valider votre
                inscription, merci de cliquer sur ce bouton :</p>
            <a
            href="{ settings.BACK_END_URL }{ settings.API_V1_STR }/email/
confirm-email/{_token}"><button>Valider mon inscription
                </button></a>
            <p>À tout de suite 🥕</p>
            <p>Benjamin, créateur de Garden Companion</p>
            """

    message = MessageSchema(
        subject="Vérification de votre adresse email",
        recipients=[email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return JSONResponse(status_code=200,
                        content={"message": "email has been sent"})


@email_verification_router.get("/confirm-email/{token}")
async def confirm_email(token: str):
    """
    Endpoint to confirm the email address associated with the provided token.

    Args:
        token (str): The verification token sent to the user's email address.

    Returns:
        RedirectResponse: A redirection response to the appropriate URL based
            on the verification status.
    """
    verification = handler.verify_token(token)
    if not verification:
        raise HTTPException(
            status_code=400,
            detail="Your account has not been verified"
        )
    await update_verified_user(verification['email'])
    if verification['check']:
        return RedirectResponse(
            url=f'{ settings.FRONT_END_URL }/login.html',
            status_code=302
        )


async def update_verified_user(email: str):
    """
    Updates the user's verification status in the database.

    Args:
        email (EmailSchema): The email address of the user whose verification
                                                    status is to be updated.
    """
    user = await User.find_one(User.email == email)
    if user:
        user.is_verified = True
        await user.save()
