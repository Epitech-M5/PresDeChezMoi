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

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { reveive : true, message: message });
  };

  return (
    <>
      <div className="chatbot_history">
        {history.map((item, index) => (
          <div key={index} className={`chatbot_messages`}>
            {/* <span>{item.socketId}: </span> */}
            <p className={`${ item.receive ? 'chatbot_receive' : 'chatbot_send'}`}>{item.message}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chatbot_foot">
        <input
          type="text"
          value={message}
          className="inputText"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="chatbot_btn_send">
          Send
        </button>
      </form>
    </>
  );
};

export default ChatBot;
