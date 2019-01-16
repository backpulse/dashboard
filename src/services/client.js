import axios from 'axios';
import {getLanguage} from 'utils';
import {getJWT} from 'utils/token';

const httpClient = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? process.env.REACT_APP_DEV_ENDPOINT : process.env.REACT_APP_PROD_ENDPOINT,
    headers: {
        "Language": getLanguage(),
        "Authorization": getJWT()
    }
});

httpClient.interceptors.response.use((response) => {
    return response;
}, function (error) {
    return Promise.reject(error.response);
});

export default httpClient;