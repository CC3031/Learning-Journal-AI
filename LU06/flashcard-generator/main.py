from flask import Flask, request, jsonify, send_from_directory
import requests

app = Flask(__name__, static_folder=".")

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "qwen2.5:0.5b"

@app.route("/")
def index():
    return send_from_directory(".", "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(".", path)

@app.route("/generate", methods=["POST"])
def generate_flashcards():
    subject = request.json.get("subject")

    prompt = f"Generate 5 flashcards about: {subject}"

    response = requests.post(OLLAMA_URL, json={
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    })

    data = response.json()
    raw_output = data["response"]

    return jsonify({"result": raw_output})


if __name__ == "__main__":
    app.run(debug=True)