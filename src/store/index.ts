import { configureStore } from '@reduxjs/toolkit';

// Import reducers here
import authReducer from './slices/authSlice';
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux';
import { tasksTableSlice } from './slices/tasksTableSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        taskTable: tasksTableSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
