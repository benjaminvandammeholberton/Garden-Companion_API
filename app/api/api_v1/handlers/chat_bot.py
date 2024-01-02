"""

"""
from fastapi import APIRouter, Depends

from app.api.deps.user_deps import get_current_user, check_daily_limit
from app.models.user_model import User
from app.services.chat_bot_service import ChatBotService

chat_bot_router = APIRouter()

@chat_bot_router.post('/', summary='Send Chat Bot answer')
async def chat_bot_response(data: dict, current_user: User = Depends(get_current_user),
                            _ = Depends(check_daily_limit)):
    """
    
    """
    await ChatBotService.increase_request(current_user)
    return await ChatBotService.send_answer(data)

@chat_bot_router.get('/', summary='Get Number of requests allowed left')
async def number_of_requests_allowed(current_user: User = Depends(get_current_user)):
    """
    
    """
    return await ChatBotService.get_number_of_requests_allowed(current_user)

                                     