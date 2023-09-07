import React, { useState, useEffect } from "react";
import { getAPI, postAPI, putAPI, deleteAPI } from "../../api.js";
import { Provider, useDispatch, useSelector } from "react-redux";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP;
const port = process.env.REACT_APP_BACKEND_PORT;


const DangerBanner = () => {
  const [showDangerBanner, setShowDangerBanner] = useState([]);
  const user = useSelector((state) => state.utilisateur);
  useEffect(() => {
    const interval = setInterval(() => {
      // requête pour vérifier s'il y a une notification de type "DANGER" dans la base de données
      getAPI(`http://${adresseip}:${port}/api/notification`, null, {})
        .then((response) => {
          setShowDangerBanner(response.dataAPI);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 4000); // 900000 ms = 15 minutes on va mettre un timeout de 4s pour etre synchro avec les autres timeout

    // Nettoyage de l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => clearInterval(interval);
  }, []);

  const deleteAlerte = (idAlerte) => {
    deleteAPI(
      `http://${adresseip}:${port}/api/notification/${idAlerte}`,
      null,
      {}
    )
      .then((response) => {
        console.log("Supp ok !");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <div className="contain_alert">
      {Array.isArray(showDangerBanner) &&
        showDangerBanner.map((banner) => (
          <div key={banner.id} className="contain_message_banner">
            {banner.formeNotif === "Bandereau" && (
              <>
              {user.idRole === 3 && (
               <div className="container_supp_alert ">
               <button
                 className="supp_alert"
                 onClick={() => deleteAlerte(banner.id)}
               >
                 Supprimer l'alerte définitivement
               </button>
             </div>
              )}
 
                <div className="danger_banner_left">
                  <img src="media/img/danger_ban.png" alt="danger" />
                </div>

                <div className="danger_banner_right">
                  <h1>{banner.message}</h1>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default DangerBanner;
