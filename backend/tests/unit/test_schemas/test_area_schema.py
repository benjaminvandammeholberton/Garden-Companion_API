"""
Tests for Area-related Pydantic models for input, update, and output.
"""

from datetime import datetime
import uuid
from pydantic import ValidationError
import pytest

from app.schemas.area_schema import AreaCreate, AreaOut, AreaUpdate


@pytest.mark.parametrize(
    'name, surface, sowing_area, environnement',
    [('test', 3.4, True, 'greenhouse'),
     ('test2', 5, False, 'inddor'),
     ])
def test_create_area_valid(name, surface, sowing_area, environnement):
    """
    Test for Pydantic BaseModel when creating new area with
    valid inputs
    """
    area_data = {
        "name": name,
        "surface": surface,
        "sowing_area": sowing_area,
        "environnement": environnement
    }
    area = AreaCreate(**area_data)
    assert area.name == name
    assert area.surface == surface
    assert area.sowing_area is sowing_area
    assert area.environnement == environnement


@pytest.mark.parametrize("name", [
    None,
    "",
    "this is a very long string more than 25 characters",
    2,
    2.5
])
def test_create_area_invalid_name(name):
    """
    Test for Pydantic BaseModel when creating new area with
    invalid name inputs:

    Edge-cases: None, empty, more than 25 characters,
    integer, float
    """
    area_data = {
        "name": name,
        "surface": 23,
        "sowing_area": True,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaCreate(**area_data)


@pytest.mark.parametrize("surface", [
    None,
    "",
    "string",
])
def test_create_area_invalid_surface(surface):
    """
    Test for Pydantic BaseModel when creating new area with
    invalid surface inputs:

    Edge-cases: None, empty, string,
    """
    area_data = {
        "name": "test",
        "surface": surface,
        "sowing_area": True,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaCreate(**area_data)


@pytest.mark.parametrize("sowing_area", [
    None,
    "",
    "string",
    10
])
def test_create_area_invalid_sowing_area(sowing_area):
    """
    Test for Pydantic BaseModel when creating new area with
    invalid sowing_area inputs:

    Edge-cases: None, empty, string, integer
    """
    area_data = {
        "name": "test",
        "surface": 10,
        "sowing_area": sowing_area,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaCreate(**area_data)


@pytest.mark.parametrize("environnement", [
    None,
    "",
    "this is a very long string more than 25 characters",
    2,
    2.5
])
def test_create_area_invalid_environnement(environnement):
    """
    Test for Pydantic BaseModel when creating new area with
    invalid environnement inputs:

    Edge-cases: None, empty, more than 25 characters,
    integer, float
    """
    area_data = {
        "name": 'test',
        "surface": 23,
        "sowing_area": True,
        "environnement": environnement
    }

    with pytest.raises(ValidationError):
        AreaCreate(**area_data)


@pytest.mark.parametrize(
    'name, surface, sowing_area, environnement',
    [('test', 3.4, True, 'greenhouse'),
     ('test2', 5, False, 'inddor'),
     (None, None, None, None),
     ])
def test_update_area_valid(name, surface, sowing_area, environnement):
    """
    Test for Pydantic BaseModel when updating new area with
    valid inputs
    """
    area_data = {
        "name": name,
        "surface": surface,
        "sowing_area": sowing_area,
        "environnement": environnement
    }
    area = AreaUpdate(**area_data)
    assert area.name == name
    assert area.surface == surface
    assert area.sowing_area is sowing_area
    assert area.environnement == environnement


@pytest.mark.parametrize("name", [
    "",
    "this is a very long string more than 25 characters",
    2,
    2.5
])
def test_update_area_invalid_name(name):
    """
    Test for Pydantic BaseModel when updating new area with
    invalid name inputs:

    Edge-cases: None, empty, more than 25 characters,
    integer, float
    """
    area_data = {
        "name": name,
        "surface": 23,
        "sowing_area": True,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaUpdate(**area_data)


@pytest.mark.parametrize("surface", [
    "",
    "string",
])
def test_update_area_invalid_surface(surface):
    """
    Test for Pydantic BaseModel when updating new area with
    invalid surface inputs:

    Edge-cases: None, empty, string,
    """
    area_data = {
        "name": "test",
        "surface": surface,
        "sowing_area": True,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaUpdate(**area_data)


@pytest.mark.parametrize("sowing_area", [
    "",
    "string",
    10
])
def test_update_area_invalid_sowing_area(sowing_area):
    """
    Test for Pydantic BaseModel when updating new area with
    invalid sowing_area inputs:

    Edge-cases: None, empty, string, integer
    """
    area_data = {
        "name": "test",
        "surface": 10,
        "sowing_area": sowing_area,
        "environnement": "indoor"
    }

    with pytest.raises(ValidationError):
        AreaUpdate(**area_data)


@pytest.mark.parametrize(
    'area_id, name, surface, '
    'sowing_area, environnement, created_at, updated_at',
    [(uuid.uuid4(),
      'test',
      3.4,
      True,
      'greenhouse',
      datetime.now(),
      datetime.now()),
     ])
def test_area_out_valid(
    area_id,
    name,
    surface,
    sowing_area,
    environnement,
    created_at,
    updated_at
):
    """
    Test for Pydantic BaseModel when area is out with
    valid inputs
    """
    area_data = {
        "area_id": area_id,
        "name": name,
        "surface": surface,
        "sowing_area": sowing_area,
        "environnement": environnement,
        "created_at": created_at,
        "updated_at": updated_at
    }
    area = AreaOut(**area_data)
    assert area.area_id == area_id
    assert area.name == name
    assert area.surface == surface
    assert area.sowing_area is sowing_area
    assert area.environnement == environnement
    assert area.created_at == created_at
    assert area.updated_at == updated_at
