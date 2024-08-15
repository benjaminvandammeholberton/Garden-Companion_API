"""
Vegetable Info model representing a document in a database.
"""

from beanie import Document, Link, before_event, Save
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import Field

from app.models.user_model import User


class VegetableInfo(Document):
    """

    """
    vegetable_info_id: UUID = Field(default_factory=uuid4)
    name: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    category: str
    start_indoor: datetime | None = None
    start_outdoor: datetime | None = None
    end: datetime
    water_needs: int
    cold_resistance: int
    spacing_on_row: float
    germination: int
    description: str
    owner: Link[User]

    def __repr__(self) -> str:
        """
        Return a string representation of the VegetableInfo object.
        """
        return f"<VegetableInfo {self.name}>"

    def __str__(self) -> str:
        """
        Return a string representation of the VegetableInfo object.
        """
        return self.name

    def __hash__(self) -> int:
        """
        Return the hash value of the VegetableInfo object based on its name.
        """
        return hash(self.name)

    def __eq__(self, other: object) -> bool:
        """
        Check if two VegetableInfo objects are equal based on their
            vegetable_info_id.
        """
        if isinstance(other, VegetableInfo):
            return self.vegetable_info_id == other.vegetable_info_id
        return False

    @before_event([Save])
    def update_updated_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.utcnow()

    class Settings:
        """
        Settings class for the VegetableInfo model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "vegetables_info"
