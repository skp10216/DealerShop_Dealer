import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  return (
    <Routes>
      {UserRoutes()}
      {AdminRoutes()}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
