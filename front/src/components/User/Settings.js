import React, { useState, useEffect } from 'react';
import DropDownBtn from '../../components/MainComponent/DropDownBtn';
import Modal from '../MainComponent/Modal';
import { getAPI, postAPI, putAPI, deleteAPI } from '../../api';
import { useSelector } from 'react-redux';
// const variable_test = process.env.REACT_APP_API_URL
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
const Settings = () => {
    const user = useSelector((state) => state.utilisateur);
    const [typeMap, setTypeMap] = useState(null);
    const [content, setContent] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [motDePasse, setMotDePasse] = useState('');
    const [motDePasseConfirm, setMotDePasseConfirm] = useState('');

    // useEffect(() => { }, [motDePasse, motDePasseConfirm])

    const handleCheckboxChange = (item) => {

        const value = {
            'Normal': 1,
            'Blue': 2,
            'Dark': 3,
            'Auto': 4
        }[item];

        setTypeMap(value);
    };



    const handleMotDePasse = () => {

        console.log("@@@@@@@", motDePasse, "===", motDePasseConfirm)
        if (motDePasse === motDePasseConfirm) {
            var header = {
                "x-access-token": user.token
            }
            var body = {
                "motDePasse": motDePasse
            }
            putAPI(`http://${adresseip}:${port}/api/user/edit_password/`, body, header).then(() => {
                //message success
                console.log("SUCESSS MDP")
                setMotDePasse('')
                setMotDePasseConfirm('')
            })
        } else {
            //error
            console.log("ERROR MDP PAS BON")
            setMotDePasse('')
            setMotDePasseConfirm('')
        }
    };

    const closeModal = () => {

        setMotDePasse('')
        setMotDePasseConfirm('')

        const toClose = document.querySelector('.modal');
        toClose.classList.add('closing');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);

    };

    const openModal = () => {
        setIsOpen(true);
    };

    const handleModif = () => {
        setContent(
            <>
                <h1>modif profil</h1>
            </>
        );

        openModal();
    };

    const handleCommune = () => {
        setContent(
            <>
                <h1>modif commune</h1>
            </>
        );

        openModal();
    };

    const handleSup = () => {
        // alert(variable_test)
        setContent(
            <>
                <h1>sup compte</h1>
            </>
        );

        openModal();
    }
    const handlePassword = (event) => {
        console.log("AAA", event.target.value)
        setMotDePasse(event.target.value);
        console.log("AAA", event.target.value)

    }
    const handlePasswordConfirm = (event) => {
        console.log("BBB", event.target.value)
        setMotDePasseConfirm(event.target.value);
        console.log("BBB", event.target.value)

    }
    const handlePwd = () => {
        setContent(
            <>
                <h1>modif mdp</h1>
                {/* <input placeholder='Nouveau mot de passe' onChange={handlePassword} /> */}
                <input
                    placeholder='Nouveau mot de passe'
                    value={motDePasse}
                    onChange={(event) => setMotDePasse(event.target.value)}
                />
                <input placeholder='Confirmer mot de passe' onChange={handlePasswordConfirm} />
                <button onClick={handleMotDePasse}>Send</button>
            </>
        );

        openModal();
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="container_x">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="wrapper_popup">
                    {content}
                </div>
            </Modal>

            <div className="content_user_profil">
                <div className="container_btns_settings">
                    <div className="container_dropdown_for_settings">
                        <DropDownBtn text="Thème de la map" items={['Normal', 'Bleu', 'Dark', 'Auto']} onCheckboxChange={handleCheckboxChange} />
                    </div>
                    <button onClick={handleModif}>Modifier profil</button>
                    <button onClick={handleCommune}>Changer de commune</button>
                    <button onClick={handleSup}>Supprimer votre compte</button>
                    <button onClick={handlePwd}>Modifier mot de passe</button>
                </div>
            </div>
        </>
    );
};

export default Settings;