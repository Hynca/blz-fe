import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux';
import { dispatch, store } from './store';
import { useEffect, useState } from 'react';
import { getMe } from 'store/actions/auth.actions';

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
                <>Loading ...</>
            )}
        </Provider>
    );
}

export default App;
