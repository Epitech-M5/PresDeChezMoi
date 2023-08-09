import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { getAPI } from '../../api';
const adresseip = process.env.REACT_APP_BACKEND_ADRESSEIP
const port = process.env.REACT_APP_BACKEND_PORT

const ResearchBar = () => {

    // <h1 id='hover_name_user' onClick={() => navigate(`/home/view-profile/${item.organisateur}`)

    const navigate = useNavigate();
    const [dictionnaire, setDictionnaireUser] = useState({});
    const [data, setData] = useState([]);
    const user = useSelector((state) => state.utilisateur);
    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState([]);
    const [nameEnter, setNameEnter] = useState("");

    useEffect(() => {
        getAPI(`http://${adresseip}:${port}/api/user/`, {}, { 'x-access-token': user.token })
            .then((response) => {

                setData(response.dataAPI);

                var dictionnaire = {}
                for (const element of response.dataAPI) {
                    dictionnaire[element.id] = element.pseudo;
                };
                setDictionnaireUser(dictionnaire);

            })
            .catch((error) => {
                console.log('error', error);
                setLoading(false);
            });
    }, []);

    const handleFilter = (event) => {

        const searchUser = event.target.value;
        setNameEnter(searchUser);
        const newFilter = data.filter((value) => {
            return value.pseudo.toLowerCase().includes(searchUser.toLowerCase());
        })

        if (searchUser === "") {
            setFilter([]);
        }
        else {
            setFilter(newFilter);
        }
    }

    const handleClear = () => {
        setFilter([]);
        setNameEnter("");
    }

    return (
        <>
            <div className="toHideFeed">
                <div className="container_rebar">
                    <input type="text" placeholder='Rechercher un utilisateur' value={nameEnter} onChange={handleFilter} />
                    {filter.length === 0 ? <i className='fa fa-search'></i> : <i className="fa-solid fa-xmark" onClick={handleClear}></i>}
                </div>
                {filter.length != 0 && (
                    <div className="data_search_result">
                        {filter.map((item) => (
                            <h1 key={item.id} onClick={() => navigate(`/home/view-profile/${item.id}`)}>{item.pseudo}</h1>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ResearchBar;