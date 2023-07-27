import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPI, postAPI, putAPI } from './../api';
import Loader from './../components/Loader';
import DropDownBtn from '../components/MainComponent/DropDownBtn';
import axios from 'axios';
import AddressDisplay from '../components/MainComponent/AddressDisplay';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [mapData, setMapData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [typeAct, setTypeAct] = useState(null);
    const [dictionnaireUser, setDictionnaireUser] = useState({});
    const [likedPosts, setLikedPosts] = useState([]);
    const [idToVerif, setIdToVerif] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAPI('http://127.0.0.1:8081/api/annonce/', {}, { 'x-access-token': user.token })
            .then((response) => {
                setTimeout(() => {

                    for (var n = 0; n < response.dataAPI.length; n++) {
                        setIdToVerif(idToVerif => [...idToVerif, response.dataAPI[n].id]);
                    }

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
        setTypeAct(0);
        getAPI('http://127.0.0.1:8081/api/user/', {}, { 'x-access-token': user.token })
            .then((response) => {

                var dictionnaire = {}
                for (const element of response.dataAPI) {
                    dictionnaire[element.id] = element.pseudo;
                };
                setDictionnaireUser(dictionnaire)

            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        //je veux recuperer ici les id des posts que le user à like
        setLikedPosts();
    }, [likedPosts]);

    const reversedData = [...mapData].reverse();

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

            const updatedMapData = mapData.map(item => {
                if (item.id === id && item.reaction > 0) {

                    let x = id + 1;
                    console.log(id, x);

                    putAPI(`http://127.0.0.1:8081/api/annonce/${id}`, { 'reaction': x }, { 'x-access-token': user.token })
                        .then((response) => {

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    const updatedItem = { ...item, reaction: item.reaction - 1 };
                    return updatedItem;
                }
                return item;
            });
            setMapData(updatedMapData);
            setLikedPosts(prevLikedPosts => prevLikedPosts.filter(postId => postId !== id));
        } else {

            const updatedMapData = mapData.map(item => {
                if (item.id === id) {
                    const updatedItem = { ...item, reaction: item.reaction + 1 };
                    return updatedItem;
                }
                return item;
            });
            setMapData(updatedMapData);
            setLikedPosts(prevLikedPosts => [...prevLikedPosts, id]);
        }
    };

    return (
        <>
            <div className="container_bye"></div>
            <section className="main_container_home">
                <section className="container_1_home"></section>

                <section className="container_2_home">
                    <div className="padding_for_bottom_fix">
                        <div className="spacing">
                            <DropDownBtn text="Filtre annonce" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion', 'Simple post', 'Tout']} onCheckboxChange={handleCheckboxChange} />
                            <button onClick={() => navigate('/home/user/settings')}>bouton à supp</button>
                        </div>
                        {loading ? (
                            <div className="container_2_home_loader">
                                <Loader />
                            </div>
                        ) : (
                            <>
                                {typeAct === 0 && (
                                    <ul>
                                        {reversedData.map((item) => (
                                            <div key={item.id} className="container_annonce">
                                                <div className="container_pdp">
                                                    <div className="container_left_pdp">
                                                        <img src="media/img/1.png" alt="profil" />
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
                                                    <a onClick={() => handleLikes(item.id)}><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                    <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                    <a href=""><i className="fa-regular fa-bookmark"></i></a>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                )}

                                {typeAct === 1 && (
                                    <ul>
                                        {reversedData.map((item) => {
                                            if (item.idTypeActivite === 1) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src="media/img/1.png" alt="profil" />
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
                                                            <p>{item.titre}</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
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
                                        {reversedData.map((item) => {
                                            if (item.idTypeActivite === 2) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src="media/img/1.png" alt="profil" />
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
                                                            <p className='title_promo'><span className='type_title promotion'>PROMOTION : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
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
                                        {reversedData.map((item) => {
                                            if (item.idTypeActivite === 3) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src="media/img/1.png" alt="profil" />
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
                                                            <p className='title_promo'><span className='type_title poste'>POSTE A POURVOIR : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            <p className='margin_price'>Salaire brut : <span className='price'>{item.prix}€</span>/mois</p>
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
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
                                        {reversedData.map((item) => {
                                            if (item.idTypeActivite === 4) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src="media/img/1.png" alt="profil" />
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
                                                            <p className='title_promo'><span className='type_title event'>EVENEMENT : </span>{item.titre}</p>
                                                            <p>{item.description}</p>
                                                            {renderDateEvent(item.dateDebut, item.dateFin)}
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
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
                                        {reversedData.map((item) => {
                                            if (item.idTypeActivite === 5) {
                                                return (
                                                    <div key={item.id} className="container_annonce">
                                                        <div className="container_pdp">
                                                            <div className="container_left_pdp">
                                                                <img src="media/img/1.png" alt="profil" />
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
                                                            <p className='title_promo'><span className='type_title vente'>VENTE : </span>{item.titre}</p>
                                                            <p className='margin_bot_price'><span className='price_in_vente'>Prix : </span>{item.prix}€</p>
                                                            <p>{item.description}</p>
                                                            {renderDateEvent(item.dateDebut, item.dateFin)}
                                                            <div className="toCenter_post">
                                                                <img src={item.img} />
                                                            </div>
                                                        </div>
                                                        <div className="container_bottom_post">
                                                            <a href=""><span className='reaction_span'>{item.reaction}</span><i className="fa-regular fa-heart"></i></a>
                                                            <a onClick={() => handleShare(item.id)}><i className="fa-solid fa-share"></i></a>
                                                            <a href=""><i className="fa-regular fa-bookmark"></i></a>
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
                            <h1>Invitez vos amis à une fête, un évènement caritatif ou une rencontre </h1>
                            <button>Créer un évènement</button>
                        </div>
                    </div>
                    <div className="pub2">
                        <div className="text_pub2">
                            <img src="media/img/location-mark.png" alt="map" />
                            <div className="container_bottom_map_ad">
                                <h1>Découvrez ce qui se passe près de chez vous</h1>
                                <button class="button-54" role="button">Map</button>
                            </div>
                        </div>
                    </div>

                </section>
            </section >
        </>
    );
};

export default Home;