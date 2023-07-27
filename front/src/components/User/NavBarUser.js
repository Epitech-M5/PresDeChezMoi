import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider, useSelector } from "react-redux";
import { getAPI } from '../../api';

const NavBarUser = () => {

    const [activeId, setActiveId] = useState(null);
    const [data, setData] = useState([]);

    const user = useSelector((state) => state.utilisateur);

    const navigate = useNavigate();

    useEffect(() => {
        setActiveId(1);

        getAPI(`http://127.0.0.1:8081/api/user/${user.idutilisateur}`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setData(response.dataAPI);

            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

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
                            <img src="https://img.freepik.com/vecteurs-premium/portrait-profil-belle-fille-illustration-vectorielle_257845-4025.jpg?w=2000" alt="profil" />
                        </div>
                    </div>
                    <div className="right_name_description">
                        <h1>{data.pseudo}</h1>
                        <p>{data.description}</p>
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
                            onClick={() => toggleUnderline(4)}>Mes récompenses({data.score}<span id='unlock_loot'><i class="fa-solid fa-carrot"></i></span>)</h1>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default NavBarUser;