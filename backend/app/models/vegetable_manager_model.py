"""
Vegetable Manager model representing a document in a database.
"""

from beanie import Document, Save, before_event
from datetime import datetime, date
from uuid import UUID, uuid4

from pydantic import Field

from app.schemas.vegetable_manager_schema import (
    NoteType, PruneType, WaterType, FertilizeType, HarvestType
)


class VegetableManager(Document):
    """

    """
    vegetable_manager_id: UUID = Field(default_factory=uuid4)
    name: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    variety: str | None = None
    quantity: int | None = None
    quantity_unit: str | None = None
    sowing_date: date | None = None
    planting_date: date | None = None
    ready_to_harvest: date | None = None
    harvest: list[HarvestType] = []
    prune: list[PruneType] = []
    water: list[WaterType] = []
    fertilize: list[FertilizeType] = []
    remove_date: date | None = None
    note: list[NoteType] | None = []
    area: UUID
    owner: UUID

    def __repr__(self) -> str:
        """
        Return a string representation of the VegetableManager object.
        """
        return f"<VegetableManager {self.name}>"

    def __str__(self) -> str:
        """
        Return a string representation of the VegetableManager object.
        """
        return self.name

    def __hash__(self) -> int:
        """
        Return the hash value of the VegetableManager object based on its name.
        """
        return hash(self.name)

    def __eq__(self, other: object) -> bool:
        """
        Check if two VegetableManager objects are equal based on their
            vegetable_manager_id.
        """
        if isinstance(other, VegetableManager):
            return self.vegetable_manager_id == other.vegetable_manager_id
        return False

    @before_event([Save])
    def update_updated_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.now()

    class Settings:
        """
        Settings class for the VegetableManager model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "vegetables_manager"
        bson_encoders = {
            date: lambda x: (
                datetime.combine(x, datetime.min.time())
                if isinstance(x, date)
                else x
            ),
        }
