from flask import Blueprint, request, jsonify
from celery_main import query_openai_assistant, celery_app

api_blueprint = Blueprint('api', __name__)


@api_blueprint.route('/start', methods=['POST'])
def start_query():
    prompt = request.form['prompt']
    uid = request.form['uid']

    if 'img' in request.files:
        image = request.files['img']
        image_data = image.read()
        task = query_openai_assistant.delay(uid, prompt, image_data)
    else:
        task = query_openai_assistant.delay(uid, prompt)
    return jsonify({"task_id": task.id}), 202


@api_blueprint.route('/subject', methods=['POST'])
def subject_chat():
    prompt = request.form['prompt']
    subject = request.form['subject']
    if 'img' in request.files:
        image = request.files['img']
        image_data = image.read()
        task = query_openai_assistant.delay(
            "none", prompt, image_data, subject)
    else:
        task = query_openai_assistant.delay(
            "none", prompt, image_data, subject)
    return jsonify({"task_id": task.id}), 202


@api_blueprint.route('/clear', methods=['POST'])
def clear_task():
    if "msg" in request.form and "task_id" in request.form:
        msg = request.form["msg"]
        task_id = request.form["task_id"]
    return jsonify({"msg": "ok cleared data"}), 202


@api_blueprint.route('/progress/<task_id>', methods=['GET'])
def get_progress(task_id):
    task_result = celery_app.AsyncResult(task_id)
    if task_result.state == 'PROGRESS':
        response = {
            'state': task_result.state,
            'data': task_result.info.get('current_messages', [])
        }
    elif task_result.state == 'SUCCESS':
        response = {
            'state': task_result.state,
            'data': task_result.result.get('final_messages', [])
        }
    else:
        response = {
            'state': task_result.state,
            'data': []
        }
    return jsonify(response)
