import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';
import { User } from '../types/user';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isAuthenticated: boolean;

  authenticateUser: (user: Partial<User>) => void;
  unAuthenticateUser: () => void;
  updateUser: () => void;
}

const initialState: AuthContextType = {
  isAuthenticated: false,

  authenticateUser: () => {},
  unAuthenticateUser: () => {},
  updateUser: () => {},
};

const AuthContext = createContext(initialState);

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = useMemo<boolean>(() => Boolean(user), [user]);

  const authenticateUser = (user: Partial<User>) => {
    //
  };

  const unAuthenticateUser = () => {
    setUser(null);
  };

  const updateUser = () => {};

  useEffect(() => {
    updateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...initialState,
        isAuthenticated,
        authenticateUser,
        unAuthenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
