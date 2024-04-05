const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.on("setUsername", (username) => {
    socket.username = username;
    console.log(`User ${username} connected with socket.id: ${socket.id}`);
  });

  socket.on("privateMessage", (data) => {
    const { recipientSocketId, message } = data;
    const recipientSocket = io.sockets.sockets[recipientSocketId];

    if (recipientSocket) {
      recipientSocket.emit("newPrivateMessage", {
        message,
        sender: socket.username,
      });
    } else {
      console.error(`Recipient not found for socket.id: ${recipientSocketId}`);
      socket.emit("errorMessage", "Recipient not found");
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
