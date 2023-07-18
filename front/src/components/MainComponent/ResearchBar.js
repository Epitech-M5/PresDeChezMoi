import React from 'react';

const ResearchBar = () => {
    return (
        <>
            <div className="container_rebar">
                <input type="text" placeholder='Rechercher dans @Home' />
                <i className='fa fa-search'></i>
            </div>
        </>
    );
};

export default ResearchBar;