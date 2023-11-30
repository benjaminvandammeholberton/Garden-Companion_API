"""
Vegetable Manager model representing a document in a database.
"""

from beanie import Document, Indexed, Link, before_event, Replace, Insert
from datetime import datetime, date
from pydantic import Field
from typing import Optional
from uuid import UUID, uuid4
from app.models.area_model import Area


# from app.models.area_model import Area
from app.models.user_model import User


class VegetableManager(Document):
    """
    
    """
    vegetable_manager_id: UUID = Field(default_factory=uuid4, unique=True)
    name: Indexed(str)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    variety: Optional[Indexed(str)]
    quantity: int
    sowed: bool = Field(default_factory=False)
    planted: bool = Field(default_factory=False)
    sowing_date: Optional[date]
    planting_date: Optional[date]
    harvest_date: Optional[date]
    harvest_quantity: Optional[float]
    harvest_unit: Optional[str]
    remove_date: Optional[date]
    notes: Optional[str]
    area: Link[Area]
    owner: Link[User]

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
        Check if two VegetableManager objects are equal based on their vegetable_manager_id.
        """
        if isinstance(other, VegetableManager):
            return self.vegetable_manager_id == other.vegetable_manager_id
        return False
    
    @before_event([Replace, Insert])
    def update_updated_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.utcnow()

    
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
