import React, { useEffect, useState } from 'react';
import { getAPI, putAPI } from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Test = () => {

    const [liked, setLiked] = useState([]);

    const user = useSelector((state) => state.utilisateur);
    const navigate = useNavigate();

    const handleUser = () => {
        console.log('liked', liked);

        getAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                const parsedLikes = JSON.parse(response.dataAPI.likes); // Convertir la chaîne JSON en array
                setLiked(parsedLikes);
                console.log('response @2', parsedLikes);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // recuperer l'array de base que le user à like
    useEffect(() => {
        console.log('liked', liked)

        getAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                const parsedLikes = JSON.parse(response.dataAPI.likes); // Convertir la chaîne JSON en array
                setLiked(parsedLikes);
                console.log('response @1', parsedLikes)
            })
            .catch((error) => {
                console.error(error);
            })
    }, [])

    // dès que la value de l'array liked change alors changer value dans la base
    useEffect(() => {

        console.log('liked 2', liked)

        putAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, { 'likes': liked }, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });
    }, [liked])

    // rentrer les id des annonces quil a like en plus dans l'array
    const addToLiked = (newData) => {
        setLiked((prevLiked) => [...prevLiked, newData]);
    }

    return (
        <>
            <div className="center">
                <button onClick={() => navigate('/home')}>home</button>
                <button onClick={() => addToLiked(1)}>like</button>
                <button onClick={handleUser}>get user</button>
            </div>
        </>
    );
};

export default Test;