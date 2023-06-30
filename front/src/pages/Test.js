import { React, useEffect, useState } from 'react';
import Loader from '../components/Loader.js'
import axios from 'axios';
import Notifications from '../components/Notifications.js';

const Test = () => {

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);
    const [list, setList] = useState([]);

    const handleFakeRequest = () => {

        axios
            .get('https://my-json-server.typicode.com/typicode/demo/db')
            .then((response) => {
                setData([response.data]);
                setSuccess(true);

                setList(list => [...list, <Notifications type='1' text='dddddd d dddd ddd' />]);
                // setList(list => [...list.keys(), <Notifications type='1' text='dddddd d dddd ddd' />]);
                // setList([<Notifications type='1' text='dddddd d dddd ddd' />]);

                console.log(list);

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

                <button onClick={handleFakeRequest}>Request</button>

                <div className="container_notif_btn">
                    <button onClick={() => setList(list => [...list, <Notifications type='1' text='dddddd d dddd ddd' />])}>success</button>
                    <button onClick={() => setList(list => [...list, <Notifications type='2' text='dddddd d dddd ddd' />])}>info</button>
                    <button onClick={() => setList(list => [...list, <Notifications type='3' text='dddddd d dddd ddd' />])}>warning</button>
                    <button onClick={() => setList(list => [...list, <Notifications type='4' text='dddddd d dddd ddd' />])}>danger</button>
                </div>
                <ul className='notifications'>

                    {list}

                </ul>

            </div>
        </>
    );
};

export default Test;