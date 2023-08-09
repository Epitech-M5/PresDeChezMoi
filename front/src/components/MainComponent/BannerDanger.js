import React, { useState, useEffect } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from "../../api.js";
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
const DangerBanner = () => {
  const [showDangerBanner, setShowDangerBanner] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {

      // requête pour vérifier s'il y a une notification de type "DANGER" dans la base de données
      getAPI(`http://${adresseip}:${port}/api/notification`, null, {})
        .then((response) => {

           setShowDangerBanner(response.dataAPI)
          
        })
        .catch((error) => {
          console.log("error", error);
        });
    }, 10000); // 900000 ms = 15 minutes

    // Nettoyage de l'intervalle lorsque le composant est démonté pour éviter les fuites de mémoire
    return () => clearInterval(interval);
  }, []);


  return (
    <div className='contain_alert'>
      {Array.isArray(showDangerBanner) &&
        showDangerBanner.map((banner) => (
          // console.log("BANNNERRRRR",banner)
          <div key={banner.id} className='contain_message'>
            {banner.formeNotif === "Bandereau" && (
              <div className="danger-banner">{banner.message}</div>
            )}
            {/* Le reste du contenu de votre composant */}
          </div>
        ))
        }
    </div>
  );
};

export default DangerBanner;
