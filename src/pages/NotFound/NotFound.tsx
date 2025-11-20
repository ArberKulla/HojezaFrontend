import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-b from-yellow-50 to-white px-6 pt-10">
      {/* Cute ghost illustration */}
      <div className="relative w-48 h-48 mb-8">
        <div className="absolute inset-0 bg-white rounded-t-full rounded-b-lg shadow-lg border border-gray-200 flex flex-col items-center justify-center">
          <div className="flex space-x-4 mb-3">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </div>
          <div className="w-10 h-2 bg-gray-300 rounded-full"></div>
        </div>
        {/* Cute floating animation */}
        <div className="absolute inset-0 animate-bounce opacity-20 bg-white rounded-full blur-2xl"></div>
      </div>

      {/* Text */}
      <h1 className="text-6xl font-extrabold text-yellow-500 mb-2">404</h1>
      <p className="text-gray-600 text-lg mb-6 text-center">
        {t("Oops! The page you're looking for has wandered off ")}
      </p>
    </div>
  );
};

export default NotFound;
