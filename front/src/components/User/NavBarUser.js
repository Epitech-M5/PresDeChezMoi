import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBarUser = () => {

    const [activeId, setActiveId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setActiveId(1);
    }, []);

    const toggleUnderline = (id) => {
        setActiveId(id);

        switch (id) {
            case 1:
                navigate('/user/settings');
                break
            case 2:
                navigate('/user/my-posts');
                break
            case 3:
                navigate('/user/my-save');
                break
            case 4:
                navigate('/user/my-loot');
                break
        }

    };

    return (
        <>
            <div className="container_navbar_user">
                <div className="container_user_infos">
                    <div className="left_user_pdp">
                        <img src="../media/img/1.png" alt="profil" />
                    </div>
                    <div className="right_name_description">
                        <h1>@UserName</h1>
                        <p>Lorem ipsum dolor sit amet. Est praesentium doloribus eum consequatur voluptatem ab recusandae praesentium aut deserunt reiciendis ea inventore odio ex expedita modi. Qui repellat maxime ea dolor maxime quo doloremque laborum non inventore provident aut voluptatibus nesciunt. Nam veniam consequatur et reiciendis consequatur aut mollitia nulla qui consequatur aperiam rem eveniet consequatur</p>
                    </div>
                </div>
                <div className="">
                    <div className="wrapper_sections_toggle">
                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Paramètres</h1>
                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Mes annonces</h1>
                        <h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(3)}>Mes Enregistrements</h1>
                        <h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(4)}>Mes récompenses</h1>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default NavBarUser;