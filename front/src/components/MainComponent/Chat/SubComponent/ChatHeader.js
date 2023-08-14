import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const ChatHeader = (props) => {
  const conv = useSelector((state) => state.listUsers);

  useEffect(() => {
    console.log("================Header=================== ",conv)
  }, [conv]);

  return (
    <div className="chat_header">
      {conv.pseudo ? (
        <>
          <img
            className="chat_picture"
            src={`../../../../media/img/${conv.photoProfil}.png`}
            alt="profile"
          />
          <p className="chat_personne">{conv.pseudo}</p>
        </>
      ) : (null)}
    </div>
  );
};

export default ChatHeader;
