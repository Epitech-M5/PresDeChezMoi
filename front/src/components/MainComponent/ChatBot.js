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

  const handleToggle = () => {

    const toggleBtnIcon = document.querySelector('.container_logo_chatbot i')
    const ToUp = document.querySelector('.container_chatbot_chat')
    ToUp.classList.toggle('open')

    const isOpen = ToUp.classList.contains('open')
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-90' : 'fa-solid fa-robot'
  }

  const handleToggleToSlide = () => {

    const toggleBtnIcon = document.querySelector('.container_forphone_navbar_chatbot i')
    const ToSlide = document.querySelector('.chatbot_toslide')
    ToSlide.classList.toggle('open')

    const isOpen = ToSlide.classList.contains('open')
    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-180' : 'fa-solid fa-robot'
  }

  return (
    <>
      <div className="toCenter">
        <div className="container_logo_chatbot" onClick={handleToggle}>
          <i className="fa-solid fa-robot"></i>
        </div>
      </div>
      <div className="container_chatbot_chat">
        <div className="container_title_msg_chatbot">
          <div className="center_forchatbot">
            <h1>BipBopBip</h1>
            <i className="fa-solid fa-circle"></i>
          </div>
        </div>
        <div className="container_send_msg_chatbot">
          <div className="center_forchatbot">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <i class="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </div>
        </div>

        {history.map((item, index) => (
          <div key={index} className="chat_message">
            <span>{item.socketId}: </span>
            <span>{item.message}</span>
          </div>
        ))}

      </div>

      <div className="container_forphone_navbar_chatbot" onClick={handleToggleToSlide}>
        <i class="fa-solid fa-robot"></i>
      </div>
      <div className="chatbot_toslide">
        <div className="center_forchatbot forPhone">
          <h1>BipBopBip</h1>
          <i className="fa-solid fa-circle"></i>
        </div>
        <div className="container_send_msg_chatbot forPhone">
          <div className="center_forchatbot">
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <i class="fa-solid fa-paper-plane" onClick={sendMessage}></i>
          </div>
        </div>

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
