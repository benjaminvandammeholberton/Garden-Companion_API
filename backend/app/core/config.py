"""
Application Settings Module using Pydantic.

This module defines a Pydantic BaseSettings class for managing application
settings.
It includes attributes for API paths, JWT tokens, CORS origins, project name,
MongoDB connection, and other configurations. It reads environment variables
using decouple.
"""

from decouple import config
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """
    Application settings class using Pydantic.

    Attributes:
    - PROJECT_NAME (str): The name of the Garden Companion project.
    - API_V1_STR (str): Base path for API version 1.
    - MAX_CHAT_BOT_REQUEST (int): Number of requests a user is allowed to make
        per day.
    - BACKEND_CORS_ORIGINS (List[AnyHttpUrl]): List of allowed CORS origins.
    - ALGORITHM (str): The algorithm used for JWT token encoding.
    - ACCESS_TOKEN_EXPIRE_MINUTES (int): Token expiration time for access
        tokens (in minutes).
    - REFRESH_TOKEN_EXPIRATION_MINUTES (int): Token expiration time for
        refresh tokens (in minutes).
    - JWT_REFRESH_SECRET_KEY (str): Secret key for JWT token refresh, obtained
        from environment variable 'JWT_REFRESH_SECRET_KEY'.
    - JWT_SECRET_KEY (str): Secret key for JWT token generation, obtained from
        environment variable 'JWT_SECRET_KEY'.
    - MONGO_CONNECTION_STRING (str): MongoDB connection string, obtained from
        environment variable 'MONGO_CONNECTION_STRING'.
    - MAIL_USERNAME (str): Username for email server, obtained from
        environment variable 'MAIL_USERNAME'.
    - MAIL_PASSWORD (str): Password for email server, obtained from
        environment variable 'MAIL_PASSWORD'.
    - MAIL_FROM (str): Email address used as sender, obtained from environment
        variable 'MAIL_FROM'.
    - MAIL_SERVER (str): SMTP server address, obtained from environment
        variable 'MAIL_SERVER'.
    - FRONT_END_URL (str): Front-end URL for the Garden Companion application,
        obtained from environment variable 'FRONT_END_URL'.
    - BACK_END_URL (str): Back-end URL for the Garden Companion application,
        obtained from environment variable 'BACK_END_URL'.

    Config:
    - case_sensitive (bool): Case sensitivity for attribute names.
    """
    PROJECT_NAME: str = "Garden Companion"
    API_V1_STR: str = "/api/v1"
    MAX_CHAT_BOT_REQUEST: int = 3
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 120
    REFRESH_TOKEN_EXPIRATION_MINUTES: int = 60 * 24 * 7
    # Environnement variables
    JWT_REFRESH_SECRET_KEY: str = config("JWT_REFRESH_SECRET_KEY", cast=str)
    JWT_SECRET_KEY: str = config("JWT_SECRET_KEY", cast=str)
    MONGO_CONNECTION_STRING: str = config("MONGO_CONNECTION_STRING", cast=str)
    MAIL_USERNAME: str = config("MAIL_USERNAME", cast=str)
    MAIL_PASSWORD: str = config("MAIL_PASSWORD", cast=str)
    MAIL_FROM: str = config("MAIL_FROM", cast=str)
    MAIL_SERVER: str = config("MAIL_SERVER", cast=str)
    # FRONT_END_URL: str = config("FRONT_END_URL", cast=str)
    FRONT_END_URL: str = "http://localhost:3000"
    BACK_END_URL: str = config("BACK_END_URL", cast=str)

    class ConfigDict:
        """
        Configuration class for Pydantic settings.

        Attributes:
        - case_sensitive (bool): Case sensitivity for attribute names.
        """
        case_sensitive = True


settings = Settings()
