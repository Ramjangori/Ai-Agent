const promptInput = document.querySelector(".prompt");
const sendBtn = document.querySelector(".btn");
const chatContainer = document.querySelector(".chat-container");
const container = document.querySelector(".container");

let isLoading = false;

const createChatBox = (content, className) => {
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(content);
    return div;
};

const showLoading = (message) => {
    const p = document.createElement("p");
    p.innerText = "Thinking...";

    const img = document.createElement("img");
    img.src = "./ai-img.jfif";
    img.width = 50;

    const box = document.createElement("div");
    box.append(img, p);
    box.className = "ai-chat";

    chatContainer.appendChild(box);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    getApiResponse(message, p);
};

sendBtn.addEventListener("click", sendMessage);

promptInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

function sendMessage() {
    if (isLoading) return;

    const message = promptInput.value.trim();
    if (!message) return;

    isLoading = true;
    promptInput.value = "";

    const p = document.createElement("p");
    p.innerText = message;

    const img = document.createElement("img");
    img.src = "./user-img.jfif";
    img.width = 50;

    const userBox = document.createElement("div");
    userBox.className = "user-chat";
    userBox.append(img, p);

    chatContainer.appendChild(userBox);
    if (container.style.display !== "none") {
        container.style.display = "none";
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => showLoading(message), 500);
}

async function getApiResponse(message, pElement) {
    try {
        const res = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: message })
        });

        const data = await res.json();
        pElement.innerText = data.reply;
    } catch (err) {
        pElement.innerText = "⚠️ Server error";
        console.error(err);
    } finally {
        isLoading = false;
    }
}

