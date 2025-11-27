import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useEffect, useMemo, useState } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {

}

const initialState: AuthContextType = {

};

const AuthContext = createContext(initialState);


export { AuthContext };
