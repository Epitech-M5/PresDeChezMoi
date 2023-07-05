import { useState } from 'react';
import axios from 'axios';

const useAxios = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
            setError(error);
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

    return { data, isLoading, error, get, post, put, del };
};

export default useAxios;

/*
import axios from 'axios';

export default function useAxiosApi() {


    function axiosGet(url, header, body) {
        axios
            .get(url, body, { header })
            .then((response) => {
                return response.data, true
            })
            .catch((error) => {
                return error, true
            })
    }

    function axiosPost(url, header, body) {
        axios
            .post(url, body, { header })
            .then((response) => {
                return response.data, true
            })
            .catch((error) => {
                return error, true
            })
    }


    function axiosPut(url, header, body) {
        axios
            .put(url, body, { header })
            .then((response) => {
                return response.data, true
            })
            .catch((error) => {
                return error, true
            })
    }

    function axiosDelete(url, header, body) {
        axios
            .delete(url, body, { header })
            .then((response) => {
                return response.data, true
            })
            .catch((error) => {
                return error, true
            })
    }


    return { axiosGet, axiosPost, axiosPut, axiosDelete }
}

*/

/*

import axios from 'axios';


export function axiosGet(url, header, body) {
    axios
        .get(url, body, { header })
        .then((response) => {
            return response.data, true
        })
        .catch((error) => {
            return error, true
        })
}

export function axiosPost(url, header, body) {
    axios
        .post(url, body, { header })
        .then((response) => {
            return response.data, true
        })
        .catch((error) => {
            return error, true
        })
}


export function axiosPut(url, header, body) {
    axios
        .put(url, body, { header })
        .then((response) => {
            return response.data, true
        })
        .catch((error) => {
            return error, true
        })
}

export function axiosDelete(url, header, body) {
    axios
        .delete(url, body, { header })
        .then((response) => {
            return response.data, true
        })
        .catch((error) => {
            return error, true
        })
}


// const axios = require('axios');

// const url = 'https://api.example.com/data';
// const headers = {
//   'Authorization': 'Bearer YourAuthToken',
//   'Content-Type': 'application/json'
// };
// const requestBody = {
//   // Your request body data here
//   'param1': 'value1',
//   'param2': 'value2'
// };

// axios.post(url, requestBody, { headers })
//   .then(response => {
//     // Handle the response
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Handle the error
//     console.error(error);
//   });
// In this example, we're making a POST request to the URL https://api.example.com/data with headers and a request body. The requestBody object contains the data that you want to send in the request body. You can modify the headers and requestBody objects to match your specific requirements.

// If you need to make a different type of request (e.g., GET, PUT, DELETE), you can use the corresponding method (axios.get, axios.put, axios.delete) and pass the headers and body in a similar way.

// Make sure to adjust the code according to your specific use case, including the URL, headers, and request body.


*/