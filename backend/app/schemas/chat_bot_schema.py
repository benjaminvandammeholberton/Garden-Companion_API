"""
Chat-Bot related Pydantic models
"""

from pydantic import BaseModel, Field


class ChatBotRequest(BaseModel):
    """
    """
    user_input: str = Field(max_length=100, alias='user-input')
