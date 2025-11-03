import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode, FunctionComponent } from "react";
import useTranslateService from "../services/TranslateService";

interface TranslateProviderProps {
  children: ReactNode;
}

export interface TranslationsType {
  [key: string]: string;
}

interface TranslateContextType {
  lang: string;
  handleLanguageChange: (selectedLang: string) => Promise<void>;
  _: (key: string) => string;
}

const initialState: TranslateContextType = {
  lang: "",
  handleLanguageChange: async (lang) => {},
  _: (key: string) => key,
};

const TranslateContext = createContext(initialState);

const TranslateProvider: FunctionComponent<TranslateProviderProps> = ({ children }) => {
  const initialLang = (localStorage.getItem("lang") as string) || "en";
  const [lang, setLang] = useState<string>(initialLang);
  const [translations, setTranslations] = useState<TranslationsType>({});

  const { readTranslationFile } = useTranslateService();

  const handleLanguageChange = async (selectedLang: string) => {
    const translations = await readTranslationFile(selectedLang);
    setTranslations(translations);
    localStorage.setItem("lang", selectedLang);
    setLang(selectedLang);
  };

  const handleTranslation = (w: string) => {
    return translations?.[w] ? translations[w] : w;
  };

  useEffect(() => {
    handleLanguageChange(lang).then((r) => {});
  }, []);

  return (
    <TranslateContext.Provider
      value={{
        lang,
        handleLanguageChange,
        _: handleTranslation,
      }}
    >
      {children}
    </TranslateContext.Provider>
  );
};

export { TranslateContext, TranslateProvider };
