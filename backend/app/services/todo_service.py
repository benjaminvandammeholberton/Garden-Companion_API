"""
TodoService module for handling CRUD operations on Todo objects.
"""

from typing import List
from uuid import UUID

from app.models.todo_model import Todo
from app.models.user_model import User
from app.schemas.todo_schema import TodoCreate, TodoUpdate


class TodoService:
    @staticmethod
    async def list_todos(user: User) -> List[Todo]:
        """
        Retrieve a list of todos for a given user.

        :param user: The user for whom to retrieve todos.
        :return: List of todos.
        """
        todos = await Todo.find(Todo.owner == user.user_id).to_list()
        return todos

    @staticmethod
    async def create_todo(user: User, data: TodoCreate) -> Todo:
        """
        Create a new todo for the given user.

        :param user: The user creating the todo.
        :param data: Todo creation data.
        :return: Created todo.
        """
        todo = Todo(**data.model_dump(), owner=user.user_id)
        return await todo.create()

    @staticmethod
    async def retrieve_todo(current_user: User, todo_id: UUID):
        """
        Retrieve a specific todo for the current user.

        :param current_user: The current user.
        :param todo_id: ID of the todo to retrieve.
        :return: Retrieved todo.
        """
        todo = await Todo.find_one(Todo.todo_id == todo_id,
                                   Todo.owner == current_user.user_id)
        return todo

    @staticmethod
    async def update_todo(current_user: User, todo_id: UUID, data: TodoUpdate):
        """
        Update a todo for the current user.

        :param current_user: The current user.
        :param todo_id: ID of the todo to update.
        :param data: Todo update data.
        :return: Updated todo.
        """
        todo = await TodoService.retrieve_todo(current_user, todo_id)
        await todo.update({"$set": data.model_dump(exclude_unset=True)})
        await todo.save()
        return todo

    @staticmethod
    async def delete_todo(current_user: User, todo_id: UUID):
        """
        Delete a todo for the current user.

        :param current_user: The current user.
        :param todo_id: ID of the todo to delete.
        :return: None
        """
        todo = await TodoService.retrieve_todo(current_user, todo_id)
        if todo:
            await todo.delete()
        return None
