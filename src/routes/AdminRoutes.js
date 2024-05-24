import React from 'react';
import { Route } from 'react-router-dom';
import { AdminAuthRoutes } from '../admin/routes/sections/auth';

const renderRoutes = (routes, parentPath = '') => {
  return routes.map((route, index) => {
    const fullPath = `${parentPath}${route.path}`.replace(/\/+/g, '/'); // 경로 정규화
    return (
      <Route key={index} path={route.path} element={route.element}>
        {route.children ? renderRoutes(route.children, fullPath) : null}
      </Route>
    );
  });
};

const AdminRoutes = () => renderRoutes(AdminAuthRoutes);

export default AdminRoutes;
