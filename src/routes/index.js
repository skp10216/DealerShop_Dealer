import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import UserRoutes from './UserRoutes';
import DashboardRoutes from './DashBoardRoutes';

const AppRoutes = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('Current location:', location.pathname);
  }, [location]);

  return (
    <Routes>
      {UserRoutes()}
      {AdminRoutes()}
      <Route path="/admin/*" element={<DashboardRoutes />} />
      
    </Routes>
  );
};

export default AppRoutes;
