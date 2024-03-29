"""
API routes for forecast-related functionality.

This module defines FastAPI routes for retrieving information related to
    cities and forecast weather.
"""
from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.services.forecast_service import ForecastService
from app.services.user_service import UserService


forecast_router = APIRouter()


@forecast_router.get(
    '/get_cities/{postal_code}',
    summary='Get cities by postal code'
)
async def retrieve_cities_by_postal_code(
    postal_code: str,
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve a list of cities based on the provided postal code and update the
        current user with the provided postal code.

    Parameters:
    - `postal_code`: A string representing the postal code for which cities
        are to be retrieved.

    Returns:
    A dictionary containing information about cities based on the provided
        postal code.
    """
    await UserService.update_user({"postal_code": postal_code}, current_user)
    return await ForecastService.retrieve_cities(postal_code)


@forecast_router.get(
    '/get_forecast/{latitude}/{longitude}',
    summary='Get forecast weather by latitude and longitude'
)
async def get_forecast(
    latitude: str, longitude: str,
    _: User = Depends(get_current_user)
):
    """
    Get the forecast weather information based on the provided latitude and
        longitude.

    Parameters:
    - `latitude`: A string representing the latitude for which forecast
        information is to be retrieved.
    - `longitude`: A string representing the longitude for which forecast
        information is to be retrieved.

    Returns:
    Forecast weather information for the specified latitude and longitude.
    """
    return await ForecastService.get_forecast(latitude, longitude)
