/**
 * HTTP client configuration
 * Sets up global configuration for axios
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from './env';
import { dispatch } from '../store';
import { logout } from '../store/slices/authSlice';

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _isRefreshRequest?: boolean;
}

const httpClient = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

const refreshClient = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: any;
}> = [];

const processQueue = (error: any = null) => {
    failedQueue.forEach(({ resolve, reject, config }) => {
        if (error) {
            reject(error);
        } else {
            resolve(httpClient(config));
        }
    });
    failedQueue = [];
};

httpClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        if (originalRequest.url?.includes('/auth/login') || originalRequest.url?.includes('/auth/register')) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._isRefreshRequest) {
            if (originalRequest && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalRequest });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    await refreshClient.post('/auth/refresh');

                    processQueue();

                    return httpClient(originalRequest);
                } catch (refreshError: any) {
                    console.log('Refresh token request failed:', refreshError.message);

                    dispatch(logout());

                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                dispatch(logout());
            }
        }

        return Promise.reject(error);
    }
);

export default httpClient;
