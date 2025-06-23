import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import { dispatch, store } from './store';
import { useEffect, useState } from 'react';
import { getMe } from 'store/actions/auth.actions';
import CircularProgress from '@mui/material/CircularProgress';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(getMe()).then(() => setIsLoaded(true));
    }, []);

    return (
        <Provider store={store}>
            {isLoaded ? (
                <Router>
                    <AppRoutes />
                </Router>
            ) : (
                <div
                    style={{
                        minHeight: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'white'
                    }}
                >
                    <CircularProgress size={64} thickness={5} />
                </div>
            )}
        </Provider>
    );
}

export default App;
