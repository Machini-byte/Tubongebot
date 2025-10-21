async function fetchIntents() {
  const response = await fetch("knowledge_base.json");
  return await response.json();
}

async function getBotResponse(userInput) {
  const data = await fetchIntents();
  userInput = userInput.toLowerCase();

  for (let intent of data.intents) {
    for (let pattern of intent.patterns) {
      if (userInput.includes(pattern.toLowerCase())) {
        const responses = intent.responses;
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
  }

  // fallback
  const fallbackIntent = data.intents.find(i => i.tag === "fallback");
  return fallbackIntent.responses[Math.floor(Math.random() * fallbackIntent.responses.length)];
}

document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userMessage = input.value.trim();

  if (!userMessage) return;

  // Display user message
  const userDiv = document.createElement("div");
  userDiv.classList.add("user-message");
  userDiv.textContent = userMessage;
  chatBox.appendChild(userDiv);

  input.value = "";

  // Get bot response
  const botResponse = await getBotResponse(userMessage);

  const botDiv = document.createElement("div");
  botDiv.classList.add("bot-message");
  botDiv.textContent = botResponse;
  chatBox.appendChild(botDiv);

  chatBox.scrollTop = chatBox.scrollHeight;
});
