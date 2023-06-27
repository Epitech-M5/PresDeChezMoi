import { React, useEffect, useState } from 'react';
import Loader from '../components/Loader.js'
import axios from 'axios';
import Notifications from '../components/Notifications.js';

const Test = () => {

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [list, setList] = useState();

    const handleFakeRequest = () => {

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

    }

    /*
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
    */
    return (
        <>
            <div className="abs_test_container">
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
                <Notifications type='1' text='ddddddd d dddd ddd' />
                <Notifications type='2' text='ddddddd d dddd ddd' />
                <button onClick={handleFakeRequest}>Request</button>

            </div>
        </>
    );
};

export default Test;