import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { getAPI, postAPI, putAPI, deleteAPI } from "./../../../../api";
import First from "./First";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const FormTicket = ({ setHistory, history }) => {
  const [titleTicket, setTitleTicket] = useState("");
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.utilisateur);

  const handleTitle = (event) => {
    setTitleTicket(event.target.value);
  };

  const handleMessage = (event) => {
    setMessage(event.target.value);
  };

  const submitTicket = (event) => {
    event.preventDefault();
    const dateObj = new Date();
    const jour = dateObj.getDate();
    const mois = dateObj.getMonth();
    const annee = dateObj.getFullYear();
    postAPI(
      `http://${adresseip}:${port}/api/ticket/`,
      {
        idUtilisateur: user.idutilisateur,
        titre: titleTicket,
        idStatus: 1,
        message: message,
        dateCreation: dateObj,
      },
      { "x-access-token": user.token }
    )
      .then((response) => {
        setHistory([<First history={history} setHistory={setHistory} />]);
        console.log("date ticket", annee + "-" + mois + "-" + jour);
        console.log("response ticket : ", response);
        alert("Votre ticket a bien été envoyé");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="">
        <form>
          <h2 className="form_title_login">Faire une demande</h2>
          <div className="form_input_field">
            <input
              type="text"
              placeholder="Titre de la demande"
              onChange={handleTitle}
              value={titleTicket} // Ajout de cette ligne
            />
          </div>
          <div className="form_input_field">
            <input
              type="text"
              placeholder="Entrez un message"
              onChange={handleMessage}
              value={message}
            />
          </div>
          <input
            type="submit"
            value="Envoyer"
            className="form_btn_login"
            onClick={submitTicket}
          />
        </form>
      </div>
    </>
  );
};

export default FormTicket;
