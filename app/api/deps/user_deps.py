"""
Authentication utilities and dependencies for FastAPI.
"""

from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from jose import jwt

from app.core.config import settings
from app.models.user_model import User
from app.schemas.auth_schema import TokenPayload
from app.services.user_service import UserService

reuseable_oauth = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/login",
    scheme_name="JWT"
)


async def get_current_user(token: str = Depends(reuseable_oauth)) -> User:
    """
    Dependency function to get the current user from the JWT token.

    Validates the JWT token, checks its expiration,\
        and retrieves the user from the database.

    :param token: JWT token obtained from the request.
    :return: The authenticated user.
    :raises HTTPException 401: If the token has expired.
    :raises HTTPException 403: If the token cannot be validated.
    :raises HTTPException 404: If the user corresponding to\
        the token's subject ID is not found.
    """
    try:
        payload = jwt.decode(
            token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)

        if datetime.fromtimestamp(token_data.exp) < datetime.now():
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token expired",
                headers={"WWW-Authenticate": "Bearer"}
            )
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Could not find user"
        )
    return user

async def check_daily_limit(current_user: User = Depends(get_current_user)):
    """
    Dependency to check if the user has exceeded the daily limit.
    """
    max_requests = settings.MAX_CHAT_BOT_REQUEST
    today = datetime.now().date()

    # if current_user.last_request_datetime.date() != today:
    #     current_user.chat_bot_day_requests = 0
    #     await current_user.save()
        
    if current_user.chat_bot_day_requests >= max_requests:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Daily chat bot request limit exceeded"
        )
