import { React, useEffect, useState } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from "./../api"
import { Provider, useSelector } from "react-redux";
import Loader from "./../components/Loader";
import DropDownBtn from '../components/MainComponent/DropDownBtn';

const Home = () => {

    const [mapData, setMapData] = useState([]);
    const user = useSelector((state) => state.utilisateur)
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {

        getAPI("http://127.0.0.1:8081/api/annonce/", {}, { "x-access-token": user.token })
            .then(response => {

                setTimeout(() => {
                    console.log(JSON.stringify(response.dataAPI))
                    setMapData(response.dataAPI);
                    setLoading(false);
                }, 2000);

            }).catch(error => {
                console.log("error", error);
                setLoading(false);
            })

    }, [mapData])

    const reversedData = [...mapData].reverse();

    const handleCheckboxChange = (item) => {
        setSelectedValue(item);
    };

    useEffect(() => {

    }, [selectedValue])

    return (
        <>
            <div className="container_bye"></div>
            <section className="main_container_home">
                <section className='container_1_home'>

                </section>

                <section className='container_2_home'>
                    <div className="spacing">
                        <DropDownBtn text="Filtre annonce" items={['Vente', 'Evénement', 'Poste à pourvoir', 'Promotion', 'Simple post', 'Tout']} onCheckboxChange={handleCheckboxChange} />
                    </div>
                    {loading ? (
                        <div className="container_2_home_loader">
                            <Loader />
                        </div>
                    ) : (
                        <ul>
                            {reversedData.map((item) => (
                                <div key={item.id} className="container_annonce">
                                    <div className="container_pdp">
                                        <div className="container_left_pdp">
                                            <img src="media/img/1.png" alt="profil" />
                                            <div className="other_container_pdp">
                                                <h1>@UserName</h1>
                                                <h4>@lieu • {item.createdAt}</h4>
                                            </div>
                                        </div>
                                        <div className="container_right_pdp">
                                            <a href=""><i className="fa-solid fa-ellipsis-vertical fa-rotate-90"></i></a>
                                        </div>
                                    </div>
                                    <div className="container_content_post">

                                        <p>{item.titre}</p>
                                        <div className="toCenter_post">
                                            <img src={item.img} />
                                        </div>

                                    </div>
                                    <div className="container_bottom_post">
                                        <a href=""><i className="fa-regular fa-heart"></i></a>
                                        <a href=""><i className="fa-regular fa-comment"></i></a>
                                        <a href=""><i className="fa-solid fa-share"></i></a>
                                        <a href=""><i className="fa-regular fa-bookmark"></i></a>
                                    </div>
                                </div>
                            ))}
                        </ul>
                    )}
                </section>

                <section className='container_3_home'>
                    <div className="pub1">
                        <h1>PUB ou autre...</h1>
                    </div>
                    <div className="pub2">
                        <h1>PUB</h1>
                    </div>
                    <div className="pub3">
                        <h1>PUB</h1>
                    </div>
                    <div className="pub2">
                        <h1>PUB</h1>
                    </div>
                    <div className="pub3">
                        <h1>PUB</h1>
                    </div>
                    <div className="pub2">
                        <h1>PUB</h1>
                    </div>
                    <div className="pub3">
                        <h1>PUB</h1>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Home;