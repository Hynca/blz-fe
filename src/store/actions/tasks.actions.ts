import { createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import TaskService, { ITaskTableQuery } from 'store/services/tasks.service';
import { RootState } from '..';

export const getTasksTable = createAsyncThunk('getTasksTable', async (query: ITaskTableQuery) => {
    const response = await TaskService.getTasksTable(query);

    if (response.status < 200 || response.status >= 300) {
        // errMsg(response);
        return response.data;
    }
    return response.data;
});

export const useGetTaskTable = () => useSelector((state: RootState) => state?.taskTable);
