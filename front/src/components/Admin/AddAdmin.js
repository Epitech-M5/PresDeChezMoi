import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import { getAPI, postAPI, putAPI } from '../../api';
import { Provider, useSelector } from "react-redux";
import Loader from '../Loader.js';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const AddAdmin = () => {

    const navigate = useNavigate();

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const user = useSelector((state) => state.utilisateur)

    const [dataVille, setDataVille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idVille, setIdVille] = useState();
    const [nameVille, setNameVille] = useState("");
    const [nameAdm, setNameAdm] = useState("");
    const [mailAdm, setMailAdm] = useState("");
    const [mdpAdm, setMdpAdm] = useState("");
    const [idAdm, setIdAdm] = useState();

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

    const handleCreateAdmin = async () => {

        if (nameAdm.length <= 0 || mailAdm.length <= 0 || mailAdm.length <= 0) {
            addMessage('Tous les champs doivent être remplies', 'info');
        }
        else {
            await postAPI(`http://${adresseip}:${port}/api/user/auth/signup`, { "pseudo": nameAdm, "mail": mailAdm, "motDePasse": mdpAdm, "idRole": 3, "photoProfil": "1" }, { "x-access-token": user.token })
                .then((response) => {
                    addMessage('Admin pour ' + nameVille + ' à été crée avec succès !', 'success');
                    setIdAdm(response.dataAPI.id);
                })
                .catch((error) => {
                    addMessage(`Erreur REQ 1 : + ${error}`, 'error');
                })

            await putAPI(`http://${adresseip}:${port}/api/user/${idAdm}`, { 'idVille': idVille }, { "x-access-token": user.token })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    addMessage(`Erreur REQ 2 : + ${error}`, 'error');
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
                            <h1>Ajouter un administrateur à la ville de : <span>{nameVille}</span></h1>
                        </>
                    ) : (
                        <>
                            <h1>Sélectionner sa ville</h1>
                        </>
                    )}

                </div>

                {idVille ? (
                    <>
                        <div className="container_inputs_create">
                            <div className="wrapper_inputs_createcity">
                                <input type="text" placeholder='Nom admin' onChange={(event) => setNameAdm(event.target.value)} />
                                <input type="password" placeholder='Mot de passe' onChange={(event) => setMdpAdm(event.target.value)} />
                                <input type="email" placeholder='Email' onChange={(event) => setMailAdm(event.target.value)} />
                                <button onClick={handleCreateAdmin}>Créer</button>
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

export default AddAdmin;