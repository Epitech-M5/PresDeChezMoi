import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteAPI, getAPI, putAPI } from '../../api';
import Loader from '../Loader';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const Post = () => {

    const navigate = useNavigate();
    const [activeId, setActiveId] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useSelector((state) => state.utilisateur);
    const [dictionnaireUser, setDictionnaireUser] = useState({});

    useEffect(() => {

        getAPI(`http://${adresseip}:${port}/api/annonce/`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setData(response.dataAPI);

                setTimeout(() => {
                    setLoading(false);
                }, 4000);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, [data]);

    useEffect(() => {
        setActiveId(1);
        getAPI(`http://${adresseip}:${port}/api/user/`, {}, { 'x-access-token': user.token })
            .then((response) => {

                var dictionnaire = {}
                for (const element of response.dataAPI) {
                    dictionnaire[element.id] = element.pseudo;
                };
                setDictionnaireUser(dictionnaire);

            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    const toggleUnderline = (id) => {
        setActiveId(id);
    }

    const renderSign = (id) => {
        console.log(id)
        switch (id) {
            case 1:
                return 'Contenue sexuelle'
            case 2:
                return 'Harcelemement'
            case 3:
                return 'Violence'
            case 4:
                return 'Contenue inapproprié'
            case 5:
                return 'Autre'
        }
    };

    const handleOK = (id, type) => {

        if (type === 'signale') {

            putAPI(`http://${adresseip}:${port}/api/annonce/${id}`, { 'estSignale': false }, { 'x-access-token': user.token })
                .then((response) => {

                })
                .catch((error) => {
                    console.log(error);
                })

        }

        else if (type === 'valide') {

            putAPI(`http://${adresseip}:${port}/api/annonce/${id}`, { 'estVerifie': true }, { 'x-access-token': user.token })
                .then((response) => {

                })
                .catch((error) => {
                    console.log(error);
                })

        }

        else {
            alert('Erreur technique veuillez contacter le service technique');
        }

    }

    const handleSupp = (id) => {

        deleteAPI(`http://${adresseip}:${port}/api/annonce/${id}`, {}, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            })

    }

    const handleINap = (idAnnonce, idUser) => {

        deleteAPI(`http://${adresseip}:${port}/api/annonce/${idAnnonce}`, {}, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            })

        putAPI(`http://${adresseip}:${port}/api/user/${idUser}`, { "estBanni": true }, { "x-access-token": user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <>
            <div className='content_admin'>
                <div className="content_inside_admin_pages">
                    <div className="container_toggle_for_posts">

                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Annonces signalées</h1>

                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Annonces à valider</h1>

                    </div>
                </div>

                <div className="container_annonces_to_map">

                    {loading ? (
                        <div className="center_loader">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {activeId === 1 ? (

                                data.filter(item => item.estSignale).map((item) => (
                                    <>
                                        <div className="wrapper_total_ann" key={item.id}>

                                            <div className="cont_left_sign">
                                                <h1><span className='set_span'>Titre : </span>{item.titre}</h1>
                                                <h1 id='author_nav' onClick={() => navigate(`/home/view-profile/${item.organisateur}`)}><span className='set_span'>Auteur : </span>{dictionnaireUser[item.organisateur]} <i className="fa-solid fa-arrow-up-right-from-square"></i></h1>
                                                {item.description ? (
                                                    <>
                                                        <h1><span className='set_span'>Description : </span>{item.description}</h1>
                                                    </>
                                                ) : null}
                                                <h1><span className='set_span'>Cause Signalement : </span>{renderSign(item.idTypeSignalement)}</h1>
                                            </div>

                                            <div className="cont_right_sign">
                                                <i className="fa-solid fa-thumbs-up" onClick={() => handleOK(item.id, 'signale')}></i>
                                                <i className="fa-solid fa-thumbs-up fa-rotate-180" onClick={() => handleSupp(item.id)}></i>
                                                <i className="fa-solid fa-circle-exclamation" onClick={() => handleINap(item.id, item.organisateur)}></i>
                                            </div>

                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                    <h1>Aucune annonce signalée</h1>
                                </>
                            )}

                            {activeId === 2 ? (
                                data.filter(item => !item.estVerifie).map((item) => (
                                    <>
                                        <div className="wrapper_total_ann" key={item.id}>

                                            <div className="cont_left_sign">
                                                <h1><span className='set_span'>Titre : </span>{item.titre}</h1>
                                                <h1 id='author_nav' onClick={() => navigate(`/home/view-profile/${item.organisateur}`)}><span className='set_span'>Auteur : </span>{dictionnaireUser[item.organisateur]} <i className="fa-solid fa-arrow-up-right-from-square"></i></h1>
                                                {item.description ? (
                                                    <>
                                                        <h1><span className='set_span'>Description : </span>{item.description}</h1>
                                                    </>
                                                ) : null}
                                            </div>

                                            <div className="cont_right_sign">
                                                <i className="fa-solid fa-thumbs-up" onClick={() => handleOK(item.id, 'valide')}></i>
                                                <i className="fa-solid fa-thumbs-up fa-rotate-180" onClick={() => handleSupp(item.id)}></i>
                                                <i className="fa-solid fa-circle-exclamation" onClick={() => handleINap(item.id, item.organisateur)}></i>
                                            </div>

                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                    <h1>Aucune annonce à valider</h1>
                                </>
                            )}
                        </>
                    )}

                </div>
            </div>

        </>
    );
};

export default Post;