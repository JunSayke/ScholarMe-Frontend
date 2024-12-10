import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7011/api',
    headers: {
        'Content-Type': "application/json",
    },
    withCredentials: true,
});

export default api;

