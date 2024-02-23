"""
AreaService module for handling CRUD operations on Area objects.
"""

from uuid import UUID

from app.models.area_model import Area
from app.models.user_model import User
from app.schemas.area_schema import AreaCreate, AreaUpdate


class AreaService:
    @staticmethod
    async def list_areas(user: User) -> list[Area]:
        """
        Retrieve a list of areas for a given user
        """
        areas = await Area.find(
            Area.owner.id == user.id
        ).to_list()
        return areas

    @staticmethod
    async def create_area(user: User, data: AreaCreate) -> Area:
        """
        Create a new area for the given user
        """
        area = Area(**data.model_dump(), owner=user)
        return await area.insert()

    @staticmethod
    async def retrieve_area(current_user: User, area_id: UUID):
        """
        Retrieve a specific area for the current user
        """
        area = await Area.find_one(Area.area_id == area_id,
                                   Area.owner.id == current_user.id)
        return area

    @staticmethod
    async def update_area(current_user: User, area_id: UUID, data: AreaUpdate):
        """
        Update a area for the current user
        """
        area = await AreaService.retrieve_area(current_user, area_id)
        await area.update({"$set": data.model_dump(exclude_unset=True)})
        area.update_updated_at()
        await area.save()
        return area

    @staticmethod
    async def delete_area(current_user: User, area_id: UUID):
        """
        Delete a area for the current user and all vegetables associated
        """
        from app.services.vegetable_manager_service \
            import VegetableManagerService
        area = await AreaService.retrieve_area(current_user, area_id)
        if area:
            await VegetableManagerService.delete_all_vegetables_in_area(
                current_user, area_id
            )
            await area.delete()
        return None
