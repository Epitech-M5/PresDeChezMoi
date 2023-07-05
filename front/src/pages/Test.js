import React from 'react';
import useAxios from '../api';

const Test = () => {

    const { data, isLoading, error, get, post, put, del } = useAxios();

    const fetchData = () => {
        get('https://api.example.com/data');
    };

    const addData = () => {
        const newData = { name: 'New Item' };
        post('https://api.example.com/data', newData);
    };

    const updateData = () => {
        const updatedData = { id: 1, name: 'Updated Item' };
        put('https://api.example.com/data/1', updatedData);
    };

    const deleteData = () => {
        del('https://api.example.com/data/1');
    };

    return (
        <>
            <div>
                <button onClick={fetchData}>Fetch Data</button>
                <button onClick={addData}>Add Data</button>
                <button onClick={updateData}>Update Data</button>
                <button onClick={deleteData}>Delete Data</button>

                {data && (
                    <ul>
                        {data.map((item) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Test;