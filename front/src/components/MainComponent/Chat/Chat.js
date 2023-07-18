import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatHistory from "./SubComponent/ChatHistory";
import ChatCommand from "./SubComponent/ChatCommand";
import ChatHeader from "./SubComponent/ChatHeader";
import ChatSidebar from "./SubComponent/ChatSidebar";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  fetchUtilisateurData,
  fetchRefreshToken,
  fetchToken,
} from "../../../redux/Utilisateur";
import { fetchMembers } from "../../../redux/ListUsers";
import { store } from "../../../redux/store";
import axios from "axios";

const Chat = () => {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.utilisateur);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const socketPort = 8082;

  const ipBDD = "localhost";
  const [refreshTokenValid, setRefreshTokenValid] = useState(true);

  const userInfo = useSelector((state) => state.utilisateur);
  const listUsers = useSelector((state) => state.listUsers);

  //↓↓↓↓↓↓↓↓↓↓↓↓↓↓ A SUPPRIMER ↓↓↓↓↓↓↓↓↓↓↓↓

  useEffect(() => {
    console.log("USERINFO",userInfo);
    // const UserInfo = {
    //   id: 6,
    //   pseudo: "test",
    //   isLogin: true,
    //   score: null,
    //   photoProfil: "5",
    //   idRole: 2,
    //   accessToken:
    //     "ZeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjg5NTk0MTEwLCJleHAiOjE2ODk1OTc3MTB9.IfaeAKdfe8P_adUond6OxNpbEgDl9AuOI3HwDg90_MA",
    //   refreshToken: "4fbd580e-5d16-4eb2-bf4c-7d7a433e30a7",
    // };

  //   dispatch(isLogin());
  //   dispatch(fetchToken(UserInfo.accessToken));
  //   dispatch(fetchRefreshToken(UserInfo.refreshToken));
  //   dispatch(
  //     fetchUtilisateurData({
  //       pseudo: UserInfo.pseudo,
  //       idutilisateur: UserInfo.id,
  //       idRole: UserInfo.idRole,
  //       pathImage: UserInfo.photoProfil,
  //     })
  //   );

  //   console.log("Variables set");
  }, []);

  //↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

  async function fetchData() {
    // Function pour actualiser les info de la table rooms
    try {
      const config = {
        headers: {
          "x-access-token": userInfo.token,
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
      };

      const response = await axios.get(`http://${ipBDD}:8081/api/room/`,config);

      console.log("RESPONSE.DATA",response.data);
      console.log("USERINFO",userInfo);

      // Effectuez des actions supplémentaires avec les données de la réponse ici
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Erreur 401 - Token d'accès invalide, effectuer la requête de rafraîchissement du token
        if (refreshTokenValid) {
          console.log(
            "Access token expired or invalid, trying to refresh it..."
          );
          await refreshToken();
        } else {
          console.log("Refresh token expired or invalid");
          // Effectuez l'action appropriée lorsque le refreshToken n'est pas valide
        }
      } else {
        console.error(error);
      }
    }
  }

  async function refreshToken() {
    try {
      const body = {
        refreshToken: userInfo.refreshToken,
      };

      const response = await axios({
        method: "POST",
        url: `http://${ipBDD}:8081/api/user/auth/refreshtoken`,
        data: body,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Mise à jour du token d'accès (accessToken) et du token de rafraîchissement (refreshToken) dans les informations de l'utilisateur

      dispatch(fetchToken(accessToken));
      dispatch(fetchRefreshToken(newRefreshToken));

      console.log("Refresh token & access token successfully update");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Erreur 401 - Token de rafraîchissement invalide
        setRefreshTokenValid(false);
        console.log("Refresh token expired or invalid");
        // Effectuez l'action appropriée, par exemple déconnecter l'utilisateur ou rediriger vers une page de connexion
      } else {
        setRefreshTokenValid(false);
        console.error(error);
      }
    }
  }

  useEffect(() => {
    const newSocket = io(`http://localhost:${socketPort}`);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
      console.log(`User Connected: ${newSocket.id}`);
    });

    newSocket.on("disconnect", () => {
      console.log(`User Disconnected: ${socketId}`);
      setSocketId(null);
    });
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    // fetchData();
    // Mettre en place l'intervalle pour exécuter fetchData toutes les 10 secondes
    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque le tableau de dépendances change
    return () => {
      clearInterval(interval);
    };
  }, [userInfo]); //cela va refetch autmatiquement si le token ou refresh token change, sinon cela va refetch toutes les 10 secondes

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("receive_message", (data) => {
  //       console.log(data);
  //       setHistory((prevHistory) => [...prevHistory, data]);
  //     });
  //   }
  // }, [socket]);

  const handleImportImage = (selectedImage) => {
    setImage(selectedImage);
  };

  const sendMessage = (messageData) => {
    socket.emit("message", messageData);
    setMessage("");
    setImage(null);
  };

  return (
    <>
      <div className="chat_container">
        <ChatSidebar fetchData={fetchData} />

        <div className="chat_blank" />

        <div className="chat_containt">
          <ChatHeader userInfo={userInfo} />

          <ChatHistory history={history} />

          <ChatCommand
            message={message}
            setMessage={setMessage}
            handleImportImage={handleImportImage}
            sendMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
