import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteAPI, getAPI, postAPI, putAPI } from './../api';
import Loader from './../components/Loader';
import DropDownBtn from '../components/MainComponent/DropDownBtn';
import axios from 'axios';
import AddressDisplay from '../components/MainComponent/AddressDisplay';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/MainComponent/Modal';

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const Home = () => {

    const [mapData, setMapData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [typeAct, setTypeAct] = useState(null);
    const [dictionnaireUser, setDictionnaireUser] = useState({});
    const [dictionnairePdp, setDictionnairePdp] = useState({});
    const [dictionnaireRole, setDictionnaireRole] = useState({});
    const [dictionnaireNewUser, setDictionnaireNewUser] = useState({});
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    var [toAddModal, setToAddModal] = useState();
    const [allSignal, setAllSignal] = useState([]);
    const [idSign, setIdSign] = useState(null);

    const [likedPosts, setLikedPosts] = useState([]); // stocker les annonces like par le user
    const [saves, setSaves] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/annonce/`, {}, { 'x-access-token': user.token })
            .then((response) => {
                setTimeout(() => {

                    setMapData(response.dataAPI);
                    setLoading(false);

                }, 4000);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        setTypeAct(0);
        getAPI(`http://${adresseip}:${port}/api/user/`, {}, { 'x-access-token': user.token })
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

                var newUser = {}
                for (const element of response.dataAPI) {
                    newUser[element.id] = element.nouveauUser;
                }
                setDictionnaireNewUser(newUser);

            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // fetch likes du user et les mettre dans l'array
        getAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
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

        // à chaque fois que likedpost change, stocker sa value en base
        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'likes': likedPosts }, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });

    }, [likedPosts]);

    useEffect(() => {
        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'enregistrements': saves }, { 'x-access-token': user.token })
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    }, [saves])

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/typeSignalement/`, {}, {})
            .then((response) => {
                setAllSignal(response.dataAPI);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleCheckboxChange = (item) => {

        const typeActValue = {
            'Simple post': 1,
            'Promotion': 2,
            'Poste à pourvoir': 3,
            'Evénement': 4,
            'Vente': 5,
            'Tout': 0
        }[item];
        setTypeAct(typeActValue);
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
                    putAPI(`http://${adresseip}:${port}/api/annonce/${id}`, { 'reaction': x }, { 'x-access-token': user.token })
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
                    putAPI(`http://${adresseip}:${port}/api/annonce/${id}`, { 'reaction': x }, { 'x-access-token': user.token })
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

    const handleSaves = (id) => {

        if (saves.includes(id)) {

            setSaves(prev => prev.filter(postId => postId !== id));
        }

        else {

            setSaves(prev => [...prev, id]);
        }

    }

    const handleMore = (itemId) => {
        setIsOpenMore(isOpenMore === itemId ? null : itemId);
    };

    const closeModal = () => {

        const toClose = document.querySelector('.modal');
        toClose.classList.add('closing');
        setTimeout(() => {
            setIsOpen(false);
        }, 300);

    };

    const handleSup = (id) => {

        setToAddModal(
            <>
                <div className="wrapper_delete_post">
                    <h1>Êtes-vous sûr(e) ?</h1>
                    <button onClick={() => {
                        deleteAPI(`http://${adresseip}:${port}/api/annonce/${id}`, {}, { 'x-access-token': user.token })
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
                                putAPI(`http://${adresseip}:${port}/api/annonce/${id}`, { 'idTypeSignalement': item.id, 'idUtilisateurSignalement': user.idutilisateur, 'estSignale': true }, { 'x-access-token': user.token })
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

    const handleValidationTuto = () => {

        putAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, { 'nouveauUser': false }, { 'x-access-token': user.token })
            .then((response) => {

            })
            .catch((error) => {
                console.log(error);
            });

    }


    const reversedData = [...mapData].reverse();

    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', dictionnaireNewUser[user.idutilisateur])

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

            <div className="container_bye"></div>
            <section className="main_container_home">
                <section className="container_1_home"></section>

                <section className="container_2_home">
                    <div className="padding_for_bottom_fix">
                        <div className="spacing">
                            <DropDownBtn type='abs' text="Filtre annonce" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion', 'Simple post', 'Tout']} onCheckboxChange={handleCheckboxChange} />
                            <button onClick={() => navigate('/home/user/settings')}>bouton à supp</button>
                            <button onClick={() => navigate('/home/test')}>test</button>
                        </div>
                        {loading ? (
                            <div className="container_2_home_loader">
                                <Loader />
                            </div>
                        ) : (
                            <>

                                {dictionnaireNewUser[user.idutilisateur] ? (
                                    <>
                                        <div className="container_tuto_newUser">
                                            <div className="container_title_newUser">
                                                <h1>Guide nouvelle utilisateur</h1>
                                                <h3>Bienvenue sur PresDeChezMoi @{user.pseudo} !</h3>
                                            </div>
                                            <div className="container_step_to_newUser">
                                                <div>
                                                    <h2>Commencez par compléter votre profil</h2>
                                                    <img id='fix_img' src="media/img/editor.png" alt="edit" />
                                                    <button onClick={() => navigate('/home/user/settings')}>Compléter</button>
                                                </div>
                                                <div>
                                                    <h2>Envoyez votre premier message à vos amis</h2>
                                                    <img src="media/img/communication.png" alt="message" />
                                                    <button onClick={() => navigate('/home/chat')}>Messagerie</button>
                                                </div>
                                                <div>
                                                    <h2>Découvrez ce qui se passe près de chez vous</h2>
                                                    <img src="media/img/map-location.png" alt="map" />
                                                    <button onClick={() => navigate('/home/map')}>Map</button>
                                                </div>
                                                <div>
                                                    <h2>Découvrez par vous-même toutes les fonctionnalités</h2>
                                                    <img src="media/img/option.png" alt="option" />
                                                    <h3>Like, enregistre des posts, partage ton profil à tes amis...</h3>
                                                </div>
                                                <div>
                                                    <h2>Ça y est vous savez tout faire ?</h2>
                                                    <h4>N'hésitez pas à contacter notre assistance en cas de problème via le chatbot en bas à gauche</h4>
                                                    <h5>Cliqué sur le bouton pour valider le guide</h5>
                                                    <button id='force_margin' onClick={handleValidationTuto}>Valider</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}

                                {typeAct === 0 && (

                                    <ul>

                                        {reversedData.filter(item => item.estVerifie).map((item) => (
                                            <>
                                                <div key={item.id} className="container_annonce">
                                                    <div className="container_pdp">
                                                        <div className="container_left_pdp">
                                                            <img src={`media/img/${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                            <div className="other_container_pdp">
                                                                <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                            </>
                                        ))}


                                    </ul>
                                )}

                                {typeAct === 1 && (
                                    <ul>

                                        {reversedData.filter(item => item.estVerifie).map((item) => {
                                            if (item.idTypeActivite === 1) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src={`media / img / ${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                                <div className="other_container_pdp">
                                                                    <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                                            <p>{item.titre}</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                )}

                                {typeAct === 2 && (
                                    <ul>
                                        {reversedData.filter(item => item.estVerifie).map((item) => {
                                            if (item.idTypeActivite === 2) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src={`media / img / ${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                                <div className="other_container_pdp">
                                                                    <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                                            <p className='title_promo'><span className='type_title promotion'>PROMOTION : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                )}

                                {typeAct === 3 && (
                                    <ul>
                                        {reversedData.filter(item => item.estVerifie).map((item) => {
                                            if (item.idTypeActivite === 3) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src={`media / img / ${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                                <div className="other_container_pdp">
                                                                    <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                                            <p className='title_promo'><span className='type_title poste'>POSTE A POURVOIR : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            <p className='margin_price'>Salaire brut : <span className='price'>{item.prix}€</span>/mois</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                )}

                                {typeAct === 4 && (
                                    <ul>
                                        {reversedData.filter(item => item.estVerifie).map((item) => {
                                            if (item.idTypeActivite === 4) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src={`media / img / ${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                                <div className="other_container_pdp">
                                                                    <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                                            <p className='title_promo'><span className='type_title event'>EVENEMENT : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            {renderDateEvent(item.dateDebut, item.dateFin)}
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                )}

                                {typeAct === 5 && (
                                    <ul>
                                        {reversedData.filter(item => item.estVerifie).map((item) => {
                                            if (item.idTypeActivite === 5) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src={`media / img / ${dictionnairePdp[item.organisateur]}.png`} alt="profil" />
                                                                <div className="other_container_pdp">
                                                                    <h1 id='hover_name_user' onClick={() => navigate(`/ home / view - profile / ${item.organisateur}`)}>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
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
                                                            <p className='title_promo'><span className='type_title vente'>VENTE : </span>{item.titre}</p>
                                                            <p className='margin_bot_price'><span className='price_in_vente'>Prix : </span>{item.prix}€</p>
                                                            <p>{item.description}</p>
                                                            {renderDateEvent(item.dateDebut, item.dateFin)}
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span>{likedPosts.includes(item.id) ? (<i className="fa-solid fa-heart color"></i>) : (<i className="fa-regular fa-heart"></i>)}</a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a onClick={() => handleSaves(item.id)}>{saves.includes(item.id) ? (<i className="fa-solid fa-bookmark"></i>) : (<i className="fa-regular fa-bookmark"></i>)}</a>
                                                        </div>
                                                    </div>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>
                </section>

                <section className="container_3_home">

                    <div className="pub1">
                        <div className="text_pub">
                            <h1>Invitez vos amis à une fête, un évènement caritatif ou une rencontre</h1>
                            <button onClick={() => navigate('/home/chat')}>Envoyez leur un message</button>
                        </div>
                    </div>
                    <div className="pub2">
                        <div className="text_pub2">
                            <img src="media/img/location-mark.png" alt="map" />
                            <div className="container_bottom_map_ad">
                                <h1>Découvrez ce qui se passe près de chez vous</h1>
                                <button class="button-54" role="button" onClick={() => navigate('/home/map')}>Map</button>
                            </div>
                        </div>
                    </div>

                </section>
            </section >
        </>
    );
};

export default Home;