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
      socket.emit("receive_message", {
        message: "message reçu " + data.message,
        receive: true,
        time: data.time,
      });
    });
  });

  server.listen(8082, () => {
    console.log("Socket.IO on port 8082");
  });
}

module.exports = chatbot;