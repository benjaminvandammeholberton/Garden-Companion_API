""" Service Module for the ChatBot
"""
from datetime import datetime
from openai import AsyncOpenAI

from app.models.user_model import User
from app.schemas.chat_bot_schema import ChatBotRequest
from app.schemas.user_schema import UserChatBotDailyRequest

client = AsyncOpenAI()


class ChatBotService:
    """
    Service class for interacting with the ChatBot using OpenAI's
    GPT-3.5-turbo model.
    """
    @staticmethod
    async def send_answer(data: ChatBotRequest) -> str | None:
        """
        Sends a user input to the ChatBot model and retrieves the generated
        answer.
        """
        preprompt = ("You are a french assistant about vegetable gardens. "
                     "If the user asks a question unrelated to gardening, "
                     "letting them know that your expertise is in vegetable "
                     "gardens.")
        system_message = {"role": "system",
                          "content": preprompt
                          }
        completion = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                system_message,
                {"role": "user", "content": f'${data.user_input}'}
            ],
            temperature=0.1,
        )
        return (completion.choices[0].message.content)

    @staticmethod
    async def increase_number_of_daily_request(current_user: User):
        """
        Increases the request counters and updates the last request datetime
        for a given user.
        """
        await current_user.update({
            "$inc": {"chat_bot_day_requests": 1, "chat_bot_total_requests": 1},
            "$set": {"last_request_datetime": datetime.now()}
        })
        await current_user.save()

    @staticmethod
    async def get_number_of_requests(
            current_user: User) -> UserChatBotDailyRequest:
        """
        Retrieves the number of requests allowed for the current user within
        a day.
        """
        today = datetime.now().date()
        if (
            current_user.last_request_datetime is None or
            current_user.last_request_datetime.date() != today
        ):
            current_user.last_request_datetime = datetime.now()
            current_user.chat_bot_day_requests = 0
            await current_user.save()
        return {
            "chat_bot_day_requests":
                current_user.chat_bot_day_requests
        }
