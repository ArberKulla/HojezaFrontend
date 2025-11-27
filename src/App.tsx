import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { TranslationProvider } from './contexts/TranslationContext';
import Router from './router';
import './App.css';

const App = () => {
  return (
    <HelmetProvider>
      <TranslationProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </TranslationProvider>
    </HelmetProvider>
  );
};

export default App;
