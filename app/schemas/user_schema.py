"""
User-related Pydantic models for authentication and output.
"""

from datetime import datetime
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID


class UserAuth(BaseModel):
    """
    UserAuth class for user authentication.
    """
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., min_length=5,
                          max_length=50, description="user username")
    password: str = Field(..., min_length=5,
                          max_length=24, description="user password")


class UserOut(BaseModel):
    """
    UserOut class for representing user output.
    """
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled:  Optional[bool] = False
    chat_bot_day_requests: int
    chat_bot_total_requests: int
    last_request_datetime: Optional[datetime]


class UserUpdate(BaseModel):
    """
    """
    first_name: Optional[str] = Field(None,
                                      title='First Name',
                                      max_length=25,
                                      min_length=6)
    last_name: Optional[str] = Field(None,
                                     title='Last Name',
                                     max_length=25,
                                     min_length=6)


class UserResetPassword(BaseModel):
    """
    """
    token: str = Field(...,
                       min_length=15,
                       max_length=35,
                       title='token'
                       ),
    password: str = Field(...,
                          min_length=5,
                          max_length=50,
                          title='user password'
                          )


class EmailSchema(BaseModel):
    """
    """
    email: EmailStr = Field(..., title="user's email Adress")


class UserChatBotDailyRequest(BaseModel):
    """
    """
    chat_bot_day_requests: int = Field(..., title="user's ChatBot Day Request")
