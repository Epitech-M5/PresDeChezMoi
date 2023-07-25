import { React, useEffect, useState } from 'react';
import { getAPI, postAPI, putAPI, deleteAPI } from "./../api"
import { Provider, useSelector } from "react-redux";

const Home = () => {

    const [mapData, setMapData] = useState([]);
    const user = useSelector((state) => state.utilisateur)

    useEffect(() => {
        getAPI("http://127.0.0.1:8082/api/annonce/", {}, { "x-access-token": user.token })
            .then(response => {
                console.log('response : ' + JSON.stringify(response))
                setMapData(response.data)
            }).catch(error => {
                console.log("error", error);
            })

        console.log(mapData)
    }, [])

    return (
        <>
            <section className="main_container_home">
                <section className='container_1_home'>

                </section>

                <section className='container_2_home'>
                    <div>

                    </div>
                </section>

                <section className='container_3_home'>

                </section>
            </section>
        </>
    );
};

export default Home;