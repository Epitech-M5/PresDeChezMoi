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
  const [channel, setChannel] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.utilisateur);
  const conv = useSelector((state) => state.listUsers);

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

      await dispatch(fetchConv(newData));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Erreur 401 - Token d'accès invalide, effectuer la requête de rafraîchissement du token
        console.log("Erreur 401 - Token d'accès invalide");
      } else {
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
          setHistory((prevHistory) => [...prevHistory, data]);
        }
      };

      socket.on("receive_message", callback);

      return () => {
        socket.off("receive_message", callback);
      };
    }
  }, [socket, channel, history]);

  async function handleChangeChannel(channel) {
    setChannel(channel);
    try {
      const response = await axios.get(
        `http://${ipBDD}:8082/api/chat/user/${userInfo.idutilisateur}`
      );
      //response.data est un objet json, fait un tri de toute les reponses qui ont idRoom = channel
      const messagesByChannel = response.data.filter(
        (message) => message.idRoom === channel
      );

      console.log("---------la réponse envoyé--------------", response.data);

      console.log(
        "---------normalement ce sont les messages par channel qui sont reçu--------------",
        messagesByChannel
      );
      if (response.data !== null) {
        setHistory(messagesByChannel);
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const sendMessage = (messageData) => {
    socket.emit("message", messageData);
    console.log("messageData            ", messageData);
    setMessage("");
  };

  return (
    <>
      <div className="chat_containers">
        <ChatSidebar
          fetchData={fetchData}
          ipBDD={ipBDD}
          handleChangeChannel={handleChangeChannel}
        />
        <div className="chat_blank" />

        <div className="chat_containt">
          <ChatHeader userInfo={userInfo} />

          <ChatHistory history={history} />

          <ChatCommand
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
            channel={channel}
          />
        </div>
      </div>
    </>
  );
};

export default Chat;
