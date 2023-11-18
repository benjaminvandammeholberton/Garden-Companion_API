"""
API router for handling User-related operations.
"""

from fastapi import APIRouter, HTTPException, status
import pymongo

from app.schemas.user_schema import UserAuth, UserOut
from app.services.user_service import UserService

# APIRouter instance for User-related routes
user_router = APIRouter()


@user_router.post('/create', summary="Create new user", response_model=UserOut)
async def create_user(data: UserAuth):
    """
    Endpoint to create a new user.

    :param data: Data for creating a new user.
    :return: Created user details.
    :raises HTTPException 400: If a user with the same email or\
        username already exists.
    """
    try:
        return await UserService.create_user(data)
    except pymongo.errors.DuplicateKeyError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email or username already exist"
        )
