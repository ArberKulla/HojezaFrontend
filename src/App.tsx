import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TranslationProvider } from './contexts/TranslationContext';
import Router from './router';
import './App.css';

const App = () => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <TranslationProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </TranslationProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
