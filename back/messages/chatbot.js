function chatbot() {
  const express = require("express");
  const cors = require("cors");
  const app = express();
  const http = require("http");
  const { Server } = require("socket.io");
  const server = http.createServer(app);

  // Gérez les connexions des clients Socket.IO ici
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("message", (data) => {
      console.log("Nouveau message reçu :", data.message);
      socket.emit("receive_message", data);
    });
  });

  server.listen(8081, () => {
    console.log("Server running on port 8081");
  });
}

module.exports = chatbot;
