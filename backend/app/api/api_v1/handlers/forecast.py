"""
API routes for forecast-related functionality.

This module defines FastAPI routes for retrieving information related to
    cities and forecast weather.
"""

from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.forecast_schema import DailyForecastType
from app.services.forecast_service import ForecastService

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
    return await ForecastService.retrieve_cities(postal_code)


@forecast_router.get(
    '/',
    summary='Get forecast weather',
    response_model=list[DailyForecastType]
)
async def get_forecast(
    current_user: User = Depends(get_current_user)
):
    """
    Get the forecast weather information based on the provided latitude and
        longitude for the current user.

    Returns:
    Forecast weather information for the user latitude and longitude.
    """
    latitude = current_user.localisation.latitude
    longitude = current_user.localisation.longitude

    return await ForecastService.get_forecast(latitude, longitude)
