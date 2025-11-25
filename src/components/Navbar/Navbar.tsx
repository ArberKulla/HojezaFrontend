import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(1026);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header
      className="sticky w-full top-0 z-50 shadow-md"
      style={{
        background: `linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 h-16">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="
            cursor-pointer
            py-4
            text-2xl font-bold text-yellow-600
            transition-transform duration-200
            hover:scale-105
            justify-center
          "
        >
          Hojeza
        </div>

        {/* Navigation Buttons - Hidden on small screens */}
        <nav className="hidden lg:flex space-x-2 h-full">
          {navItems.map((item) => (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className="
                cursor-pointer
                w-28
                flex items-center justify-center
                px-4
                text-sm font-medium
                text-gray-700
                hover:bg-yellow-100/50 hover:text-yellow-600
                transition
              "
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-yellow-600 transition-all duration-300"
          >
            {isOpen ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenuAlt3 className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Right Side Button for large screens */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition min-w-[8em]">
            {t("Contact Us")}
          </button>

          <LanguageSelector />
        </div>
      </div>
      
{/* Mobile Dropdown Div */}
<AnimatePresence>
  {isOpen && isMobile && (
    <motion.div
      ref={dropdownRef}
      initial={{ height: 0 }}
      animate={{ height: "auto" }}
      exit={{ height: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute top-full left-0 w-full"
      style={{
        background: `linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)`,
        zIndex: 40,
      }}
    >
      <motion.div
        className="flex flex-col max-w-7xl mx-auto py-4 px-6 space-y-2 relative"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.05, // enter stagger
              staggerDirection: 1,
            },
          },
          hidden: {
            transition: {
              staggerChildren: 0.03,
              staggerDirection: -1, // ❌ no stagger on exit → instant
            },
          },
        }}
      >
        {navItems.map((item) => (
          <motion.button
            key={item.to}
            onClick={() => {
              navigate(item.to);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-300/50 hover:text-yellow-600 transition rounded"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ duration: 0.05 }} // fast exit
          >
            {item.label}
          </motion.button>
        ))}

        <motion.button
          onClick={() => {
            navigate("/contact");
            setIsOpen(false);
          }}
          className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold transition text-left"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.05 }}
        >
          {t("Contact Us")}
        </motion.button>

        <motion.div
          className="flex justify-end pt-2 pr-4"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.05 }}
        >
          <div className="relative">
            <LanguageSelector />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>





    </header>
  );
};

export default Navbar;
