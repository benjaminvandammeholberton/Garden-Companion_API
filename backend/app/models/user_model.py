"""
User model representing a document in a database.
"""

from beanie import Document, Indexed, Save, before_event
from datetime import datetime
from pydantic import EmailStr, Field
from uuid import UUID, uuid4

from app.schemas.user_schema import LocalisationSchema


class User(Document):
    """
    User class representing a document in the database.

    Attributes:
    - user_id (UUID): The UUID of the user (default is generated with uuid4).
    - username (str): The username of the user (indexed and unique).
    - email (EmailStr): The email of the user (indexed and unique).
    - localisation (LocalisationSchema): The localisation of the user.
    - hashed_password (str): The hashed password of the user.
    - first_name (Optional[str]): The first name of the user (default is None).
    - last_name (Optional[str]): The last name of the user (default is None).
    - disabled (Optional[bool]): Indicates if the user is\
        disabled (default is None).
    - chat_bot_requests (int): The number of chat bot requests (default is 0).

    Properties:
    - create (datetime): The creation timestamp of the user.

    Class Methods:
    - by_email(cls, email: str) -> "User": A class method to find\
        a user by email.

    Methods:
    - __repr__(): A method to represent the user in a readable format.
    - __str__(): A method to represent the user as a string.
    - __hash__(): A method to provide a hash value based on the email.
    - __eq__(other: object) -> bool: A method to check if two users are equal.

    Settings:
    - name (str): The name of the collection in the database.
    """
    user_id: UUID = Field(default_factory=uuid4)
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    username: Indexed(str, unique=True)  # type: ignore
    email: Indexed(EmailStr, unique=True)  # type: ignore
    localisation: LocalisationSchema
    hashed_password: str
    first_name: str | None = None
    last_name: str | None = None
    disabled: bool = False
    chat_bot_day_requests: int = 0
    chat_bot_total_requests: int = 0
    last_request_datetime: datetime | None = None
    is_verified: bool = False
    forget_password: str | None = None
    expiration_forget_password: datetime | None = None

    def __repr__(self) -> str:
        """
        Represent the user in a readable format.
        """
        return f"<User {self.email}>"

    def __str__(self) -> str:
        """
        Represent the user as a string.
        """
        return self.email

    def __hash__(self) -> int:
        """
        Provide a hash value based on the email.
        """
        return hash(self.email)

    def __eq__(self, other: object) -> bool:
        """
        Check if two users are equal.
        """
        if isinstance(other, User):
            return self.email == other.email
        return False

    @before_event([Save])
    def update_updated_at(self):
        """
        Update the `updated_at` timestamp before Replace or Insert events.
        """
        self.updated_at = datetime.now()

    class Settings:
        """
        Settings class for the User model.

        Attributes:
        - name (str): The name of the collection in the database.
        """
        name = "users"
