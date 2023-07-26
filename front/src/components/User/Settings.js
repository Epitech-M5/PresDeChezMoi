import React, { useState, useEffect } from 'react';
import DropDownBtn from '../../components/MainComponent/DropDownBtn';
import Modal from '../MainComponent/Modal';

const Settings = () => {

    const [typeMap, setTypeMap] = useState(null);
    const [content, setContent] = useState();
    const [isOpen, setIsOpen] = useState(false);

    const handleCheckboxChange = (item) => {

        const value = {
            'Normal': 1,
            'Blue': 2,
            'Dark': 3,
            'Auto': 4
        }[item];

        setTypeMap(value);
    };

    const closeModal = () => {

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
        setContent(
            <>
                <h1>sup compte</h1>
            </>
        );

        openModal();
    }

    const handlePwd = () => {
        setContent(
            <>
                <h1>modif mdp</h1>
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