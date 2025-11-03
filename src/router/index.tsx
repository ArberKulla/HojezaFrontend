import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import PrivateGuard from '../guards/PrivateGuard';
import PublicGuard from '../guards/PublicGuard';
import PrivateLayout from '../layouts/PrivateLayout';
import PublicLayout from '../layouts/PublicLayout';
import Loadable from './Loadable';

const Router = () =>
  useRoutes([
    {
      path: '/',
      element: (
        <PublicGuard>
          <PublicLayout>
            <DashboardPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: 'dashboard',
      element: (
        <PrivateGuard>
          <PrivateLayout>
            <DashboardPage />
          </PrivateLayout>
        </PrivateGuard>
      ),
    },
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <PublicGuard>
              <PublicLayout>
                <LoginPage />
              </PublicLayout>
            </PublicGuard>
          ),
          index: true,
        },
        {
          path: 'register',
          element: (
            <PublicGuard>
              <PublicLayout>
                <RegisterPage />
              </PublicLayout>
            </PublicGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      children: [
        {
          path: '404',
          element: <Error404Page />,
        },
      ],
    },
  ]);

export default Router;

// Guest routes
const LoginPage = Loadable(lazy(() => import('../pages/Auth/LoginPage/LoginPage')));
const RegisterPage = Loadable(lazy(() => import('../pages/Auth/RegisterPage/RegisterPage')));

// Auth routes
const DashboardPage = Loadable(lazy(() => import('../pages/Dashboard/Dashboard')));

// Error routes
const Error404Page = Loadable(lazy(() => import('../pages/NotFound/NotFound')));
