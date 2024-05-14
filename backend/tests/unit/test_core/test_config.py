from decouple import config

from app.core.config import settings


def test_default_values():
    assert settings.PROJECT_NAME == "Garden Companion"
    assert settings.API_V1_STR == "/api/v1"
    assert settings.MAX_CHAT_BOT_REQUEST == 3
    assert settings.ALGORITHM == "HS256"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 120
    assert settings.REFRESH_TOKEN_EXPIRATION_MINUTES == 60 * 24 * 7
    assert settings.BACKEND_CORS_ORIGINS == []

    assert settings.JWT_REFRESH_SECRET_KEY == config(
        "JWT_REFRESH_SECRET_KEY",
        cast=str
    )
    assert settings.JWT_SECRET_KEY == config("JWT_SECRET_KEY", cast=str)
    assert settings.MONGO_CONNECTION_STRING == config(
        "MONGO_CONNECTION_STRING",
        cast=str
    )
    assert settings.MAIL_USERNAME == config("MAIL_USERNAME", cast=str)
    assert settings.MAIL_PASSWORD == config("MAIL_PASSWORD", cast=str)
    assert settings.MAIL_FROM == config("MAIL_FROM", cast=str)
    assert settings.MAIL_SERVER == config("MAIL_SERVER", cast=str)
    assert settings.FRONT_END_URL == config("FRONT_END_URL", cast=str)
    assert settings.BACK_END_URL == config("BACK_END_URL", cast=str)
