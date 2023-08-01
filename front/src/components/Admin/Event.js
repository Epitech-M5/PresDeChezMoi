import { getAPI, postAPI, putAPI, deleteAPI } from "../../api.js";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DropDownBtn from "../MainComponent/DropDownBtn.js";
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
const Event = () => {
  const { addMessage, removeMessage, messages } = useMessageQueue();

  const utilisateur = useSelector((state) => state.utilisateur);
  const [envoyeA, setEnvoyeA] = useState("");
  const [titre, setTitre] = useState("");
  const [typeNotification, setTypeNotification] = useState("");
  const [formeNotification, setformeNotification] = useState("");
  const [message, setMessage] = useState("");
  const handleEnvoyeA = (data) => {
    setEnvoyeA(data)
  };
  const handleTypeNotification = (data) => {
    setTypeNotification(data)
  };
  const handleFormeNotification = (data) => {
    setformeNotification(data)
  };
  const handleTitre = (data) => {
    setTitre(data.target.value)
  };
  const handleMessage = (data) => {
    setMessage(data.target.value)
  };

  const sendNotification = (e) => {
    e.preventDefault()
    if (titre !== "" && message !== "" && envoyeA !== "" && typeNotification !== "" && formeNotification !== "") {
      const NotificationObjet = {
        titre: titre,
        supprimer: false,
        message: message,
        dateCreation: null,
        envoyeA: envoyeA,
        typeNotif: typeNotification,
        formeNotif: formeNotification
      };
      postAPI(`http://${adresseip}:${port}/api/notification`, NotificationObjet, {
        "x-access-token": utilisateur.token,
      })
        .then((response) => {
          addMessage('La notification a été envoyé avec succès', 'success')
        })
        .catch((error) => {
          addMessage('Une erreur est survenu lors de l\'envoie de la notification', 'error')
          console.log("error", error);
        });
    } else {
      addMessage('Veuillez renseigner tout les champs', 'error')

    }

  };
  return (
    <>
      <div className="content_admin">
        <MessageQueue messages={messages} removeMessage={removeMessage} />

        <div className="container_title_page_admin">
          <h1>Notification évènement</h1>
        </div>
        <div className="content_inside_admin_pages">
          <form action="post">
            <label>Titre de la notification:</label>
            <input name="titre" onChange={handleTitre}></input>
            <DropDownBtn
              type="rela"
              text="Envoyé à"
              items={[
                "Super Administrateur",
                "Admin",
                "Utilisateur",
                "Modérateur",
              ]}
              onCheckboxChange={handleEnvoyeA}
            />
            <DropDownBtn
              type="rela"

              text="Type d'annonce"
              items={["Informatif", "Danger"]}
              onCheckboxChange={handleTypeNotification}
            />
            <DropDownBtn
              type="rela"

              text="Forme de l'annonce"
              items={["Simple", "Bandereau"]}
              onCheckboxChange={handleFormeNotification}
            />
            <label for="message">Message:</label>
            <textarea name="message" type="text" onChange={handleMessage}></textarea>
            <button type="submit" onClick={sendNotification}>Envoyer</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Event;
