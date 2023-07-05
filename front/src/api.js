import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios() {

    const [dataAPI, setData] = useState(null);
    const [isLoadingAPI, setIsLoading] = useState(false);
    const [errorAPI, setError] = useState(null);

    useEffect(() => {
        console.log('DATA:', dataAPI);
    }, [dataAPI]);

    useEffect(() => {
        console.log('LOADING:', isLoadingAPI);
    }, [isLoadingAPI]);

    useEffect(() => {
        console.log('ERROR:', errorAPI);
    }, [errorAPI]);

    const fetchData = async (url, method, body = null) => {
        setIsLoading(true);
        try {
            const response = await axios({
                method,
                url,
                data: body,
            });
            setData(response.data);
            console.log('DATA IN FETCH : ' + response.data)
        } catch (error) {
            setError(error);
            console.log('ERROR IN FETCH : ' + error)
        } finally {
            setIsLoading(false);
        }
    };

    const get = async (url) => {
        await fetchData(url, 'GET');
    };

    const post = async (url, body) => {
        await fetchData(url, 'POST', body);
    };

    const put = async (url, body) => {
        await fetchData(url, 'PUT', body);
    };

    const del = async (url) => {
        await fetchData(url, 'DELETE');
    };


    return { dataAPI, isLoadingAPI, errorAPI, get, post, put, del };
}