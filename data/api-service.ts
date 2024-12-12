import axios, { AxiosError } from 'axios';
import {ErrorResponse} from "@/data/api";

const api = axios.create({
    baseURL: 'https://localhost:7011/api',
    headers: {
        'Content-Type': "application/json",
    },
    withCredentials: true,
});

export default api;