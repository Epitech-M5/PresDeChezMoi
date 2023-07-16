import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import DropDownBtn from './DropDownBtn';

const NavBarHome = (props) => {

    const [activeId, setActiveId] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);

    const [titre, setTitre] = useState(null);
    const [descriptions, setDescriptions] = useState(null);
    const [image, setImage] = useState(null);
    const [organisateur, setOrganisateur] = useState(null);
    const [participants, setParticipants] = useState(null);
    const [dateDebut, setDateDebut] = useState(null);
    const [dateFin, setDateFin] = useState(null);
    const [estActive, setEstActive] = useState(null);
    const [moyenne, setMoyenne] = useState(null);
    const [annonceMairie, setAnnonceMairie] = useState(null);
    const [prix, setPrix] = useState(null);


    var [toAddModal, setToAddModal] = useState(
        <>
            <textarea placeholder='À quoi pensez-vous @Name ?' ></textarea>
            <button className='btn_lieu'><i className='fa-solid fa-location-dot'></i>Ajouter un lieu</button>
            <button className='add_img'><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</button>
            <input type="button" value="Publier" />
        </>
    )

    const handleToggle = () => {

        const toggleBtnIcon = document.querySelector('.container_forphone_navbar i')
        const ToSlide = document.querySelector('.navbar_toslide')
        ToSlide.classList.toggle('open')

        const isOpen = ToSlide.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-180' : 'fa-solid fa-greater-than'
    }

    const toggleUnderline = (id) => {
        setActiveId(id);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleCheckboxChange = (item) => {
        setSelectedValue(item);
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
                        <button className='btn_home admin'></button>
                    </div>
                </>
            );
        }

    }, []);

    useEffect(() => {

        if (selectedValue === 'Vente') {
            setToAddModal(
                <>
                    <input type="text" placeholder="Titre de l'annonce" id='title_popup' />
                    <input type="number" placeholder="Prix" id='price_popup' />
                    <textarea placeholder='Description du produit' id='simple_textarea'></textarea>
                    <input type="date" id='date_debut_popup' />
                    <input type="date" id='date_fin_popup' />
                    <button className='add_img'><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</button>
                </>
            );
        }

        else {
            setToAddModal(
                <>
                    <textarea placeholder='À quoi pensez-vous @Name ?' id='simple_textarea'></textarea>
                    <button className='btn_lieu'><i className='fa-solid fa-location-dot'></i>Ajouter un lieu</button>
                    <button className='add_img'><i className="fa-solid fa-image"></i>Ajouter une photo ou vidéo</button>
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
                        <DropDownBtn text="Type de post" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion', 'Simple post']} onCheckboxChange={handleCheckboxChange} />
                        <input type="button" value="Publier" id='publish' />
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