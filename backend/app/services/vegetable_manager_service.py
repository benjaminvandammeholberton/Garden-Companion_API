"""
VegetableManagerService module for handling CRUD operations on
    VegetableManager objects.
"""

from typing import List
from uuid import UUID

from app.models.user_model import User
from app.models.vegetable_manager_model import VegetableManager
from app.schemas.vegetable_manager_schema import (
    VegetableManagerCreate,
    VegetableManagerOut,
    VegetableManagerUpdate
)
from app.services.area_service import AreaService
from app.schemas.area_schema import AreaUpdate
from app.models.area_model import Area


class VegetableManagerService:
    @staticmethod
    async def list_vegetables(user: User) -> List[VegetableManager]:
        """
        Retrieve a list of vegetables for a given user.

        :param user: The user for whom to retrieve vegetables.
        :return: List of vegetables.
        """
        vegetables = await VegetableManager.find(
            VegetableManager.owner == user.user_id, fetch_links=True
        ).to_list()
        return vegetables

    @staticmethod
    async def create_vegetable(
        user: User,
        data: VegetableManagerCreate
    ) -> VegetableManagerOut:
        """
        Create a new vegetable for the given user.

        :param user: The user creating the vegetable.
        :param data: VegetableManager creation data.
        :return: Created vegetable.
        """
        # Check if the area exists
        area_id = UUID(data.area)
        area = await AreaService.retrieve_area(
            current_user=user,
            area_id=area_id,
            with_vegetable_details=False
        )
        if not area:
            raise ValueError(f"Area with ID {data.area} not found.")

        # Prepare the new_vegetable data
        data_dict = data.model_dump(exclude_unset=True)
        data_dict['area'] = area.area_id
        vegetable = VegetableManager(**data_dict, owner=user.user_id)

        new_vegetable = await vegetable.create()

        # Add the new vegetable to the area
        await VegetableManagerService.add_vegetable_to_area(
            user, area, new_vegetable.vegetable_manager_id
        )

        return new_vegetable

    @staticmethod
    async def add_vegetable_to_area(
        user: User, area: Area, vegetable_id: UUID
    ):
        """
        Add the ID of the vegetable in the list of vegetables in the area
        """
        area_dict = area.model_dump()
        area_dict['vegetables'].append(vegetable_id)
        new_vegetables_list = AreaUpdate(vegetables=area_dict['vegetables'])
        await AreaService.update_area(user, area.area_id, new_vegetables_list)

    @staticmethod
    async def retrieve_vegetable(
        current_user: User,
        vegetable_manager_id: UUID
    ):
        """
        Retrieve a specific vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to retrieve.
        :return: Retrieved vegetable.
        """
        vegetable = await VegetableManager.find_one(
            VegetableManager.vegetable_manager_id == vegetable_manager_id,
            VegetableManager.owner == current_user.user_id
        )
        return vegetable

    @staticmethod
    async def add_to_list(vegetable: VegetableManager, field: str, data):
        """
        """
        await vegetable.update({"$push": {field: data}})

    @staticmethod
    async def update_vegetable(
        current_user: User,
        vegetable_id: UUID,
        data: VegetableManagerUpdate
    ):
        """
        Update a vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to update.
        :param data: VegetableManager update data.
        :return: Updated vegetable.
        """
        if data.area:
            area_id = UUID(data.area)
            area = await AreaService.retrieve_area(
                current_user=current_user,
                area_id=area_id
            )
            if not area:
                raise ValueError(f"Area with ID {data.area} not found.")
            data.area = area

        vegetable = await VegetableManagerService.retrieve_vegetable(
            current_user,
            vegetable_id
        )

        data_dict = data.model_dump()
        list_to_add = ['fertilize', 'harvest', 'water', 'note', 'prune']
        for item in list_to_add:
            if data_dict[item]:
                await VegetableManagerService.add_to_list(
                    vegetable, item, data_dict[item])

        await vegetable.update(
            {"$set": data.model_dump
             (
                 exclude_unset=True,
                 exclude={'fertilize', 'prune',
                          'harvest', 'water', 'note'}
             )
             }
        )
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
        vegetable = await VegetableManagerService.retrieve_vegetable(
            current_user,
            vegetable_id
        )
        if vegetable:
            await vegetable.delete()
        return None

    @staticmethod
    async def delete_all_vegetables_in_area(current_user: User, area_id: UUID):
        """
        """
        vegetables = await VegetableManagerService.list_vegetables(
            current_user
        )
        for vegetable in vegetables:
            if vegetable.area_id == area_id:
                await VegetableManagerService.delete_vegetable(
                    current_user,
                    vegetable.vegetable_manager_id
                )
