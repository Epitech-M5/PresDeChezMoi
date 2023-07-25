import { React, useState, useEffect } from 'react';

const Test = () => {

    const [data, setData] = useState('');

    const handleSub = () => {
        console.log('Testing')
        console.log(data)

        setData('')

    }

    return (
        <div className='center'>
            <input type="text" placeholder='rentrer data' value={data} onChange={(event) => setData(event.target.value)} />
            <button onClick={handleSub}>send</button>
        </div>
    );
};

export default Test;