import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import { postAPI } from '../../api';
import { Provider, useSelector } from "react-redux";
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const AddCity = () => {

    const navigate = useNavigate();

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const user = useSelector((state) => state.utilisateur)

    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [score, setScore] = useState("");

    const handleVerifCreateCity = () => {

        if (name.length <= 0 || code.length <= 0 || score.length <= 0) {
            addMessage('Un des champs est vide, veuillez le remplir')
        }

        else {
            postAPI(`http://${adresseip}:${port}/api/ville/`, { 'nom': name, 'codePostal': code, 'scoreVilleFleurie': score }, { 'x-access-token': user.token })
                .then(() => {
                    addMessage('Ville créee avec succés', 'success');
                }).catch((error) => {
                    addMessage(`Erreur : + ${error}`, 'error');
                })
        }
    }

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />
            <div className="container_superadm">
                <div className="container_title_superadm">
                    <h1>Créer une nouvelle ville</h1>
                </div>

                <div className="container_inputs_create">
                    <div className="wrapper_inputs_createcity">
                        <input type="text" placeholder='Nom ville' onChange={(event) => setName(event.target.value)} />
                        <input type="number" placeholder='Code Postal' onChange={(event) => setCode(event.target.value)} />
                        <input type="number" placeholder='Score ville fleurie' onChange={(event) => setScore(event.target.value)} />
                        <button onClick={handleVerifCreateCity}>Créer</button>
                    </div>
                </div>

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

export default AddCity;