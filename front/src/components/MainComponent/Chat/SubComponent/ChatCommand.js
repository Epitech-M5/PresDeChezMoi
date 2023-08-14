import React, { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";

const ChatCommand = ({
  message,
  setMessage,
  sendMessage,
  channel,
}) => {
  const userInfo = useSelector((state) => state.utilisateur);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim().length === 0) return;

    const messageData = {
      idUtilisateur: userInfo.idutilisateur,
      pseudo: userInfo.pseudo,
      message: message,
      idRoom: channel,
      image: userInfo.photoProfil,
      createdAt: new Date(),
    };

    sendMessage(messageData);
    setMessage("");
  };

  useEffect(() => {}, [channel]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Empêche le saut de ligne
      handleSubmit(e);
    }
  };

  return (
    <div className="chat_command">
      <form onSubmit={handleSubmit} className="chat_foot">
        <textarea
          value={message}
          className="inputText"
          onChange={handleInputChange}
          placeholder="Send Message Here"
          onKeyDown={handleKeyDown} // Gestionnaire d'événements pour la touche "Entrée"
        />
        <button type="submit">
          <FiSend className="chat_btn_send" />
        </button>
      </form>
    </div>
  );
};

export default ChatCommand;
