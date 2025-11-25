import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../contexts/TranslationContext';

export const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useTranslationContext();

  return (
    <div className="relative inline-block text-left">
        <button
            onClick={() => setOpen(!open)}
            className="inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition w-[7em]"
        >
            <span className="mr-2">{language === "en" ? "🇺🇸" : "🇦🇱"}</span>
            <span>{language === "en" ? "EN" : "AL"}</span>
            <svg
            className="ml-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            >
            <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
            />
            </svg>
        </button>

        {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-[999]">
            <button
                onClick={() => {
                setLanguage("en");
                setOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 hover:bg-yellow-50 transition ${
                language === "en" ? "bg-yellow-100 font-semibold" : ""
                }`}
            >
                <span className="mr-2">🇺🇸</span>
                <span>EN</span>
            </button>
            <button
                onClick={() => {
                setLanguage("sq");
                setOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 hover:bg-yellow-50 transition ${
                language === "sq" ? "bg-yellow-100 font-semibold" : ""
                }`}
            >
                <span className="mr-2">🇦🇱</span>
                <span>AL</span>
            </button>
            </div>
        )}
    </div>
  );
};

export default LanguageSelector;
