import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteAPI, getAPI, putAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import AddressDisplay from '../MainComponent/AddressDisplay';
import Modal from '../MainComponent/Modal';

const Myposts = () => {

    const [mapData, setMapData] = useState([]);
    const userFILTER = useSelector((state) => state.utilisateur);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [dictionnaireUser, setDictionnaireUser] = useState({});
    const [dictionnairePdp, setDictionnairePdp] = useState({});
    const [dictionnaireRole, setDictionnaireRole] = useState({});
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    var [toAddModal, setToAddModal] = useState();
    const [allSignal, setAllSignal] = useState([]);
    const [saves, setSaves] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    const [idUser, setIdUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        // fetch likes du user et les mettre dans l'array
        getAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {

                const parsedLikes = JSON.parse(response.dataAPI.likes); // Convertir la chaîne JSON en array
                setLikedPosts(parsedLikes);

                const parsedSaves = JSON.parse(response.dataAPI.enregistrements);
                setSaves(parsedSaves);

            })
            .catch((error) => {
                console.log(error);
            })

    }, []);

    useEffect(() => {
        getAPI('http://127.0.0.1:8081/api/annonce/', {}, { 'x-access-token': user.token })
            .then((response) => {

                // ici je recupere toutes les annonces

                setTimeout(() => {

                    setMapData(response.dataAPI);
                    setLoading(false);

                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {

        // à chaque fois que likedpost change, stocker sa value en base
        putAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, { 'likes': likedPosts }, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });

    }, [likedPosts]);

    useEffect(() => {
        putAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, { 'enregistrements': saves }, { 'x-access-token': user.token })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }, [saves])

    useEffect(() => {
        getAPI('http://127.0.0.1:8081/api/typeSignalement/', {}, {})
            .then((response) => {
                setAllSignal(response.dataAPI);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    useEffect(() => {
        getAPI('http://127.0.0.1:8081/api/user/', {}, { 'x-access-token': user.token })
            .then((response) => {

                var dictionnaire = {}
                for (const element of response.dataAPI) {
                    dictionnaire[element.id] = element.pseudo;
                };
                setDictionnaireUser(dictionnaire);

                var pdp = {}
                for (const element of response.dataAPI) {
                    pdp[element.id] = element.photoProfil;
                };
                setDictionnairePdp(pdp);

                var role = {}
                for (const element of response.dataAPI) {
                    role[element.id] = element.idRole;
                };
                setDictionnaireRole(role);

                const userData = response.dataAPI;

                const loggedInUser = userData.find((user) => userFILTER.pseudo === user.pseudo);
                if (loggedInUser) {
                    const loggedInUserId = loggedInUser.id;
                    setIdUser(loggedInUserId);
                }


            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    const handleSaves = (id) => {

        if (saves.includes(id)) {

            setSaves(prev => prev.filter(postId => postId !== id));
        }

        else {

            setSaves(prev => [...prev, id]);
        }

    }

    const closeModal = () => {

        const toClose = document.querySelector('.modal');
        toClose.classList.add('closing');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);

    };

    const handleMore = (itemId) => {
        setIsOpenMore(isOpenMore === itemId ? null : itemId);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const renderDateCreate = (createdAt) => {
        const formattedCreatedAt = formatDate(createdAt);

        return (
            <>
                {formattedCreatedAt}
            </>
        );
    };

    const renderDateEvent = (dateDebut, dateFin) => {
        const formattedDateDebut = formatDate(dateDebut);
        const formattedDateFin = formatDate(dateFin);

        if (dateDebut === null || dateFin === null) {
            return (
                <>
                </>
            )
        }

        else if (formattedDateDebut && formattedDateFin) {
            return (
                <>
                    <div className="container_dates">
                        <div className="left_date">
                            <h4>Date début : </h4>
                            <p>{formattedDateDebut}</p>
                        </div>
                        <div className="right_date">
                            <h4>Date fin : </h4>
                            <p>{formattedDateFin}</p>
                        </div>
                    </div>
                </>
            );
        }
    };

    const handleShare = (id) => {
        navigate(`/view-post/${id}`)
    }

    const handleLikes = (id) => {

        if (likedPosts.includes(id)) {
            // si le user à deja like alors -1
            const updatedMapData = mapData.map(item => {
                if (item.id === id && item.reaction > 0) {

                    const updatedItem = { ...item, reaction: item.reaction - 1 };

                    // puis on modifie le nombre de like en base
                    let x = item.reaction - 1
                    putAPI(`http://127.0.0.1:8081/api/annonce/${id}`, { 'reaction': x }, { 'x-access-token': user.token })
                        .then((response) => {

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    return updatedItem;
                }
                return item;
            });
            setMapData(updatedMapData);

            // on enleve l'id de l'annonce de l'array
            setLikedPosts(prevLikedPosts => prevLikedPosts.filter(postId => postId !== id));

        } else {
            // si le user à deja like alors +1 et ajoute l'id de l'annonce
            const updatedMapData = mapData.map(item => {
                if (item.id === id) {

                    const updatedItem = { ...item, reaction: item.reaction + 1 };

                    // puis on modifie le nombre de like en base
                    let x = item.reaction + 1
                    putAPI(`http://127.0.0.1:8081/api/annonce/${id}`, { 'reaction': x }, { 'x-access-token': user.token })
                        .then((response) => {

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    return updatedItem;
                }
                return item;
            });
            setMapData(updatedMapData);

            // on ajoute l'id de l'annonce de l'array
            setLikedPosts(prevLikedPosts => [...prevLikedPosts, id]);
        }
    };

    const handleSup = (id) => {

        setToAddModal(
            <>
                <div className="wrapper_delete_post">
                    <h1>Êtes-vous sûr(e) ?</h1>
                    <button onClick={() => {
                        deleteAPI(`http://127.0.0.1:8081/api/annonce/${id}`, {}, { 'x-access-token': user.token })
                            .then((response) => {
                                closeModal()
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }}>Oui</button>
                    <button onClick={() => {
                        closeModal()
                    }}>Non</button>
                </div>
            </>
        )

        setIsOpen(true);
    }

    const handleSignal = (id) => {

        setToAddModal(
            <>
                {allSignal.map((item) => (
                    <>
                        <div key={item.id} className="wrapper_delete_post">
                            <h1 onClick={() => {
                                putAPI(`http://127.0.0.1:8081/api/annonce/${id}`, { 'idTypeSignalement': item.id, 'idUtilisateurSignalement': user.idutilisateur }, { 'x-access-token': user.token })
                                    .then((response) => {
                                        closeModal()
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }}>{item.titre}</h1>
                        </div>
                    </>
                ))}
            </>
        )

        setIsOpen(true);
    }

    const reversedData = [...mapData].reverse();
    const hasElementsToDisplay = reversedData.some((item) => item.organisateur === idUser);

    return (
        <>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <div className="container_x">
                    <i className="fa-solid fa-xmark" onClick={closeModal}></i>
                </div>
                <div className="wrapper_popup">
                    {toAddModal}
                </div>
            </Modal>
            <div className="content_user_profil">
                <div className="container_mypost_tomap">
                    {loading ? (
                        <div className="loader_formypost">
                            <Loader />
                        </div>
                    ) : (

                        <ul>
                            {hasElementsToDisplay ? (

                                reversedData.map((item) => (
                                    item.organisateur === idUser && (

                                        <div key={item.id} className="container_annonce">
                                            <div className="container_pdp">
                                                <div className="container_left_pdp">
                                                    <img src={`../../media/img/${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                    <div className="other_container_pdp">
                                                        <h1>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
                                                        <h4><AddressDisplay longitude={item.longitude} latitude={item.latitude} /> {renderDateCreate(item.createdAt)}</h4>
                                                    </div>
                                                </div>
                                                <div className="container_right_pdp">
                                                    <a onClick={() => handleMore(item.id)}><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                    {isOpenMore === item.id && (
                                                        <div className="container_more">

                                                            {dictionnaireRole[user.idutilisateur] === 3 || item.organisateur === user.idutilisateur ? (
                                                                <h1 onClick={() => handleSup(item.id)}>Supprimer</h1>
                                                            ) : null}

                                                            <h1 onClick={() => handleSignal(item.id)}>Signaler</h1>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="container_content_post">
                                                {item.idTypeActivite === 1 && (
                                                    <>
                                                        <p>{item.titre}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 2 && (
                                                    <>
                                                        <p className='title_promo'><span className='type_title promotion'>PROMOTION : </span>{item.titre}</p>
                                                        <p>{item.description}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 3 && (
                                                    <>
                                                        <p className='title_promo'><span className='type_title poste'>POSTE A POURVOIR : </span>{item.titre}</p>
                                                        <p>{item.description}</p>
                                                        <p className='margin_price'>Salaire brut : <span className='price'>{item.prix}€</span>/mois</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 4 && (
                                                    <>
                                                        <p className='title_promo'><span className='type_title event'>EVENEMENT : </span>{item.titre}</p>
                                                        <p>{item.description}</p>
                                                        {renderDateEvent(item.dateDebut, item.dateFin)}
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 5 && (
                                                    <>
                                                        <p className='title_promo'><span className='type_title vente'>VENTE : </span>{item.titre}</p>
                                                        <p className='margin_bot_price'><span className='price_in_vente'>Prix : </span>{item.prix}€</p>
                                                        <p>{item.description}</p>
                                                        {renderDateEvent(item.dateDebut, item.dateFin)}
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="container_bottom_post">
                                                <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                            </div>
                                        </div>
                                    )
                                ))
                            ) : (
                                <h1>Vous n'avez pas encore poster d'annonce !</h1>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Myposts;