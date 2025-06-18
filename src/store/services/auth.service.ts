import httpClient from '../../config/httpClient';

const postAuthLogin = (credentials: { email: string; password: string }) => httpClient.post('/auth/login', credentials);

const postAuthRegister = (credentials: { username: string; email: string; password: string }) =>
    httpClient.post('/auth/register', credentials);

const getMe = () => httpClient.get('/auth/me');

const postAuthLogout = () => httpClient.post('/auth/logout');

const AuthService = {
    postAuthLogin,
    postAuthRegister,
    postAuthLogout,
    getMe
};

export default AuthService;
