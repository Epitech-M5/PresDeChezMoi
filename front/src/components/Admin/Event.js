import { getAPI, postAPI, putAPI, deleteAPI } from "../../api.js";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DropDownBtn from "../MainComponent/DropDownBtn.js";
import MessageQueue, {
  useMessageQueue,
} from "../../components/MessageQueue.js";
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;
const Event = () => {
  const { addMessage, removeMessage, messages } = useMessageQueue();

  const utilisateur = useSelector((state) => state.utilisateur);
  const [envoyeA, setEnvoyeA] = useState("");
  const [titre, setTitre] = useState("");
  const [typeNotification, setTypeNotification] = useState("");
  const [formeNotification, setformeNotification] = useState("");
  const [message, setMessage] = useState("");
  const [listSenduser, setListSendUser] = useState("Envoyé à");
  const [typeAnnonce, setTypeAnnonce] = useState("Type d'annonce");
  const [formeAnnonce, setFormeAnnonce] = useState("Forme de l'annonce");

  // Stock des idUser qui reçoivent la notif pour mettre pastille
  //(prévient qu'ils ont une notif)
  const [utilisateursEstNotif, setUtilisateursEstNotif] = useState([]);

  const handleEnvoyeA = (data) => {
    setEnvoyeA(data);
    setListSendUser(data)
  };
  const handleTypeNotification = (data) => {
    setTypeNotification(data);
    setTypeAnnonce(data)
  };
  const handleFormeNotification = (data) => {
    setformeNotification(data);
    setFormeAnnonce(data)
  };
  const handleTitre = (data) => {
    setTitre(data.target.value);
  };
  const handleMessage = (data) => {
    setMessage(data.target.value);
  };

  const sendNotification = (e) => {
    e.preventDefault();
    if (
      titre !== "" &&
      message !== "" &&
      envoyeA !== "" &&
      typeNotification !== "" &&
      formeNotification !== ""
    ) {
      const NotificationObjet = {
        titre: titre,
        supprimer: false,
        message: message,
        idVille: utilisateur.idVille,
        dateCreation: null,
        envoyeA: envoyeA,
        typeNotif: typeNotification,
        formeNotif: formeNotification,
      };
      postAPI(
        `http://${adresseip}:${port}/api/notification`,
        NotificationObjet,
        {
          "x-access-token": utilisateur.token,
        }
      )
        .then((response) => {
          setUtilisateursEstNotif(response.dataAPI.destinataire);
          addMessage("La notification a été envoyé avec succès", "success");
        })
        .catch((error) => {
          addMessage(
            "Une erreur est survenu lors de l'envoie de la notification",
            "error"
          );
          console.log("error", error);
        });
    } else {
      addMessage("Veuillez renseigner tout les champs", "error");
    }
  };

  // Quand je reçois la réponse a l'envoie d'une notif
  // estNotif dans table user = true 
  useEffect(() => {

    utilisateursEstNotif.forEach((idUtilisateur) => {
      putAPI(`http://${adresseip}:${port}/api/user/` + idUtilisateur, { 'estNotif': 1 }, {
        "x-access-token": utilisateur.token,
      })
        .then((response) => {
          // console.log("responseUPDATE", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  }, [utilisateursEstNotif]);
  return (
    <>
      <div className="content_admin">
        <MessageQueue messages={messages} removeMessage={removeMessage} />

        <div className="container_title_page_admin">
          <h1>Notification évènement</h1>
        </div>
        <div className="content_inside_admin_pages">
          <form action="post">
            <div className="container_title_event_adm">
              <label for="titre">Titre de la notification:</label>
              <input name="titre" onChange={handleTitre} />
            </div>

            <div className="wrapper_btndropd_event">
              <div className="container_dropd1_event">
                <DropDownBtn
                  type="abs"
                  text={listSenduser}
                  items={[
                    "Admin",
                    "Utilisateur",
                    "Modérateur",
                  ]}
                  onCheckboxChange={handleEnvoyeA}
                />
              </div>

              <div className="container_dropd1_event">
                <DropDownBtn
                  type="abs"
                  text={typeAnnonce}
                  items={["Informatif", "Danger", "Warning"]}
                  onCheckboxChange={handleTypeNotification}
                />
              </div>

              <div className="container_dropd1_event">
                <DropDownBtn
                  type="abs"
                  text={formeAnnonce}
                  items={["Simple", "Bandereau"]}
                  onCheckboxChange={handleFormeNotification}
                />
              </div>
            </div>

            <div className="container_title_event_adm">
              <label for="message">Message:</label>
              <textarea name="message" type="text" onChange={handleMessage} />
              <button type="submit" onClick={sendNotification}>
                Envoyer
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Event;
