"""
UserService module for handling user-related operations.
"""
import json
from typing import Optional
from uuid import UUID
from pathlib import Path

from app.core.security import create_access_token, get_password, verify_password
from app.models.user_model import User
from app.models.vegetable_info_model import VegetableInfo
from app.schemas.user_schema import UserAuth
from app.schemas.vegetable_info_schema import VegetableInfoCreate
from app.services.vegetable_info_service import VegetableInfoService


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

        # Load initial vegetable information from JSON file
        initial_vegetable_info_file = Path("./vegetable_info_data.json")
        with open(initial_vegetable_info_file, "r") as file:
            initial_vegetable_info = json.load(file)
        print(initial_vegetable_info)
        # Link the vegetable information to the user
        for veg_info_data in initial_vegetable_info:
            await VegetableInfoService.create_vegetable(user_in, VegetableInfoCreate(**veg_info_data))

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

    @staticmethod
    async def get_user_by_username(username: str) -> Optional[User]:
        """

        """
        user = await User.find_one(User.username == username)
        return user
    
    @staticmethod
    async def update_user_password(data: dict, current_user: User):
        """
        
        """
        hashed_password = get_password(data['new_password'])
        print(hashed_password)
        current_user.hashed_password = hashed_password
        current_user.update_updated_at()
        await current_user.save()
        new_access_token = create_access_token(current_user.user_id)
        return {"new_access_token": new_access_token}
        
