import React from 'react';
import NavBarLandingPage from '../components/NavBarLandingPage';
import ButtonLandingPage from '../components/ButtonLandingPage';

const LandingPage = () => {
    return (
        <>


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
        </>
    );
};

export default LandingPage;