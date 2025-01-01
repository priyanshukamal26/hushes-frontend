const socket = io("http://localhost:3000");

document.getElementById("joinRoom").addEventListener("click", function () {
    const roomName = document.getElementById("roomName").value.trim();
    if (!roomName) return alert("Please enter a room name!");

    console.log(`Joining room: ${roomName}`);
    socket.emit("join-room", roomName);
    document.getElementById("room-selection").style.display = "none";
    document.getElementById("chatroom").style.display = "block";
    document.getElementById("currentRoom").innerText = roomName;
});

socket.on("chat-history", (messages) => {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    messages.forEach((msg) => {
        const p = document.createElement("p");
        p.innerText = msg;
        messagesDiv.appendChild(p);
    });
    scrollToBottom();
});

socket.on("message", (msg) => {
    const messagesDiv = document.getElementById("messages");
    const p = document.createElement("p");
    p.innerText = msg;
    messagesDiv.appendChild(p);
    scrollToBottom();
});

socket.on("error", (errorMessage) => {
    alert(errorMessage);
});

document.getElementById("sendMessage").addEventListener("click", () => {
    const message = document.getElementById("messageInput").value.trim();
    if (!message) return;

    socket.emit("message", message);
    document.getElementById("messageInput").value = "";
});

function scrollToBottom() {
    const messagesDiv = document.getElementById("messages");
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}