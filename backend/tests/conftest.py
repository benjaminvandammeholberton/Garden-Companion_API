from fastapi.testclient import TestClient
import pytest

from app.app import app
from app.api.api_v1.router import router

from app.core.config import settings


@pytest.fixture(scope="module")
def test_client():
    app.include_router(router, prefix=settings.API_V1_STR)
    client = TestClient(app)
    return client
