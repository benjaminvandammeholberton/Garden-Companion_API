"""
Vegetable-info-related Pydantic models for input, update, and output.
"""

from datetime import date, datetime
from uuid import UUID
from pydantic import BaseModel, Field


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
    - germination (int): Soil temperature for germination in Celsius.
    - description (str): Description of the vegetable.
    """
    name: str = Field(max_length=25, min_length=1)
    category: str = Field(max_length=55, min_length=1)
    start_indoor: date | None = None
    start_outdoor: date | None = None
    end: date
    water_needs: int = Field(ge=1, le=3)
    cold_resistance: int = Field(ge=0, le=2)
    spacing_on_row: float = Field(ge=0.0, le=10000.0)
    germination: int = Field(ge=-150, le=150)
    description: str = Field(max_length=755, min_length=1)


class VegetableInfoUpdate(BaseModel):
    """
    Pydantic model for updating VegetableInfo.

    Attributes:
    - name (Optional[str]): The updated name of the vegetable.
    - family (Optional[str]): The updated family of the vegetable.
    - category (Optional[str]): The updated category of the vegetable.
    - start_indoor (Optional[int]): Updated week number to start indoor sowing.
    - start_outdoor (Optional[int]): Updated week number to start outdoor
        sowing.
    - end (Optional[int]): Updated last week number for sowing.
    - water_needs (Optional[int]): Updated water needs on a scale of 0 to 5.
    - cold_resistance (Optional[int]): Updated cold resistance on a scale of 0
        to 3.
    - spacing_on_row (Optional[float]): Updated spacing on row in centimeters.
    - germination (Optional[int]): Updated soil temperature for germination in
        Celsius.
    - description (Optional[str]): Updated description of the vegetable.
    """
    name: str | None = Field(None, max_length=25, min_length=1)
    category: str | None = Field(None, max_length=55, min_length=1)
    start_indoor: int | None = Field(None, ge=1, le=52)
    start_outdoor: int | None = Field(None, ge=1, le=52)
    end: int | None = Field(None, ge=1, le=52)
    water_needs: int | None = Field(None, ge=0, le=5)
    cold_resistance: int | None = Field(None, ge=0, le=5)
    spacing_on_row: float | None = Field(None, ge=0.0, le=10000.0)
    germination: int | None = Field(None, ge=-150, le=150)
    description: str | None = Field(max_length=755, min_length=1)


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
    - germination (int): Soil temperature for germination in Celsius.
    - description (str): Description of the vegetable.
    - created_at (datetime): Creation timestamp of the vegetable info.
    - update_at (datetime): Last update timestamp of the vegetable info.
    """
    vegetable_info_id: UUID
    name: str
    category: str
    start_indoor: datetime | None
    start_outdoor: datetime | None
    end: datetime
    water_needs: int
    cold_resistance: int
    spacing_on_row: float
    germination: int
    description: str
    created_at: datetime
    updated_at: datetime
