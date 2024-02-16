import pytest
from datetime import timedelta
from app.core.security import (
    create_access_token,
    create_refresh_token,
    verify_password,
    get_password,
    create_token,
    verify_token
)
from app.schemas.user_schema import EmailSchema


@pytest.fixture
def user_id():
    return "user123"


@pytest.fixture
def email():
    return "example@example.com"


@pytest.fixture
def password():
    return "securepassword"


def test_create_access_token(user_id):
    token = create_access_token(user_id)
    assert isinstance(token, str)
    # Add more assertions if needed


def test_create_refresh_token(user_id):
    token = create_refresh_token(user_id)
    assert isinstance(token, str)
    # Add more assertions if needed


def test_verify_password():
    hashed_password = get_password("securepassword")
    assert verify_password("securepassword", hashed_password)
    assert not verify_password("wrongpassword", hashed_password)


def test_get_password():
    hashed_password = get_password("securepassword")
    assert hashed_password.startswith("$2")


def test_create_token(email):
    email_schema = EmailSchema(email=email)
    token = create_token(email_schema)
    assert isinstance(token, str)
    # Add more assertions if needed


def test_verify_token(email):
    token = create_token(EmailSchema(email=email))
    result = verify_token(token)
    assert isinstance(result, dict)
    assert result['email'] == email


def test_verify_token_expired(email):
    token = create_token(EmailSchema(email=email))
    token_algo.salt = 'Email_Verification'
    token_algo.EXPIRES_IN = timedelta(seconds=0)
    expired_token = token_algo.dumps(email)
    result = verify_token(expired_token)
    assert result is None


def test_verify_token_invalid(email):
    tampered_token = token_algo.dumps(email) + "tampered"
    result = verify_token(tampered_token)
    assert result is None
