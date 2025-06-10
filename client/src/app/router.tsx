import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
  {
  path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
    ],
  }
]);
