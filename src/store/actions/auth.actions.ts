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
            username: response.data.user.username,
            email: response.data.user.email
        })
    );
});

export const postAuthRegister = createAsyncThunk(
    'postAuthRegister',
    async (data: { username: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await AuthService.postAuthRegister(data);
            dispatch(
                login({
                    username: response.data.user.username,
                    email: response.data.user.email
                })
            );
            return response.data;
        } catch (err: any) {
            if (err.response && err.response.data) {
                return rejectWithValue({
                    message: err.response.data.message,
                    status: err.response.status,
                    errors: err.response.data.errors || []
                });
            }
            return rejectWithValue({ message: err.message, status: 500 });
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
