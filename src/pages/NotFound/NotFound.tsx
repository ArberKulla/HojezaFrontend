import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound: FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    // Fill parent height
    <div className="flex flex-col flex-grow">
      {/* This wrapper grows to fill main and push footer down */}
      <div className="flex flex-col flex-grow items-center justify-center px-4 sm:px-6 pt-10">
        {/* Ghost illustration */}
        <div className="relative w-32 h-32 sm:w-48 sm:h-48 mb-6 sm:mb-8">
          <div className="absolute inset-0 bg-white rounded-t-full rounded-b-lg shadow-lg border border-gray-200 flex flex-col items-center justify-center">
            <div className="flex space-x-3 sm:space-x-4 mb-2 sm:mb-3">
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 rounded-full"></div>
              <div className="w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-6 h-1 sm:w-10 sm:h-2 bg-gray-300 rounded-full"></div>
          </div>
          <div className="absolute inset-0 animate-bounce opacity-20 bg-white rounded-full blur-xl sm:blur-2xl"></div>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-yellow-500 mb-2 sm:mb-2">404</h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6 text-center max-w-xs sm:max-w-md">
          {t("Oops! The page you're looking for has wandered off.")}
        </p>

        <Link
          to="/"
          className="mt-2 sm:mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
        >
          {t("Go Back Home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
