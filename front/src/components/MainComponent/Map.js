import React, { useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapStyles = [
  {
    featureType: "all",
    stylers: [{ saturation: -80 }, { lightness: -50 }],
  },
  // Ajoutez ici d'autres règles de style personnalisé si nécessaire
];

function Map() {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const constGoogleMapsApiKey = "AIzaSyC5OdSI06hgsPRr1wzZgXMvDxBTep2-O7M";

  const [stateMapId, setStateMapId] = useState("ae840397f712210b"); // État pour stocker la valeur de constMapId
  const [stateDefaultMapTheme, setStateDefaultMapTheme] = useState(""); // Theme de map par defaut

  const handleButtonClick = () => {
    setStateMapId("");
    setStateDefaultMapTheme("ROADMAP");
  };

  return (
    <>
      <LoadScript googleMapsApiKey={constGoogleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          mapTypeId={stateDefaultMapTheme}
          zoom={10}
          options={{
            styles: mapStyles,
            mapId: stateMapId, // Utilisez la valeur mise à jour de mapId
          }}
        >
          {/* Ajoutez des composants enfants, tels que des marqueurs, des infobulles, etc. si nécessaire */}
          <></>
        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default Map;