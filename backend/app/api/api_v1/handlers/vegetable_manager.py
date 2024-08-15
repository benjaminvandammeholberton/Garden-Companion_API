"""

"""
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from uuid import UUID

from app.core.dependencies import get_current_user
from app.schemas.vegetable_manager_schema import (
    VegetableManagerCreate,
    VegetableManagerOut,
    VegetableManagerUpdate
)
from app.services.user_service import UserService
from app.services.vegetable_manager_service import VegetableManagerService
from app.models.user_model import User
from app.models.vegetable_manager_model import VegetableManager


vegetable_manager_router = APIRouter()


@vegetable_manager_router.get(
    '/',
    summary='Get all vegetable_managers of the user',
    response_model=List[VegetableManagerOut]
)
async def list(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all vegetable_managers of the current user.

    :param current_user: The authenticated user.
    :return: List of vegetable_managers.
    """
    return await VegetableManagerService.list_vegetables(current_user)


@vegetable_manager_router.get(
    '/all/{username}',
    summary='Get all vegetables from a specific user',
    response_model=List[VegetableManagerOut]
)
async def get_vegetables_from_user(username: str, _=Depends(get_current_user)):
    """
    Endpoint to retrieve all vegetables_manager from a specific user.

    :param username: the username of the user we want to get vegetables
    :return: List of vegetable_manger
    """
    user = await UserService.get_user_by_username(username)
    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Username doesn't exist"
        )
    return await VegetableManagerService.list_vegetables(user=user)


@vegetable_manager_router.post(
    '/create',
    summary="Create VegetableManager",
    response_model=VegetableManagerOut
)
async def create_vegetable_manager(
    data: VegetableManagerCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to create a new vegetable_manager for the current user.

    :param data: Data for creating a new vegetable_manager.
    :param current_user: The authenticated user.
    :return: Created vegetable_manager.
    """
    return await VegetableManagerService.create_vegetable(current_user, data)


@vegetable_manager_router.get(
    '/{vegetable_manager_id}',
    summary='Get a vegetable_manager by vegetable_manager_id',
    response_model=VegetableManager
)
async def retrieve(
    vegetable_manager_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to retrieve a vegetable_manager by its ID.

    :param vegetable_manager_id: ID of the vegetable_manager to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved vegetable_manager.
    """
    return await VegetableManagerService.retrieve_vegetable(
        current_user,
        vegetable_manager_id
    )


@vegetable_manager_router.put(
    '/{vegetable_manager_id}',
    summary="Update vegetable_manager by vegetable_manager_id",
    response_model=VegetableManagerOut
)
async def update(
    vegetable_manager_id: UUID,
    data: VegetableManagerUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a vegetable_manager by its ID.

    :param vegetable_manager_id: ID of the vegetable_manager to update.
    :param data: Updated data for the vegetable_manager.
    :param current_user: The authenticated user.
    :return: The updated vegetable_manager.
    """
    return await VegetableManagerService.update_vegetable(
        current_user,
        vegetable_manager_id,
        data
    )


@vegetable_manager_router.delete(
    '/{vegetable_manager_id}',
    summary="Delete vegetable_manager by vegetable_manager_id",
    response_model=None
)
async def delete(
    vegetable_manager_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a vegetable_manager by its ID.

    :param vegetable_manager_id: ID of the vegetable_manager to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await VegetableManagerService.delete_vegetable(
        current_user,
        vegetable_manager_id
    )
    return None
