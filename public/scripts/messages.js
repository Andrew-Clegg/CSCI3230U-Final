document.addEventListener("DOMContentLoaded", function () {
    const messageBox = document.getElementById("messageBox");
    const sendMessage = document.getElementById("sendMessage");
    const messagesList = document.querySelector(".messages-list");

    sendMessage.addEventListener("click", function () {
        let messageText = messageBox.value.trim();
        if (messageText) {
            let newMessage = document.createElement("div");
            newMessage.classList.add("message", "sent");
            newMessage.textContent = messageText;
            messagesList.appendChild(newMessage);
            messageBox.value = "";
            messagesList.scrollTop = messagesList.scrollHeight; // Auto-scroll to bottom
        }
    });

    messageBox.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage.click();
        }
    });
});
