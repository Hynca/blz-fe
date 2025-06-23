import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress } from '@mui/material';
import { dispatch } from 'store/index';
import { getTask, postNewTask, putEditTask, useGetTask } from 'store/actions/tasks.actions';
import { useForm } from 'react-hook-form';
import { resetTask } from 'store/slices/taskSlice';
import { reloadTaskTable } from 'store/slices/tasksTableSlice';
import CustomInput from 'components/inputs/CustomInput';
import { ITaskForm } from 'src/types/task-types';

interface IAddEditTaskProps {
    isOpen: boolean;
    id: number | undefined;
    onClose?: () => void;
}

const AddEditTask = ({ isOpen, id, onClose }: IAddEditTaskProps) => {
    const taskData = useGetTask();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty }
    } = useForm<ITaskForm>({
        defaultValues: {
            title: '',
            description: '',
            location: '',
            startAt: '',
            endAt: ''
        }
    });

    useEffect(() => {
        if (id) dispatch(getTask(id));
        return () => {
            dispatch(resetTask());
        };
    }, [id]);

    useEffect(() => {
        if (taskData.data && id) {
            reset({
                title: taskData.data.title || '',
                description: taskData.data.description || '',
                location: taskData.data.location || '',
                startAt: taskData.data.startAt ? taskData.data.startAt.split('T')[0] : '',
                endAt: taskData.data.endAt ? taskData.data.endAt.split('T')[0] : ''
            });
        }
    }, [taskData.data, reset, id]);

    const handleClose = () => {
        if (onClose) onClose();
        reset();
    };

    const onSubmit = async (data: ITaskForm) => {
        if (id) {
            await dispatch(putEditTask({ id: id, query: data }));
        } else {
            await dispatch(postNewTask(data));
        }
        dispatch(reloadTaskTable());
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{id ? 'Edit Task' : 'Add New Task'}</DialogTitle>
            {taskData.loading && id ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <DialogContent>
                    <Box component="form" sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }} noValidate>
                        <CustomInput
                            autoFocus
                            label="Title"
                            type="text"
                            error={!!errors.title}
                            helperText={errors.title ? errors.title.message : ''}
                            {...register('title', {
                                required: 'Title is required',
                                maxLength: { value: 40, message: 'Max 40 characters' }
                            })}
                        />
                        <CustomInput
                            label="Description"
                            type="text"
                            error={!!errors.description}
                            helperText={errors.description ? errors.description.message : ''}
                            multiline
                            rows={3}
                            {...register('description')}
                        />
                        <CustomInput
                            label="Location"
                            type="text"
                            error={!!errors.location}
                            helperText={errors.location ? errors.location.message : ''}
                            {...register('location', {
                                maxLength: { value: 40, message: 'Max 40 characters' }
                            })}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                            <CustomInput
                                label="Start Date"
                                type="date"
                                error={!!errors.startAt}
                                helperText={errors.startAt ? errors.startAt.message : ''}
                                {...register('startAt', { required: 'Start date is required' })}
                            />
                            <CustomInput
                                label="End Date"
                                type="date"
                                error={!!errors.endAt}
                                helperText={errors.endAt ? errors.endAt.message : ''}
                                {...register('endAt', { required: 'End date is required' })}
                            />
                        </Box>
                    </Box>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" disabled={!isDirty || taskData.loading}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditTask;
