"""
Module to handle email verification and password reset tokens.
"""
from itsdangerous import (
    URLSafeTimedSerializer,
    BadTimeSignature,
    SignatureExpired
)

from app.core.config import settings


class EmailTokenHandler:
    """
    Class to handle email verification and password reset tokens.
    """

    def __init__(self):
        """
        Initialize the EmailTokenHandler with the secret key from settings.
        """
        self.secret_key = settings.JWT_SECRET_KEY
        self.token_algo = URLSafeTimedSerializer(
            self.secret_key,
            salt='Email_Verification'
        )

    def create_token(self, email: str) -> str:
        """
        create a new token based on a email for password reset and email
            verificaion
        """
        _token = self.token_algo.dumps(email)
        return _token

    def verify_token(self, token: str) -> dict | None:
        """
        extract an email address from a token and verify its identity
        """
        try:
            email = self.token_algo.loads(token)
        except SignatureExpired:
            return None
        except BadTimeSignature:
            return None
        return {'email': email, 'check': True}
