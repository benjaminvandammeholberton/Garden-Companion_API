"""
Utility functions for password hashing, token creation, and verification.
"""

from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from typing import Union, Any

from app.core.config import settings


password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def create_access_token(
    subject: Union[str, Any],
    expires_delta: int = None
) -> str:
    """
    Create an access token for authentication.

    :param subject: The subject of the token (user ID).
    :param expires_delta: Optional expiration time delta for the token.
    :return: Encoded access token.
    """
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() +\
            timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        settings.ALGORITHM
    )
    return encoded_jwt


def create_refresh_token(
    subject: Union[str, Any],
    expires_delta: int = None
) -> str:
    """
    Create a refresh token for token refreshing.

    :param subject: The subject of the token (user ID).
    :param expires_delta: Optional expiration time delta for the token.
    :return: Encoded refresh token.
    """
    if expires_delta is not None:
        expires_delta = datetime.utcnow() + expires_delta
    else:
        expires_delta = datetime.utcnow() + timedelta(
            minutes=settings.REFRESH_TOKEN_EXPIRATION_MINUTES
        )
    to_encode = {"exp": expires_delta, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_REFRESH_SECRET_KEY,
        settings.ALGORITHM
    )
    return encoded_jwt


def get_password(password: str) -> str:
    """
    Hash a password using the configured password hashing algorithm.

    :param password: The plaintext password to hash.
    :return: Hashed password.
    """
    return password_context.hash(password)


def verify_password(password: str, hashed_pass: str) -> bool:
    """
    Verify a plaintext password against a hashed password.

    :param password: The plaintext password to verify.
    :param hashed_pass: The hashed password for comparison.
    :return: True if the passwords match, False otherwise.
    """
    return password_context.verify(password, hashed_pass)
