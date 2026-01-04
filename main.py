from sambanova import SambaNova
from secure import API_KEY

client = SambaNova(
    api_key=API_KEY,
    base_url="https://api.sambanova.ai/v1"
)

response = client.chat.completions.create(
    model="ALLaM-7B-Instruct-preview",
    messages=[
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello!"}
    ],
    temperature=0.1,
    top_p=0.1
)

print(response.choices[0].message.content)
