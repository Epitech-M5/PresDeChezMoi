import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import ChatHistory from "./SubComponent/ChatHistory";
import ChatCommand from "./SubComponent/ChatCommand";
import ChatHeader from "./SubComponent/ChatHeader";
import ChatSidebar from "./SubComponent/ChatSidebar";
import { store } from "../../../redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  fetchUtilisateurData,
  fetchRefreshToken,
  fetchToken,
} from "../../../redux/Utilisateur";
import { fetchConv } from "../../../redux/ListUsers";
import axios from "axios";

const Chat = () => {
  // const dispatch = useDispatch();
  // const userInfo = useSelector((state) => state.utilisateur);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [socketId, setSocketId] = useState(null);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [channel, setChannel] = useState(null);
  const dispatch = useDispatch();
  const [refreshTokenValid, setRefreshTokenValid] = useState(true);
  const userInfo = useSelector((state) => state.utilisateur);

  const [convInfo, setConvInfo] = useState({});

  const socketPort = 8081;
  const ipBDD = "localhost";

  const supIndexTableau = (tableau, indexASupprimer) => {
    // Créez une copie du tableau existant à l'aide de la méthode slice() ou spread operator.
    const nouveauTableau = [...tableau];

    // Supprimez l'élément à l'index spécifié à l'aide de la méthode splice().
    nouveauTableau.splice(indexASupprimer, 1);

    // Mettez à jour le state avec le nouveau tableau.
    tableau = nouveauTableau;
  };

  async function fetchData() {
    // Function pour actualiser les info de la table rooms
    const data = new URLSearchParams();
    data.append("membres", userInfo.pseudo);

    try {
      const response = await axios.post(
        `http://${ipBDD}:8082/api/room/members`,
        data,
        {
          headers: {
            "x-access-token": userInfo.token,
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
        }
      );

      // Supposons que response.data soit le tableau initial et userInfo.pseudo contienne le pseudo de l'utilisateur.
      const newData = response.data.map((item) => {
        const membres = item.membres
          .split("[")
          .join("")
          .split("]")
          .join("")
          .split('"')
          .join("")
          .split(",");

        // Filtrer les membres pour exclure le pseudo de l'utilisateur actuel
        const filteredMembres = membres.filter(
          (membre) => membre !== userInfo.pseudo
        );

        return { ...item, membres: filteredMembres };
      });

      // Utilisez maintenant newData dans votre application React.

      console.log("State User ", userInfo);
      dispatch(fetchConv(newData));
      // Effectuez des actions supplémentaires avec les données de la réponse ici
      console.log("Conv ", newData);
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
    var newSocket = io(`:${socketPort}`);
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
    if (socket && channel) {
      // Join the default channel when connected
      const callback = (data) => {
        if (data.channel === channel) {
          if (history[history.length - 1] === data) return;
          console.log(data);
          setHistory((prevHistory) => [...prevHistory, data]);
        }
      };

      socket.on("receive_message", callback);

      return () => {
        socket.off("receive_message", callback);
      };
    }
  }, [socket, channel, convInfo, history]);

  const handleChangeChannel = (channelEntry) => {
    setHistory([]);
    setChannel(channelEntry);
  };

  const sendMessage = (messageData) => {
    socket.emit("message", messageData);
    setMessage("");
  };

  const handleImportImage = (selectedImage) => {
    setImage(selectedImage);
  };

  return (
    <>
      <div className="chat_containers">
        <ChatSidebar
          fetchData={fetchData}
          ipBDD={ipBDD}
          handleChangeChannel={handleChangeChannel}
          setConvInfo={setConvInfo}
        />
        <div className="chat_blank" />

        <div className="chat_containt">
          <ChatHeader
            userInfo={userInfo}
            convInfo={convInfo}
            setConvInfo={setConvInfo}
          />

          <ChatHistory history={history} />

          <ChatCommand
            message={message}
            setMessage={setMessage}
            handleImportImage={handleImportImage}
            sendMessage={sendMessage}
            channel={channel}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
