"""
User-related Pydantic models for authentication and output.
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID


class UserAuth(BaseModel):
    """
    UserAuth class for user authentication.

    Attributes:
    - email (EmailStr): The user's email.
    - username (str): The user's username.
    - password (str): The user's password.
    """
    email: EmailStr = Field(..., description="user email")
    username: str = Field(..., min_length=5,
                          max_length=50, description="user username")
    password: str = Field(..., min_length=5,
                          max_length=24, description="user password")


class UserOut(BaseModel):
    """
    UserOut class for representing user output.

    Attributes:
    - user_id (UUID): The user's UUID.
    - username (str): The user's username.
    - email (EmailStr): The user's email.
    - first_name (Optional[str]): The user's first name.
    - last_name (Optional[str]): The user's last name.
    - disabled (Optional[bool]): Indicates if the user is\
        disabled (default is False).
    """
    user_id: UUID
    username: str
    email: EmailStr
    first_name: Optional[str]
    last_name: Optional[str]
    disabled:  Optional[bool] = False
