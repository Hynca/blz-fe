import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from 'store/services/auth.service';
import { login, logout } from 'store/slices/authSlice';
import { dispatch } from '..';

export const postAuthLogin = createAsyncThunk('postAuthLogin', async ({ email, password }: { email: string; password: string }) => {
    const response = await AuthService.postAuthLogin({ email, password });

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    dispatch(
        login({
            username: response.data.username,
            email: response.data.email
        })
    );
});

export const postAuthRegister = createAsyncThunk(
    'postAuthRegister',
    async ({ username, email, password }: { username: string; email: string; password: string }) => {
        const response = await AuthService.postAuthRegister({ username, email, password });

        if (response.status < 200 || response.status >= 300) {
            // errMsg(response);
            return response.data;
        }
    }
);

export const postAuthLogout = createAsyncThunk('postAuthLogout', async () => {
    const response = await AuthService.postAuthLogout();

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    dispatch(logout());
});

export const getMe = createAsyncThunk('getMe', async () => {
    const response = await AuthService.getMe();

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    dispatch(login({ email: response.data.email, username: response.data.username }));
});
