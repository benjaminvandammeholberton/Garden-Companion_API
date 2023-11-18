"""
UserService module for handling user-related operations.
"""
from typing import Optional
from uuid import UUID

from app.core.security import get_password, verify_password
from app.models.user_model import User
from app.schemas.user_schema import UserAuth


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
            hashed_password=get_password(user.password)
        )
        await user_in.save()
        return user_in

    @staticmethod
    async def authenticate(email: str, password: str) -> Optional[User]:
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
    async def get_user_by_email(email: str) -> Optional[User]:
        """
        Get a user by email.

        :param email: User's email.
        :return: User with the specified email or None if not found.
        """
        user = await User.find_one(User.email == email)
        return user

    @staticmethod
    async def get_user_by_id(id: UUID) -> Optional[User]:
        """
        Get a user by ID.

        :param id: User's UUID.
        :return: User with the specified ID or None if not found.
        """
        user = await User.find_one(User.user_id == id)
        return user
