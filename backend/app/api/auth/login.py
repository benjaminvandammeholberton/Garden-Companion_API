"""
Authentication API routes and functions.
"""

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from pydantic import ValidationError

from app.core.dependencies import get_current_user
from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from app.models.user_model import User
from app.schemas.auth_schema import TokenPayload, TokenSchema
from app.schemas.user_schema import UserOut
from app.services.user_service import UserService

auth_router = APIRouter()


@auth_router.post(
    '/login',
    summary="Create access and refresh token for user",
    response_model=TokenSchema
)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    """
    Endpoint to authenticate a user and generate access and refresh tokens.

    :param form_data: OAuth2 password request form containing\
        username and password.
    :return: Dictionary containing access and refresh tokens.
    :raises HTTPException 400: If the provided credentials are incorrect.
    """
    user = await UserService.authenticate(
        email=form_data.username,
        password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password"
        )
    if user.is_verified is False:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account not verified"
        )

    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }


@auth_router.post(
    '/test-token',
    summary="Test if the access token is valid",
    response_model=UserOut
)
async def test_token(user: User = Depends(get_current_user)):
    """
    Endpoint to test if the access token is valid.

    :param user: The current user obtained from the access token.
    :return: The authenticated user details.
    """
    return user


@auth_router.post(
    '/refresh',
    summary="Refresh token",
    response_model=TokenSchema
)
async def refresh_token(refresh_token: str = Body(...)):
    """
    Endpoint to refresh an access token using a valid refresh token.

    :param refresh_token: The refresh token.
    :return: Dictionary containing new access and refresh tokens.
    :raises HTTPException 403: If the refresh token is invalid.
    :raises HTTPException 404: If the user corresponding to\
        the refresh token's subject ID is not found.
    """
    try:
        payload = jwt.decode(
            refresh_token, settings.JWT_REFRESH_SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        token_data = TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if token_data.sub:
        user = await UserService.get_user_by_id(token_data.sub)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Invalid token for user",
        )
    return {
        "access_token": create_access_token(user.user_id),
        "refresh_token": create_refresh_token(user.user_id),
    }
