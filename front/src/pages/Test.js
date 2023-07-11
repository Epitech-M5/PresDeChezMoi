import { React, useEffect } from 'react';
import useAxios from '../api';

const Test = () => {


    const { dataAPI, isLoadingAPI, errorAPI, get, post, put, del } = useAxios();

    const handleRRR = () => {

        const rrrr = get("http://127.0.0.1:8081/api/status/")

        console.log("data : " + rrrr, isLoadingAPI, errorAPI, dataAPI)
    }

    return (
        <div className='center'>

            <button onClick={handleRRR}>request</button>

        </div>
    );
};

export default Test;