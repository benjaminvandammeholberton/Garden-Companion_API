"""
"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.area_schema import AreaOut, AreaCreate, AreaUpdate
from app.services.area_service import AreaService
from app.services.user_service import UserService

area_router = APIRouter()


@area_router.get(
    '/',
    summary='Get all areas of the user',
    response_model=List[AreaOut]
)
async def list(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all areas of the current user.

    :param current_user: The authenticated user.
    :return: List of areas.
    """
    return await AreaService.list_areas(current_user)


@area_router.get(
    '/all/{username}',
    summary='Get all areas from a specific user',
    response_model=List[AreaOut]
)
async def get_vegetables_from_user(username: str, _=Depends(get_current_user)):
    """
    Endpoint to retrieve all areas from a specific user.

    :param username: the username of the user we want to get areas
    :return: List of areas
    """
    user = await UserService.get_user_by_username(username)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Username doesn't exist"
        )
    return await AreaService.list_areas(user=user)


@area_router.post('/create', summary="Create Area", response_model=AreaOut)
async def create_area(
    data: AreaCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to create a new area for the current user.

    :param data: Data for creating a new area.
    :param current_user: The authenticated user.
    :return: Created area.
    """
    return await AreaService.create_area(current_user, data)


@area_router.get(
    '/{area_id}',
    summary='Get a area by area_id',
    response_model=AreaOut
)
async def retrieve(area_id: UUID,
                   current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve a area by its ID.

    :param area_id: ID of the area to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved area.
    """
    return await AreaService.retrieve_area(current_user, area_id)


@area_router.put(
    '/{area_id}',
    summary="Update area by area_id",
    response_model=AreaOut
)
async def update(
    area_id: UUID,
    data: AreaUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a area by its ID.

    :param area_id: ID of the area to update.
    :param data: Updated data for the area.
    :param current_user: The authenticated user.
    :return: The updated area.
    """
    return await AreaService.update_area(current_user, area_id, data)


@area_router.delete('/{area_id}', summary="Delete area by area_id")
async def delete(
    area_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a area by its ID.

    :param area_id: ID of the area to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await AreaService.delete_area(current_user, area_id)
    return None
