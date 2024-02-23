"""
API routes for forecast-related functionality.

This module defines FastAPI routes for retrieving information related to cities and forecast weather.
"""
from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.services.forecast_service import ForecastService


forecast_router = APIRouter()

@forecast_router.get('/get_cities/{postal_code}', summary='Get cities by postal code')
async def retrieve_cities_by_postal_code(postal_code: str, current_user: User = Depends(get_current_user)):
    """
    Retrieve a list of cities based on the provided postal code.

    Parameters:
    - `postal_code`: A string representing the postal code for which cities are to be retrieved.
    - `current_user`: An authenticated user obtained from the dependency.

    Returns:
    A dictionary containing information about cities based on the provided postal code.
    """
    return await ForecastService.retrieve_cities(postal_code)

@forecast_router.get('/get_forecast/{latitude}/{longitude}', summary='Get forecast weather by latitude and longitude')
async def get_forecast(latitude: str, longitude: str, current_user: User = Depends(get_current_user)):
    """
    Get the forecast weather information based on the provided latitude and longitude.

    Parameters:
    - `latitude`: A string representing the latitude for which forecast information is to be retrieved.
    - `longitude`: A string representing the longitude for which forecast information is to be retrieved.
    - `current_user`: An authenticated user obtained from the dependency.

    Returns:
    Forecast weather information for the specified latitude and longitude.
    """
    return await ForecastService.get_forecast(latitude, longitude)