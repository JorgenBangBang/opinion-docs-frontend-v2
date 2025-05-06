import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

// Pages
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import DocumentView from './pages/DocumentView';
import DocumentUpload from './pages/DocumentUpload';
import SearchFilter from './pages/SearchFilter';
import Administration from './pages/Administration';
import RevisionHistory from './pages/RevisionHistory';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';

// Services
import { getCurrentUser } from './services/api';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
/*
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} 
      />
      
      <Route 
        path="/" 
        element={isAuthenticated ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
      >
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="documents">
          <Route index element={<SearchFilter />} />
          <Route path="view/:id" element={<DocumentView />} />
          <Route path="upload" element={<DocumentUpload />} />
          <Route path="revisions/:id" element={<RevisionHistory />} />
        </Route>
        <Route 
          path="admin" 
          element={
            user && (user.role === 'admin' || user.role === 'it_ansvarlig') 
              ? <Administration /> 
              : <Navigate to="/dashboard" />
          } 
        />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
