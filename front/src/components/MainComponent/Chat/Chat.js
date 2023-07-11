import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatHistory from "./SubComponent/ChatHistory";
import ChatCommand from "./SubComponent/ChatCommand";
import ChatHeader from "./SubComponent/ChatHeader";
import ChatSidebar from "./SubComponent/ChatSidebar";

const Chat = ({idUser}) => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);




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

  const handleImportImage = (selectedImage) => {
    setImage(selectedImage);
  };

  const sendMessage = (messageData) => {
    socket.emit("message", messageData);
    setMessage("");
    setImage(null);
  };

  return (
    <>
      <div className="chat_container">
        <ChatSidebar />

        <div className="chat_blank"/>

        <div className="chat_containt">
          <ChatHeader />

          <ChatHistory history={history} />

          <ChatCommand
            message={message}
            setMessage={setMessage}
            handleImportImage={handleImportImage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;