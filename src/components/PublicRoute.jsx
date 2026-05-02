import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const PublicRoute = ({ children }) => {
  const { isAuth } = useAuth();
  
  if (isAuth) {
    return <Navigate to="/home" replace />;
  }
  
  return children;
};
