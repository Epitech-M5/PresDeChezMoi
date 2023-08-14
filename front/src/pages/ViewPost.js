import React, { useEffect, useState } from 'react';
import { getAPI } from '../api';
import { useSelector } from 'react-redux';
import AddressDisplay from '../components/MainComponent/AddressDisplay';
import PageNotFound from './PageNotFound';
import { useNavigate } from 'react-router-dom';

const ViewPost = ({ postId }) => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        console.log(postId)
        getAPI(`http://localhost:8081/api/annonce/${postId}`, null, null).then((response) => {

            console.log(response)
            setData(response.dataAPI)

        })
    }, [])

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

    return (
        <>
            <div className="copy_and_share">
                <img src="../media/img/carotte.png" alt="logo" />
                <h1>Copie et partage le post à tes amis !</h1>
                <img src="../media/img/carotte.png" alt="logo" />

            </div>

            <div className="container_header_share">
                <div class="wave">
                </div>
            </div>


            <div className="register_you">
                <button onClick={() => navigate('/')}>Découvrez notre projet</button>
            </div>
            <div className="container_view_post">
                <div className="for_scroll_share">
                    <ul>

                        <div className="container_annonce scroll">
                            <div className="container_pdp">
                                <div className="container_left_pdp">
                                    <img src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg" alt="profil" />
                                    <div className="other_container_pdp">
                                        <h1>Anonymous</h1>
                                        <h4><AddressDisplay longitude={data.longitude} latitude={data.latitude} /> {renderDateCreate(data.createdAt)}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="container_content_post">
                                {data.idTypeActivite === 1 && (
                                    <>
                                        <p>{data.titre}</p>
                                        <div className="toCenter_post">
                                            <img src={data.img} />
                                        </div>
                                    </>
                                )}

                                {data.idTypeActivite === 2 && (
                                    <>
                                        <p className='title_promo'><span className='type_title promotion'>PROMOTION : </span>{data.titre}</p>
                                        <p>{data.description}</p>
                                        <div className="toCenter_post">
                                            <img src={data.img} />
                                        </div>
                                    </>
                                )}

                                {data.idTypeActivite === 3 && (
                                    <>
                                        <p className='title_promo'><span className='type_title poste'>POSTE A POURVOIR : </span>{data.titre}</p>
                                        <p>{data.description}</p>
                                        <p className='margin_price'>Salaire brut : <span className='price'>{data.prix}€</span>/mois</p>
                                        <div className="toCenter_post">
                                            <img src={data.img} />
                                        </div>
                                    </>
                                )}

                                {data.idTypeActivite === 4 && (
                                    <>
                                        <p className='title_promo'><span className='type_title event'>EVENEMENT : </span>{data.titre}</p>
                                        <p>{data.description}</p>
                                        {renderDateEvent(data.dateDebut, data.dateFin)}
                                        <div className="toCenter_post">
                                            <img src={data.img} />
                                        </div>
                                    </>
                                )}

                                {data.idTypeActivite === 5 && (
                                    <>
                                        <p className='title_promo'><span className='type_title vente'>VENTE : </span>{data.titre}</p>
                                        <p className='margin_bot_price'><span className='price_in_vente'>Prix : </span>{data.prix}€</p>
                                        <p>{data.description}</p>
                                        {renderDateEvent(data.dateDebut, data.dateFin)}
                                        <div className="toCenter_post">
                                            <img src={data.img} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                    </ul>
                </div>
            </div>
        </>
    );
};

export default ViewPost;