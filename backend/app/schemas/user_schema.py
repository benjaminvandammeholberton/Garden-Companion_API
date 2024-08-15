"""
User-related Pydantic models for authentication and output.
"""

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from uuid import UUID


class LocalisationSchema(BaseModel):
    city: str
    postal_code: str
    longitude: float
    latitude: float


class UserAuth(BaseModel):
    """
    UserAuth class for user authentication.
    """
    email: EmailStr
    username: str = Field(min_length=5, max_length=50,)
    password: str = Field(min_length=5, max_length=24,)
    localisation: LocalisationSchema


class UserOut(BaseModel):
    """
    UserOut class for representing user output.
    """
    user_id: UUID
    username: str
    email: EmailStr
    first_name: str | None
    last_name: str | None
    disabled:  bool | None = False
    chat_bot_day_requests: int
    chat_bot_total_requests: int
    last_request_datetime: datetime | None


class UserUpdate(BaseModel):
    """
    """
    first_name: str | None = Field(
        None,
        max_length=25,
        min_length=6
    )
    last_name: str | None = Field(
        None,
        max_length=25,
        min_length=6
    )
    localisation: LocalisationSchema | None = None


class UserResetPassword(BaseModel):
    """
    """
    token: str = Field(min_length=15, max_length=35)
    password: str = Field(min_length=5, max_length=50)


class EmailSchema(BaseModel):
    """
    """
    email: EmailStr


class UserChatBotDailyRequest(BaseModel):
    """
    """
    chat_bot_day_requests: int
