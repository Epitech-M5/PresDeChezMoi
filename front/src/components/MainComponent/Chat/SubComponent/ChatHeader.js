import React, { useEffect } from "react";

const ChatHeader = (props) => {
  const profileImageDefault = "../../../../media/img/1.png";
  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <div className="chat_header">
      <img
        className="chat_picture"
        src={"../../../../media/img/" + props.userInfo.pathImage + ".png"}
        alt="profile"
      />
      <p className="chat_personne">Personne</p>
    </div>
  );
};

export default ChatHeader;
