import { useState, useEffect } from 'react';
import axios from 'axios';

export const getAPI = async (url, body, header) => {
    return await fetchData(url, 'GET', body, header);
};


export const postAPI = async (url, body, header) => {
    return await fetchData(url, 'POST', body, header);
};

export const putAPI = async (url, body, header) => {
    return await fetchData(url, 'PUT', body, header);
};

export const deleteAPI = async (url, body, header) => {
    return await fetchData(url, 'DELETE', body, header);
};

async function fetchData(url, method, body, header) {
    var isLoadingAPI = true;
    var dataAPI = null;
    var errorAPI = null;
    try {
        console.log("URL de l'API : ", url); // Ajout de la console de débogage
        const response = await axios({
            method: method,
            url: url,
            data: body,
            headers: header
        });
        dataAPI = response.data;
        console.log("Données de l'API : ", dataAPI); // Ajout de la console de débogage
    } catch (error) {
        errorAPI = error;
        console.error("Erreur lors de l'appel à l'API : ", error); // Ajout de la console de débogage
    } finally {
        isLoadingAPI = false;
        return { "dataAPI": dataAPI, "isLoading": isLoadingAPI, "errorAPI": errorAPI };
    }
}
