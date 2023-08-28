import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAPI, postAPI, putAPI, deleteAPI } from "../api";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;

const Notification = () => {
  const [dataNotif, setDataNotif] = useState([]);
  const user = useSelector((state) => state.utilisateur);

  const deleteNotif = (e) => {
    const titleNotif = document.getElementById("title").innerHTML;

    if (
      window.confirm(
        "Etes-vous sûr de vouloir supprimer la notification : " +
          titleNotif +
          " ?"
      )
    ) {
      const elementParent = e.target.parentElement;
      var idNotif = elementParent.id;
      elementParent.remove();
      console.log("idUtilisateur", user.idutilisateur);
      putAPI(
        `http://${adresseip}:${port}/api/notification/${idNotif}`,
        { idUtilisateur: user.idutilisateur },
        { "x-access-token": user.token }
      )
        .then((response) => {
          // setDataNotif(response.dataAPI);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  };
  useEffect(() => {
    getAPI(`http://${adresseip}:${port}/api/notification/${user.idRole}`, {})
      .then((response) => {
        setDataNotif(response.dataAPI);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);
  console.log("dataNotif",dataNotif)
  return (
    <>
      <div className="container_notifpage">
        {dataNotif !== null &&(
          dataNotif.map(
            (notification) =>
              (notification.typeNotif === "Informatif" && (
                <div className="notif_basic notif_barre" id={notification.id}>
                  <div className="contein_text">
                    <p id="title">{notification.titre}</p>
                    <p className="message">{notification.message}</p>
                  </div>
                  <i class="fa-solid fa-xmark" onClick={deleteNotif}></i>
                </div>
              )) ||
              (notification.typeNotif === "Warning" && (
                <div className="notif_warning notif_barre" id={notification.id}>
                  <div className="contein_text">
                    <p id="title">{notification.titre}</p>
                    <p className="message">{notification.message}</p>
                  </div>

                  <i class="fa-solid fa-xmark" onClick={deleteNotif}></i>
                </div>
              )) ||
              (notification.typeNotif === "Danger" && (
                <div className="notif_urgent notif_barre" id={notification.id}>
                  <div className="contein_text">
                    <p id="title">{notification.titre}</p>
                    <p className="message">{notification.message}</p>
                  </div>
                  <i class="fa-solid fa-xmark" onClick={deleteNotif}></i>
                </div>
              ))
          )
        )||(
          <div className="notif_warning notif_barre" >
          <div className="contein_text">
            <p id="title">Il n'y a pas de notifications </p>
          </div>
        </div>
        )}
      </div>
      ;
    </>
  );
};

export default Notification;
