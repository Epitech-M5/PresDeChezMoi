import React from 'react';
import { useNavigate } from 'react-router-dom';

const FooterLandingPage = () => {

    const navigate = useNavigate();

    const handleNavigate = (number) => {
        window.scrollTo({ top: 0 });
        switch (number) {
            case 1:
                return navigate('/');
            case 2:
                return navigate('/team');
            case 3:
                return navigate('/contact')
            default:
                return navigate('/404')
        }
    }

    return (
        <>
            <div className="container_footer">
                <ul className='links_footer'>
                    <li><a onClick={() => handleNavigate(1)}>Accueil</a></li>
                    <li><a onClick={() => handleNavigate(2)}>Equipes</a></li>
                    <li><a onClick={() => handleNavigate(2)}>Contact</a></li>
                </ul>
                <div className="social">
                    <i className="fa-brands fa-facebook" onClick={() => handleNavigate(99)}></i>
                    <i className="fa-brands fa-twitter" onClick={() => handleNavigate(99)}></i>
                    <i className="fa-brands fa-youtube" onClick={() => handleNavigate(99)}></i>
                </div>
                <div className="line_footer">
                    <hr />
                </div>
                <div className="end_footer">
                    <div className='logo_nav'>
                        <div onClick={() => handleNavigate(1)}>
                            <img src='media/img/carotte.png' alt='logo' />
                        </div>
                        <a onClick={() => handleNavigate(1)} id='footer_title'>PresDeChezMoi</a>
                    </div>
                    <div className="end_footer_right">
                        <h1 onClick={() => handleNavigate(2)}>@M5 Team</h1>
                        <h1 onClick={() => handleNavigate(99)}>Terms of Services</h1>
                        <h1 onClick={() => handleNavigate(99)}>Privacy Policy</h1>
                    </div>
                </div>
            </div>

        </>
    );
};

export default FooterLandingPage;