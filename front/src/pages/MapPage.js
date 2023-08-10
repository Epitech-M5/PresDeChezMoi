import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { getAPI } from '../api';
import AddressDisplay from '../components/MainComponent/AddressDisplay';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const MapPage = () => {

    const user = useSelector((state) => state.utilisateur);

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = {
        lat: 43.2965, // ping marseille default
        lng: 5.3698, //mettre les coordonnées de la ville

    };

    const [markers, setMarkers] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [mapZoom, setMapZoom] = useState(10);

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/annonce/`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setTimeout(() => {
                    const verifiedItems = response.dataAPI.filter(item => item.estVerifie === true);
                    setMarkers(verifiedItems.map(item => ({
                        ...item,
                        latitude: item.latitude !== null ? Number(item.latitude) : null,
                        longitude: item.longitude !== null ? Number(item.longitude) : null,
                    })));
                }, 4000)

            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    const handleMarkerClick = (place) => {
        setMapZoom(10);
        setSelectedPlace(place);
        setMapCenter({ lat: place.latitude, lng: place.longitude });
        setMapZoom(14);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderDateCreate = (createdAt) => {
        const formattedCreatedAt = formatDate(createdAt);

        return (
            <>
                {formattedCreatedAt}
            </>
        );
    };

    const renderCustomMarker = (item) => {
        return (
            <Marker
                key={item.id}
                position={{ lat: item.latitude, lng: item.longitude }}
                onClick={() => handleMarkerClick(item)}
                icon={{
                    url: '../media/img/carrot_ping2.png',
                    scaledSize: new window.google.maps.Size(40, 40), // Taille personnalisée de l'icône
                }}
            />
        );
    };

    const filteredMarkers = markers.filter((item) => item.latitude !== null && item.longitude !== null);

    return (
        <>
            <div className="container_map_page">
                <div className="container_map_gg">
                    <LoadScript googleMapsApiKey="AIzaSyC5OdSI06hgsPRr1wzZgXMvDxBTep2-O7M">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={mapZoom} center={mapCenter}>

                            {filteredMarkers.map((item) => renderCustomMarker(item))}

                        </GoogleMap>
                    </LoadScript>
                </div>
                {selectedPlace ? (
                    <div className='container_info_marker_click'>
                        <h1>Informations sur le lieu :</h1>
                        <h2><span className='span_info_marker'>Adresse : </span><AddressDisplay longitude={selectedPlace.longitude} latitude={selectedPlace.latitude} /> le {renderDateCreate(selectedPlace.createdAt)}</h2>
                        <h2><span className='span_info_marker'>Titre :</span> {selectedPlace.titre}</h2>
                        {selectedPlace.description ? <h2><span className='span_info_marker'>Description :</span> {selectedPlace.description}</h2> : null}
                    </div>
                ) : (
                    <div className='container_info_marker_click'>
                        <h1>Sélectionnez un marqueur pour en savoir plus !</h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default MapPage;