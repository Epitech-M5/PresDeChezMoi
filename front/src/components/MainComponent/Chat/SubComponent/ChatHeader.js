import React from "react";

const ChatHeader = () => {
  return (
    <div className="chat_header">
      <img
        className="chat_picture"
        src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
        alt="profile"
      />
      <p className="chat_personne">Personne</p>
    </div>
  );
};

export default ChatHeader;