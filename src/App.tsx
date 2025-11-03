import { ConfigProvider, theme } from 'antd';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './components/Loading/Loading';
import { AuthProvider } from './contexts/AuthContext';
import { StoreProvider } from './contexts/StoreContext';
import { TranslateProvider } from './contexts/TranslateContext';
import Router from './router';
import { persistor, store } from './store/redux';

const themeConfig = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#3d7cef',
  },
};

const reactQueryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <AuthProvider>
            <QueryClientProvider client={reactQueryClient}>
              <TranslateProvider>
                <StoreProvider>
                  <ConfigProvider theme={themeConfig}>
                    <BrowserRouter>
                      <Router />
                    </BrowserRouter>
                  </ConfigProvider>
                </StoreProvider>
              </TranslateProvider>
            </QueryClientProvider>
          </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  );
};

export default App;
