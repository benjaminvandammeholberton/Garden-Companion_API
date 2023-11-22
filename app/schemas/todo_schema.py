"""
Todo-related Pydantic models for input, update, and output.
"""

from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID


class TodoCreate(BaseModel):
    """
    TodoCreate class for creating a new todo.

    Attributes:
    - title (str): The title of the todo.
    - description (str): The description of the todo.
    - status (Optional[bool]): The status of the todo (default is False).
    """
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    status: Optional[bool] = False


class TodoUpdate(BaseModel):
    """
    TodoUpdate class for updating an existing todo.

    Attributes:
    - title (Optional[str]): The updated title of the todo.
    - description (Optional[str]): The updated description of the todo.
    - status (Optional[bool]): The updated status of the todo.
    """
    title: Optional[str] = Field(None, title='Title',
                                 max_length=55, min_length=1)
    status: Optional[bool] = False


class TodoOut(BaseModel):
    """
    TodoOut class for representing the output of a todo.

    Attributes:
    - todo_id (UUID): The UUID of the todo.
    - status (bool): The status of the todo.
    - title (str): The title of the todo.
    - description (str): The description of the todo.
    - created_at (datetime): The creation timestamp of the todo.
    - updated_at (datetime): The last update timestamp of the todo.
    """
    todo_id: UUID
    status: bool
    title: str
    created_at: datetime
    updated_at: datetime
