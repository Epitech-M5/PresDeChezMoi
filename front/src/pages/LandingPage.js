import { React, useEffect, useRef, useState } from 'react';
import NavBarLandingPage from '../components/NavBarLandingPage';
import ButtonLandingPage from '../components/ButtonLandingPage';
import FooterLandingPage from '../components/FooterLandingPage';


const LandingPage = () => {

    const observerRef = useRef(null);


    useEffect(() => {

        const handleIntersection = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active')
                }
            });
        };

        observerRef.current = new IntersectionObserver(handleIntersection);

        return () => {
            observerRef.current.disconnect();
        };

    }, []);

    useEffect(() => {

        const elements = document.querySelectorAll('.mytext');
        elements.forEach((element) => {
            observerRef.current.observe(element);
        });

    }, []);

    return (
        <>
            <div className="container_for_fix_title">
                <div className="title_landingpage">
                    <div className="main_title">
                        <h1>PresDeChezMoi</h1>
                    </div>
                    <div className="main_title_2">
                        <h3>Le réseau social de ta commune !</h3>
                    </div>
                    <div className="btn_title">
                        <ButtonLandingPage text="C'est parti !" navigation="/login" />
                    </div>
                </div>
            </div>
            <div className="container_explain">
                <div className="title_explain">
                    <h1 className='mytext'>Nous vous <span id='offer'>offrons</span> un moyen simple <br />pour
                        dynamiser efficacement <span id='me'>votre</span> commune</h1>
                    <div className="title_explain_hr">
                        <hr />
                    </div>
                </div>
                <div className="wrapper_explain">
                    <div className="logo_explain">
                        <img src="media/img/onphone.png" alt="onphone" />
                    </div>
                    <div className="text_explain mytext">
                        <h1>Renforcer la communauté locale ensemble</h1>
                        <p>"PrèsDeChezMoi" est un réseau social pour la Commune, favorisant l'entraide et le développement local. Il promeut les services locaux, soutient les petites entreprises et renforce les liens entre les habitants et leur environnement local</p>
                        <p><i class="fa-regular fa-circle"></i>Entraide et développement local</p>
                        <p><i class="fa-regular fa-circle"></i>Services et commerces locaux</p>
                        <p><i class="fa-regular fa-circle"></i>Renforcement des liens</p>
                    </div>
                </div>
                <div className="wrapper_explain reverse">
                    <div className="text_explain mytext">
                        <h1>Soutien aux commerces et services locaux</h1>
                        <p>L'application met en avant les commerces de proximité et facilite l'accès aux services municipaux et aux événements communautaires</p>
                        <p><i class="fa-regular fa-circle"></i>Commerces de proximité valorisés</p>
                        <p><i class="fa-regular fa-circle"></i>Accès aux services municipaux</p>
                        <p><i class="fa-regular fa-circle"></i>Événements communautaires promus</p>
                    </div>
                    <div className="logo_explain">
                        <img src="media/img/market.png" alt="onphone" />
                    </div>
                </div>
                <div className="wrapper_explain">
                    <div className="logo_explain">
                        <img src="media/img/rocket.png" alt="onphone" />
                    </div>
                    <div className="text_explain mytext">
                        <h1>Liens forts entre habitants et environnement</h1>
                        <p>Elle crée une communauté en favorisant les échanges d'informations et les collaborations entre les résidents, renforçant le sentiment d'appartenance à la Commune</p>
                        <p><i class="fa-regular fa-circle"></i>Communauté solidaire créée</p>
                        <p><i class="fa-regular fa-circle"></i>Échanges et collaborations résidents</p>
                        <p><i class="fa-regular fa-circle"></i>Appartenance communautaire renforcée</p>
                    </div>
                </div>
                <div className="before_footer_btn">
                    <div className="btn_footer">
                        <ButtonLandingPage text="C'est parti !" navigation="/login" />
                    </div>
                    <div className="main_area">
                        <div className="circles">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default LandingPage;