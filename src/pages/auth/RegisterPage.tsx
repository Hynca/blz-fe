import { useState } from 'react';
import { Button, TextField, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { postAuthRegister } from 'store/actions/auth.actions';
import { dispatch } from 'store/index';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setError('');
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        setError('');
    };

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (!email.trim() || !password.trim() || !username.trim()) {
            setError('Please fill all fields');
            return;
        }

        setIsSubmitting(true);
        setError('');

        const response = await dispatch(postAuthRegister({ username, email, password }));

        if (response.payload?.status > 200 && response.payload?.status <= 300) {
            setIsSubmitting(false);
        }
        if (response.payload?.status === 400 && response.payload?.message === 'User already exists with this email') {
            setError('User already exists with this email');
        } else if (response.payload?.errors?.length > 0) {
            setError(response.payload?.errors.map((err: any) => err.msg).join(', '));
        } else {
            setError('An error occurred during registration. Please try again.');
        }
        setIsSubmitting(false);
    };

    const textfieldStyles = {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#bbbbbb'
            },
            '&:hover fieldset': {
                borderColor: '#888888'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black'
            }
        },
        '& .MuiInputLabel-root.Mui-focused': {
            color: 'black'
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Paper className="bg-white p-8 w-full max-w-md">
                <Typography variant="h4" className="mb-6 text-center">
                    Sign up
                </Typography>

                {error && (
                    <Alert severity="error" className="mb-4 rounded-2xl mt-2">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center gap-4 my-3">
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                        autoFocus
                        size="small"
                        sx={textfieldStyles}
                    />

                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="youremail@domain.com"
                        disabled={isSubmitting}
                        size="small"
                        sx={textfieldStyles}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="******"
                        disabled={isSubmitting}
                        size="small"
                        sx={textfieldStyles}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="medium"
                        disabled={isSubmitting}
                        sx={{ ml: 'auto', bgcolor: 'black', textTransform: 'none', marginTop: '16px' }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : 'Sign Up'}
                    </Button>
                </form>

                <Typography
                    variant="body1"
                    className="text-center text-gray-600"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}
                >
                    Already have an account?{' '}
                    <Button
                        variant="text"
                        sx={{ textTransform: 'none', minWidth: 'auto', p: '0 4px', textDecoration: 'underline', color: 'black' }}
                        onClick={() => navigate('/login')}
                    >
                        Sign in
                    </Button>
                </Typography>
            </Paper>
        </div>
    );
};

export default RegisterPage;
