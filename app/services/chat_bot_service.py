"""

"""

from openai import AsyncOpenAI

client = AsyncOpenAI()

class ChatBotService:
    """
    
    """
    @staticmethod
    async def send_answer(data: dict) -> dict:
        """
        
        """
        system_message = {"role": "system", "content": "You are a french assistant about vegetable gardens. If the user asks a question unrelated to gardening, letting them know that your expertise is in vegetable gardens."}
        completion = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            system_message,
            {"role": "user", "content": f'${data["user-input"]}'}
        ],
        temperature=0.1,
        )
        return(completion.choices[0].message.content)
