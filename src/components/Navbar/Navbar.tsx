import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { useSmartNavigate } from "../../hooks/useSmartNavigate";
import { services } from "../../constants/services";

import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery(1026);
  const { t } = useTranslation();
  const { smartNavigate } = useSmartNavigate();

  const [openNavbar, setOpenNavbar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navbarRef = useRef<HTMLElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Services", to: "#", dropdown: true, list: services },
    { label: "About", to: "/about"},
    { label: "Contact", to: "/contact" },
  ];

  useEffect(() => {
    const handleClickOutsideNavbar = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        navbarRef.current &&
        !navbarRef.current.contains(target) &&
        !langDropdownRef.current?.contains(target)
      ) {
        setOpenNavbar(false);
        setOpenDropdown(null);
      }

      if (openDropdown && !isMobile) {
        const dropdownEl = dropdownRefs.current[openDropdown];
        if (dropdownEl && !dropdownEl.contains(target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutsideNavbar);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideNavbar);
    };
  }, [openDropdown, isMobile]);


  const handleDropdownClick = (label: string) => {
    if (openDropdown && openDropdown !== label) {
      // Close old first
      setOpenDropdown(null);

      // Wait for animation to finish (match CSS transition, e.g., 300ms)
      setTimeout(() => setOpenDropdown(label), 300);
    } else {
      // Toggle current dropdown
      setOpenDropdown((prev) => (prev === label ? null : label));
    }
  };

  return (
    <header
      ref={navbarRef}
      className="fixed w-full top-0 z-50 shadow-md"
      style={{
        background:
          "linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8 h-16">

        {/* Logo */}
        <div
          onClick={() => smartNavigate("/")}
          className="cursor-pointer py-4 text-2xl font-bold text-yellow-600 hover:scale-105 transition-transform"
        >
          Hojeza
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex space-x-2 h-full">
          {navItems.map((item) => {
            if (item.dropdown) {
              const isOpen = openDropdown === item.label;

              return (
                <div
                  key={item.label}
                  className="h-full flex items-center relative cursor-pointer"
                  ref={(el) => (dropdownRefs.current[item.label] = el)}
                >
                  <button
                    onClick={() =>handleDropdownClick(item.label)}
                    className="h-full flex items-center w-28 justify-center px-4 
                               text-sm font-medium text-gray-700
                               hover:bg-yellow-100/50 hover:text-yellow-600
                               transition"
                  >
                    {item.label}
                    <HiChevronDown
                      className={`ml-2 h-4 w-4 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* PURE CSS DROPDOWN */}
                  <div
                    className={`${styles.desktopDropdown} ${
                      isOpen ? styles.open : ""
                    } w-[14em]`}
                  >
                    <div className={styles.desktopDropdownInner}>
                      {item.list?.map((s) => (
                    <button
                      key={s.nav}
                      onClick={() => {
                        smartNavigate(s.nav);
                        setOpenDropdown(null);
                      }}
                      className="dropdownItem w-full text-left px-4 py-2.5 text-gray-700 
                                hover:bg-yellow-100 hover:text-yellow-600 transition-colors hover:-translate-y-0.5"
                    >
                          {t(s.titleKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={item.to}
                onClick={() => smartNavigate(item.to)}
                className="cursor-pointer w-28 flex items-center justify-center px-4 
                           text-sm font-medium text-gray-700
                           hover:bg-yellow-100/50 hover:text-yellow-600
                           transition"
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* MOBILE HAMBURGER */}
        <div className="lg:hidden">
          <button
            onClick={() => setOpenNavbar(!openNavbar)}
            className="p-2 text-yellow-600"
          >
            {openNavbar ? (
              <HiX className="w-8 h-8" />
            ) : (
              <HiMenuAlt3 className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* DESKTOP RIGHT BUTTONS */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition min-w-[8em]">
            {t("Contact Us")}
          </button>
          <LanguageSelector 
            langRef={useRef<HTMLDivElement>(null)}
          />
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobile && (
        <div
          className={`${styles.desktopDropdown} ${
                       openNavbar ? styles.open : ""
                    } w-full mt-[-1em]`}
          style={{
            background:
              "linear-gradient(to right, #ffffffff 60%, #fcd34d 90%, #deab2bff 100%)",
            zIndex: 40,
          }}
        >
          <div className="flex flex-col max-w-7xl mx-auto py-4 space-y-2 max-h-[100vh] overflow-y-auto">
            {navItems.map((item) => {
              const isOpen = openDropdown === item.label;

              if (item.dropdown) {
                return (
                  <div
                    key={item.label}
                    className="w-full"
                    ref={(el) => (dropdownRefs.current[item.label] = el)}
                  >
                    <button
                      onClick={() => handleDropdownClick(item.label)}
                      className="w-full flex justify-between items-center px-6 py-3 
                                text-gray-700 hover:bg-yellow-300/50 hover:text-yellow-700
                                transition-all duration-200 ease-out"
                    >
                      {item.label}
                      <HiChevronDown
                        className={`h-5 w-5 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* CSS MOBILE DROPDOWN */}
                    <div
                      className={`${styles.mobileDropdown} ${
                        isOpen ? styles.open : ""
                      } bg-yellow-50/70`}
                    >
                      {item.list?.map((s) => (
                        <button
                          key={s.nav}
                          onClick={() => {
                            smartNavigate(s.nav);
                            setOpenNavbar(false);
                            setOpenDropdown(null);
                          }}
                          className="
                            w-full text-left px-3 py-2.5 pl-8 text-gray-700

                            /* Hover effects */
                            hover:bg-yellow-50 
                            hover:text-yellow-700
                            hover:-translate-y-0.5   /* lift up on hover */

                            /* Click effect */
                            active:translate-y-0      
                            active:scale-95

                            /* Smooth animation */
                            transition-all duration-200 ease-out
                          "
                        >
                          {t(s.titleKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.to}
                  onClick={() => {
                    smartNavigate(item.to);
                    setOpenNavbar(false);
                  }}
                  className="
                    w-full text-left px-6 py-3 text-gray-700

                    /* Hover effects */
                    hover:bg-yellow-50 
                    hover:text-yellow-700
                    hover:-translate-y-0.5

                    /* Click effect */
                    active:translate-y-0
                    active:scale-95

                    /* Smooth animation */
                    transition-all duration-200 ease-out
                  "
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Footer */}
            <div className="flex justify-between pt-5 px-6">
              <button
                onClick={() => {
                  smartNavigate("/contact");
                  setOpenNavbar(false);
                }}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-lg font-bold transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-95"
              >
                {t("Contact Us")}
              </button>
              <LanguageSelector 
                langRef={langDropdownRef}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
