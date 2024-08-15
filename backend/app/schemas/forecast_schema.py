from datetime import datetime
from pydantic import BaseModel


class TempType(BaseModel):
    min: int
    max: int


class DailyForecastType(BaseModel):
    date: datetime
    temp: TempType
    wind: int
    rain: int
    weather_icon: str
