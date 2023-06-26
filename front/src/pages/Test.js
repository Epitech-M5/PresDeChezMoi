import { React, useEffect, useState } from 'react';
import Loader from '../components/Loader.js'
import axios from 'axios';

const Test = () => {

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        axios
            .get('https://my-json-server.typicode.com/typicode/demo/db')
            .then((response) => {
                setData([response.data]);
                setSuccess(true);
            })
            .catch((error) => {
                console.log("error " + error);
                setSuccess(false);
            })
    })

    return (
        <>
            {
                success ? (
                    data.map((fake_data) => (
                        <div key={fake_data.posts[0].id} className='testdiv'>
                            <p>{fake_data.posts[0].title}</p>
                        </div>
                    ))
                ) : (
                    <div className='testdiv'>
                        <Loader />
                    </div>
                )
            }
        </>
    );
};

export default Test;