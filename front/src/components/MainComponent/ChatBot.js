import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [history, setHistory] = useState([]);

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

  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data) => {
        console.log(data);
        setHistory((prevHistory) => [...prevHistory, data]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    socket.emit("message", { socketId: socketId, message: message });
  };

  return (
    <>
      <div className="chat_foot">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="chat_send">
          Send
        </button>
      </div>

      <div className="chat_history">
        {history.map((item, index) => (
          <div key={index} className="chat_message">
            <span>{item.socketId}: </span>
            <span>{item.message}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatBot;
