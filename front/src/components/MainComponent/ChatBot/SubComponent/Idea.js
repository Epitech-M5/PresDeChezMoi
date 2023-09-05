import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { getAPI, postAPI, putAPI, deleteAPI } from "./../../../../api";
import First from "./First";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const Idea = ({ setHistory, history }) => {
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
        console.log("date idée", annee + "-" + mois + "-" + jour);
        console.log("response idée : ", response);
        alert("Votre idée a bien été envoyée");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div className="">
        <form>
          <h2 className="form_title_login">Proposer une idée</h2>
          <div className="form_input_field">
            <input
              type="text"
              placeholder="Titre de l'idée"
              onChange={handleTitle}
              value={titleTicket}
            />
          </div>
          <div className="form_input_field">
            <input
              type="text"
              placeholder="Entrez une description"
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

export default Idea;
