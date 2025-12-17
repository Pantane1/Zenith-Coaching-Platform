import React from 'react';
import { User } from '../types';
import { useLocation, Link, useNavigate } from 'react-router-dom'; // Note: Assuming router usage in App.tsx
import * as mockBackend from '../services/mockBackend';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    mockBackend.logoutUser();
    onLogout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
                <span className="text-2xl font-bold text-indigo-600">Zenith</span>
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className={`${location.pathname === '/' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Home
                </Link>
                <Link to="/booking" className={`${location.pathname === '/booking' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Find a Coach
                </Link>
                {user && (
                   <Link to="/dashboard" className={`${location.pathname === '/dashboard' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                   Dashboard
                 </Link>
                )}
                {user?.role === 'ADMIN' && (
                  <Link to="/admin" className={`${location.pathname === '/admin' ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Hi, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-500 hover:text-gray-900"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                  </Link>
                  <Link to="/login" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2024 Zenith Coaching Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;