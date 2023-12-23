"""
API router for handling User-related operations.
"""

from fastapi import APIRouter, HTTPException, status, Depends
import pymongo

from app.schemas.user_schema import UserAuth, UserOut
from app.api.deps.user_deps import get_current_user
from app.models.user_model import User
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

@user_router.get('/info', summary="Get all users", response_model=UserOut)
async def get_info(current_user: User = Depends(get_current_user)):
    """
    
    """
    return current_user

# @user_router.put('/update', summary="Update user information", response_model=UserOut)
# async def get_info(current_user: User = Depends(get_current_user)):
#     """
    
#     """
#     return current_user

@user_router.get('/byemail/{email}', summary="Get user by email")
async def get_user_by_email(email: str):
    """
    
    """
    user = await UserService.get_user_by_email(email)
    if user:
        return {email: 'already exists'}
    return {email: 'doesn\'t exists'}

@user_router.get('/byusername/{username}', summary="Get user by username")
async def get_user_by_username(username: str):
    """
    
    """
    user = await UserService.get_user_by_username(username)
    if user:
        return {username: 'already exists'}
    return {username: 'doesn\'t exists'}

