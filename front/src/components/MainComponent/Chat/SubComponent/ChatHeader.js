import React, { useEffect } from "react";

const ChatHeader = (props) => {
  const profileImageDefault = "../../../../media/img/1.png";

  useEffect(() => {
  }, [props]);

  return (
    <div className="chat_header">
      {props.convInfo ? (
        <>
          <img
            className="chat_picture"
            src={"../../../../media/img/" + props.convInfo.photoProfil + ".png"}
            alt="profile"
          />
          <p className="chat_personne">{props.convInfo.pseudo}</p>
        </>
      ) : (null)}
    </div>
  );
};

export default ChatHeader;
