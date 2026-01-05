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

SYSTEM_PROMPT = """
You are the official AI Assistant of a cryptocurrency tracking website.

This website shows real-time cryptocurrency prices in INR.
It focuses on Bitcoin, Ethereum, Tether, and other popular coins.

Your role:
- Speak as a representative of this website
- Answer only crypto-related questions
- Explain things simply and clearly
- Do NOT say you are a generic AI or assistant
"""


@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_prompt = data.get("prompt")

    response = client.chat.completions.create(
        model="ALLaM-7B-Instruct-preview",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
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
