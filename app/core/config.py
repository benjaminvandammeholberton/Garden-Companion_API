"""
Application settings module using Pydantic for Garden-Companion.

Defines a Pydantic BaseSettings class for managing application settings.
Includes attributes for API paths, JWT tokens, CORS origins, project name,\
    MongoDB connection,
and other configurations. Reads environment variables using decouple.
"""

from decouple import config
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings class using Pydantic.

    Attributes:
    - API_V1_STR (str): The base path for API version 1.
    - JWT_SECRET_KEY (str): Secret key for JWT token generation.
    - JWT_REFRESH_SECRET_KEY (str): Secret key for JWT token refresh.
    - ALGORITHM (str): The algorithm used for JWT token encoding.
    - ACCESS_TOKEN_EXPIRE_MINUTES (int): Token expiration time for\
        access tokens (in minutes).
    - REFRESH_TOKEN_EXPIRATION_MINUTES (int): Token expiration time for\
        refresh tokens (in minutes).
    - BACKEND_CORS_ORIGINS (List[AnyHttpUrl]): List of allowed CORS origins.
    - PROJECT_NAME (str): The name of the project.
    - MONGO_CONNECTION_STRING (str): MongoDB connection string.

    Config:
    - case_sensitive (bool): Case sensitivity for attribute names.
    """
    API_V1_STR: str = "/api/v1"
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRATION_MINUTES: int = 60 * 24 * 7
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    PROJECT_NAME: str = "Garden-Companion"

    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)

    class Config:
        """
        Configuration class for Pydantic settings.

        Attributes:
        - case_sensitive (bool): Case sensitivity for attribute names.
        """
        case_sensitive = True


settings = Settings()
