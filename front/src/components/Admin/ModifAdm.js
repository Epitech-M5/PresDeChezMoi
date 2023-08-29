import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import { getAPI, postAPI, putAPI } from '../../api';
import { Provider, useSelector } from "react-redux";
import Loader from '../Loader.js';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const ModifAdm = () => {

    const navigate = useNavigate();

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const user = useSelector((state) => state.utilisateur)

    const [dataVille, setDataVille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idVille, setIdVille] = useState();
    const [nameVille, setNameVille] = useState("");

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/ville`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setDataVille(response.dataAPI);
                setTimeout(() => {
                    setLoading(false)
                }, 1000)
            })
            .catch((error) => {
                addMessage(error, 'error')
            });
    }, [])

    const handleChoiceCity = (idVille, nameVille) => {
        setIdVille(idVille);
        setNameVille(nameVille);
    }

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container_superadm">
                <div className="container_title_superadm">
                    {idVille ? (
                        <>
                            <h1>Modifer un administrateur de la ville de : <span>{nameVille}</span></h1>
                        </>
                    ) : (
                        <>
                            <h1>Sélectionner sa ville</h1>
                        </>
                    )}

                </div>

                {idVille ? (
                    <>
                        <h1>map tous les admins de la ville</h1>
                    </>
                ) : (
                    <>
                        <div className="container_allcitysuperamd">
                            <div className="map_city_superadm">
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        {
                                            dataVille.map((item) => (
                                                <>
                                                    <p key={item.id} onClick={() => handleChoiceCity(item.id, item.nom)}>{item.nom}</p>
                                                </>
                                            ))
                                        }
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </>
                )}

                <div className="wrapper_superadm">
                    <div className="container_right_superadm deco">
                        <h1>Déconnexion</h1>
                        <button onClick={() => window.location.reload()}>Page de connexion</button>
                    </div>
                    <div className="container_right_superadm deco city">
                        <h1>Retour en arrière</h1>
                        <button onClick={() => navigate('/super-admin')}>Accueil</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModifAdm;