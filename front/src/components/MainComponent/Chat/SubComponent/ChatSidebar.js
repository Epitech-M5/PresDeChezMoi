import axios from "axios";
import React, { useState } from "react";

const ChatSidebar = () => {
  const [listRooms, setListRooms] = useState([
    { id: 1, idUtilisateur: 1 },
    { id: 2, idUtilisateur: 2 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
  ]);

  // commande axios pour faire la liste des pseudo des users

  const [listUsers, setListUsers] = useState([
    { pseudo: "test", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test1", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test2", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test3", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test4", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test5", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test5", photoProfil: "../../../../media/img/1.png" },
  ]);

  // setHistory((prevHistory) => [...prevHistory, ]);

  return (
    <div className="chat_sidebar">
      <div className="chat_list_users">
        {listUsers.map((item, index) => (
          <div key={index} className="chat_users">
            <img
              className={"chat_users_image"}
              src={
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
              }
              alt={item.pseudo}
            />
            <h2 className="chat_users_pseudo">{item.pseudo}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
