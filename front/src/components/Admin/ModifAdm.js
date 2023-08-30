import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import { deleteAPI, getAPI, postAPI, putAPI } from '../../api';
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
    const [allUser, setAllUser] = useState([]);
    const [adminSelected, setAdminSelected] = useState();
    const [NameAdminSelected, setNameAdminSelected] = useState("");

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newMdp, setNewMdp] = useState("");

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

    const handleChoiceCity = async (idVille, nameVille) => {
        setIdVille(idVille);
        setNameVille(nameVille);
        setLoading(true);

        await getAPI(`http://${adresseip}:${port}/api/user/by_ville/${idVille}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setAllUser(response.dataAPI)
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleChoiceUserToModif = (idAdmin, nameAdmin) => {
        setAdminSelected(idAdmin);
        setNameAdminSelected(nameAdmin);
    }

    const handleDeleteAdmin = async () => {

        await deleteAPI(`http://${adresseip}:${port}/api/user/${adminSelected}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                addMessage(`${NameAdminSelected} à bien été supprimé !`, 'success');
            })
            .catch((error) => {
                addMessage(`ERREUR : ${error}`);
            })

    }

    const handleModifThisAdmin = () => {

        if (newEmail.length <= 0 || newMdp <= 0 || newName <= 0) {
            addMessage('Tous les champs doivent être remplie', 'info')
        }
        else {
            putAPI(`http://${adresseip}:${port}/api/user/${adminSelected}`, { 'pseudo': newName, 'mail': newEmail, 'motDePasse': newMdp }, { 'x-access-token': user.token })
                .then((response) => {
                    addMessage(`${NameAdminSelected} à bien été modifié !`, 'success');
                })
                .catch((error) => {
                    addMessage(`ERREUR : ${error}`);
                });
        }

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
                        <div className="container_allcitysuperamd">
                            <div className="map_city_superadm">
                                {loading ? (
                                    <Loader />
                                ) : adminSelected ? (
                                    <>
                                        <div className="container_modif_admin">
                                            <h1>Modifier l'administrateur : {NameAdminSelected}</h1>
                                            <div className="wrapper_inputs_inside_modif_admin">
                                                <input type="text" placeholder='Nom' onChange={(event) => setNewName(event.target.value)} />
                                                <input type="text" placeholder='Email' onChange={(event) => setNewEmail(event.target.value)} />
                                                <input type="text" placeholder='Mot de passe' onChange={(event) => setNewMdp(event.target.value)} />
                                            </div>
                                            <button onClick={handleModifThisAdmin}>Modifer</button>
                                            <button onClick={handleDeleteAdmin}>Supprimer le compte</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {
                                            allUser.filter(item => item.idRole === 3).map((item) => (
                                                <>
                                                    <p key={item.key} onClick={() => handleChoiceUserToModif(item.id, item.nom)}>{item.nom}</p>
                                                </>
                                            ))
                                        }
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

export default ModifAdm;