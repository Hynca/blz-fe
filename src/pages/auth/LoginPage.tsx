import { useState } from 'react';
import { Button, Typography, Alert, CircularProgress, Paper } from '@mui/material';
import { postAuthLogin } from 'store/actions/auth.actions';
import { dispatch } from 'store/index';
import { useNavigate } from 'react-router-dom';
import CustomInput from 'components/inputs/CustomInput';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleLogin = async (e?: React.FormEvent) => {
        if (e) {
            e.preventDefault();
        }

        if (!email.trim() || !password.trim()) {
            setError('Please enter both email and password');
            return;
        }

        setIsSubmitting(true);
        setError('');

        try {
            const response = await dispatch(postAuthLogin({ email, password }));
            if (response.payload?.status === 401) {
                setError(response.payload?.message);
            }
        } catch (err: any) {
            setError('An error occurred during login. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Paper className="bg-white p-8 w-full max-w-md">
                <Typography variant="h4" className="mb-6 text-center">
                    Sign in
                </Typography>

                {error && (
                    <Alert severity="error" className="mb-4 rounded-2xl mt-2">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4 flex flex-col items-center gap-4 my-3">
                    <CustomInput
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="youremail@domain.com"
                        disabled={isSubmitting}
                        autoFocus
                        size="small"
                        autoComplete="username"
                    />

                    <CustomInput
                        label="Password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="******"
                        disabled={isSubmitting}
                        size="small"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="medium"
                        disabled={isSubmitting}
                        sx={{ ml: 'auto', bgcolor: 'black', textTransform: 'none', marginTop: '16px' }}
                    >
                        {isSubmitting ? <CircularProgress size={24} /> : 'Sign In'}
                    </Button>
                </form>

                <Typography
                    variant="body1"
                    className="text-center text-gray-600"
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}
                >
                    Don't have an account?{' '}
                    <Button
                        variant="text"
                        sx={{ textTransform: 'none', minWidth: 'auto', p: '0 4px', textDecoration: 'underline', color: 'black' }}
                        onClick={() => navigate('/register')}
                    >
                        Sign up
                    </Button>
                </Typography>
            </Paper>
        </div>
    );
};

export default LoginPage;
