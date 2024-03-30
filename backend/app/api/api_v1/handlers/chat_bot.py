""" Module routes for the ChatBot
"""
from fastapi import APIRouter, Depends

from app.core.dependencies import get_current_user, check_daily_limit
from app.models.user_model import User
from app.schemas.chat_bot_schema import ChatBotRequest
from app.schemas.user_schema import UserChatBotDailyRequest
from app.services.chat_bot_service import ChatBotService

chat_bot_router = APIRouter()


@chat_bot_router.post('/', summary='Send Chat Bot answer')
async def chat_bot_response(
    data: ChatBotRequest,
    current_user: User = Depends(get_current_user),
    _=Depends(check_daily_limit)
) -> str:
    """
    Sends the user input to the ChatBot model, retrieves the generated answer,
        and increments the request counters for the current user.
    """
    await ChatBotService.increase_number_of_daily_request(current_user)
    return await ChatBotService.send_answer(data)


@chat_bot_router.get('/', summary='Get Number of requests allowed left')
async def number_of_requests(
    current_user: User = Depends(get_current_user)
) -> UserChatBotDailyRequest:
    """
    Retrieves the number of ChatBot requests allowed for the current user
        within a day.
    """
    return await ChatBotService.get_number_of_requests(current_user)
