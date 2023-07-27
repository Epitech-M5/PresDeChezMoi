import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider, useSelector } from "react-redux";

const NavBarUser = () => {

    const [activeId, setActiveId] = useState(null);

    const user = useSelector((state) => state.utilisateur);

    const navigate = useNavigate();

    useEffect(() => {
        setActiveId(1);
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
                        <h1>{user.pseudo}</h1>
                        <p>Lorem ipsum dolor sit amet. Est praesentium doloribus eum consequatur voluptatem ab recusandae praesentium aut deserunt reiciendis ea inventore odio ex expedita modi. Qui repellat maxime ea dolor maxime quo doloremque laborum non inventore provident aut voluptatibus nesciunt. Nam veniam consequatur et reiciendis consequatur aut mollitia nulla qui consequatur aperiam rem eveniet consequatur</p>
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
                            onClick={() => toggleUnderline(4)}>Mes récompenses({user.score})</h1>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default NavBarUser;