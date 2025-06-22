import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITask } from 'src/types/task-types';
import { getTask } from 'store/actions/tasks.actions';

interface TaskState {
    loading: boolean;
    rejected: boolean;
    data?: ITask;
}

const initialState: TaskState = {
    data: undefined,
    rejected: false,
    loading: false
};
export const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        resetTask: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTask.pending, (state) => {
                state.loading = true;
                state.rejected = false;
            })
            .addCase(getTask.rejected, (state) => {
                state.loading = false;
                state.rejected = true;
            })
            .addCase(getTask.fulfilled, (state, action: PayloadAction<ITask>) => {
                state.loading = false;
                state.rejected = false;
                state.data = action.payload;
            });
    }
});

export const { resetTask } = taskSlice.actions;
