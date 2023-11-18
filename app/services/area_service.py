"""
AreaService module for handling CRUD operations on Area objects.
"""

from typing import List
from uuid import UUID

from app.models.area_model import Area
from app.models.user_model import User
from app.schemas.area_schema import AreaCreate, AreaUpdate


class AreaService:
    @staticmethod
    async def list_areas(user: User) -> List[Area]:
        """
        Retrieve a list of areas for a given user.

        :param user: The user for whom to retrieve areas.
        :return: List of areas.
        """
        areas = await Area.find(Area.owner.id
                                              == user.id).to_list()
        print(areas)
        return areas

    @staticmethod
    async def create_area(user: User, data: AreaCreate) -> Area:
        """
        Create a new area for the given user.

        :param user: The user creating the area.
        :param data: Area creation data.
        :return: Created area.
        """
        area = Area(**data.dict(), owner=user)
        return await area.insert()

    @staticmethod
    async def retrieve_area(current_user: User, area_id: UUID):
        """
        Retrieve a specific area for the current user.

        :param current_user: The current user.
        :param area_id: ID of the area to retrieve.
        :return: Retrieved area.
        """
        area = await Area.find_one(Area.area_id == area_id,
                                   Area.owner.id == current_user.id)
        return area

    @staticmethod
    async def update_area(current_user: User, area_id: UUID, data: AreaUpdate):
        """
        Update a area for the current user.

        :param current_user: The current user.
        :param area_id: ID of the area to update.
        :param data: Area update data.
        :return: Updated area.
        """
        area = await AreaService.retrieve_area(current_user, area_id)
        await area.update({"$set": data.dict(exclude_unset=True)})
        area.update_updated_at()
        await area.save()
        return area

    @staticmethod
    async def delete_area(current_user: User, area_id: UUID):
        """
        Delete a area for the current user.

        :param current_user: The current user.
        :param area_id: ID of the area to delete.
        :return: None
        """
        area = await AreaService.retrieve_area(current_user, area_id)
        if area:
            await area.delete()
        return None
