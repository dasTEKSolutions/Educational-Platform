from fastapi import FastAPI, WebSocket, HTTPException
from fastapi.websockets import WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
import asyncio
import uvicorn
import hashlib
from openai import OpenAI


app = FastAPI()
client = OpenAI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://localhost:5173"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


uri = "mongodb+srv://sk2:1123@testedu-cluster.4v3vaq7.mongodb.net/?retryWrites=true&w=majority"

dbClient = AsyncIOMotorClient(uri)
database = dbClient["nexgenstudy"]
users_collection = database['users']


class User(BaseModel):
    uid: str
    username: str
    email: str
    firstname: str
    lastname: str
    gender: str
    standard: str
    institute: str


@app.post("/users/", response_model=User)
async def create_item(item: User):
    uid = item.uid
    hashed_uid = hashlib.sha512(str(uid).encode('utf-8')).hexdigest()
    item.uid = hashed_uid
    result = await users_collection.insert_one(item.model_dump())
    created_user = await users_collection.find_one({"_id": result.inserted_id})
    return created_user


@app.get("/items/{item_id}", response_model=User)
async def read_item(item_id: str):
    item = await users_collection.find_one({"_id": item_id})
    if item:
        return item
    raise HTTPException(status_code=404, detail="Item not found")


@app.put("/items/{item_id}", response_model=User)
async def update_item(item_id: str, item: User):
    updated_item = await users_collection.find_one_and_update(
        {"_id": item_id}, {"$set": item.dict()}
    )
    if updated_item:
        return item
    raise HTTPException(status_code=404, detail="Item not found")

# @app.delete("/items/{item_id}", response_model=User)
# async def delete_item(item_id: str):
#     deleted_item = await collection.find_one_and_delete({"_id": item_id})
#     if deleted_item:
#         return deleted_item
#     raise HTTPException(status_code=404, detail="Item not found")

lut = {
    "general": "Hey AI, you are a tutor expert. When I provide a question, regardless of the subject, offer a direct and detailed explanation suitable for a high school/college student. Ensure your answer is comprehensive, clear, and requires no further input for clarification. Avoid subjective opinions, focusing instead on delivering accurate and relevant information. The goal is to provide a straightforward, ready-to-use answer, enabling students to understand and apply the concepts discussed independently. In your response, prioritize clarity and succinctness. Explain the key points in short and necessary steps to answer the question, ensuring the explanation is accessible and facilitates learning across any subject area.",
    "maths": "Hey AI, you are a math tutor expert. I will provide the question. Upon receiving the question, provide a comprehensive step-by-step solution for a high school/college student. Deliver a complete solution without soliciting input or confirmation. Present the solution in a properly formatted, easy-to-read manner, excluding any subjective statements such as expressions of hope or personal satisfaction. Avoid initiating additional conversation after presenting the direct solution. The primary objective is to furnish a flawless, copy-ready solution for the given question, allowing the student to replicate the solution without further interaction.",
    "physics": "Hey AI, you are a physics tutor expert. When I provide a physics question, deliver a detailed step-by-step solution appropriate for a high school/college student. Ensure the solution is complete, accurate, and presented in a clear, structured manner without the need for further input or confirmation from me. The response should strictly avoid subjective commentary or extraneous dialogue, aiming instead to provide a straightforward, scientifically sound explanation. The primary goal is to offer a flawless, ready-to-use solution that enables the student to grasp and replicate the physics concepts and calculations involved independently. In your explanations, focus on precision and directness. Physics solutions should clearly outline the problem-solving steps, including equations, principles, and reasoning, without delving into unnecessary details or theoretical digressions. Emphasize the application of physics laws and formulas to solve the question at hand, ensuring the student can follow and learn from the process.",
    "chemistry": "Hey AI, you are a chemistry tutor expert. When I provide a question, offer a detailed step-by-step solution suitable for a high school/college student. Ensure the solution is complete and presented without seeking further input or confirmation. Format the solution to be clear and straightforward, avoiding subjective commentary or unnecessary dialogue. The goal is to provide an impeccable, ready-to-use solution for the question, enabling the student to understand and replicate the process independently. In your explanations, be concise and to the point. Chemistry solutions should include necessary calculation steps, reaction mechanisms, or conceptual clarifications as appropriate, without extensive narrative explanation.",
    "social": "Hey AI, you are a social studies tutor expert. When I provide a question related to history, geography, economics, civics, or cultural studies, offer a detailed answer that's suitable for a high school/college student. Ensure the answer is comprehensive and presented in a clear, structured format without requesting further input or confirmation. The response should avoid subjective opinions or unnecessary dialogue, focusing instead on providing factual, well-supported information. The goal is to deliver a precise, ready-to-use answer that enables the student to understand and engage with the material independently. In your explanations, aim for clarity and conciseness. The social studies answers should include essential facts, dates, concepts, or analysis as relevant, but avoid overly descriptive narratives. Highlight key points and evidence supporting the answer, facilitating a deeper understanding of the topic.",
    "english": "Hey AI, you are an English tutor expert. When I provide a question related to literature analysis, grammar, writing techniques, or textual interpretation, deliver a detailed response suitable for a high school/college student. Ensure the answer is comprehensive, well-structured, and presented without seeking further input or confirmation. The response should steer clear of subjective opinions or extraneous dialogue, focusing instead on delivering accurate, insightful information. The primary goal is to provide a precise, ready-to-use answer that enables the student to understand, analyze, and engage with English language and literature on their own. In your explanations, prioritize clarity and insightfulness. English responses should include critical analysis, key points from the text, grammatical explanations, or writing strategies as relevant, but avoid overly complex jargon or unnecessary narrative detail. Highlight essential arguments, themes, or linguistic features, providing the student with a solid foundation for understanding and applying English concepts"
}


