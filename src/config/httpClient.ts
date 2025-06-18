// filepath: c:\Projekty\blz\fe\src\config\httpClient.ts
/**
 * HTTP client configuration
 * Sets up global configuration for axios
 */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from './env';
import { dispatch } from '../store';
import { logout } from '../store/slices/authSlice';

// Extended request config interface with _retry property
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
    _isRefreshRequest?: boolean;
}

// Create a custom axios instance with default configuration
const httpClient = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Create a separate axios instance for refresh requests without interceptors
const refreshClient = axios.create({
    baseURL: env.apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Flag to prevent multiple refresh token requests
let isRefreshing = false;
// Queue of failed requests to retry after token refresh
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: any;
}> = [];

// Process the queue of failed requests
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

// Request interceptor for API calls
httpClient.interceptors.request.use(
    (config) => {
        // You can add additional configuration here, like authentication tokens
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as ExtendedAxiosRequestConfig;

        // If error is 401 Unauthorized and not a refresh token request
        if (error.response?.status === 401 && !originalRequest._isRefreshRequest) {
            // If we haven't tried to refresh the token yet
            if (originalRequest && !originalRequest._retry) {
                if (isRefreshing) {
                    // If token refresh is already in progress, add request to queue
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalRequest });
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Call refresh token endpoint using direct client to avoid interceptors
                    console.log('Attempting to refresh token');
                    await refreshClient.post('/auth/refresh');
                    console.log('Token refresh completed successfully');

                    // Process any requests that were queued during the refresh
                    processQueue();

                    // Retry the original request
                    return httpClient(originalRequest);
                } catch (refreshError: any) {
                    // If refresh token fails, log out the user
                    console.log('Refresh token request failed:', refreshError.message);

                    // Log the user out
                    dispatch(logout());

                    // Process queue with error
                    processQueue(refreshError);
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            } else {
                // If we already tried to refresh the token and still got 401,
                // log the user out
                dispatch(logout());
            }
        }

        // For any other errors, just reject the promise
        return Promise.reject(error);
    }
);

export default httpClient;
