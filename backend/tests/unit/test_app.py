"""
Tests for app.py
"""

from fastapi.testclient import TestClient
from motor.motor_asyncio import AsyncIOMotorClient
import pytest

from app.app import app
from app.core.config import settings


@pytest.fixture(scope="module")
def test_client():
    return TestClient(app)


def test_root_endpoint(test_client):
    """
    Test that the server is running and return the right response
    """
    response = test_client.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'server is running'}


@pytest.mark.asyncio
async def test_database_connexion():
    """
    Test connexion to MongoDB database with the connection string
    from settings.
    """
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)

    try:
        database_names = await db_client.list_database_names()
        assert isinstance(database_names, list)

    finally:
        db_client.close()


@pytest.mark.asyncio
async def test_database_garden_companion():
    """
    Test that the database 'garden_companion' exists
    """
    db_client = AsyncIOMotorClient(settings.MONGO_CONNECTION_STRING)

    try:
        database_names = await db_client.list_database_names()
        assert 'garden_companion' in database_names

    finally:
        db_client.close()


@pytest.mark.asyncio
async def test_database_collections():
    """
    Test that the collection used for the app are presents
    """
    db_client = AsyncIOMotorClient(
        settings.MONGO_CONNECTION_STRING)
    collections_to_verify = ['users', 'areas',
                             'todos', 'vegetables_info', 'vegetables_manager']
    database = db_client.garden_companion

    try:
        existing_collections = await database.list_collection_names()
        for collecion in existing_collections:
            assert collecion in collections_to_verify

    finally:
        db_client.close()


def test_app_exists():
    """
    Test that the fast API is created and the title, the openapi_url
    and lifespan is well set
    """
    assert app is not None
    assert app.title is settings.PROJECT_NAME
    assert app.openapi_url == f"{settings.API_V1_STR}/openapi.json"
