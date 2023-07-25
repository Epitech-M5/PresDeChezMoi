function chatbot() {
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const http = require("http");
  const { Server } = require("socket.io");
  const server = http.createServer(app);
  const serverPort = 8081;

  // Gérez les connexions des clients Socket.IO ici
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // Keep track of the connected users and their respective channels
  const users = {};

  io.on("connection", async (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("message", (data) => {
      const { channel, message, pseudo, image } = data;
      console.log(`New message received in channel ${channel}: ${message}`);

      // Broadcast the message to all users in the channel
      io.emit("receive_message", {
        pseudo: pseudo,
        message: message,
        channel: channel,
        image: image,
        time: new Date(),
      });
    });

    socket.on("disconnect", () => {
      // Leave the channel, if any
      if (users[socket.id] && users[socket.id].channel) {
        socket.leave(users[socket.id].channel);
        console.log(
          `User ${socket.id} left channel ${users[socket.id].channel}`
        );
      }

      console.log(`User Disconnected: ${socket.id}`);
      delete users[socket.id];
    });
  });

  server.listen( serverPort, () => {
    console.log(`Socket.IO on port ${serverPort}`);
  });
}

module.exports = chatbot;
