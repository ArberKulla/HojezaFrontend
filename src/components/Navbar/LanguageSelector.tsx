import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from "react-icons/hi";
import { useTranslationContext } from '../../contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Language } from '../../contexts/TranslationContext';

export const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const { language, setLanguage } = useTranslationContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'sq', label: 'SQ', flag: '🇦🇱' },
  ];

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

  // Decide whether to drop up or down based on viewport space
  useEffect(() => {
    if (open && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 100; // Approximate dropdown height in px
      if (rect.bottom + dropdownHeight > viewportHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all w-[7em]"
      >
        <span className="mr-2">{languages.find(l => l.code === language)?.flag}</span>
        <span>{language.toUpperCase()}</span>
        <HiChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`absolute right-0 mt-2 w-40 rounded-lg shadow-lg overflow-hidden z-[999] ${dropUp ? 'bottom-full mb-2' : 'top-full mt-2'}`}
            style={{
              background: 'linear-gradient(to bottom, #ffffffee, #ffffff)',
              border: '1px solid #e5e7eb',
            }}
          >
            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.05, staggerDirection: 1 } },
                hidden: { transition: { staggerChildren: 0, staggerDirection: -1 } },
              }}
            >
              {languages.map(lang => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
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
