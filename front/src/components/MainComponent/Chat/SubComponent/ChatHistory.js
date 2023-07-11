import React, { useRef, useLayoutEffect } from "react";

const ChatHistory = ({ history }) => {
  const chatHistoryRef = useRef(null);

  useLayoutEffect(() => {
    scrollToBottom();
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
        item.receive ? (
          <div className="chat_message_containt">
            <img
              className="chat_image chat_image_receive"
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
              alt="imageMessage"
            />
            <div key={index} className="chat_messages chat_messages_receive">
              <p>{item.message}</p>
              <span>{formatTime(new Date(item.time))}</span>
            </div>
          </div>
        ) : (
          <div className="chat_message_containt">
            <div key={index} className="chat_messages chat_messages_send">
              <p>{item.message}</p>
              <span>{formatTime(new Date(item.time))}</span>
            </div>
            <img
              className="chat_image chat_image_send"
              src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
              alt="imageMessage"
            />
          </div>
        )
      )}
    </div>
  );
};
export default ChatHistory;
