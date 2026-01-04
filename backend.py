from flask import Flask, request, jsonify
from flask_cors import CORS
from sambanova import SambaNova
from secure import API_KEY

app = Flask(__name__)
CORS(app)  # allow JS requests

client = SambaNova(
    api_key=API_KEY,
    base_url="https://api.sambanova.ai/v1"
)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_prompt = data.get("prompt")

    response = client.chat.completions.create(
        model="ALLaM-7B-Instruct-preview",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.1,
        top_p=0.1
    )

    return jsonify({
        "reply": response.choices[0].message.content
    })

if __name__ == "__main__":
    app.run(debug=True)
