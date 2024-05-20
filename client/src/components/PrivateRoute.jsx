import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    console.log('authToken in PrivateRoute:', authToken);
    console.log('Current location:', location.pathname);
  }, [authToken, location.pathname]);

  if (!authToken) {
    console.log('No authToken, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;