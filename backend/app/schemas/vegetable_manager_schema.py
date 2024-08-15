"""
Vegetable-manager-related Pydantic models for input, update, and output.
"""

from datetime import date
from uuid import UUID
from pydantic import BaseModel, Field


class HarvestType(BaseModel):
    """
    """
    date: date
    quantity: float | None = Field(None, ge=0, le=10000)
    unit: str | None = Field(None, min_length=1, max_length=20)
    note: str | None = Field(None, min_length=1, max_length=500)


class WaterType(BaseModel):
    """
    """
    date: date
    quantity: float | None = Field(None, ge=0, le=10000)
    unit: str | None = Field(None, min_length=1, max_length=20)
    note: str | None = Field(None, min_length=1, max_length=500)


class FertilizeType(BaseModel):
    """
    """
    name: str = Field(None, min_length=1, max_length=30)
    date: date
    quantity: float | None = Field(None, ge=0, le=10000)
    unit: str | None = Field(None, min_length=1, max_length=20)
    note: str | None = Field(None, min_length=1, max_length=500)


class NoteType(BaseModel):
    """
    """
    title: str = Field(None, min_length=1, max_length=30)
    date: date
    note: str | None = Field(None, min_length=1, max_length=500)


class PruneType(BaseModel):
    """
    """
    date: date
    note: str | None = Field(None, min_length=1, max_length=500)


class VegetableManagerCreate(BaseModel):
    """
    Pydantic model for creating VegetableManager.
    """
    name: str = Field(max_length=25, min_length=1)
    variety: str | None = Field(max_length=25, min_length=1)
    quantity: int | None = Field(None, ge=0, le=1000)
    quantity_unit: str | None = None
    sowing_date: date | None = None
    planting_date: date | None = None
    note: list[NoteType] | None = None
    area: str | None = Field(max_length=50, min_length=1)


class VegetableManagerUpdate(BaseModel):
    """
    Pydantic model for updating VegetableManager.
    """
    name: str | None = Field(None, max_length=25, min_length=1)
    variety: str | None = Field(None, max_length=25, min_length=1)
    quantity: int | None = Field(None, gt=0, le=1000)
    quantity_unit: str | None = None
    sowing_date: date | None = None
    planting_date: date | None = None
    ready_to_harvest: date | None = None
    harvest: HarvestType | None = None
    fertilize: FertilizeType | None = None
    prune: PruneType | None = None
    water: WaterType | None = None
    remove_date: date | None = None
    note: NoteType | None = None
    area: str | None = Field(None, max_length=50, min_length=1)


class VegetableManagerOut(BaseModel):
    """
    Pydantic model for representing VegetableManager output.

    Attributes:
    - vegetable_manager_id (UUID): The UUID of the vegetable manager.
    - name (str): The name of the vegetable.
    """
    vegetable_manager_id: UUID
    name: str
    variety: str | None
    quantity: int | None
    quantity_unit: str | None
    sowing_date: date | None
    planting_date: date | None
    ready_to_harvest: date | None
    harvest: list[HarvestType] | None
    fertilize: list[FertilizeType] | None
    water: list[WaterType] | None
    prune: list[PruneType] | None
    remove_date: date | None
    note: list[NoteType] | None
    area: UUID | None
