import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonDisconnect from "../../Disconnect";

const First = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <p>Bonjour !</p>
      <p>Comment puis-je vous aidez ?</p>
      <div className="chatbot_first_buttons">
        <button className="chatbot_first_button">
          j'aimerai proposer une idée !
        </button>
        <button className="chatbot_first_button">j'ai un problème</button>
        <button
          className="chatbot_first_button"
          onClick={() => navigate("/contact")}
        >
          je veux contacter l'equipe
        </button>
        <button className="chatbot_first_button">voir mes demandes</button>
      </div>
    </>
  );
};

export default First;
