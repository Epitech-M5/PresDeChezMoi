import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import FormTicket from "./SubComponent/FormTicket";
import ListTicket from "./SubComponent/ListTicket";
import First from "./SubComponent/First";
import MessageQueue, { useMessageQueue } from "../../MessageQueue.js";

const ChatBot = () => {
  const [history, setHistory] = useState([]);
  const { addMessage, removeMessage, messages } = useMessageQueue();

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

  const clear = () => {
    setHistory([<First history={history} setHistory={setHistory} />]);
  };

  const History = () => {
    return (
      <>
        {history.map((item, index) => (
          <div key={index} className="chatbot_message">
            <div className="chatbot_message_containt">
              <div className="chatbot_logo_message">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="chatbot_text">{item}</div>
            </div>
          </div>
        ))}
      </>
    );
  };

  useEffect(() => {
    setHistory([<First addMessage={addMessage} history={history} setHistory={setHistory} />]);
    console.log("history", history);
  }, []);

  useEffect(() => {
    console.log("history refresh", history);
  }, [history]);

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
            <div className="inner_center">
              <h1>BipBopBip</h1>
              <i className="fa-solid fa-circle"></i>
            </div>
            <button className="chatbot_clear" onClick={clear}>
              <i className="fa-solid fa-broom" />
            </button>
          </div>
          <div className="chatbot_history">
            <History />
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
          <div className="inner_center">
            <h1>BipBopBip</h1>
            <i className="fa-solid fa-circle"></i>
          </div>
          <button className="chatbot_clear" onClick={clear}>
            <i className="fa-solid fa-broom" />
          </button>
        </div>

        <History />
      </div>
      <MessageQueue messages={messages} removeMessage={removeMessage} />
    </>
  );
};

export default ChatBot;
