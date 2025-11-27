import { useRoutes } from 'react-router-dom';
import PublicGuard from '../guards/PublicGuard';
import PublicLayout from '../layouts/PublicLayout';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage/RegisterPage';
import HomePage from '../pages/Home/Home';
import ContactPage from '../pages/Contact/Contact';
import Error404Page from '../pages/NotFound/NotFound';


const Router = () =>
  useRoutes([
    {
      path: '/',
      element: (
        <PublicGuard>
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
    },
    {
      path: 'contact',
      element: (
        <PublicGuard>
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        </PublicGuard>
      ),
      index: true,
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
      element: (
        <PublicGuard>
          <PublicLayout>
            <Error404Page />
          </PublicLayout>
        </PublicGuard>
      ),
    },
  ]);

export default Router;