import axios from 'axios'

export const API_URL = "http://18.212.62.20:3005"

const $api = axios.create({
    baseURL: API_URL
})

$api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    });

export default $api