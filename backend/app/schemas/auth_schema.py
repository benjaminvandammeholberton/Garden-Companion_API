"""
Token schema and payload classes for handling authentication tokens.
"""

from pydantic import BaseModel
from uuid import UUID


class TokenSchema(BaseModel):
    """
    TokenSchema class for representing authentication tokens.

    Attributes:
    - access_token (str): The access token.
    - refresh_token (str): The refresh token.
    """
    access_token: str
    refresh_token: str


class TokenPayload(BaseModel):
    """
    TokenPayload class for representing the payload of an authentication token.

    Attributes:
    - sub (UUID): The subject of the token (user ID).
    - exp (int): The expiration time of the token.
    """
    sub: UUID | None = None
    exp: int | None = None
