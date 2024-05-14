# from unittest.mock import AsyncMock
# from fastapi import HTTPException, status
# from your_module import check_daily_limit

# # Mocking the get_current_user dependency


# async def mock_get_current_user():
#     # Assuming the user has made 2 requests
#     return User(chat_bot_day_requests=2)


# async def test_check_daily_limit_user_within_limit(monkeypatch):
#     # Mocking the dependency to return a user within the daily limit
#     monkeypatch.setattr("your_module.get_current_user", AsyncMock(
#         return_value=User(chat_bot_day_requests=2)))

#     # No exception should be raised as the user is within the daily limit
#     assert await check_daily_limit() is None


# async def test_check_daily_limit_user_exceeds_limit(monkeypatch):
#     # Mocking the dependency to return a user exceeding the daily limit
#     monkeypatch.setattr("your_module.get_current_user", AsyncMock(
#         return_value=User(chat_bot_day_requests=5)))

#     # Expecting an HTTPException to be raised with status code 429
#     with pytest.raises(HTTPException) as exc_info:
#         await check_daily_limit()

#     assert exc_info.value.status_code == status.HTTP_429_TOO_MANY_REQUESTS
#     assert exc_info.value.detail == "Daily chat bot request limit exceeded"
