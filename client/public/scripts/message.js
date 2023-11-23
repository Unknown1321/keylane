const socket = io("http://localhost:5000/");
const chatUrl = "http://localhost:5000/api/chats";

const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const receivedMessagesContainer = document.getElementById("receivedMessages");

const receivedMessages = [];

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit("message", message);
  messageInput.value = "";
});

function handleDeleteMessage(chatId) {
  try {
    fetch(`${chatUrl}/${chatId}`, {
      method: "DELETE",
    })
      .then(() => {
        const messageElement = document.getElementById(`message-${chatId}`);

        if (messageElement) {
          messageElement.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting message:", error);
      });
  } catch (error) {
    console.error("Error deleting message:", error);
  }
}

function renderReceivedMessages() {
  receivedMessagesContainer.innerHTML = "";

  receivedMessages.forEach((message) => {
    const messageElement = document.createElement("div");
    messageElement.className = "received-message";
    messageElement.id = `message-${message._id}`;

    const textElement = document.createElement("h2");
    textElement.textContent = message.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>
      handleDeleteMessage(message._id)
    );

    messageElement.appendChild(textElement);
    messageElement.appendChild(deleteButton);
    receivedMessagesContainer.appendChild(messageElement);
  });
}

fetch(chatUrl)
  .then((response) => response.json())
  .then((messages) => {
    receivedMessages.push(...messages);
    renderReceivedMessages();
  })
  .catch((error) => console.error("Fetch error:", error));

socket.on("message_receiver", (newMessage) => {
  receivedMessages.push(newMessage);
  renderReceivedMessages();
});
