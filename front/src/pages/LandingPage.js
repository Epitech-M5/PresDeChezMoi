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
            <div className='landing_page'>
                <NavBarLandingPage />
                <div className="title">
                    <div className="main_title">
                        <h1>PresDeChezMoi</h1>
                    </div>
                    <div className="main_title_2">
                        <h3>Le réseau social de ta commune !</h3>
                    </div>
                    <div className="btn_title">
                        <ButtonLandingPage text="C'est parti !" nagifation="/login" />
                    </div>
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
                        <h1>Une communauté auto-géré</h1>
                        <p>Lorem ipsum dolor sit amet. Sed mollitia esse aut natu<br />
                            autem hic exercitationem enim et velit eaque aut aspes<br />
                            natus ut soluta vero. Vel possimus </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                    </div>
                </div>
                <div className="wrapper_explain">
                    <div className="text_explain mytext">
                        <h1>Une communauté auto-géré</h1>
                        <p>Lorem ipsum dolor sit amet. Sed mollitia esse aut natu<br />
                            autem hic exercitationem enim et velit eaque aut aspes<br />
                            natus ut soluta vero. Vel possimus </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
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
                        <h1>Une communauté auto-géré</h1>
                        <p>Lorem ipsum dolor sit amet. Sed mollitia esse aut natu<br />
                            autem hic exercitationem enim et velit eaque aut aspes<br />
                            natus ut soluta vero. Vel possimus </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                        <p><i class="fa-regular fa-circle"></i>Lorem ipsum dolor sit </p>
                    </div>
                </div>
                <div className="before_footer_btn">
                    <div className="btn_footer">
                        <ButtonLandingPage text="C'est parti !" nagifation="/login" />
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
                <FooterLandingPage />
            </div>

        </>
    );
};

export default LandingPage;