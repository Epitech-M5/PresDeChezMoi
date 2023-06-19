import React from 'react';
import ButtonLandingPage from '../components/ButtonLandingPage';

const Test = () => {

    return (
        <>
            <h1>test page</h1>
            <div className="test2">
                <ButtonLandingPage text="C'est parti !" navigation='/login' />
            </div>

        </>
    );
};

export default Test;