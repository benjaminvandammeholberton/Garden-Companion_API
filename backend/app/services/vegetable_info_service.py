"""
VegetableInfoService module for handling CRUD operations on VegetableInfo
objects.
"""
import json
from pathlib import Path
from typing import List
from uuid import UUID

from app.models.user_model import User
from app.models.vegetable_info_model import VegetableInfo
from app.schemas.vegetable_info_schema import (
    VegetableInfoCreate,
    VegetableInfoUpdate
)


class VegetableInfoService:
    @staticmethod
    async def list_vegetables(user: User) -> List[VegetableInfo]:
        """
        Retrieve a list of vegetables for a given user.

        :param user: The user for whom to retrieve vegetables.
        :return: List of vegetables.
        """
        vegetables = await VegetableInfo.find(VegetableInfo.owner.id
                                              == user.id).to_list()
        return vegetables

    @staticmethod
    async def create_vegetable(
        user: User,
        data: VegetableInfoCreate
    ) -> VegetableInfo:
        """
        Create a new vegetable for the given user.

        :param user: The user creating the vegetable.
        :param data: VegetableInfo creation data.
        :return: Created vegetable.
        """
        vegetable = VegetableInfo(**data.model_dump(), owner=user)
        return await vegetable.insert()

    @staticmethod
    async def retrieve_vegetable(current_user: User, vegetable_info_id: UUID):
        """
        Retrieve a specific vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to retrieve.
        :return: Retrieved vegetable.
        """
        vegetable = await VegetableInfo.find_one(
            VegetableInfo.vegetable_info_id == vegetable_info_id,
            VegetableInfo.owner.id == current_user.id
        )
        return vegetable

    @staticmethod
    async def update_vegetable(
        current_user: User,
        vegetable_id: UUID,
        data: VegetableInfoUpdate
    ):
        """
        Update a vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to update.
        :param data: VegetableInfo update data.
        :return: Updated vegetable.
        """
        vegetable = await VegetableInfoService.retrieve_vegetable(
            current_user,
            vegetable_id
        )
        await vegetable.update({"$set": data.model_dump(exclude_unset=True)})
        await vegetable.save()
        return vegetable

    @staticmethod
    async def delete_vegetable(current_user: User, vegetable_id: UUID):
        """
        Delete a vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to delete.
        :return: None
        """
        vegetable = await VegetableInfoService.retrieve_vegetable(
            current_user,
            vegetable_id
        )
        if vegetable:
            await vegetable.delete()
        return None

    @staticmethod
    async def add_all_vegetable_info_to_user(
        current_user: User
    ):
        # Load initial vegetable information from JSON file
        initial_vegetable_info_file = Path("./vegetable_info_data.json")
        with open(initial_vegetable_info_file, "r") as file:
            initial_vegetable_info = json.load(file)
        # Link the vegetable information to the user
        for veg_info_data in initial_vegetable_info:
            await VegetableInfoService.create_vegetable(
                current_user, VegetableInfoCreate(**veg_info_data)
            )
