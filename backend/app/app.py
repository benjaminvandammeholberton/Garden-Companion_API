"""
This is the entry point for the Garden Companion backend application.
"""
from beanie import init_beanie
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient

from app.api.api_v1.router import router
from app.core.config import settings
from app.models.area_model import Area
from app.models.todo_model import Todo
from app.models.user_model import User
from app.models.vegetable_info_model import VegetableInfo
from app.models.vegetable_manager_model import VegetableManager


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Initialize the application on startup.

    This function is executed when the application starts up. It connects to
    the MongoDB database using the provided connection string and initializes
    the Beanie ORM with the specified document models. It also includes the
    router for the API endpoints.
    """
    db_client = AsyncIOMotorClient(
        settings.MONGO_CONNECTION_STRING
    ).garden_companion

    await init_beanie(
        database=db_client,
        document_models=[
            User,
            Todo,
            VegetableInfo,
            Area,
            VegetableManager
        ]
    )
    app.include_router(router, prefix=settings.API_V1_STR)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/', summary="Test is the server is running", tags=["test_server"])
def test_server():
    """
    This function is a test endpoint for checking if the server is running.
    """
    return {'message': 'server is running'}
