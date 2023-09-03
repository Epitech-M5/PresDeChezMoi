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
      <div className="">
        <ul>
          {ticket.map((item) => {
            // console.log(item.role.titre);
            return (
              <div key={item.id}>
                <li>{item.titre}</li>
                <li>{item.status.titre}</li>
                <li>{item.message}</li>
                <li>{item.dateCreation}</li>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ListTicket;
