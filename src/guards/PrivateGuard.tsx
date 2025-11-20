import type { FunctionComponent, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface PrivateGuardProps {
  children: ReactNode;
}

const PrivateGuard: FunctionComponent<PrivateGuardProps> = ({ children }) => {
  const location = useLocation();

  return <>{children}</>;
};

export default PrivateGuard;
