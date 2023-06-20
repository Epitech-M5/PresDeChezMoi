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

            </div>
            <div className="line_footer">
                <hr />
            </div>
        </>
    );
};

export default FooterLandingPage;