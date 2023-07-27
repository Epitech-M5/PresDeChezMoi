import React, { useState, useEffect } from 'react';
import { getAPI } from '../../api';
import { useSelector } from 'react-redux';
import Loader from '../Loader';

const MyLoot = () => {

    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getAPI('http://127.0.0.1:8081/api/recompense/', {}, { 'x-access-token': user.token })
            .then((response) => {
                setTimeout(() => {
                    setData(response.dataAPI);
                    setLoading(false);
                }, 2000);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });

    }, []);

    return (
        <>
            <div className="content_user_profil">
                <div className="container_mypost_tomap">

                    {loading ? (
                        <div className="loader_formypost">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="flex_all_loot">
                                {data.map((item) => (

                                    <div className="container_loot" key={item.id}>
                                        <div className="wrapper_header">
                                            <h1>{item.nom}</h1>
                                            <h1 id='score_loot'>Score nécessaire : <span id='unlock_loot'>{item.scoreNecessaire}<i class="fa-solid fa-carrot"></i></span></h1>
                                        </div>
                                        <hr />
                                        <div className="container_img_loot">
                                            <img src="https://www.manutan.fr/fstrz/r/s/www.manutan.fr/img/S/GRP/ST/AIG3560173.jpg?frz-v=90" alt="loot" />
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyLoot;