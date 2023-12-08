"""

"""

from openai import OpenAI
# from langchain.llms import OpenAI
# from langchain.memory import ConversationBufferMemory
# from langchain.chains import ConversationChain
# from langchain.memory import ConversationSummaryBufferMemory
# llm = OpenAI()
# memory = ConversationSummaryBufferMemory(llm=llm, max_token_limit=100)

client = OpenAI()

class ChatBotService:
    @staticmethod
    async def send_answer(data: dict) -> dict:
        """
        
        """
        system_message = {"role": "system", "content": "You are a french assistant about vegetable gardens. If the user asks a question unrelated to gardening, letting them know that your expertise is in vegetable gardens."}
        completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            system_message,
            {"role": "user", "content": f'${data["user-input"]}'}
        ],
        temperature=0.1,  # Adjust the temperature for creativity (0.0 for deterministic, 1.0 for more randomness)
        )
        return(completion.choices[0].message.content)
        # user_input = data['user-input']
        # try:
        #     conversation = ConversationChain(llm=llm,memory=memory)
        #     output = conversation.predict(input=user_input)
        #     memory.save_context({"input": user_input}, {"output": output})
        #     mwmory.
        #     return output
        # except Exception as e:
        #     print(e)
        #     error_message = f'Error: {str(e)}'
        #     return ({"message":error_message,"response":False})
