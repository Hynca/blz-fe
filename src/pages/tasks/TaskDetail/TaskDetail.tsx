import { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress, Typography, Stack } from '@mui/material';
import { dispatch } from 'store/index';
import { getTask, useGetTask } from 'store/actions/tasks.actions';
import { resetTask } from 'store/slices/taskSlice';
import dayjs from 'dayjs';

interface IAddEditTaskProps {
    isOpen: boolean;
    id: number;
    onClose?: () => void;
}

const TaskDetail = ({ isOpen, id, onClose }: IAddEditTaskProps) => {
    const taskData = useGetTask();

    useEffect(() => {
        dispatch(getTask(id));
        return () => {
            dispatch(resetTask());
        };
    }, [id]);

    const handleClose = () => {
        if (onClose) onClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Task detail</DialogTitle>
            {taskData.loading && id ? (
                <div className="flex justify-center items-center h-64">
                    <CircularProgress />
                </div>
            ) : (
                <DialogContent>
                    <Box component="form" sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }} noValidate>
                        {taskData.data ? (
                            <Stack spacing={2}>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Title:</strong> {taskData.data.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Description:</strong> {taskData.data.description || '-'}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Location:</strong> {taskData.data.location || '-'}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>Start at:</strong> {dayjs(taskData.data.startAt).format('YYYY-MM-DD HH:mm:ss')}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    <strong>End at:</strong> {dayjs(taskData.data.endAt).format('YYYY-MM-DD HH:mm:ss')}
                                </Typography>
                            </Stack>
                        ) : (
                            <Typography>No data found.</Typography>
                        )}
                    </Box>
                </DialogContent>
            )}
            <DialogActions>
                <Button onClick={handleClose}>Back</Button>
            </DialogActions>
        </Dialog>
    );
};

export default TaskDetail;
