import React, { useState } from 'react';

const NavBarHome = () => {

    const [activeId, setActiveId] = useState(null);

    const handleToggle = () => {

        const toggleBtnIcon = document.querySelector('.container_forphone_navbar i')
        const ToSlide = document.querySelector('.navbar_toslide')
        ToSlide.classList.toggle('open')

        const isOpen = ToSlide.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-greater-than fa-rotate-180' : 'fa-solid fa-greater-than'
    }

    const toggleUnderline = (id) => {
        setActiveId(id);
    };

    return (
        <>
            <div className="container_nabar_home">
                <div className="container_logo_home">
                    <img src="../media/img/carotte.png" alt="logo" />
                    <h1>PresDeChezMoi</h1>
                </div>
                <div className="container_navigation_home">
                    <div className="container_homenav_left">
                        <i className={`fa fa-home underline-animation_logo ${activeId === 1 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(1)}></i>
                        <i className={`fa-solid fa-location-dot underline-animation_logo ${activeId === 2 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(2)}></i>
                        <i className={`fa-solid fa-bell underline-animation_logo ${activeId === 3 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(3)}></i>
                        <i className={`fa-solid fa-envelope underline-animation_logo ${activeId === 4 ? 'underline logo' : ''}`}
                            onClick={() => toggleUnderline(4)}></i>
                    </div>
                    <div className="container_homenav_right">
                        <h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(1)}>Acceuil</h1>
                        <h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(2)}>Découvrir</h1>
                        <h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(3)}>Notifications</h1>
                        <h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                            onClick={() => toggleUnderline(4)}>Messages</h1>
                    </div>
                </div>
                <div className="container_buttons_home">
                    <button className='btn_home'></button>
                </div>
            </div>
            <div className="container_forphone_navbar" onClick={handleToggle}>
                <i class="fa-solid fa-greater-than"></i>
            </div>
            <div className='navbar_toslide'>
                <div className="toslide_content">
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 1 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(1)}>Acceuil</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 2 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(2)}>Découvrir</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 3 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(3)}>Notifications</h1></div>
                    <div className='toAlign'><h1 className={`underline-animation ${activeId === 4 ? 'underline' : ''}`}
                        onClick={() => toggleUnderline(4)}>Messages</h1></div>
                    <div className="container_buttons_home">
                        <button className='btn_home'></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBarHome;