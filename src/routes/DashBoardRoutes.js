import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { dashboardRoutes } from '../admin/routes/sections/dashboard';

const renderRoutes = (routes, parentPath = '') => {
  return routes.map((route, index) => {
    const fullPath = `${parentPath}/${route.path}`.replace(/\/+/g, '/'); // 경로 정규화
    console.log('Rendering route:', fullPath, route);
    return (
      <Route key={index} path={fullPath} element={route.element}>
        {route.children ? renderRoutes(route.children, fullPath) : null}
      </Route>
    );
  });
};

const DashboardRoutes = () => (
  <Routes>
    {renderRoutes(dashboardRoutes)}
  </Routes>
);

export default DashboardRoutes;
