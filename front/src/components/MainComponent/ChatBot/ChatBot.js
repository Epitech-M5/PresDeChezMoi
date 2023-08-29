import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import FormTicket from "./SubComponent/FormTicket";
import ListTicket from "./SubComponent/ListTicket";

const ChatBot = () => {
  const [history, setHistory] = useState([<FormTicket />]);

  const handleToggle = () => {
    const toggleBtnIcon = document.querySelector(".container_logo_chatbot i");
    const ToUp = document.querySelector(".container_chatbot_chat");
    ToUp.classList.toggle("open");

    const isOpen = ToUp.classList.contains("open");
    toggleBtnIcon.classList = isOpen
      ? "fa-solid fa-greater-than fa-rotate-90"
      : "fa-solid fa-robot";
  };

  const handleToggleToSlide = () => {
    const toggleBtnIcon = document.querySelector(
      ".container_forphone_navbar_chatbot i"
    );
    const ToSlide = document.querySelector(".chatbot_toslide");
    ToSlide.classList.toggle("open");

    const isOpen = ToSlide.classList.contains("open");
    toggleBtnIcon.classList = isOpen
      ? "fa-solid fa-greater-than fa-rotate-180"
      : "fa-solid fa-robot";
  };

  const History = () => {
    return (
      <>
        {history.map((item, index) => (
          <div key={index} className="chat_message">
            {(item = "FormTicket" ? <FormTicket /> : null)}
          </div>
        ))}
      </>
    );
  };

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
          <div className="chatbot_history">
            {/* <History /> */}
            <ListTicket></ListTicket>
          </div>
        </div>
      </div>

      <div
        className="container_forphone_navbar_chatbot"
        onClick={handleToggleToSlide}
      >
        <i class="fa-solid fa-robot"></i>
      </div>
      <div className="chatbot_toslide">
        <div className="center_forchatbot forPhone">
          <h1>BipBopBip</h1>
          <i className="fa-solid fa-circle"></i>
        </div>

        <History />
      </div>
    </>
  );
};

export default ChatBot;
