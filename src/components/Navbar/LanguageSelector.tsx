import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTranslationContext } from '../../contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../../contexts/TranslationContext';

export const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { language, setLanguage } = useTranslationContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'sq', label: 'SQ', flag: '🇦🇱' },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all w-[7em]"
      >
        <span className="mr-2">{languages.find(l => l.code === language)?.flag}</span>
        <span>{language.toUpperCase()}</span>
        <svg
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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

        {/* Dropdown Menu */}
        <AnimatePresence>
        {open && (
            <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-[999]"
            style={{
                background: 'linear-gradient(to bottom, #ffffffee, #ffffff)', // subtle white gradient
                border: '1px solid #e5e7eb', // gray border
            }}
            >
            <motion.div
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                visible: {
                    transition: { staggerChildren: 0.05, staggerDirection: 1 },
                },
                hidden: {
                    transition: { staggerChildren: 0, staggerDirection: -1 },
                },
                }}
            >
                {languages.map(lang => (
                <motion.button
                    key={lang.code}
                    onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                    }}
                    variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-center w-full px-4 py-2 text-left hover:bg-yellow-50 transition-all ${
                    language === lang.code ? 'bg-yellow-100 font-semibold' : ''
                    }`}
                >
                    <span className="mr-2">{lang.flag}</span>
                    <span>{lang.label}</span>
                </motion.button>
                ))}
            </motion.div>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
