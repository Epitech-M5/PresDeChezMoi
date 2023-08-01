import { React, useState, useEffect } from 'react';
import Modal from '../MainComponent/Modal';
import DropDownBtn from '../MainComponent/DropDownBtn';
import { useSelector } from 'react-redux';
import { deleteAPI, putAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const Settings = () => {

    const user = useSelector((state) => state.utilisateur);

    var [toAddModal, setToAddModal] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [mdp, setMdp] = useState('');
    const [mdpConfirm, setMdpConfirm] = useState('');
    const [id, setId] = useState(null);
    const [error, setError] = useState(null);
    const [pseudo, setPseudo] = useState('');
    const navigate = useNavigate();

    const closeModal = () => {

        const toClose = document.querySelector('.modal');
        toClose.classList.add('closing');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);

    };
    const handleCheckboxChange = (item) => {

        setSelectedValue(item);

        const ScrollToTop = document.querySelector('.modal_content_left');
        ScrollToTop.scrollTop = 0;
    };
    const openModal = () => {
        setMdp('');
        setMdpConfirm('');
        setPseudo('');
        setError(null);

        setIsOpen(true);
    }

    useEffect(() => {

        if (id === 1) {
            setToAddModal(
                <>

                </>
            );
        }

        else if (id === 2) {
            setToAddModal(
                <>

                </>
            );
        }

        else if (id === 3) {
            setToAddModal(
                <>
                    <h1>Supprimer votre compte</h1>
                    <input type="text" placeholder={user.pseudo} onChange={(event) => setPseudo(event.target.value)} />
                    <button onClick={handleSupConfirm}>CONFIRMER</button>
                </>
            );
        }

        else if (id === 4) {
            setToAddModal(
                <>
                    <h1>Modifier mot de passe</h1>
                    <input type="text" placeholder='Nouveau mot de passe' onChange={(event) => setMdp(event.target.value)} />
                    <input type="text" placeholder='Nouveau mot de passe' onChange={(event) => setMdpConfirm(event.target.value)} />
                    <input type="button" value='Modifier' onClick={handleMotDePasse} />
                </>
            );
        }

        else {
            setToAddModal(
                <>
                    <h1>Error</h1>
                </>
            );
        }

    }, [mdp, id, mdpConfirm, pseudo]);


    const handleSupConfirm = () => {

        if (user.pseudo === pseudo) {
            setError('OK !')
            deleteAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { "x-access-token": user.token })
            navigate('/')
        }
        else {
            setError(`ENTREE NON VALIDE ${pseudo} =/= ${user.pseudo}`)
        }
    }

    const handleMotDePasse = () => {

        console.log(mdp, mdpConfirm)

        if (mdp.length <= 0 || mdpConfirm.length <= 0) {
            setError('Les 2 champs doivent être remplies')
        }

        else if (mdp === mdpConfirm) {
            var header = {
                "x-access-token": user.token
            }
            var body = {
                "motDePasse": mdp
            }
            putAPI(`http://${adresseip}:${port}/api/user/edit_password/`, body, header).then(() => {
                setError('OK !')
                closeModal()
            })
        } else {
            setError('Les 2 champs ne sont pas les mêmes')
        }
    };

    const handleOpen_1 = () => {
        setId(1);
        openModal();
    }

    const handleOpen_2 = () => {
        setId(2);
        openModal();
    }

    const handleOpen_3 = () => {
        setId(3);
        openModal();
    }

    const handleOpen_4 = () => {
        setId(4);
        openModal();
    }


    return (
        <>

            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="container_x">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="wrapper_popup">
                    {toAddModal}
                    {error}
                </div>
            </Modal>

            <div className="content_user_profil">
                <div className="container_btns_settings">
                    <div className="container_dropdown_for_settings">
                        <DropDownBtn type="abs" text="Thème de la map" items={['Normal', 'Bleu', 'Dark', 'Auto']} onCheckboxChange={handleCheckboxChange} />
                    </div>
                    <button onClick={handleOpen_1}>Modifier profil</button>
                    <button onClick={handleOpen_2}>Changer de commune</button>
                    <button onClick={handleOpen_3}>Supprimer votre compte</button>
                    <button onClick={handleOpen_4}>Modifier mot de passe</button>
                </div>
            </div>
        </>
    );
};

export default Settings;