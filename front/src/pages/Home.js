import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPI } from './../api';
import Loader from './../components/Loader';
import DropDownBtn from '../components/MainComponent/DropDownBtn';

const Home = () => {
    const [mapData, setMapData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);
    const [typeAct, setTypeAct] = useState(null);


    useEffect(() => {
        getAPI('http://127.0.0.1:8081/api/annonce/', {}, { 'x-access-token': user.token })
            .then((response) => {
                setTimeout(() => {
                    setMapData(response.dataAPI);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, [mapData]);

    useEffect(() => {
        setTypeAct(0);
    }, []);

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

    return (
        <>
            <div className="container_bye"></div>
            <section className="main_container_home">
                <section className="container_1_home"></section>

                <section className="container_2_home">
                    <div className="spacing">
                        <DropDownBtn text="Filtre annonce" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion', 'Simple post', 'Tout']} onCheckboxChange={handleCheckboxChange} />
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
                                                        <h1>@UserName</h1>
                                                        <h4>@lieu • {item.createdAt}</h4>
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
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 2 && (
                                                    <>
                                                        <p>{item.titre}</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 3 && (
                                                    <>
                                                        <p>{item.titre}</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 4 && (
                                                    <>
                                                        <p>{item.titre}</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}

                                                {item.idTypeActivite === 5 && (
                                                    <>
                                                        <p>{item.titre}</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="container_bottom_post">
                                                <a href=""><i className="fa-regular fa-heart"></i></a>
                                                <a href=""><i className="fa-regular fa-comment"></i></a>
                                                <a href=""><i className="fa-solid fa-share"></i></a>
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
                                                                <h1>@UserName</h1>
                                                                <h4>@lieu • {item.createdAt}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="container_right_pdp">
                                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="container_content_post">
                                                        <p>Type 1 Content</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </div>
                                                    <div className="container_bottom_post">
                                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                                        <a href=""><i className="fa-solid fa-share"></i></a>
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
                                                                <h1>@UserName</h1>
                                                                <h4>@lieu • {item.createdAt}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="container_right_pdp">
                                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="container_content_post">
                                                        <p>Type 2 Content</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </div>
                                                    <div className="container_bottom_post">
                                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                                        <a href=""><i className="fa-solid fa-share"></i></a>
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
                                                                <h1>@UserName</h1>
                                                                <h4>@lieu • {item.createdAt}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="container_right_pdp">
                                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="container_content_post">
                                                        <p>Type 3 Content</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </div>
                                                    <div className="container_bottom_post">
                                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                                        <a href=""><i className="fa-solid fa-share"></i></a>
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
                                                                <h1>@UserName</h1>
                                                                <h4>@lieu • {item.createdAt}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="container_right_pdp">
                                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="container_content_post">
                                                        <p>Type 4 Content</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </div>
                                                    <div className="container_bottom_post">
                                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                                        <a href=""><i className="fa-solid fa-share"></i></a>
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
                                                                <h1>@UserName</h1>
                                                                <h4>@lieu • {item.createdAt}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="container_right_pdp">
                                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                                        </div>
                                                    </div>
                                                    <div className="container_content_post">
                                                        <p>Type 5 Content</p>
                                                        <p>id type annonce : {item.idTypeActivite}</p>
                                                        <p>id de l'annonce : {item.id}</p>
                                                        <div className="toCenter_post">
                                                            <img src={item.img} />
                                                        </div>
                                                    </div>
                                                    <div className="container_bottom_post">
                                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                                        <a href=""><i className="fa-solid fa-share"></i></a>
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
                </section>

                <section className="container_3_home">
                    <aside>
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
                    </aside>
                </section>
            </section>
        </>
    );
};

export default Home;