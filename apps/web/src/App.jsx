import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { Toaster } from './components/ui/toaster';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginSignupPage from './pages/LoginSignupPage.jsx';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginSignupPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;