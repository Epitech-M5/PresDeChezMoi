import React from 'react';
import { useNavigate } from "react-router-dom";

const ButtonLandingPage = (props) => {

    const navigate = useNavigate();

    const handleNavigation = () => {
        window.scrollTo({ top: 0 });
        navigate(props.navigation)
    }

    return (
        <>
            <button className='btn btn1' onClick={handleNavigation}>{props.text}</button>
        </>
    );
};

export default ButtonLandingPage;