import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  fetchUtilisateurData,
  fetchRefreshToken,
  fetchToken,
} from "../../../../redux/Utilisateur";
import { fetchMembers } from "../../../../redux/ListUsers";

const ChatSidebar = ({fetchData}) => {
  
  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓ A SUPPRIMER ↓↓↓↓↓↓↓↓↓↓↓↓
  const [listRooms, setListRooms] = useState([
    { id: 1, idUtilisateur: 1 },
    { id: 2, idUtilisateur: 2 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
    { id: 3, idUtilisateur: 3 },
  ]);

  // commande axios pour faire la liste des pseudo des users

  const [ListUsers, setListUsers] = useState([
    { pseudo: "test", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test1", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test2", photoProfil: "../../../../media/img/1.png" },
    { pseudo: "test3", photoProfil: "../../../../media/img/1.png" },
  ]);

  const ListUsersFormat = {
    rooms: [
      {
        id: 6,
        membres: ["test", "test3"],
        createdAt: "2023-07-15T16:48:02.000Z",
        updatedAt: "2023-07-15T16:48:02.000Z",
      },
      {
        id: 7,
        membres: ["test", "test2"],
        createdAt: "2023-07-15T16:48:53.000Z",
        updatedAt: "2023-07-15T16:48:53.000Z",
      },
    ],
  };

  //↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  const listUsers = useSelector((state) => state.listUsers);

  // setHistory((prevHistory) => [...prevHistory, ]);

  const handleClick = () => {
    // Fonction à exécuter lorsque le bouton est cliqué
    console.log("Le bouton a été cliqué !");
  };

  useEffect(() => {
      fetchData();
  }, []);

  return (
    <div className="chat_sidebar">
      <div className="chat_list_users">
        {ListUsers.map((item, index) => (
          <button key={index} className="chat_users" onClick={handleClick}>
            <img
              className={"chat_users_image"}
              src={
                "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?cs=srgb&dl=pexels-mohamed-abdelghaffar-771742.jpg&fm=jpg"
              }
              alt={item.pseudo}
            />
            <h2 className="chat_users_pseudo">{item.pseudo}</h2>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
