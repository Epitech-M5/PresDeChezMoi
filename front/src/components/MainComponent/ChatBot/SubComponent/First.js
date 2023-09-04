import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonDisconnect from "../../Disconnect";
import FormTicket from "./FormTicket";
import ListTicket from "./ListTicket";
import Idea from "./Idea";

const First = ({addMessage, history, setHistory}) => {
  const navigate = useNavigate();

  const idea = () => {
    setHistory(prevArray => [...prevArray, <Idea addMessage={addMessage} history={history} setHistory={setHistory} />])
    //l'historique dans un console.log affichera le tableau vide car le setHistory est async et ne se fait pas directement l'action (pour le component celui-ci est vide)
  };

  const problem = () => {
    setHistory(prevArray => [...prevArray, <FormTicket addMessage={addMessage} history={history} setHistory={setHistory} />])
    //l'historique dans un console.log affichera le tableau vide car le setHistory est async et ne se fait pas directement l'action (pour le component celui-ci est vide)
  };

  const tickets = () => {
    setHistory(prevArray => [...prevArray, <ListTicket addMessage={addMessage} history={history} setHistory={setHistory} />])
    //l'historique dans un console.log affichera le tableau vide car le setHistory est async et ne se fait pas directement l'action (pour le component celui-ci est vide)
  };

  useEffect(() => {
    console.log("problem useEffect", history);
  }, []);

  return (
    <>
      <p>Bonjour !</p>
      <p>Comment puis-je vous aidez ?</p>
      <div className="chatbot_first_buttons">
        <button className="chatbot_first_button" onClick={idea}>
          j'aimerai proposer une idée !
        </button>
        <button className="chatbot_first_button" onClick={problem}>j'ai un problème</button>
        <button
          className="chatbot_first_button"
          onClick={() => navigate("/contact")}
        >
          je veux contacter l'equipe
        </button>
        <button className="chatbot_first_button" onClick={tickets}>voir mes demandes</button>
      </div>
    </>
  );
};

export default First;
