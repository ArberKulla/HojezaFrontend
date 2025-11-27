import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { useSmartNavigate } from '../../hooks/useSmartNavigate';
import { services } from '../../constants/services';

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery(1026);
  const { t } = useTranslation();
  const { smartNavigate } = useSmartNavigate();
  const [openNavbar, setOpenNavbar] = useState(false);
  const navbarDropdownRef = useRef<HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuDropdownRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "#", dropdown: true, list: services },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navbarDropdownRef.current &&
        !navbarDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenNavbar(false);
        setOpenDropdown(null);
      }

      if (openDropdown && !isMobile) {
        const dropdownEl = menuDropdownRefs.current[openDropdown];
        if (dropdownEl && !dropdownEl.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openNavbar, openDropdown]);

  return (
    <header
      ref={navbarDropdownRef}
      className="sticky w-full top-0 z-50 shadow-md"
      style={{
        background: `linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 h-16">
        
        {/* Logo */}
        <div
          onClick={() => smartNavigate("/")}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-2 h-full">
          {navItems.map((item) => {
            if (item.dropdown) {
              const isDropdownOpen = openDropdown === item.label;
              return (
                <div
                  key={item.label}
                  className="h-full flex items-center relative cursor-pointer"
                  ref={(el) => (menuDropdownRefs.current[item.label] = el)}
                >
                  <button
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === item.label ? null : item.label
                      )
                    }
                    className="h-full flex items-center w-28 justify-center px-4 text-sm font-medium text-gray-700 hover:bg-yellow-100/50 hover:text-yellow-600 transition cursor-pointer"
                  >
                    {item.label}
                    <HiChevronDown
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-sm shadow-xl z-50 border border-yellow-100"
                      >
                        <motion.div
                          className="flex flex-col max-w-7xl mx-auto space-y-1 relative"
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.04,
                                staggerDirection: 1,
                              },
                            },
                            hidden: {
                              transition: {
                                staggerChildren: 0.03,
                                staggerDirection: -1,
                              },
                            },
                          }}
                        >
                          {item.list?.map((s) => (
                            <motion.button
                              key={s.nav}
                              onClick={() => {
                                smartNavigate(s.nav);
                                setOpenDropdown(null);
                              }}
                              className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-all duration-200"
                              variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1 },
                              }}
                              transition={{ duration: 0.05 }}
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {t(s.titleKey)}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <button
                key={item.to}
                onClick={() => smartNavigate(item.to)}
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
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setOpenNavbar(!openNavbar)}
            className="p-2 text-yellow-600 transition-all duration-300"
          >
            {openNavbar ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenuAlt3 className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition min-w-[8em]">
            {t("Contact Us")}
          </button>
          <LanguageSelector />
        </div>
      </div>

      {/* ██████████████████████
          MOBILE DROPDOWN MENU
         ██████████████████████ */}
      <AnimatePresence>
        {openNavbar && isMobile && (
          <motion.div
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
              className="flex flex-col max-w-7xl mx-auto py-4 space-y-2 relative max-h-[100vh] overflow-y-auto"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.055,
                    staggerDirection: 1,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.01,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {navItems.map((item) => {
                const isMobileOpen = openDropdown === item.label;

                // MOBILE DROPDOWN ITEM (Services)
                if (item.dropdown) {
                  return (
                    <motion.div 
                      key={item.label} className="w-full"
                      ref={(el) => (menuDropdownRefs.current[item.label] = el)}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    transition={{ duration: 0.05 }}
                    >
                      <motion.button
                        onClick={() => {
                          setOpenDropdown((prev) =>
                            prev === item.label ? null : item.label
                          )
                          }
                        }
                        className="w-full flex justify-between items-center px-6 py-3 
                                   text-gray-700
                                   hover:bg-yellow-300/50 hover:text-yellow-700  transition-all"
                        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                        transition={{ duration: 0.05 }}
                      >
                        {item.label}
                        <HiChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            isMobileOpen ? "rotate-180" : ""
                          }`}
                        />
                      </motion.button>

                      <AnimatePresence>
                        {isMobileOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="pl-6 mt-1 space-y-1 bg-yellow-50/70 border-l-4 border-yellow-300"
                          >
                            {item.list?.map((s) => (
                              <motion.button
                                key={s.nav}
                                onClick={() => {
                                  smartNavigate(s.nav);
                                  setOpenNavbar(false);
                                  setOpenDropdown(null);
                                }}
                                className="w-full text-left px-3 py-2.5 
                                           text-gray-700 
                                           hover:bg-yellow-50 hover:text-yellow-700 
                                           transition-all"
                                whileHover={{ x: 4 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                {t(s.titleKey)}
                              </motion.button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                }

                // NORMAL MOBILE NAV ITEM
                return (
                  <motion.button
                    key={item.to}
                    onClick={() => {
                      smartNavigate(item.to);
                      setOpenNavbar(false);
                    }}
                    className="w-full text-left px-6 py-3 text-gray-700 
                               hover:bg-yellow-300/50 hover:text-yellow-700 
                               transition"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0.05 }}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              {/* Language Selector */}
              <motion.div
                className="flex justify-between pt-5 px-6"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                transition={{ duration: 0.02 }}
              >
                {/* Contact Button */}
                <motion.button
                  onClick={() => {
                    smartNavigate("/contact");
                    setOpenNavbar(false);
                  }}
                  className="max-w-[8em] lg:w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold"
                >
                  {t("Contact Us")}
                </motion.button>

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
