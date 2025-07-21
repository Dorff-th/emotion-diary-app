// src/routes/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth } from '@/features/auth/context/AuthContext';

interface Props {
  children: ReactNode
}

const PrivateRoute = ({ children }: Props) => {
  // const token = localStorage.getItem('token');
  
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
