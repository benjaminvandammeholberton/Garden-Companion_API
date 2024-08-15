"""
Area model representing a document in a database.
"""

from beanie import Document, Save, before_event
from datetime import datetime
from pydantic import Field
from uuid import UUID, uuid4

from app.schemas.area_schema import EnvironnementType


class Area(Document):
    """
    """
    area_id: UUID = Field(default_factory=uuid4)
    name: str = Field(max_length=25, min_length=1)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    surface: float
    sowing_area: bool
    owner: UUID
    environnement: EnvironnementType
    vegetables: list[UUID] = []

    def __repr__(self) -> str:
        """
        Return a string representation of the Area object.
        """
        return f"<Area {self.name}>"

    def __str__(self) -> str:
        """
        Return a string representation of the Area object.
        """
        return self.name

    def __hash__(self) -> int:
        """
        Return the hash value of the Area object based on its name.
        """
        return hash(self.name)

    def __eq__(self, other: object) -> bool:
        """
        Check if two Area objects are equal based on their area_id.
        """
        if isinstance(other, Area):
            return self.area_id == other.area_id
        return False

    @before_event([Save])
    def update_updated_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.now()

    class Settings:
        """
        Settings class for the Area model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "areas"
