import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksTable } from 'store/actions/tasks.actions';

interface ITask {
    id: number;
    title: string;
    description: string;
    startAt: string;
    endAt: string;
    location: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

interface IPagination {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
}

interface ISort {
    sortBy: string;
    sortOrder: 'ASC' | 'DESC';
}

interface ITasksResponse {
    items: ITask[];
    pagination: IPagination;
    sort: ISort;
}

interface TaskTableState {
    loading: boolean;
    rejected: boolean;
    data?: ITasksResponse;
    tableReload?: number;
}

const initialState: TaskTableState = {
    data: undefined,
    rejected: false,
    loading: false,
    tableReload: 0
};
export const tasksTableSlice = createSlice({
    name: 'tasksTableSlice',
    initialState,
    reducers: {
        resetTaskTable: () => {
            return initialState;
        },
        reloadTaskTable: (state) => {
            state.tableReload = (state.tableReload || 0) + 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTasksTable.pending, (state) => {
                state.loading = true;
                state.rejected = false;
            })
            .addCase(getTasksTable.rejected, (state) => {
                state.loading = false;
                state.rejected = true;
            })
            .addCase(getTasksTable.fulfilled, (state, action: PayloadAction<ITasksResponse>) => {
                state.loading = false;
                state.rejected = false;
                state.data = action.payload;
            });
    }
});

export const { resetTaskTable, reloadTaskTable } = tasksTableSlice.actions;
