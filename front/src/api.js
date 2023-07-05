import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAxios() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorApi, setErrorApi] = useState(null);

    const fetchData = async (url, method, body = null) => {
        setIsLoading(true);
        try {
            const response = await axios({
                method,
                url,
                data: body,
            });
            setData(response.data);
        } catch (error) {
            setErrorApi(error);
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

    useEffect(() => {
        console.log('ERROR IN API FILE 2 : ' + errorApi);
    }, [errorApi]);

    return { data, isLoading, errorApi, get, post, put, del };
}