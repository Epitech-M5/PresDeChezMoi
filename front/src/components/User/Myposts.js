import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from '../../api';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import AddressDisplay from '../MainComponent/AddressDisplay';

const Myposts = () => {

    const [mapData, setMapData] = useState([]);
    const userFILTER = useSelector((state) => state.utilisateur);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [dictionnaireUser, setDictionnaireUser] = useState({});

    const [idUser, setIdUser] = useState(null); // JE VEUX RECUPERER L'ID DU USER CONNECTE

    const navigate = useNavigate();

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
        getAPI('http://127.0.0.1:8081/api/user/', {}, { 'x-access-token': user.token })
            .then((response) => {

                // ici je recupere tous les users

                var dictionnaire = {}
                for (const element of response.dataAPI) {
                    dictionnaire[element.id] = element.pseudo;
                };
                setDictionnaireUser(dictionnaire)

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

    const reversedData = [...mapData].reverse();

    console.log(idUser, dictionnaireUser)

    return (
        <>
            <div className="content_user_profil">
                <div className="container_mypost_tomap">
                    {loading ? (
                        <div className="loader_formypost">
                            <Loader />
                        </div>
                    ) : (
                        <ul>
                            {reversedData.map((item) => (
                                item.organisateur === idUser && (

                                    <div key={item.id} className="container_annonce">
                                        <div className="container_pdp">
                                            <div className="container_left_pdp">
                                                <img src="https://img.freepik.com/vecteurs-premium/portrait-profil-belle-fille-illustration-vectorielle_257845-4025.jpg?w=2000" alt="profil" />
                                                <div className="other_container_pdp">
                                                    <h1>{dictionnaireUser[item.organisateur]} {item.annonceMairie ? <i className="fa-solid fa-crown"></i> : null}</h1>
                                                    <h4><AddressDisplay longitude={item.longitude} latitude={item.latitude} /> {renderDateCreate(item.createdAt)}</h4>
                                                </div>
                                            </div>
                                            <div className="container_right_pdp">
                                                <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
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
                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
                                        </div>
                                    </div>

                                )
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Myposts;