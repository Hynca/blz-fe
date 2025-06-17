import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated } from 'store/slices/authSlice';
import { useSelector } from 'react-redux';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

export function Layout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isAuthenticated = useSelector(selectIsAuthenticated);
    return (
        <div className="min-h-screen flex flex-col">
            {isAuthenticated && (
                <>
                    <header className="text-black">
                        <div className="w-full py-2 px-6 flex justify-between items-center pl-[260px]">
                            <Link to="/" className="text-2xl font-bold">
                                Blaze app
                            </Link>
                            <div className="flex items-center gap-4">
                                <span className="text-sm">Welcome, Admin</span>
                            </div>
                        </div>
                    </header>

                    <div className="flex flex-grow">
                        <aside className="w-64  text-black p-4">
                            <nav className="flex flex-col space-y-4">
                                <Link
                                    to="/"
                                    className="hover:text-blue-200 text-lg transition-colors py-2 px-4 rounded hover:bg-gray-700 flex items-center gap-2"
                                >
                                    <FormatListNumberedIcon fontSize="small" />

                                    <span>Tasks</span>
                                </Link>
                            </nav>
                        </aside>

                        <main className="flex-grow mb-2">
                            <Outlet />
                        </main>
                    </div>
                </>
            )}

            {/* Full width main content for login page or when not authenticated */}
            {(isLoginPage || !isAuthenticated) && (
                <main className="flex-grow">
                    <Outlet />
                </main>
            )}
        </div>
    );
}
