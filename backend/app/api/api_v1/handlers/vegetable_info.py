"""

"""
from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.vegetable_info_schema import (
    VegetableInfoOut,
    VegetableInfoCreate,
    VegetableInfoUpdate
)
from app.services.vegetable_info_service import VegetableInfoService

vegetable_info_router = APIRouter()


@vegetable_info_router.get(
    '/',
    summary='Get all vegetable_infos of the user',
    response_model=List[VegetableInfoOut]
)
async def list(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all vegetable_infos of the current user.

    :param current_user: The authenticated user.
    :return: List of vegetable_infos.
    """
    return await VegetableInfoService.list_vegetables(current_user)


@vegetable_info_router.post(
    '/create',
    summary="Create VegetableInfo",
    response_model=VegetableInfoOut
)
async def create_vegetable_info(
    data: VegetableInfoCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to create a new vegetable_info for the current user.

    :param data: Data for creating a new vegetable_info.
    :param current_user: The authenticated user.
    :return: Created vegetable_info.
    """
    return await VegetableInfoService.create_vegetable(current_user, data)


@vegetable_info_router.get(
    '/{vegetable_info_id}',
    summary='Get a vegetable_info by vegetable_info_id',
    response_model=VegetableInfoOut
)
async def retrieve(
    vegetable_info_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to retrieve a vegetable_info by its ID.

    :param vegetable_info_id: ID of the vegetable_info to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved vegetable_info.
    """
    return await VegetableInfoService.retrieve_vegetable(
        current_user,
        vegetable_info_id
    )


@vegetable_info_router.put(
    '/{vegetable_info_id}',
    summary="Update vegetable_info by vegetable_info_id",
    response_model=VegetableInfoOut
)
async def update(
    vegetable_info_id: UUID,
    data: VegetableInfoUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a vegetable_info by its ID.

    :param vegetable_info_id: ID of the vegetable_info to update.
    :param data: Updated data for the vegetable_info.
    :param current_user: The authenticated user.
    :return: The updated vegetable_info.
    """
    return await VegetableInfoService.update_vegetable(
        current_user,
        vegetable_info_id,
        data
    )


@vegetable_info_router.delete(
    '/{vegetable_info_id}',
    summary="Delete vegetable_info by vegetable_info_id"
)
async def delete(
    vegetable_info_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a vegetable_info by its ID.

    :param vegetable_info_id: ID of the vegetable_info to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await VegetableInfoService.delete_vegetable(
        current_user,
        vegetable_info_id
    )
    return None
