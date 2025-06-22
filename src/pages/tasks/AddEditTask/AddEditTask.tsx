import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, CircularProgress } from '@mui/material';
import { dispatch } from 'store/index';
import { getTask, postNewTask, putEditTask, useGetTask } from 'store/actions/tasks.actions';
import { useForm } from 'react-hook-form';
import { resetTask } from 'store/slices/taskSlice';
import { reloadTaskTable } from 'store/slices/tasksTableSlice';

interface IAddEditTaskProps {
    isOpen: boolean;
    id: number | undefined;
    onClose?: () => void;
}

interface ITaskForm {
    title: string;
    description: string;
    location: string;
    startAt: string;
    endAt: string;
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
                    <Box component="form" sx={{ pt: 2 }} noValidate>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Title"
                            type="text"
                            fullWidth
                            variant="outlined"
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            InputLabelProps={{ shrink: true }}
                            {...register('title', { required: 'Title is required' })}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            {...register('description')}
                        />
                        <TextField
                            margin="dense"
                            id="location"
                            label="Location"
                            type="text"
                            fullWidth
                            variant="outlined"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.location}
                            helperText={errors.location?.message}
                            {...register('location')}
                        />
                        <div className="flex flex-row items-center gap-2">
                            <TextField
                                margin="dense"
                                id="startAt"
                                label="Start Date"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.startAt}
                                helperText={errors.startAt?.message}
                                {...register('startAt', { required: 'Start date is required' })}
                            />
                            <TextField
                                margin="dense"
                                id="endAt"
                                label="End Date"
                                type="date"
                                fullWidth
                                variant="outlined"
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.endAt}
                                helperText={errors.endAt?.message}
                                {...register('endAt', { required: 'End date is required' })}
                            />
                        </div>
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
