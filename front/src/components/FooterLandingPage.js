import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

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
                    <i className="fa-brands fa-facebook" onClick={() => window.open("https://www.facebook.com/profile.php?id=100094532983584", "_blank")}></i>
                    <i className="fa-brands fa-twitter" onClick={() => window.open("https://twitter.com/PresDeChezMoi", "_blank")}></i>
                    <i className="fa-brands fa-youtube" onClick={() => window.open("https://www.youtube.com/@PresDeChezMoi", "_blank")}></i>
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
                        <h1 id='m5_team' onClick={() => handleNavigate(2)}>@M5 Team</h1>
                        <h1 onClick={() => window.open("https://policies.google.com/terms?hl=en-US", "_blank")}>Terms of Services</h1>
                        <h1 onClick={() => window.open("https://policies.google.com/privacy?hl=en-US", "_blank")}>Privacy Policy</h1>
                    </div>
                </div>
            </div >

        </>
    );
};

export default FooterLandingPage;