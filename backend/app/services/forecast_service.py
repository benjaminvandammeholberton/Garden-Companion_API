"""
Module providing a ForecastService class for retrieving city information and
    weather forecast.

This module defines a service class, ForecastService, that uses asynchronous
    HTTP requests to retrieve information
about cities based on postal codes from GeoNames API and weather forecasts
    based on latitude and longitude from OpenWeatherMap API.
"""
from fastapi import HTTPException
import httpx


class ForecastService:
    """
    Service class for retrieving city information and weather forecast.

    This class provides methods to interact with external APIs (GeoNames and
        OpenWeatherMap)
    to retrieve information about cities based on postal codes and weather
        forecasts based on latitude and longitude.
    """
    @staticmethod
    async def retrieve_cities(postal_code: str) -> dict:
        """
        Retrieve information about cities based on the provided postal code.

        Parameters:
        - `postal_code`: A string representing the postal code for which city
            information is to be retrieved.

        Returns:
        A dictionary containing information about cities based on the provided
            postal code.
        """
        geo_names_api_key = 'garden_companion'
        api_url = (
            "http://api.geonames.org/postalCodeSearchJSON?"
            f"postalcode={postal_code}&username={geo_names_api_key}"
        )

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(api_url)

            if response.status_code == 200:
                return response.json()

            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="GeoNames API request failed")

        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error during GeoNames API request: {str(e)}"
            )

    @staticmethod
    async def get_forecast(latitude: str, longitude: str) -> dict:
        """
        Retrieve weather forecast based on the provided latitude and longitude.

        Parameters:
        - `latitude`: A string representing the latitude for which weather
            forecast information is to be retrieved.
        - `longitude`: A string representing the longitude for which weather
            forecast information is to be retrieved.

        Returns:
        Weather forecast information for the specified latitude and longitude.
        """
        openweathermap_api_key = '9490af8425181b4e268e0b8e436d5caa'
        api_url = (
            "https://api.openweathermap.org/data/3.0/onecall?"
            f"lat={latitude}&lon={longitude}&exclude=hourly,"
            f"minutely,alerts&appid={openweathermap_api_key}"
        )

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(api_url)

            if response.status_code == 200:
                return response.json()

            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="OpenWeatherMap API request failed")

        except httpx.HTTPError as e:
            raise HTTPException(
                status_code=500,
                detail=f"Error during OpenWeatherMap API request: {str(e)}")
