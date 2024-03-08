"""
API router for handling Todo-related operations.
"""

from fastapi import APIRouter, Depends
from typing import List
from uuid import UUID

from app.core.dependencies import get_current_user
from app.models.user_model import User
from app.schemas.todo_schema import TodoOut, TodoCreate, TodoUpdate
from app.services.todo_service import TodoService

# APIRouter instance for Todo-related routes
todo_router = APIRouter()


@todo_router.get(
    '/',
    summary='Get all todos of the user',
    response_model=List[TodoOut]
)
async def list(current_user: User = Depends(get_current_user)):
    """
    Endpoint to retrieve all todos of the current user.

    :param current_user: The authenticated user.
    :return: List of todos.
    """
    return await TodoService.list_todos(current_user)


@todo_router.post('/create', summary="Create Todo", response_model=TodoOut)
async def create_todo(
    data: TodoCreate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to create a new todo for the current user.

    :param data: Data for creating a new todo.
    :param current_user: The authenticated user.
    :return: Created todo.
    """
    return await TodoService.create_todo(current_user, data)


@todo_router.get(
    '/{todo_id}',
    summary='Get a todo by todo_id',
    response_model=TodoOut
)
async def retrieve(
    todo_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to retrieve a todo by its ID.

    :param todo_id: ID of the todo to retrieve.
    :param current_user: The authenticated user.
    :return: The retrieved todo.
    """
    return await TodoService.retrieve_todo(current_user, todo_id)


@todo_router.put(
    '/{todo_id}',
    summary="Update todo by todo_id",
    response_model=TodoOut
)
async def update(
    todo_id: UUID,
    data: TodoUpdate,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to update a todo by its ID.

    :param todo_id: ID of the todo to update.
    :param data: Updated data for the todo.
    :param current_user: The authenticated user.
    :return: The updated todo.
    """
    return await TodoService.update_todo(current_user, todo_id, data)


@todo_router.delete('/{todo_id}', summary="Delete todo by todo_id")
async def delete(
    todo_id: UUID,
    current_user: User = Depends(get_current_user)
):
    """
    Endpoint to delete a todo by its ID.

    :param todo_id: ID of the todo to delete.
    :param current_user: The authenticated user.
    :return: None.
    """
    await TodoService.delete_todo(current_user, todo_id)
    return None
