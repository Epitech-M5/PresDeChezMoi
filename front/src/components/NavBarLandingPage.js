import { React, useState } from 'react';
import ButtonLandingPage from '../components/ButtonLandingPage';
import { useNavigate } from 'react-router-dom';
import DangerBanner from './MainComponent/BannerDanger';

const NavBarLandingPage = () => {

    const navigate = useNavigate();

    const handleToggle = () => {
        const toggleBtnIcon = document.querySelector('.btn_toggle i')
        const DropDown = document.querySelector('.dropdown_navbar')
        DropDown.classList.toggle('open')

        const isOpen = DropDown.classList.contains('open')
        toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'
    }

    const handleNavigate = (number) => {
        window.scrollTo({ top: 0 });
        switch (number) {
            case 1:
                handleToggle();
                return navigate('/');
            case 2:
                handleToggle();
                return navigate('/team');
            case 3:
                handleToggle();
                return navigate('/contact')
            case 4:
                return navigate('/')
            default:
                handleToggle();
                return navigate('/404')
        }
    }

    return (
        <>
            <div className='navbar'>
                <div className='logo_nav'>
                    <div onClick={() => handleNavigate(4)}>
                        <img src='media/img/carotte.png' alt='logo' onClick={() => handleNavigate(4)} />
                    </div>
                    <a onClick={() => handleNavigate(4)}>PresDeChezMoi</a>
                    
                </div>
                <ul className='links'>
                    <li><a onClick={() => handleNavigate(1)}>Accueil</a></li>
                    <li><a onClick={() => handleNavigate(2)}>Equipes</a></li>
                    <li><a onClick={() => handleNavigate(3)}>Contact</a></li>
                </ul>
                <div className='btn_toggle' onClick={handleToggle}>
                    <i className='fa-solid fa-bars'></i>
                </div>
            </div>
            <div className='dropdown_navbar'>
                <li><a onClick={() => handleNavigate(1)}>Accueil</a></li>
                <li><a onClick={() => handleNavigate(2)}>Equipes</a></li>
                <li><a onClick={() => handleNavigate(3)}>Contact</a></li>
            </div>
        </>
    );
};

export default NavBarLandingPage;