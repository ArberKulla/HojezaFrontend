import { createContext, ReactNode, useState } from 'react';

interface StoreProviderProps {
  children: ReactNode;
}

interface StoreContextType {
  userStore: object;
  setUserStore: (userStore: object) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const initialState: StoreContextType = {
  userStore: {},
  setUserStore: (userStore) => {},
  loading: false,
  setLoading: (loading) => {},
};

const StoreContext = createContext(initialState);

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [userStore, setUserStore] = useState<object>({});
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <StoreContext.Provider
      value={{
        ...initialState,
        userStore,
        setUserStore,
        loading,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
