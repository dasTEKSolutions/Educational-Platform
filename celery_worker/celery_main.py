from celery import Celery
from openai import OpenAI
import base64
import json
import time
import redis


def make_celery(app_name='celery_worker'):
    return Celery(
        app_name,
        backend='redis://dastekeducationalplatform-redis-1:6379/0',
        broker='amqp://guest:guest@dastekeducationalplatform-rabbitmq-1',
    )


celery_app = make_celery()


@celery_app.task(bind=True)
def query_openai_assistant(self, uid, prompt, image=None):
    client = OpenAI()

    assistant = client.beta.assistants.create(
        name="Math Tutor",
        instructions="Hey AI, you are a math tutor expert. I will provide the question. Upon receiving the question, provide a comprehensive step-by-step solution for a high school/college student. Deliver a complete solution without soliciting input or confirmation. Present the solution in a properly formatted, easy-to-read manner, excluding any subjective statements such as expressions of hope or personal satisfaction. Avoid initiating additional conversation after presenting the direct solution. The primary objective is to furnish a flawless, copy-ready solution for the given question, allowing the student to replicate the solution without further interaction.",
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