@app.websocket('/assistant')
async def assitant(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_json()
            assistant = client.beta.assistants.create(
                name="Educational Helper Bot",
                instructions=lut.get(data['subject'], lut['maths']),
                tools=[{"type": "code_interpreter"}],
                model="gpt-4-1106-preview"
            )
            ai_thread = client.beta.threads.create()

            messages_list = []
            resp = ""
            if data['image_url'] != "":

                response = client.chat.completions.create(
                    model="gpt-4-vision-preview",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": "Your work is to extract the text from the image and give it to the user. It should contain only the text and nothing else in the output"},
                                {
                                    "type": "image_url",
                                    "image_url": data['image_url'],
                                },
                            ],
                        }
                    ],
                    max_tokens=300,
                )
                resp = response.choices[0].message.content
                print("------" * 15)
                print("Extracted Text: \n" + resp)
                print("------" * 15)

                message = client.beta.threads.messages.create(
                    thread_id=ai_thread.id,
                    role="user",
                    content=data['message'] + " The question is: " +
                    resp,
                )
            else:
                message = client.beta.threads.messages.create(
                    thread_id=ai_thread.id,
                    role="user",
                    content=data['message']
                )
            run = client.beta.threads.runs.create(
                thread_id=ai_thread.id,
                assistant_id=assistant.id,
            )
            while run.status != "completed":
                await asyncio.sleep(0.5)
                run = client.beta.threads.runs.retrieve(
                    thread_id=ai_thread.id,
                    run_id=run.id
                )

                messages = client.beta.threads.messages.list(
                    thread_id=ai_thread.id
                )
                messages.data.reverse()
                for msg in messages.data:
                    t = msg.content[0].text.value
                    if t not in messages_list and t != "":
                        messages_list.append(t)
                        await ws.send_json({"resp": t})
            await ws.send_json({"resp": "done"})

    except WebSocketDisconnect:
        print("Connection Disconnected")


@app.websocket("/chat")
async def chat(ws: WebSocket):
    await ws.accept()
    try:
        while True:
            data = await ws.receive_json()
            print(data)
            if data['image_url'] != "":
                resp = client.chat.completions.create(
                    model='gpt-4-vision-preview',
                    messages=[
                        {
                            "role": "system",
                            "content": [
                                {"type": "text", "text": lut.get(
                                    data['subject'], lut['general'])},
                            ],
                        },
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": data['message']},
                                {
                                    "type": "image_url",
                                    "image_url": data['image_url'],
                                },
                            ],
                        }
                    ],
                    max_tokens=1000,
                    stream=True
                )
                for chunk in resp:
                    if chunk.choices[0].delta.content is not None:
                        await asyncio.sleep(0.1)
                        await ws.send_json({"resp": chunk.choices[0].delta.content})
            else:
                resp = client.chat.completions.create(
                    model='gpt-4-vision-preview',
                    messages=[
                        {
                            "role": "system",
                            "content": [
                                {"type": "text", "text": lut.get(
                                    data['subject'], lut['general'])},
                            ],
                        },
                        {
                            "role": "user",
                            "content": [
                                {"type": "text", "text": data['message']}
                            ],
                        }
                    ],
                    max_tokens=1000,
                    stream=True
                )
                for chunk in resp:
                    if chunk.choices[0].delta.content is not None:
                        await asyncio.sleep(0.1)
                        await ws.send_json({"resp": chunk.choices[0].delta.content})
                await ws.send_json({"resp": "done"})
    except WebSocketDisconnect:
        print("WebSocket Disconnected")

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)
