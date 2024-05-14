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
    """
    title: str = Field(..., title='Title', max_length=55, min_length=1)
    status: Optional[bool] = False
    priority: bool


class TodoUpdate(BaseModel):
    """
    TodoUpdate class for updating an existing todo.
    """
    title: Optional[str] = Field(
        None,
        title='Title',
        max_length=55,
        min_length=1
    )
    status: Optional[bool] = None
    priority: Optional[bool] = None


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
