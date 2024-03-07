"""
Vegetable-manager-related Pydantic models for input, update, and output.
"""

from datetime import datetime, date
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, conint, confloat
from app.models.area_model import Area

from app.schemas.area_schema import AreaOut


class VegetableManagerCreate(BaseModel):
    """
    Pydantic model for creating VegetableManager.

    Attributes:
    - name (str): The name of the vegetable.
    """
    name: str = Field(..., title='Name', max_length=25, min_length=1)
    variety: Optional[str] = Field(
        None, title='Variety', max_length=25, min_length=1)
    quantity: conint(ge=1, le=1000) = Field(..., title='Quantity')
    sowed: bool = Field(..., title='Sowed')
    planted: bool = Field(..., title='Planted')
    sowing_date: Optional[date] = Field(None, title='Sowing date')
    planting_date: Optional[date] = Field(None, title='Planting date')
    harvest_date: Optional[date] = Field(None, title='Harvest date')
    harvest_quantity: Optional[confloat(ge=0, le=1000)] = Field(
        None, title='Harvest quantity')
    harvest_unit: Optional[str] = Field(
        None, title='Harvest unit', max_length=10, min_length=1)
    remove_date: Optional[date] = Field(None, title='Remove date')
    notes: Optional[str] = Field(
        None, title='Notes', max_length=755, min_length=1)
    area: Optional[str] = Field(
        None, title='Area', max_length=50, min_length=1)


class VegetableManagerUpdate(BaseModel):
    """
    Pydantic model for updating VegetableManager.

    Attributes:
    - name (Optional[str]): The updated name of the vegetable.
    """
    name: Optional[str] = Field(
        None, title='Name', max_length=25, min_length=1)
    variety: Optional[str] = Field(
        None, title='Variety', max_length=25, min_length=1)
    quantity: Optional[conint(ge=1, le=1000)] = Field(None, title='Quantity')
    sowed: Optional[bool] = Field(None, title='Sowed')
    planted: Optional[bool] = Field(None, title='Planted')
    sowing_date: Optional[date] = Field(None, title='Sowing date')
    planting_date: Optional[date] = Field(None, title='Planting date')
    harvest_date: Optional[date] = Field(None, title='Harvest date')
    harvest_quantity: Optional[confloat(ge=0, le=1000)] = Field(
        None, title='Harvest quantity')
    harvest_unit: Optional[str] = Field(
        None, title='Harvest unit', max_length=10, min_length=1)
    remove_date: Optional[date] = Field(None, title='Remove date')
    notes: Optional[str] = Field(
        None, title='Notes', max_length=755, min_length=1)
    area: Optional[str] = Field(
        None, title='Area', max_length=50, min_length=1)


class VegetableManagerOut(BaseModel):
    """
    Pydantic model for representing VegetableManager output.

    Attributes:
    - vegetable_manager_id (UUID): The UUID of the vegetable manager.
    - name (str): The name of the vegetable.
    """
    vegetable_manager_id: UUID
    name: str
    variety: Optional[str]
    quantity: int
    sowed: bool
    planted: bool
    sowing_date: Optional[date]
    planting_date: Optional[date]
    harvest_date: Optional[date]
    harvest_quantity: Optional[float]
    harvest_unit: Optional[str]
    remove_date: Optional[date]
    notes: Optional[str]
    area: Optional[AreaOut]
