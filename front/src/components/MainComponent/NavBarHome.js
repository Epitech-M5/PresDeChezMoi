import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import DropDownBtn from './DropDownBtn';
import MessageQueue, { useMessageQueue } from '../../components/MessageQueue.js';
import axios from 'axios';
import { Provider, useSelector } from "react-redux";
import { getAPI, postAPI, putAPI, deleteAPI } from "./../../api"
import { useNavigate } from 'react-router-dom';

const NavBarHome = (props) => {

    const navigate = useNavigate();

    const [activeId, setActiveId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const [titre, setTitre] = useState(null);
    const [descriptions, setDescriptions] = useState(null);
    const [image, setImage] = useState(null);
    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [prix, setPrix] = useState(null);
    const [localisation, setLocalisation] = useState(null);
    const [typeAct, setTypeAct] = useState(null);

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [addr, setAddr] = useState(null);

    const user = useSelector((state) => state.utilisateur)

    const [error, setError] = useState('');
    var [toAddModal, setToAddModal] = useState()

    const handleToggle = () => {

        const toggleBtnIcon = document.querySelector('.container_forphone_navbar i')
        const ToSlide = document.querySelector('.navbar_toslide')
        ToSlide.classList.toggle('open')

        const isOpen = ToSlide.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-180' : 'fa-solid fa-greater-than'
    }

    const toggleUnderline = (id) => {
        setActiveId(id);

        switch (id) {
            case 1:
                handleToggle();
                navigate('/home');
                break
            case 2:
                handleToggle();
                navigate('/home/map');
                break
            case 3:
                handleToggle();
                navigate('/home/notif');
                break
            case 4:
                handleToggle();
                navigate('/home/chat');
                break
        }

    };

    const openModal = () => {

        handleToggle();

        setTitre(null);
        setDescriptions(null);
        setImage(null);
        setDateDebut(null);
        setDateFin(null);
        setPrix(null);
        setLocalisation(null);
        setError(null);
        setLatitude(null);
        setLongitude(null);

        setIsOpen(true);
    };

    const closeModal = () => {

        const toClose = document.querySelector('.modal');
        toClose.classList.add('closing');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);

    };

    const handleCheckboxChange = (item) => {

        setSelectedValue(item);

        setTitre(null);
        setDescriptions(null);
        setImage(null);
        setDateDebut(null);
        setDateFin(null);
        setPrix(null);
        setLocalisation(null);
        setError(null);
        setLatitude(null);
        setLongitude(null);

        const ScrollToTop = document.querySelector('.modal_content_left');
        ScrollToTop.scrollTop = 0;
    };

    useEffect(() => {
        setActiveId(1);

        console.log('admin : ' + props.isAdmin)
        console.log(props.isAdmin === "admin")

        if (props.isAdmin === "admin") {
            setAllButtons(
                <>
                    <div className="container_buttons_home">
                        <button className='btn_home' onClick={openModal}></button>
                    </div>
                    <div className="container_buttons_home">
                        <button className='btn_home admin' onClick={() => navigate('/home/administration')}></button>
                    </div>
                </>
            );
        }

    }, []);

    useEffect(() => {

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ 'address': addr }, function (results, status) {
            if (status === window.google.maps.GeocoderStatus.OK) {
                setLatitude(results[0].geometry.location.lat());
                setLongitude(results[0].geometry.location.lng());
            } else {
                console.log('Erreur : ' + status);
            }
        });

    }, [addr]);

    useEffect(() => {

        if (selectedValue === 'Vente') {
            setTypeAct(5);
            setToAddModal(
                <>
                    <input type="text" placeholder="Titre de l'annonce" id='title_popup' onChange={(event) => setTitre(event.target.value)} />
                    <input type="number" placeholder="Prix" id='price_popup' onChange={(event) => setPrix(event.target.value)} />
                    <textarea placeholder='Description du produit' id='simple_textarea_des' onChange={(event) => setDescriptions(event.target.value)}></textarea>
                    <label htmlFor="date_debut_popup" id='label_date'>Date début : </label>
                    <input type="date" id='date_debut_popup' onChange={(event) => setDateDebut(event.target.value)} />
                    <label htmlFor="date_debut_popup" id='label_date'>Date fin : </label>
                    <input type="date" id='date_fin_popup' onChange={(event) => setDateFin(event.target.value)} />
                    <input id='file' type="file" accept="image/png, image/jpeg" class="inputfile" onChange={(event) => setImage(event.target.value)}></input>
                    <label for="file"><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</label>
                </>
            );
        }

        else if (selectedValue === 'Evenement') {
            setTypeAct(4);
            setToAddModal(
                <>
                    <input type="text" placeholder="Titre de l'evenement" id='title_popup' onChange={(event) => setTitre(event.target.value)} />
                    <textarea placeholder="Description de l'evenement" id='simple_textarea_des' onChange={(event) => setDescriptions(event.target.value)}></textarea>
                    <label htmlFor="date_debut_popup" id='label_date'>Date début : </label>
                    <input type="date" id='date_debut_popup' onChange={(event) => setDateDebut(event.target.value)} />
                    <label htmlFor="date_debut_popup" id='label_date'>Date fin : </label>
                    <input type="date" id='date_fin_popup' onChange={(event) => setDateFin(event.target.value)} />
                    <input id='file' type="file" accept="image/png, image/jpeg" class="inputfile" onChange={(event) => setImage(event.target.value)}></input>
                    <label for="file"><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</label>
                </>
            );
        }

        else if (selectedValue === 'Poste à pourvoir') {
            setTypeAct(3);
            setToAddModal(
                <>
                    <input type="text" placeholder="Titre du poste" id='title_popup' onChange={(event) => setTitre(event.target.value)} />
                    <textarea placeholder="Description du poste" id='simple_textarea_des' onChange={(event) => setDescriptions(event.target.value)}></textarea>
                    <input type="number" placeholder="Salaire brut mois" id='price_popup' onChange={(event) => setPrix(event.target.value)} />
                    <input id='file' type="file" accept="image/png, image/jpeg" class="inputfile" onChange={(event) => setImage(event.target.value)}></input>
                    <label for="file"><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</label>
                </>
            );
        }

        else if (selectedValue === 'Promotion') {
            setTypeAct(2);
            setToAddModal(
                <>
                    <input type="text" placeholder="Titre de l'annonce" id='title_popup' onChange={(event) => setTitre(event.target.value)} />
                    <textarea placeholder="Description de la promotion" id='simple_textarea_des' onChange={(event) => setDescriptions(event.target.value)}></textarea>
                    <input id='file' type="file" accept="image/png, image/jpeg" class="inputfile" onChange={(event) => setImage(event.target.value)}></input>
                    <label for="file"><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</label>
                </>
            );
        }

        else {
            setTypeAct(1);
            setToAddModal(
                <>
                    <textarea placeholder='À quoi pensez-vous @Name ?' id='simple_textarea' onChange={(event) => setTitre(event.target.value)}></textarea>
                    <button className='btn_lieu' onClick={getLocation}><i className='fa-solid fa-location-dot'></i>Ajouter un lieu</button>
                    <input type="text" id='adrr' placeholder='Ou avec une adresse' className='btn_adrr' onChange={(event) => setAddr(event.target.value)} />
                    <input id='file' type="file" accept="image/png, image/jpeg" class="inputfile" onChange={(event) => setImage(event.target.value)}></input>
                    <label for="file"><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</label>
                </>
            );
        }

    }, [selectedValue]);

    var [allButtons, setAllButtons] = useState(
        <>
            <div className="container_buttons_home">
                <button className='btn_home' onClick={openModal}></button>
            </div>
        </>
    );

    const handleSubmit = async (event) => {

        console.log('Localisation : ' + localisation);
        console.log('Prix : ' + prix);
        console.log('DateFin : ' + dateFin);
        console.log('DateDebut : ' + dateDebut);
        console.log('Image : ' + image);
        console.log('Description : ' + descriptions);
        console.log('Titre : ' + titre);

        event.preventDefault();

        if (selectedValue === 'Vente') {
            if (titre === null || prix === null || titre.length === 0 || prix.length === 0) {
                setError('Les champs titre et prix ne sont pas remplies')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

        else if (selectedValue === 'Evenement') {

            if (dateDebut > dateFin) {
                setError('La date de début ne peut pas être supérieur à la date de fin');
            }
            else if (titre === null || dateDebut === null || dateFin === null || dateDebut.length === 0 || dateFin.length === 0 || titre.length === 0) {
                setError('Les champs titre et et date ne sont pas remplies')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

        else if (selectedValue === 'Poste à pourvoir') {
            if (titre === null || descriptions === null || prix === null || descriptions.length === 0 || prix.length === 0 || titre.length === 0) {
                setError('Les champs titre, salaire et description ne sont pas remplies')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

        else if (selectedValue === 'Promotion') {
            if (titre === null || descriptions === null || descriptions.length === 0 || titre.length === 0) {
                setError('Les champs titre et description doivent être remplies')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

        else if (selectedValue === 'Simple post') {
            if (titre === null || titre.length === 0) {
                setError('Le champs titre doit être remplie')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

        else {
            if (titre === null || titre.length === 0) {
                setError('Le champs titre doit être remplie')
            }

            else {

                postAPI("http://127.0.0.1:8081/api/annonce/", { "titre": titre, "description": descriptions, 'image': image, 'dateDebut': dateDebut, "dateFin": dateFin, 'prix': prix, 'idTypeActivite': typeAct }, { "x-access-token": user.token })
                    .then(response => {

                        console.log('response : ' + response)
                        setError('OK !')

                        setTimeout(() => {
                            closeModal();
                        }, 1500);

                    }).catch(error => {
                        console.log("error", error);
                        setError(`${error}`)
                    })
            }
        }

    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="container_x">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="wrapper_popup">
                    <div className="modal_content_left">
                        {toAddModal}
                    </div>
                    <div className="modal_content_right">
                        <DropDownBtn text="Type de post" items={['Vente', 'Evenement', 'Poste à pourvoir', 'Promotion', 'Simple post']} onCheckboxChange={handleCheckboxChange} />
                        <input type="button" value="Publier" id='publish' onClick={handleSubmit} />
                        <p className='error_msg'>{error}</p>
                    </div>
                </div>
            </Modal>

            <div className="container_nabar_home">
                <div className="container_logo_home">
                    <img src="../media/img/carotte.png" alt="logo" />
                    <h1>PresDeChezMoi</h1>
                </div>
                <div className="container_navigation_home">
                    <div className="container_homenav_left">
                        <i className={`fa fa-home underline-animation_logo ${activeId === 1 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(1)}></i>
                        <i className={`fa-solid fa-location-dot underline-animation_logo ${activeId === 2 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(2)}></i>
                        <i className={`fa-solid fa-bell underline-animation_logo ${activeId === 3 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(3)}></i>
                        <i className={`fa-solid fa-envelope underline-animation_logo ${activeId === 4 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(4)}></i>
                    </div>
                    <div className="container_homenav_right">
                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Acceuil</h1>
                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Découvrir</h1>
                        <h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(3)}>Notifications</h1>
                        <h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(4)}>Messages</h1>
                    </div>
                </div>
                {allButtons}
            </div>
            <div className="container_forphone_navbar" onClick={handleToggle}>
                <i class="fa-solid fa-greater-than"></i>
            </div>
            <div className='navbar_toslide'>
                <div className="toslide_content">
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(1)}>Acceuil</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(2)}>Découvrir</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(3)}>Notifications</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(4)}>Messages</h1></div>
                    {allButtons}
                </div>
            </div>
        </>
    );
};

export default NavBarHome;