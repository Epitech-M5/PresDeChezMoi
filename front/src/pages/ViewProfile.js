import React, { useState, useEffect } from 'react';
import { getAPI } from '../api';
import { Provider, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const ViewProfile = ({ postId }) => {

    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);

    const navigate = useNavigate();


    useEffect(() => {

        console.log(postId)
        getAPI(`http://${adresseip}:${port}/api/user/${postId}`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setData(response.dataAPI);
                console.log(response.dataAPI)

            })
            .catch((error) => {
                console.log(error);
            });

    }, [])

    return (
        <>
            <div className="container_arrow_backtohome inprofil" onClick={() => navigate('/home')}>
                <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                <h1>Home</h1>
            </div>
            <div className="container_navbar_user">
                <div className="container_user_infos">
                    <div className="left_user_pdp">
                        <div className="container_pdp_user">
                            <img src={`../../media/img/${data.photoProfil}.png`} alt="profil" />
                        </div>
                    </div>
                    <div className="right_name_description">
                        <h1>{data.pseudo}</h1>
                        <p>{data.description}</p>
                        <p id='container_score_view_profile'><span id='score_view_profile'>SCORE : </span> {data.score}<i class="fa-solid fa-carrot"></i></p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default ViewProfile;