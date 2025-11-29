import React, { useState, useRef, useEffect } from 'react';
import { HiChevronDown } from "react-icons/hi";
import { useTranslationContext } from '../../contexts/TranslationContext';
import { createPortal } from 'react-dom';
import styles from './Navbar.module.css';
import { Language } from '../../contexts/TranslationContext';
import en from "../../assets/en.webp";
import sq from "../../assets/sq.webp";


interface LanguageSelectorProps {
  langRef: React.RefObject<HTMLDivElement>;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ langRef }) => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const { language, setLanguage } = useTranslationContext();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const verticalOffset = 4;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'EN', flag: en },
    { code: 'sq', label: 'SQ', flag: sq },
  ];

  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number; width: number }>({ top: 0, left: 0, width: 0 });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutsideLanguage = (event: MouseEvent) => {
      if (!langRef!.current?.contains(event.target as Node)
        && !buttonRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutsideLanguage);
    return () => document.removeEventListener('mousedown', handleClickOutsideLanguage);
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
        top: shouldDropUp ? rect.top - dropdownHeight - verticalOffset : rect.bottom + verticalOffset,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [open, languages.length]);

  useEffect(() => {
    const handleResize = () => setOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dropdown = (
    <div
      ref={langRef}
      id='langDropdown'
      className={`${styles.langDropdown} ${open ? styles.langOpen : ''} ${dropUp ? styles.langDropUp : ''}`}
      style={{
        top: dropdownPos.top,
        left: dropdownPos.left,
        width: dropdownPos.width,
      }}
    >
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => {
            setLanguage(lang.code);
            setOpen(false);
          }}
          className={`${styles.langDropdownItem} ${language === lang.code ? styles.langActive : ''}`}
        >
        <img
          src={lang.flag}
          alt={lang.label + ' flag'}
          className="w-6 h-6 mr-2 rounded-full object-cover"
        />
        <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="inline-flex justify-between items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition-all w-[7em]"
      >
        <span className="mr-2"><img src={languages.find(l => l.code === language)?.flag} alt={language + ' flag'}  className="w-6 h-6 mr-2 rounded-full object-cover" /></span>
        <span>{language.toUpperCase()}</span>
        <HiChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {createPortal(dropdown, document.body)}
    </>
  );
};

export default LanguageSelector;
