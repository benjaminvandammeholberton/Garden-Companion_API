"""
Area-related Pydantic models for input, update, and output.
"""

from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field


class AreaCreate(BaseModel):
    """
    Pydantic model for creating Area.

    Attributes:
    - name (str): The name of the area.
    - surface (int): The surface of the area.
    """
    name: str = Field(..., title='Name', max_length=25, min_length=1)
    surface: float = Field(..., title='Surface')
    sowing_area: bool = Field(..., title='Sowing Area')


class AreaUpdate(BaseModel):
    """
    Pydantic model for updating Area.

    Attributes:
    - name (Optional[str]): The updated name of the area.
    - surface (int): The surface of the area.
    """
    name: Optional[str] = Field(
        None,
        title='Name',
        max_length=25,
        min_length=1
    )
    surface: Optional[float] = Field(None, title='Surface')
    sowing_area: Optional[bool] = Field(None, title='Sowing Area')


class AreaOut(BaseModel):
    """
    Pydantic model for representing Area output.

    Attributes:
    - area_id (UUID): The UUID of the area.
    - surface (int): The surface of the area.
    """
    area_id: UUID
    name: str
    surface: float
    sowing_area: bool
    created_at: datetime
    updated_at: datetime
