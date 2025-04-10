
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/login/LoginForm';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-love">
        <div className="animate-pulse p-6 rounded-full">
          <div className="w-16 h-16 border-4 border-love-purple border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <LoginForm />;
};

export default Login;
