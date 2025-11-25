// src/context/TranslationContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import i18n from '../i18n';

export type Language = 'en' | 'sq';

interface TranslationContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextProps | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const preferredLanguage = (localStorage.getItem('i18nextLng') as Language) || 'en';
  const [language, setLanguageState] = useState<Language>(preferredLanguage);

  const setLanguage = (lang: Language) => {
    localStorage.setItem('i18nextLng', lang);
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to access the TranslationContext
export const useTranslationContext = (): TranslationContextProps => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslationContext must be used within a TranslationProvider');
  }
  return context;
};
