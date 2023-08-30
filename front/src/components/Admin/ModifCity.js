import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import { deleteAPI, getAPI, postAPI, putAPI } from '../../api';
import { Provider, useSelector } from "react-redux";
import Loader from '../Loader.js';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const ModifCity = () => {

    const navigate = useNavigate();

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const user = useSelector((state) => state.utilisateur)

    const [dataVille, setDataVille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idVille, setIdVille] = useState();
    const [nameVille, setNameVille] = useState("");

    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState();
    const [newScoreF, setScoreF] = useState();
    const [newScoreG, setScoreG] = useState();

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

    const handleDeleteCity = async () => {

        await deleteAPI(`http://${adresseip}:${port}/api/ville/${idVille}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                addMessage(`${nameVille} vient d'être suprimé avec succès`, 'success')
            })
            .catch((error) => {
                addMessage(`ERREUR : ${error}`, 'error');
            })

    }

    const handleModifThisCity = async () => {

        if (newName.length <= 0 || newCode <= 0 || newScoreF <= 0 || newScoreG <= 0) {
            addMessage('Tous les champs doivent être remplies', 'info')
        }
        else {
            await putAPI(`http://${adresseip}:${port}/api/ville/${idVille}`, { 'nom': newName, 'codePostal': newCode, 'scoreVilleFleurie': newScoreF, 'scoreGlobale': newScoreG }, { 'x-access-token': user.token })
                .then((response) => {
                    addMessage('Les paramètres de la ville ont été modifié', 'success')
                })
                .catch((error) => {
                    addMessage(`ERREUR : ${error}`)
                })
        }

    }

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container_superadm">
                <div className="container_title_superadm">
                    {idVille ? (
                        <>
                            <h1>Modifer la ville de : <span>{nameVille}</span></h1>
                        </>
                    ) : (
                        <>
                            <h1>Sélectionner une ville</h1>
                        </>
                    )}

                </div>

                {idVille ? (
                    <>
                        <div className="container_allcitysuperamd">
                            <div className="map_city_superadm">
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <div className="container_modif_admin">
                                            <h1>Modifier la ville : {nameVille}</h1>
                                            <div className="wrapper_inputs_inside_modif_admin">
                                                <input type="text" placeholder='Nom' onChange={(event) => setNewName(event.target.value)} />
                                                <input type="number" placeholder='Code postal' onChange={(event) => setNewCode(event.target.value)} />
                                                <input type="number" placeholder='Score ville fleurie' min="0" max="5" onChange={(event) => setScoreF(event.target.value)} />
                                                <input type="number" placeholder='Score globale' min="0" max="5" onChange={(event) => setScoreG(event.target.value)} />
                                            </div>
                                            <button onClick={handleModifThisCity}>Modifer</button>
                                            <button onClick={handleDeleteCity}>Supprimer la ville</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
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

export default ModifCity;