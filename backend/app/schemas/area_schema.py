"""
Area-related Pydantic models for input, update, and output.
"""

from datetime import datetime
from enum import Enum
from uuid import UUID
from pydantic import BaseModel, Field

from app.schemas.vegetable_manager_schema import VegetableManagerOut


class EnvironnementType(str, Enum):
    outdoor = "outdoor"
    indoor = "indoor"
    greenhouse = "greenhouse"


class AreaCreate(BaseModel):
    """
    Pydantic model for creating Area.
    """
    name: str = Field(max_length=25, min_length=1)
    surface: float = Field(ge=0, le=10000)
    sowing_area: bool
    environnement: EnvironnementType


class AreaUpdate(BaseModel):
    """
    Pydantic model for updating Area.
    """
    name: str | None = Field(
        default=None,
        max_length=25,
        min_length=1
    )
    surface: float | None = Field(default=None, ge=0, le=10000)
    sowing_area: bool | None = None
    environnement: EnvironnementType | None = None
    vegetables: list[UUID] | None = None


class AreaOut(AreaCreate):
    """
    Pydantic model for representing Area output.
    """
    area_id: UUID
    created_at: datetime
    updated_at: datetime


class AreaOutWithoutVegetablesData(AreaOut):
    """
    Pydantic model for representing Area output without vegetables details.
    """
    vegetables: list[UUID]


class AreaOutWithVegetablesData(AreaOut):
    """
    Pydantic model for representing Area output with vegetables details.
    """
    vegetables: list[VegetableManagerOut]
