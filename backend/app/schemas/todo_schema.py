"""
Todo-related Pydantic models for input, update, and output.
"""

from datetime import datetime
from pydantic import BaseModel, Field
from uuid import UUID


class TodoCreate(BaseModel):
    """
    TodoCreate class for creating a new todo.
    """
    title: str = Field(max_length=55, min_length=1)
    status: bool | None = False
    priority: bool


class TodoUpdate(BaseModel):
    """
    TodoUpdate class for updating an existing todo.
    """
    title: str | None = Field(None, max_length=55, min_length=1)
    status: bool | None = None
    priority: bool | None = None


class TodoOut(BaseModel):
    """
    TodoOut class for representing the output of a todo.
    """
    todo_id: UUID
    status: bool
    title: str
    created_at: datetime
    updated_at: datetime
    priority: bool
