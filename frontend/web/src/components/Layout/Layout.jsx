import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    const noNavPaths = ['/login', '/register', '/forgot-password'];

    return (
        <div className="min-h-screen bg-gray-100">
            {!noNavPaths.includes(location.pathname) && (
                <nav className="bg-blue-500 p-4 text-white">
                    <Link to="/">Home</Link>
                    <Link to="/login" className="ml-4">Login</Link>
                    <Link to="/register" className="ml-4">Register</Link>
                </nav>
            )}
            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default Layout;