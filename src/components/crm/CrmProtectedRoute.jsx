import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function CrmProtectedRoute({ children }) {
  const location = useLocation();
  const isAuthenticated = sessionStorage.getItem('crm_authenticated') === 'true';

  if (!isAuthenticated) {
    // Redirect them to the /crm/login page, but save the current location they were trying to go to
    return <Navigate to="/crm/login" state={{ from: location }} replace />;
  }

  return children;
}
