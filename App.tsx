import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/Booking';
import Admin from './pages/Admin';
import { User } from './types';
import * as mockBackend from './services/mockBackend';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on load
    const currentUser = mockBackend.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          
          <Route 
            path="/booking" 
            element={<BookingPage user={user} />} 
          />
          
          <Route 
            path="/admin" 
            element={user && user.role === 'ADMIN' ? <Admin user={user} /> : <Navigate to="/" />} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;