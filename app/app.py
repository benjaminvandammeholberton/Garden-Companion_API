"""
FastAPI application with MongoDB integration.
"""

from fastapi import FastAPI
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

from app.api.api_v1.router import router
from app.core.config import settings
from app.models.area_model import Area
from app.models.todo_model import Todo
from app.models.user_model import User
from app.models.vegetable_info_model import VegetableInfo

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)


@app.on_event("startup")
async def app_init():
    """
    Initialize crucial application services.

    Connects to MongoDB and initializes Beanie with User and Todo models.
    """

    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)\
        .garden_companion

    await init_beanie(
        database=db_client,
        document_models=[
            User,
            Todo,
            VegetableInfo,
            Area
        ]
    )
    app.include_router(router, prefix=settings.API_V1_STR)
