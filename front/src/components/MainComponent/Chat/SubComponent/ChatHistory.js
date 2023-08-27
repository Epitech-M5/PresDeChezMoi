import React, { useRef, useLayoutEffect, useEffect } from "react";
import { useSelector } from "react-redux";


const ChatHistory = ({ history }) => {
  const userInfo = useSelector((state) => state.utilisateur);
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
    console.log("============ Historique =============== ", history);
  }, [history]);

  const scrollToBottom = () => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  };

  const formatTime = (time) => {
    const currentTime = new Date();
    const diffTime = Math.abs(currentTime - time);
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const minutes = Math.floor(diffTime / (1000 * 60));

    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} jour${days > 1 ? "s" : ""} ago`;
    } else if (hours >= 1) {
      return `${hours} heure${hours > 1 ? "s" : ""} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div ref={chatHistoryRef} className="chat_history">
      {history.map((item, index) =>
        item.idUtilisateur !== userInfo.idutilisateur ? (
          <div className="chat_message_containt" key={index}>
            <img className="chat_image chat_image_receive" src={`../../../../media/img/${item.image}.png`} alt="imageMessage" />
            <div className="chat_messages chat_messages_receive">
              <p>{item.pseudo}: {item.message}</p>
              <span>{formatTime(new Date(item.createdAt))}</span>
            </div>
          </div>
        ) : (
          <div className="chat_message_containt" key={index}>
            <div className="chat_messages chat_messages_send">
              <p>{item.message}</p>
              <span>{formatTime(new Date(item.createdAt))}</span>
            </div>
            <img className="chat_image chat_image_send" src={`../../../../media/img/${item.image}.png`} alt="imageMessage" />
          </div>
        )
      )}
    </div>
  );
};
export default ChatHistory;
