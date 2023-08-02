import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MapPage = () => {

    const mapStyles = {
        height: '100%',
        width: '100%',
    };

    const defaultCenter = {
        lat: 48.8566, // ping paris
        lng: 2.3522, //mettre les coordonnées de la ville

    };


    return (
        <>
            <div className="container_map_page">
                <div className="container_map_gg">
                    <LoadScript googleMapsApiKey="AIzaSyC5OdSI06hgsPRr1wzZgXMvDxBTep2-O7M">
                        <GoogleMap mapContainerStyle={mapStyles} zoom={10} center={defaultCenter}>
                            <Marker position={defaultCenter} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </>
    );
};

export default MapPage;