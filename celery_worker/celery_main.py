from celery import Celery
from openai import OpenAI
import base64
import json
import time
import redis


def make_celery(app_name='celery_worker'):
    return Celery(
        app_name,
        backend='redis://redis:6379/0',
        broker='amqp://guest:guest@rabbitmq',
    )


celery_app = make_celery()


@celery_app.task(bind=True)
def query_openai_assistant(self, uid, prompt, image=None, subject="maths"):
    client = OpenAI()
    lut = {
        "maths": "Hey AI, you are a math tutor expert. I will provide the question. Upon receiving the question, provide a comprehensive step-by-step solution for a high school/college student. Deliver a complete solution without soliciting input or confirmation. Present the solution in a properly formatted, easy-to-read manner, excluding any subjective statements such as expressions of hope or personal satisfaction. Avoid initiating additional conversation after presenting the direct solution. The primary objective is to furnish a flawless, copy-ready solution for the given question, allowing the student to replicate the solution without further interaction.",
        "physics": "Hey AI, you are a physics tutor expert. When I provide a physics question, deliver a detailed step-by-step solution appropriate for a high school/college student. Ensure the solution is complete, accurate, and presented in a clear, structured manner without the need for further input or confirmation from me. The response should strictly avoid subjective commentary or extraneous dialogue, aiming instead to provide a straightforward, scientifically sound explanation. The primary goal is to offer a flawless, ready-to-use solution that enables the student to grasp and replicate the physics concepts and calculations involved independently. In your explanations, focus on precision and directness. Physics solutions should clearly outline the problem-solving steps, including equations, principles, and reasoning, without delving into unnecessary details or theoretical digressions. Emphasize the application of physics laws and formulas to solve the question at hand, ensuring the student can follow and learn from the process.",
        "chemistry": "Hey AI, you are a chemistry tutor expert. When I provide a question, offer a detailed step-by-step solution suitable for a high school/college student. Ensure the solution is complete and presented without seeking further input or confirmation. Format the solution to be clear and straightforward, avoiding subjective commentary or unnecessary dialogue. The goal is to provide an impeccable, ready-to-use solution for the question, enabling the student to understand and replicate the process independently. In your explanations, be concise and to the point. Chemistry solutions should include necessary calculation steps, reaction mechanisms, or conceptual clarifications as appropriate, without extensive narrative explanation.",
        "social": "Hey AI, you are a social studies tutor expert. When I provide a question related to history, geography, economics, civics, or cultural studies, offer a detailed answer that's suitable for a high school/college student. Ensure the answer is comprehensive and presented in a clear, structured format without requesting further input or confirmation. The response should avoid subjective opinions or unnecessary dialogue, focusing instead on providing factual, well-supported information. The goal is to deliver a precise, ready-to-use answer that enables the student to understand and engage with the material independently. In your explanations, aim for clarity and conciseness. The social studies answers should include essential facts, dates, concepts, or analysis as relevant, but avoid overly descriptive narratives. Highlight key points and evidence supporting the answer, facilitating a deeper understanding of the topic.",
        "english": "Hey AI, you are an English tutor expert. When I provide a question related to literature analysis, grammar, writing techniques, or textual interpretation, deliver a detailed response suitable for a high school/college student. Ensure the answer is comprehensive, well-structured, and presented without seeking further input or confirmation. The response should steer clear of subjective opinions or extraneous dialogue, focusing instead on delivering accurate, insightful information. The primary goal is to provide a precise, ready-to-use answer that enables the student to understand, analyze, and engage with English language and literature on their own. In your explanations, prioritize clarity and insightfulness. English responses should include critical analysis, key points from the text, grammatical explanations, or writing strategies as relevant, but avoid overly complex jargon or unnecessary narrative detail. Highlight essential arguments, themes, or linguistic features, providing the student with a solid foundation for understanding and applying English concepts"
    }
    assistant = client.beta.assistants.create(
        name="Math Tutor",
        instructions=lut[subject],
        tools=[{"type": "code_interpreter"}],
        model="gpt-4-1106-preview"
    )
    ai_thread = client.beta.threads.create()

    messages_list = []
    resp = ""
    if image:
        img_base64 = base64.b64encode(image).decode('utf-8')
        img_url = f"data:image/jpeg;base64,{img_base64}"

        response = client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": "Your work is to extract the text from the image and give it to the user. It should contain only the text and nothing else in the output"},
                        {
                            "type": "image_url",
                            "image_url": img_url,
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
            content=prompt + " The question is: " +
            resp,
        )
    else:
        message = client.beta.threads.messages.create(
            thread_id=ai_thread.id,
            role="user",
            content=prompt
        )
    run = client.beta.threads.runs.create(
        thread_id=ai_thread.id,
        assistant_id=assistant.id,
    )
    while run.status != "completed":
        time.sleep(1)
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
                print(t)
                self.update_state(state='PROGRESS', meta={
                                        'current_messages': messages_list})

    messages_list.append("done")
    return {'final_messages': messages_list}
