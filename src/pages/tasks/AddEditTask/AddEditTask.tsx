import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';

interface IAddEditTaskProps {
    isOpen: boolean;
    id: number | undefined;
    onClose?: () => void;
}

const AddEditTask = ({ isOpen, id, onClose }: IAddEditTaskProps) => {
    const [firstName, setFirstName] = useState('');

    const handleClose = () => {
        if (onClose) onClose();
    };

    const handleSubmit = () => {
        // Handle submission logic here
        console.log('Submitted first name:', firstName);
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>{id ? 'Edit User' : 'Add New User'}</DialogTitle>
            <DialogContent>
                <Box sx={{ pt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddEditTask;
