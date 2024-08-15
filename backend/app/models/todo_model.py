"""
Todo model representing a document in a database.
"""

from beanie import Document, Save, before_event
from datetime import datetime
from uuid import UUID, uuid4

from pydantic import Field


class Todo(Document):
    """
    Todo class representing a document in the database.

    Attributes:
    - todo_id (UUID): The UUID of the todo (default is generated with uuid4).
    - status (bool): The status of the todo (default is False).
    - title (str): The title of the todo (indexed).
    - description (str): The description of the todo.
    - created_at (datetime): The creation timestamp of the todo\
        (default is the current time).
    - updated_at (datetime): The last update timestamp of the todo\
        (default is the current time).
    - owner (Link[User]): A link to the User model representing the owner\
        of the todo.

    Methods:
    - update_update_at(): A method to update the `updated_at`\
        timestamp before events (Replace, Insert).

    Settings:
    - name (str): The name of the collection in the database.
    """
    todo_id: UUID = Field(default_factory=uuid4)
    status: bool = False
    title: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    owner: UUID
    priority: bool

    def __repr__(self) -> str:
        """
        Return a string representation of the Todo object.
        """
        return f"<Todo {self.title}>"

    def __str__(self) -> str:
        """
        Return a string representation of the Todo object.
        """
        return self.title

    def __hash__(self) -> int:
        """
        Return the hash value of the Todo object based on its title.
        """
        return hash(self.title)

    def __eq__(self, other: object) -> bool:
        """
        Check if two Todo objects are equal based on their todo_id.
        """
        if isinstance(other, Todo):
            return self.todo_id == other.todo_id
        return False

    @before_event([Save])
    def update_update_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.utcnow()

    class Settings:
        """
        Settings class for the Todo model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "todos"
