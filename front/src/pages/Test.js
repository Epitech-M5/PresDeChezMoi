import { React, useState } from 'react';
import Loader from '../components/Loader.js'
import axios from 'axios';
import MessageQueue, { useMessageQueue } from '../components/MessageQueue.js';

const Test = () => {

    const [data, setData] = useState([]);
    const [success, setSuccess] = useState(false);

    const { addMessage, removeMessage, messages } = useMessageQueue();

    const handleFakeRequest = () => {

        addMessage("It is a long established fact that a reader will be distracted by the readable", "success");

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

    return (
        <>
            <MessageQueue messages={messages} removeMessage={removeMessage} />

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

            </div >
        </>
    );
};

export default Test;