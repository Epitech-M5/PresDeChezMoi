import React, { useState, useEffect } from 'react';
import { getAPI, putAPI } from '../../api';
import { useSelector } from 'react-redux';

const MySave = () => {

    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);

    useEffect(() => {

        putAPI(`http://127.0.0.1:8081/api/user/${user.id}`, { "listAnnonceEnregistre": [1] }, { 'x-access-token': user.token })
            .then((response) => {
                console.log(response.dataAPI);
                setData(response.dataAPI);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    console.log("@@@@@", data);

    return (
        <>
            <div className="content_user_profil">
                <div className="container_mypost_tomap">

                </div>
            </div>
        </>
    );
};

export default MySave;