"""
Vegetable Info model representing a document in a database.
"""

from beanie import Document, Indexed, Link, before_event, Replace, Insert
from datetime import datetime
from pydantic import Field
from typing import Optional
from uuid import UUID, uuid4

from app.models.user_model import User


class VegetableInfo(Document):
    """

    """
    vegetable_info_id: UUID = Field(default_factory=uuid4, unique=True)
    name: Indexed(str)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    category: Indexed(str)
    start_indoor: Optional[datetime]
    start_outdoor: Optional[datetime]
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

    @before_event([Replace, Insert])
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
