"""
UserService module for handling user-related operations.
"""

from uuid import UUID

from app.api.auth.email_verification import send_verification_email
from app.core.security import (create_access_token,
                               get_password,
                               verify_password)
from app.models.user_model import User
from app.schemas.user_schema import UserAuth, UserUpdate
from app.services.area_service import AreaService
from app.services.todo_service import TodoService
from app.services.vegetable_info_service import VegetableInfoService
from app.services.vegetable_manager_service import VegetableManagerService


class UserService:
    @staticmethod
    async def create_user(user: UserAuth):
        """
        Create a new user.

        :param user: UserAuth schema containing user information.
        :return: Created user.
        """
        user_in = User(
            username=user.username,
            email=user.email,
            hashed_password=get_password(user.password),
            localisation=user.localisation
        )
        await user_in.create()

        # add vegetable_info to the user
        await VegetableInfoService.add_all_vegetable_info_to_user(user_in)

        await send_verification_email(user.email, user)

        return user_in

    @staticmethod
    async def authenticate(email: str, password: str) -> User | None:
        """
        Authenticate a user based on email and password.

        :param email: User's email.
        :param password: User's password.
        :return: Authenticated user or None if authentication fails.
        """
        user = await UserService.get_user_by_email(email=email)
        if not user:
            return None
        if not verify_password(password=password,
                               hashed_pass=user.hashed_password):
            return None
        return user

    @staticmethod
    async def get_user_by_email(email: str) -> User | None:
        """
        Get a user by email.

        :param email: User's email.
        :return: User with the specified email or None if not found.
        """
        user = await User.find_one(User.email == email)
        return user

    @staticmethod
    async def get_user_by_id(id: UUID) -> User | None:
        """
        Get a user by ID.

        :param id: User's UUID.
        :return: User with the specified ID or None if not found.
        """
        user = await User.find_one(User.user_id == id)
        return user

    @staticmethod
    async def get_user_by_username(username: str) -> User | None:
        """ """
        user = await User.find_one(User.username == username)
        return user

    @staticmethod
    async def update_user_password(data: dict, current_user: User) -> dict:
        """ """
        hashed_password = get_password(data['new_password'])
        current_user.hashed_password = hashed_password
        await current_user.save()
        new_access_token = create_access_token(current_user.user_id)
        return {"new_access_token": new_access_token}

    @staticmethod
    async def delete_user(current_user: User):
        """ """
        todos = await TodoService.list_todos(current_user)
        for todo in todos:
            await todo.delete()
        vegetables_infos = await VegetableInfoService.list_vegetables(
            current_user
        )
        for vegetable in vegetables_infos:
            await vegetable.delete()
        vegetables_manager = await VegetableManagerService.list_vegetables(
            current_user
        )
        for vegetable in vegetables_manager:
            await vegetable.delete()
        areas = await AreaService.list_areas(current_user)
        for area in areas:
            await area.delete()
        await current_user.delete()

    @staticmethod
    async def update_user(data: UserUpdate, user: User):
        """
        Update user
        """
        await user.update({"$set": data})
