document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("messageBox");
    const sendMessage = document.getElementById("sendMessage");
    const messagesList = document.querySelector(".messages-list");

    // Function to add a message
    function addMessage(text, type) {
        let newMessage = document.createElement("div");
        newMessage.classList.add("message", type);
        newMessage.textContent = text;

        // Click to delete message
        newMessage.addEventListener("click", function () {
            newMessage.remove();
        });

        messagesList.appendChild(newMessage);
        messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to bottom
    }

    // Send button click event
    sendMessage.addEventListener("click", function () {
        let messageText = messageBox.value.trim();
        if (messageText) {
            addMessage(messageText, "sent");
            messageBox.value = "";
        }
    });

    // Press "Enter" to send a message
    messageBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage.click();
        }
    });

    // Simulate a received message (for testing)
    setTimeout(() => addMessage("Hey, how are you?", "received"), 1000);
});
