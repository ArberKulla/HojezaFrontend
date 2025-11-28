import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from "react-icons/hi";
import { useTranslationContext } from '../../contexts/TranslationContext';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { Language } from '../../contexts/TranslationContext';

export const LanguageSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const { language, setLanguage } = useTranslationContext();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: '🇺🇸' },
    { code: 'sq', label: 'SQ', flag: '🇦🇱' },
  ];

  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!buttonRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Calculate dropdown position and drop-up or drop-down
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = languages.length * 40; // approx per item height
      const shouldDropUp = rect.bottom + dropdownHeight > viewportHeight;
      setDropUp(shouldDropUp);
      setDropdownPos({
        top: shouldDropUp ? rect.top - dropdownHeight : rect.bottom,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open, languages.length]);

  const dropdown = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="rounded-lg shadow-lg overflow-hidden z-[999] absolute"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            background: 'linear-gradient(to bottom, #ffffffee, #ffffff)',
            border: '1px solid #e5e7eb',
            transformOrigin: dropUp ? 'bottom' : 'top', // <-- KEY for correct drop-up animation
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
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all w-[7em]"
      >
        <span className="mr-2">{languages.find(l => l.code === language)?.flag}</span>
        <span>{language.toUpperCase()}</span>
        <HiChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {createPortal(dropdown, document.body)}
    </>
  );
};

export default LanguageSelector;
