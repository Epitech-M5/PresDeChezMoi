import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatSidebar = ({ fetchData, ipBDD, handleChangeChannel }) => {
  const userInfo = useSelector((state) => state.utilisateur);
  const conv = useSelector((state) => state.listUsers);

  const [listPhoto, setListPhoto] = useState([])

  const handleClick = (id) => {
    // Fonction à exécuter lorsque le bouton est cliqué
    fetchData();
    handleChangeChannel(id);
    debugger;
  };

  useEffect(() => {
    fetchData();


    console.log("Listuser", conv);

  }, [userInfo]);

  return (
    <div className="chat_sidebar">
      <div className="chat_list_users">
        {conv.rooms.map((item, index) => (
          <button key={index} className="chat_users" onClick={() => handleClick(item.id)}>
            <img
              className="chat_users_image"
              // src={}
              alt={item.id}
            />
            <h2 className="chat_users_pseudo">{item.membres}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
