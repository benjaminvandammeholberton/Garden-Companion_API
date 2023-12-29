"""
VegetableManagerService module for handling CRUD operations on VegetableManager objects.
"""

from datetime import date, datetime
import json
import pprint
from typing import List
from uuid import UUID

from app.models.vegetable_manager_model import VegetableManager
from app.models.user_model import User
from app.schemas.vegetable_manager_schema import VegetableManagerCreate, VegetableManagerOut, VegetableManagerUpdate
from app.services.area_service import AreaService


class VegetableManagerService:
    @staticmethod
    async def list_vegetables(user: User) -> List[VegetableManagerOut]:
        """
        Retrieve a list of vegetables for a given user.

        :param user: The user for whom to retrieve vegetables.
        :return: List of vegetables.
        """
        vegetables = await VegetableManager.find(VegetableManager.owner.id
                                              == user.id, fetch_links=True).to_list()
 
        return vegetables

    @staticmethod
    async def create_vegetable(user: User, data: VegetableManagerCreate) -> VegetableManagerOut:
        """
        Create a new vegetable for the given user.

        :param user: The user creating the vegetable.
        :param data: VegetableManager creation data.
        :return: Created vegetable.
        """
        area_id = UUID(data.area)
        area = await AreaService.retrieve_area(current_user=user, area_id=area_id)
        if not area:
            raise ValueError(f"Area with ID {data.area} not found.")

        # Modify data with the retrieved area
        data_dict = data.dict()
        data_dict['area'] = area

        vegetable = VegetableManager(**data_dict, owner=user)
        return await vegetable.insert()

    @staticmethod
    async def retrieve_vegetable(current_user: User, vegetable_manager_id: UUID):
        """
        Retrieve a specific vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to retrieve.
        :return: Retrieved vegetable.
        """
        vegetable = await VegetableManager.find_one(VegetableManager.vegetable_manager_id == vegetable_manager_id,
                                   VegetableManager.owner.id == current_user.id)
        return vegetable

    @staticmethod
    async def update_vegetable(current_user: User, vegetable_id: UUID, data: VegetableManagerUpdate):
        """
        Update a vegetable for the current user.

        :param current_user: The current user.
        :param vegetable_id: ID of the vegetable to update.
        :param data: VegetableManager update data.
        :return: Updated vegetable.
        """
        if data.area:
            area_id = UUID(data.area)
            area = await AreaService.retrieve_area(current_user=current_user, area_id=area_id)
            if not area:
                raise ValueError(f"Area with ID {data.area} not found.")
            data.area = area

        # List of date fields to process
        date_fields = ['remove_date', 'sowing_date', 'planting_date', 'harvest_date']

        # Convert each date field to datetime if it exists in the data
        for field in date_fields:
            date_value = getattr(data, field, None)
            if date_value:
                setattr(data, field, datetime.combine(date_value, datetime.min.time()))

        vegetable = await VegetableManagerService.retrieve_vegetable(current_user, vegetable_id)
        await vegetable.update({"$set": data.dict(exclude_unset=True)})
        vegetable.update_updated_at()
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
        vegetable = await VegetableManagerService.retrieve_vegetable(current_user, vegetable_id)
        if vegetable:
            await vegetable.delete()
        return None
    
    @staticmethod
    async def delete_all_vegetables_in_area(current_user: User, area_id: UUID):
        """
        """
        vegetables = await VegetableManagerService.list_vegetables(current_user)
        for vegetable in vegetables:
            if vegetable.area.area_id == area_id:
                await VegetableManagerService.delete_vegetable(current_user, vegetable.vegetable_manager_id)
