import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navLinks = [
    { label: t("Home"), to: "/" },
    { label: t("Services"), to: "/services" },
    { label: t("Portfolio"), to: "/portfolio" },
    { label: t("About"), to: "/about" },
    { label: t("Contact"), to: "/contact" },
  ];

  return (
<footer className="bg-gradient-to-t from-yellow-600 to-yellow-500 text-yellow-50 pt-12 pb-6 mt-16">
  <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Column 1: Brand / About */}
    <div>
      <h2 className="text-2xl font-bold text-white mb-3">Hojza</h2>
      <p className="text-yellow-50/80 text-sm leading-relaxed max-w-xs">
        {t("We build modern, scalable, and user-friendly digital solutions that help your business grow and stand out.")}
      </p>
    </div>

    {/* Column 2: Navigation */}
    <div>
    <h3 className="text-lg font-semibold text-white mb-3">{t("Navigation")}</h3>
    <ul className="space-y-2 text-sm">
        {navLinks.map((item) => (
        <li
            key={item.to}
            className="cursor-pointer text-yellow-50 hover:text-yellow-200 transition-colors duration-300"
            onClick={() => navigate(item.to)}
        >
            {item.label}
        </li>
        ))}
    </ul>
    </div>

    {/* Column 3: Contact + Socials */}
    <div>
    <h3 className="text-lg font-semibold text-white mb-3">{t("Contact")}</h3>

    <ul className="space-y-2 text-sm mb-4">
        <li className="flex items-center space-x-2">
        <MailOutlined className="text-white" />
        <a
            href="mailto:contact@hojza.com"
            className="text-yellow-50 hover:text-yellow-200 transition-colors duration-300"
        >
            contact@hojza.com
        </a>
        </li>

        <li className="flex items-center space-x-2">
        <PhoneOutlined className="text-white" />
        <a
            href="tel:+355681234567"
            className="text-yellow-50 hover:text-yellow-200 transition-colors duration-300"
        >
            +355 68 123 4567
        </a>
        </li>
    </ul>

    <h3 className="text-lg font-semibold text-white mb-3">{t("Follow Us")}</h3>
    <div className="flex space-x-4 text-2xl">
        <a
        href="#"
        aria-label="Instagram"
        className="text-white hover:text-yellow-200 transition-colors duration-300"
        >
        <InstagramOutlined />
        </a>
        <a
        href="#"
        aria-label="LinkedIn"
        className="text-white hover:text-yellow-200 transition-colors duration-300"
        >
        <LinkedinOutlined />
        </a>
    </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-yellow-400 mt-10 pt-4 text-center text-xs text-yellow-50/70">
    © {new Date().getFullYear()} Hojza. {t("All rights reserved.")}.
  </div>
</footer>

  );
};

export default Footer;
