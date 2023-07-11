import { React, useEffect } from 'react';
import useAxios from '../api';
import { getAPI, postAPI, putAPI, deleteAPI } from '../api';


const Test = () => {

    // useEffect(() => {
    //     get("http://127.0.0.1:8081/api/status/")
    // }, []);

    // const { dataAPI, isLoadingAPI, errorAPI, get, post, put, del } = useAxios();

    const handleRRR = () => {
        // console.log(dataAPI, isLoadingAPI, errorAPI)
        const url = 'http://127.0.0.1:8081/api/status/2'; // Remplacez par l'URL de l'API que vous souhaitez interroger

        getAPI(url, null, null).then((response) => {
            console.log('Réponse de l\'API :', response);
            // Faites quelque chose avec la réponse de l'API ici
        }).catch((error) => {
            console.error('Erreur lors de l\'appel à l\'API :', error);
        });
        // const rrrr = get("http://127.0.0.1:8081/api/status/")

        // console.log("data : " + rrrr)
        // , isLoadingAPI, errorAPI, dataAPI)
    }

    return (
        <div className='center'>

            <button onClick={handleRRR}>request</button>

        </div>
    );
};

export default Test;