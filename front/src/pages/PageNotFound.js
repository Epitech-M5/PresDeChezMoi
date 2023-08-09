import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = (props) => {

    const navigate = useNavigate();

    const [backgroundX, setBackgroundX] = useState('0px');
    const [backgroundY, setBackgroundY] = useState('0px');

    const handleMoveBackground = (event) => {

        setBackgroundX(event.clientX / 5);
        setBackgroundY(event.clientY / 5);

        //  console.log(backgroundX, backgroundY);
    }

    return (
        <>
            <div className="container_404">
                <div className="content_pagenotfound" onMouseMove={handleMoveBackground} style={{ backgroundPositionX: backgroundX, backgroundPositionY: backgroundY }}>
                    <div className="wrapper_404">
                        <h2>404</h2>
                        <h4>Oups! La page n'a pas été trouvé</h4>
                        <p>La page que vous cherchiez n'existe pas. Vous avez peut-être mal tapé l'adresse ou la page peut avoir été déplacé</p>
                        <button onClick={() => { navigate(props.navigation) }}>Retourner à l'acceuil</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageNotFound;