import axios, {AxiosError} from 'axios';
import {ErrorResponse, UserSession} from '@/data/api';
import {Platform} from 'react-native';
import {endSession, getUser, startSession} from "@/components/AuthContext";

const port = 5000;
const domain = Platform.OS === 'web' ? 'localhost' : '10.0.2.2';
// TODO: Transition to https for security in production
const baseURL = `http://${domain}:${port}/api`;

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default api;