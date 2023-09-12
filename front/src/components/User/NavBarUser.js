import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider,useDispatch, useSelector } from "react-redux";
import { getAPI } from '../../api';
import Loader from '../Loader';
import { fetchScore } from "../../redux/Utilisateur";

const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT
const NavBarUser = () => {

    const [activeId, setActiveId] = useState(null);
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const user = useSelector((state) => state.utilisateur);

    const navigate = useNavigate();

    useEffect(() => {

        getAPI(`http://${adresseip}:${port}/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {
                console.log("RERERERERERERERERER", response)

                setTimeout(() => {
                    setData(response.dataAPI);
                    dispatch(fetchScore(data.score));
                }, 4000)

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    useEffect(() => {
        setActiveId(1);
    }, [])

    const toggleUnderline = (id) => {
        setActiveId(id);

        switch (id) {
            case 1:
                window.scrollTo({ top: 0 });
                navigate('/home/user/settings');
                break
            case 2:
                window.scrollTo({ top: 0 });
                navigate('/home/user/my-posts');
                break
            case 3:
                window.scrollTo({ top: 0 });
                navigate('/home/user/my-save');
                break
            case 4:
                window.scrollTo({ top: 0 });
                navigate('/home/user/my-loot');
                break
        }

    };

    return (
        <>
            <div className="container_arrow_backtohome inprofil" onClick={() => navigate('/home')}>
                <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                <h1>Home</h1>
            </div>
            <div className="container_navbar_user">
                <div className="container_user_infos">
                    <div className="left_user_pdp">
                        <div className="container_pdp_user">
                            {data.photoProfil ? (
                                <><img src={`../../media/img/${data.photoProfil}.png`} alt="profil" /></>
                            ) : (
                                <><Loader /></>
                            )}

                        </div>
                    </div>
                    <div className="right_name_description">
                        <h1>{data.pseudo}</h1>
                        <h4>{data.nom} {data.prenom} {data.profession}</h4>
                        <p>{data.description}</p>
                        <p id='force_cursor' onClick={() => navigate(`/home/view-profile/${user.idutilisateur}`)}>Partage ton profil <i className="fa-solid fa-share-from-square"></i></p>
                    </div>
                </div>
                <div className="navbar_to_toggle">
                    <div className="wrapper_sections_toggle">
                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Paramètres</h1>
                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Mes annonces</h1>
                        <h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(3)}>Mes Enregistrements</h1>
                        <h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(4)}>Mes récompenses({data.score ? <>{data.score}</> : <>0</>}<span id='unlock_loot'><i class="fa-solid fa-carrot"></i></span>)</h1>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default NavBarUser;