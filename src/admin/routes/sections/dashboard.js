import React from 'react';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
//import  AuthGuard  from 'admin/auth/guard/auth-guard';
import DashboardLayout from '../../layouts/dashboard/DashboardLayout';
import LoadingScreen from 'admin/components/loading-screen/LoadingScreen';

//User
const UserListPage = lazy(() => import('admin/pages/dashboard/user/list'));

// ORDER
const OrderListPage = lazy(() => import('admin/pages/dashboard/order/list'));
//const OrderDetailsPage = lazy(() => import('admin/pages/dashboard/order/details'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      //<AuthGuard>
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
      //</AuthGuard>
    ),
    children: [
      {
        path: 'user',
        children: [
          { path: 'list', element: <UserListPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          
          { path: 'list', element: <OrderListPage /> },
          
        ],
      },
    ],
  },
];
