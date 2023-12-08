"""
Vegetable-info-related Pydantic models for input, update, and output.
"""

from datetime import date, datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, conint, confloat

from app.schemas.area_schema import AreaOut


class VegetableInfoCreate(BaseModel):
    """
    Pydantic model for creating VegetableInfo.

    Attributes:
    - name (str): The name of the vegetable.
    - family (str): The family of the vegetable.
    - category (str): The category of the vegetable.
    - start_indoor (int): Week number to start indoor sowing.
    - start_outdoor (int): Week number to start outdoor sowing.
    - end (int): Last week number for sowing.
    - water_needs (int): Water needs on a scale of 0 to 5.
    - cold_resistance (int): Cold resistance on a scale of 0 to 3.
    - spacing_on_row (float): Spacing on row in centimeters.
    - soil_temperature (int): Soil temperature for germination in Celsius.
    - description (str): Description of the vegetable.
    """
    name: str = Field(..., title='Name', max_length=25, min_length=1)
    family: str = Field(..., title='Family', max_length=55, min_length=1)
    # category: str = Field(..., title='Category', max_length=25, min_length=1)
    start_indoor: date = Field(None, title='Date to start indoor sowing')
    start_outdoor: date = Field(..., title='Date to start outdoor sowing')
    end: date = Field(..., title='Last date for sowing')
    water_needs: conint(ge=0, le=5) = Field(..., title='Water Needs (scale: 0 to 5)')
    cold_resistance: conint(ge=0, le=5) = Field(..., title='Cold Resistance (scale: 0 to 3)')
    spacing_on_row: confloat(ge=0.0, le=10000.0) = Field(..., title='Spacing on row (in centimeters)')
    soil_temperature: conint(ge=-150, le=+150) = Field(..., title='Soil temperature for germination (in Celsius)')
    description: str = Field(..., title='Description', max_length=755, min_length=1)


class VegetableInfoUpdate(BaseModel):
    """
    Pydantic model for updating VegetableInfo.

    Attributes:
    - name (Optional[str]): The updated name of the vegetable.
    - family (Optional[str]): The updated family of the vegetable.
    - category (Optional[str]): The updated category of the vegetable.
    - start_indoor (Optional[int]): Updated week number to start indoor sowing.
    - start_outdoor (Optional[int]): Updated week number to start outdoor sowing.
    - end (Optional[int]): Updated last week number for sowing.
    - water_needs (Optional[int]): Updated water needs on a scale of 0 to 5.
    - cold_resistance (Optional[int]): Updated cold resistance on a scale of 0 to 3.
    - spacing_on_row (Optional[float]): Updated spacing on row in centimeters.
    - soil_temperature (Optional[int]): Updated soil temperature for germination in Celsius.
    - description (Optional[str]): Updated description of the vegetable.
    """
    name: Optional[str] = Field(None, title='Name', max_length=25, min_length=1)
    family: Optional[str] = Field(None, title='Family', max_length=55, min_length=1)
    # category: Optional[str] = Field(None, title='Category', max_length=25, min_length=1)
    start_indoor: Optional[conint(ge=1, le=52)] = Field(None, title='Week number to start indoor sowing')
    start_outdoor: Optional[conint(ge=1, le=52)] = Field(None, title='Week number to start outdoor sowing')
    end: Optional[conint(ge=1, le=52)] = Field(None, title='Last week number for sowing')
    water_needs: Optional[conint(ge=0, le=5)] = Field(None, title='Water Needs (scale: 0 to 5)')
    cold_resistance: Optional[conint(ge=0, le=5)] = Field(None, title='Cold Resistance (scale: 0 to 3)')
    spacing_on_row: Optional[confloat(ge=0.0, le=10000.0)] = Field(None, title='Spacing on row (in centimeters)')
    soil_temperature: Optional[conint(ge=-150, le=+150)] = Field(None, title='Soil temperature for germination (in Celsius)')
    description: Optional[str] = Field(None, title='Description', max_length=755, min_length=1)


class VegetableInfoOut(BaseModel):
    """
    Pydantic model for representing VegetableInfo output.

    Attributes:
    - vegetable_info_id (UUID): The UUID of the vegetable info.
    - name (str): The name of the vegetable.
    - family (str): The family of the vegetable.
    - category (str): The category of the vegetable.
    - start_indoor (int): Week number to start indoor sowing.
    - start_outdoor (int): Week number to start outdoor sowing.
    - end (int): Last week number for sowing.
    - water_needs (int): Water needs on a scale of 0 to 5.
    - cold_resistance (int): Cold resistance on a scale of 0 to 3.
    - spacing_on_row (float): Spacing on row in centimeters.
    - soil_temperature (int): Soil temperature for germination in Celsius.
    - description (str): Description of the vegetable.
    - created_at (datetime): Creation timestamp of the vegetable info.
    - update_at (datetime): Last update timestamp of the vegetable info.
    """
    vegetable_info_id: UUID
    name: str
    family: str
    # category: str
    start_indoor: datetime
    start_outdoor: datetime
    end: datetime
    water_needs: int
    cold_resistance: int
    spacing_on_row: float
    soil_temperature: int
    description: str
    created_at: datetime
    updated_at: datetime
