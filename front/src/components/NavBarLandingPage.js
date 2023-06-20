import React from 'react';
import ButtonLandingPage from '../components/ButtonLandingPage';

const NavBarLandingPage = () => {

    const handleToggle = () => {
        const toggleBtnIcon = document.querySelector('.btn_toggle i')
        const DropDown = document.querySelector('.dropdown_navbar')
        DropDown.classList.toggle('open')

        const isOpen = DropDown.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    }

    return (
        <>
            <div className='navbar'>
                <div className='logo_nav'>
                    <div>
                        <img src='media/img/carotte.png' alt='logo' />
                    </div>
                    <a href='#'>PresDeChezMoi</a>
                </div>
                <ul className='links'>
                    <li><a href='#'>Accueil</a></li>
                    <li><a href='#'>Equipes</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
                <div className='btn_toggle' onClick={handleToggle}>
                    <i className='fa-solid fa-bars'></i>
                </div>
            </div>
            <div className='dropdown_navbar'>
                <li><a href='#'>Accueil</a></li>
                <li><a href='#'>Equipes</a></li>
                <li><a href='#'>Contact</a></li>
            </div>
        </>
    );
};

export default NavBarLandingPage;