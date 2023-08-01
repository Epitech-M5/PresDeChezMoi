import React, { useState, useEffect } from 'react';
import { getAPI } from '../../api';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
const MyLoot = () => {

    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [dataScore, setDataScore] = useState([]);
    const [listRecompense, setListRecompense] = useState([]);
    const [listRecompenseEnCours, setListRecompenseEnCours] = useState([]);

    useEffect(() => {

        getAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                console.log("@@@@@@@@@@@@@@@@", response.dataAPI)
                setDataScore(response.dataAPI);
                setListRecompense(response.dataAPI.listRecompense)
                setListRecompenseEnCours(response.dataAPI.listRecompenseEnCoursClaim)

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {

        getAPI(`http://${adresseip}:${port}/api/recompense/ville/${user.idVille}`, {}, { 'x-access-token': user.token })
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

    const traitement = (idRecompense, item) => {
        console.log(")))))))", listRecompense, '))', listRecompenseEnCours, "))", listRecompense.includes(idRecompense), "))", idRecompense)
        if (listRecompense.includes(idRecompense)) {
            return (
                <>
                    <i class="fa-solid fa-check"></i>
                </>
            )
        }
        else if (listRecompenseEnCours.includes(idRecompense)) {
            return (
                <>
                    <i class="fa-regular fa-clock"></i>
                </>
            )
        }
        else {
            return (
                <>
                    <h1>{item.image}</h1>
                </>
            )
        }

    }

    const isLocked = (userScore, requiredScore) => {
        console.log(userScore, requiredScore)
        return userScore > requiredScore;
    };

    const sortedData = data.sort((a, b) => a.scoreNecessaire - b.scoreNecessaire);

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
                                {sortedData.length === 0 ? (
                                    <h1>Votre mairie n'a pas encore configuré les récompenses, veuillez les contacter via le chatbot</h1>
                                ) : (
                                    sortedData.map((item) => (
                                        <div className="container_loot" key={item.id}>
                                            <div className="wrapper_header">
                                                <h1>{item.nom}</h1>
                                                <h1 id='score_loot'>Score nécessaire : <span id='unlock_loot'>{item.scoreNecessaire}<i class="fa-solid fa-carrot"></i></span></h1>
                                            </div>
                                            <hr />

                                            {isLocked(dataScore.score, item.scoreNecessaire) ? (
                                                <div className="container_img_loot">
                                                    {traitement(item.id, item)}
                                                    {/* <h1>{item.image}</h1> */}
                                                    {/* FAIRE UN HOOK avec plusieurs etats:
                                                    - Obtenu (valide par admin) (<i class="fa-solid fa-check"></i>)
                                                    - Obtenu (Pas valide par admin) (<i class="fa-regular fa-clock"></i>)
                                                    - Pas obtenu (assez de score) (<h1>{item.image}</h1>)
                                                    */}
                                                </div>
                                            ) : (
                                                // - Pas obtenu (Pas assez de score)
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