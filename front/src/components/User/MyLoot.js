import React, { useState, useEffect } from 'react';
import { getAPI } from '../../api';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const MyLoot = () => {

    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [dataScore, setDataScore] = useState([]);

    useEffect(() => {

        getAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setDataScore(response.dataAPI);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {

        getAPI('http://127.0.0.1:8081/api/recompense/', {}, { 'x-access-token': user.token })
            .then((response) => {
                setTimeout(() => {
                    setData(response.dataAPI);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

    const isLocked = (userScore, requiredScore) => {
        console.log(userScore, requiredScore)
        return userScore > requiredScore;
    };

    return (
        <>
            <div className="content_user_profil">
                <div className="container_mypost_tomap">

                    {loading ? (
                        <div className="loader_formypost">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="flex_all_loot">
                                {data.length === 0 ? (
                                    <h1>Votre mairie n'a pas encore configuré les récompenses, veuillez les contacter via le chatbot</h1>
                                ) : (
                                    data.map((item) => (
                                        <div className="container_loot" key={item.id}>
                                            <div className="wrapper_header">
                                                <h1>{item.nom}</h1>
                                                <h1 id='score_loot'>Score nécessaire : <span id='unlock_loot'>{item.scoreNecessaire}<i class="fa-solid fa-carrot"></i></span></h1>
                                            </div>
                                            <hr />

                                            {isLocked(dataScore.score, item.scoreNecessaire) ? (
                                                <div className="container_img_loot">
                                                    <h1>{item.image}</h1>
                                                </div>
                                            ) : (
                                                <div className="container_img_loot lock">
                                                    <i className="fa-solid fa-lock"></i>
                                                </div>
                                            )}

                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyLoot;