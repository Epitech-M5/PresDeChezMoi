import React, { useState, useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { getAPI, postAPI, putAPI, deleteAPI } from "./../../../../api";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const ListTicket = () => {
  const [ticket, setTicket] = useState([]);
  const user = useSelector((state) => state.utilisateur);

  useEffect(() => {
    getAPI(
      `http://${adresseip}:${port}/api/ticket/by_user/${user.idutilisateur}`,
      {},
      { "x-access-token": user.token }
    )
      .then((response) => {
        setTicket(response.dataAPI);
        console.log("response liste ticket : ", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  console.log(ticket);
  return (
    <>
      <div className="list_tickets">
        <p className="list_header">Liste des tickets</p>
        <ul>
          {ticket.map((item, index) => {
            // console.log(item.role.titre);
            return (
              
              <div key={item.id} className="display_tickets" >
                {/* style={index == ticket.length - 1 ? ({ border-bottom: none }) : ({})} */} 
                <li>
                  <h3>Titre : </h3>
                  <p>{item.titre}</p>
                </li>
                <li>
                  <h3>Status : </h3>
                  <p>{item.status.titre}</p>
                </li>
                <li>
                  <h3>Message : </h3>
                  <p>{item.message}</p>
                </li>
                <li>
                  <h3>Date de Création : </h3>
                  <p>{item.dateCreation}</p>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ListTicket;
