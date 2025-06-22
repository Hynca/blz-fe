import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/app-layout/ProtectedRoute';
import { Layout } from './components/app-layout/Layout';
import Tasks from './pages/tasks/Tasks';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'store/slices/authSlice';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';

const AppRoutes = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
                <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Tasks />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="*"
                    element={
                        <ProtectedRoute>
                            <Navigate to="/" replace />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
