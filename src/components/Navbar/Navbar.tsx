import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "/services" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky w-full top-0 z-50 shadow-md"   style={{
        background: `linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)`,
      }}>
      <div className= "max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 h-16">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-yellow-600 py-4 pl-16">Hojeza</h1>

        {/* Navigation Buttons */}
        <nav className="flex space-x-2 h-full">
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
                hover:bg-yellow-300/50 hover:text-yellow-600
                transition
              "
            >
              {item.label}
            </button>

          ))}
        </nav>

        {/* Right Side: Get Started + Language Switcher */}
        <div className="flex items-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition">
            {t("Contact Us")}
          </button>

          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
