import type { FunctionComponent, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateGuardProps {
  children: ReactNode;
}

const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({ children }) => {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PrivateGuard;
