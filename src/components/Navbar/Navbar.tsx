import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from '../../hooks/useMediaQuery';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(1026);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

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
            py-4 pl-16
            text-2xl font-bold text-yellow-600
            transition-transform duration-200
            hover:scale-105
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
            className="px-4 py-2 text-yellow-600 font-bold"
          >
            {isOpen ? "✕" : "☰"}
          </button>
          <LanguageSelector />
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
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 w-full overflow-hidden"
            style={{
              background: `linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)`,
              zIndex: 40,
            }}
          >
            <div className="flex flex-col max-w-7xl mx-auto py-4 px-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.to}
                  onClick={() => {
                    navigate(item.to);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-300/50 hover:text-yellow-600 transition rounded"
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => {
                  navigate("/contact");
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold transition text-left"
              >
                {t("Contact Us")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;
