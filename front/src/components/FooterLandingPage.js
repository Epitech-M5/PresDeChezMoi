import React from 'react';

const FooterLandingPage = () => {
    return (
        <>
            <div className="container_footer">
                <ul className='links_footer'>
                    <li><a href='#'>Accueil</a></li>
                    <li><a href='#'>Equipes</a></li>
                    <li><a href='#'>Contact</a></li>
                </ul>
                <div className="social">
                    <i class="fa-brands fa-facebook"></i>
                    <i class="fa-brands fa-twitter"></i>
                    <i class="fa-brands fa-youtube"></i>
                </div>
                <div className="line_footer">
                    <hr />
                </div>
                <div className="end_footer">
                    <div className='logo_nav'>
                        <div>
                            <img src='media/img/carotte.png' alt='logo' />
                        </div>
                        <a href='#' id='footer_title'>PresDeChezMoi</a>
                    </div>
                    <div className="end_footer_right">
                        <h1>@M5 Team</h1>
                        <h1>Terms of Services</h1>
                        <h1>Privacy Policy</h1>
                    </div>
                </div>
            </div>

        </>
    );
};

export default FooterLandingPage;