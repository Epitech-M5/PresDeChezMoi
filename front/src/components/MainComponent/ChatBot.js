import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:8081");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
      console.log(`User Connected: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log(`User Disconnected: ${socketId}`);
      setSocketId(null);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", message);
  };

  return (
    <>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Envoyer un message</button>
    </>
  );
};

export default ChatBot;
