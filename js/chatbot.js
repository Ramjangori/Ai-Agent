document.addEventListener("DOMContentLoaded", () => {

  // ===== ELEMENTS =====
  const toggleBtn = document.getElementById("chat-toggle");
  const chatWidget = document.getElementById("chat-widget");
  const closeBtn = document.getElementById("chat-close");

  const chatContainer = document.querySelector(".chat-container");
  const input = document.querySelector(".prompt");
  const sendBtn = document.querySelector(".btn");

  let welcomeShown = false;
  let isChatOpen = false;

  // ===== SAFETY CHECK =====
  if (!toggleBtn || !chatWidget || !closeBtn || !chatContainer || !input || !sendBtn) {
    console.error("❌ Chatbot DOM elements missing");
    return;
  }

  // ===== CLOSE CHAT =====
  closeBtn.addEventListener("click", () => {
    chatWidget.classList.add("hidden");
  });


  toggleBtn.addEventListener("click", () => {
  isChatOpen = !isChatOpen;
  chatWidget.classList.toggle("hidden");
  input.focus();

  if (isChatOpen && !welcomeShown) {
    addMessage(
`👋 Welcome to Crypto Assistant!

I can help you with:
• Live crypto prices 📈
• Bitcoin & Ethereum details
• Understanding market basics
• Crypto-related questions

Ask me anything about crypto 👇`,
      "ai"
    );
    welcomeShown = true;
  }
});


  // ===== SEND EVENTS =====
  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  // ===== SEND MESSAGE =====
  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    input.value = "";

    addMessage(text, "user");
    const thinkingEl = addMessage("Thinking...", "ai");

    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text })
    })
      .then(res => res.json())
      .then(data => {
        thinkingEl.querySelector("p").innerText = data.reply;
      })
      .catch(() => {
        thinkingEl.querySelector("p").innerText = "⚠️ Server error";
      });
  }

  // ===== ADD MESSAGE =====
  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = type === "user" ? "user-chat" : "ai-chat";

    const img = document.createElement("img");
    img.src = type === "user"
      ? "./assets/user-img.jfif"
      : "./assets/ai-img.jfif";

    const p = document.createElement("p");
    p.innerText = text;

    msg.append(img, p);
    chatContainer.appendChild(msg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return msg;
  }

});
