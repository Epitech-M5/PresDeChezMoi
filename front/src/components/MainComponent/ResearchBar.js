import React from 'react';

const ResearchBar = () => {
    return (
        <>
            <div className="toHideFeed">
                <div className="container_rebar">
                    <input type="text" placeholder='Rechercher dans @Home' />
                    <i className='fa fa-search'></i>
                </div>
            </div>
        </>
    );
};

export default ResearchBar;