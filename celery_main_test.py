from celery import Celery
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

redis_client = redis.Redis(host='dastekeducationalplatform-redis-1', port=6379,
                           db=1, decode_responses=True)

# Mock OpenAI response


def mock_openai_response(prompt):
    return {
        'choices': [{
            'message': {'content': "Mocked response for prompt: " + prompt}
        }]
    }


def extract_text(image) -> str:
    # Simulate image text extraction
    img_data = image.read()
    img_base64 = base64.b64encode(img_data).decode('utf-8')
    img_url = f"data:image/jpeg;base64,{img_base64}"
    print("Mocked Extracted Text from Image URL: " + img_url)
    return "Mocked text extracted from image."


@celery_app.task(bind=True)
def query_openai_assistant(self, uid, prompt, image=None):
    # Simulate stored value retrieval from Redis
    stored_value = redis_client.get(uid)
    if stored_value:
        ids = json.loads(stored_value)
        thread_id = ids['thread_id']
        assistant_id = ids['assistant_id']
    else:
        # Simulate OpenAI Assistant creation
        thread_id = "mock_thread_id"
        assistant_id = "mock_assistant_id"
        redis_client.setex(uid, 3600, json.dumps(
            {"thread_id": thread_id, "assistant_id": assistant_id}))

    messages_list = []
    if image:
        extracted_text = extract_text(image)
        prompt += " The question is: " + extracted_text

    # Simulate message creation and run execution
    run_status = "completed"  # Mock the run status as completed for testing
    messages_data = [prompt]  # Mock the messages received

    for msg in messages_data:
        if msg not in messages_list and msg != "":
            messages_list.append(msg)
            self.update_state(state='PROGRESS', meta={
                'current_messages': messages_list})

    messages_list.append("done")
    return {'final_messages': messages_list}
