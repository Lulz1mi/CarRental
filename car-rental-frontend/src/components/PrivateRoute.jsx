import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, onlyAdmin = false }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (onlyAdmin && (!user || user.role !== 'admin')) {
    return <Navigate to="/homepage" replace />;
  }

  return children;
};

export default PrivateRoute;
