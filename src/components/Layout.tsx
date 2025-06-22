import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated, selectUser } from 'store/slices/authSlice';
import { useSelector } from 'react-redux';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { postAuthLogout } from 'store/actions/auth.actions';
import { dispatch } from 'store/index';

export function Layout() {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isRegisterPage = location.pathname === '/register';
    const isAuthPage = isLoginPage || isRegisterPage;
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const user = useSelector(selectUser);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(postAuthLogout());
    };

    return (
        <div className="min-h-screen flex flex-col">
            {isAuthenticated && (
                <>
                    <header className="text-black">
                        <div className="w-full py-2 px-4 sm:px-6 flex justify-between items-center sm:pl-[30px]">
                            <Link to="/" className="text-xl sm:text-2xl font-bold">
                                Blaze app
                            </Link>
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-xs sm:text-sm hidden xs:inline">Logged as {user?.username}</span>
                                <button className="sm:hidden p-2" onClick={() => setMobileMenuOpen((v) => !v)} aria-label="Open menu">
                                    {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                                </button>
                                <IconButton aria-label="logout" color="info" onClick={handleLogout}>
                                    <LogoutIcon />
                                </IconButton>
                            </div>
                        </div>
                        {mobileMenuOpen && (
                            <nav className="sm:hidden bg-white border-b border-gray-200 px-4 py-2 z-50">
                                <Link
                                    to="/"
                                    className="flex items-center gap-2 py-2 px-2 rounded hover:bg-gray-100 text-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <FormatListNumberedIcon fontSize="small" />
                                    <span>Tasks</span>
                                </Link>
                            </nav>
                        )}
                    </header>

                    <div className="flex flex-grow min-w-0 flex-col sm:flex-row">
                        <aside className="hidden sm:block w-64 text-black p-4">
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

                        <main className="flex-grow mb-2 w-full overflow-x-auto px-2 sm:px-0">
                            <Outlet />
                        </main>
                    </div>
                </>
            )}

            {(isAuthPage || !isAuthenticated) && (
                <main className="w-full overflow-x-auto px-2 sm:px-0">
                    <Outlet />
                </main>
            )}
        </div>
    );
}
