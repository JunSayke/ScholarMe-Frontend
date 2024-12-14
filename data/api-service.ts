import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {ErrorResponse, UserSession} from '@/data/api';
import {getItem, setItem, removeItem} from '@/lib/storage/storage';
import {refreshToken as refreshTokenApi} from '@/data/api-routes';
import { Platform } from 'react-native';

const baseURL = Platform.OS === 'web' ? 'http://localhost:5000/api' : 'http://10.0.2.2:5000/api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default api;

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
        const wwwAuthenticateHeader = error.response?.headers['www-authenticate'];

        if (error.response?.status === 401 && wwwAuthenticateHeader?.includes('Bearer error="invalid_token"') && wwwAuthenticateHeader?.includes('error_description="The token expired') && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({resolve, reject});
                })
                    .then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        }
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const storedSession = await getItem('user_session');
            const session = storedSession ? JSON.parse(storedSession) : null;

            if (session && session.refreshToken) {
                try {
                    const {data} = await refreshTokenApi(session.refreshToken);
                    await setItem('user_session', JSON.stringify(data));
                    api.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                    if (originalRequest.headers) {
                        originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;
                    }
                    processQueue(null, data.accessToken);
                    return axios(originalRequest);
                } catch (err) {
                    processQueue(err, null);
                    await removeItem('user_session');
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error);
    }
);

export const handleAxiosError = (error: AxiosError): ErrorResponse | null => {
    if (error.response && error.response.data) {
        const data = error.response.data as ErrorResponse;
        if (data.title && data.status && data.detail && data.instance) {
            return data;
        }
    }
    return null;
};