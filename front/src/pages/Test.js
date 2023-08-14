import React, { useEffect, useState } from 'react';
import { getAPI, putAPI } from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const Test = () => {

    const [mdp1, setMdp1] = useState('');

    const handleSubmit = () => {
        alert('data send gg')
        setMdp1('')
    }

    return (
        <>
            <div className="center">
                <input type="text" value={mdp1} placeholder='mdp 1' onChange={(e) => setMdp1(e.target.value)} />
                <p>{mdp1}</p>
                <input type="button" value='submit' onClick={handleSubmit} />
            </div>
        </>
    );
};

export default Test;