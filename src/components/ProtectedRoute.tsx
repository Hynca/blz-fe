import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'store/slices/authSlice';

type ProtectedRouteProps = {
    children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}
