"""
AreaService module for handling CRUD operations on Area objects.
"""

from uuid import UUID

from app.models.area_model import Area
from app.models.user_model import User
from app.schemas.area_schema import (
    AreaCreate, AreaUpdate
)


class AreaService:
    @staticmethod
    async def list_areas(user: User) -> list[Area]:
        """
        Retrieve a list of areas for a given user
        """
        areas = await Area.find(
            Area.owner == user.user_id
        ).to_list()
        from app.services.vegetable_manager_service import (
            VegetableManagerService
        )
        for area in areas:
            list_vegetable = []
            for vegetable_id in area.vegetables:
                vegetable = await VegetableManagerService.retrieve_vegetable(
                    user,
                    vegetable_id
                )
                list_vegetable.append(vegetable)
                area.vegetables = list_vegetable
        return areas

    @staticmethod
    async def create_area(user: User, data: AreaCreate) -> Area:
        """
        Create a new area for the current user
        """
        area = Area(**data.model_dump(), owner=user.user_id)
        return await area.create()

    @staticmethod
    async def retrieve_area(
        current_user: User,
        area_id: UUID,
        with_vegetable_details: bool = True
    ) -> Area | None:
        """
        Retrieve a specific area for the current user
        """
        area = await Area.find_one(Area.area_id == area_id,
                                   Area.owner == current_user.user_id)
        from app.services.vegetable_manager_service import (
            VegetableManagerService
        )
        if with_vegetable_details:
            if area:
                list_vegetable = []
                for vegetable_id in area.vegetables:
                    vegetable = await (VegetableManagerService
                                       .retrieve_vegetable(
                                           current_user,
                                           vegetable_id
                                       ))
                    list_vegetable.append(vegetable)
                    area.vegetables = list_vegetable
        return area

    @staticmethod
    async def update_area(
        current_user: User, area_id: UUID, data: AreaUpdate
    ) -> Area | None:
        """
        Update a area for the current user
        """
        area = await AreaService.retrieve_area(current_user, area_id)
        if area:
            await area.update({"$set": data.model_dump(exclude_unset=True)})
            await area.save()
        return area

    @staticmethod
    async def delete_area(current_user: User, area_id: UUID) -> None:
        """
        Delete a area for the current user
        """
        area = await AreaService.retrieve_area(current_user, area_id)
        if area:
            await area.delete()
        return None
