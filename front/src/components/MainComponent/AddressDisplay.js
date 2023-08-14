import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressDisplay = ({ longitude, latitude }) => {

    const [formattedAddress, setFormattedAddress] = useState(null);

    useEffect(() => {
        if (longitude != null && latitude != null) {
            const apiKey = 'AIzaSyC5OdSI06hgsPRr1wzZgXMvDxBTep2-O7M'; // Replace with your actual API key
            const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

            axios
                .get(apiUrl)
                .then((response) => {
                    const results = response.data.results;
                    if (results.length > 0) {
                        const addr = results[0].address_components[1].long_name + ', ' + results[0].address_components[2].long_name;
                        console.log(JSON.stringify(addr));
                        setFormattedAddress(addr);
                    } else {
                        console.log('No results found.');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching street name:', error);
                });
        }
    }, [latitude, longitude]);

    return formattedAddress ? <>{formattedAddress + ' •'}</> : null;
};

export default AddressDisplay;