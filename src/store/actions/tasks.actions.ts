import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import TaskService, { ICreateTask, ITaskTableQuery } from 'store/services/tasks.service';
import { RootState } from '..';

export const getTasksTable = createAsyncThunk('getTasksTable', async (query: ITaskTableQuery) => {
    const response = await TaskService.getTasksTable(query);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const getTask = createAsyncThunk('getTask', async (id: number) => {
    const response = await TaskService.getTask(id);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const postNewTask = createAsyncThunk('postNewTask', async (query: ICreateTask) => {
    const response = await TaskService.postNewTask(query);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const putEditTask = createAsyncThunk('putEditTask', async ({ id, query }: { id: number; query: ICreateTask }) => {
    const response = await TaskService.putEditTask(id, query);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const deleteTask = createAsyncThunk('deleteTask', async (id: number) => {
    const response = await TaskService.deleteTask(id);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const useGetTaskTable = () => useSelector((state: RootState) => state?.taskTable);
export const useGetTask = () => useSelector((state: RootState) => state?.task);
