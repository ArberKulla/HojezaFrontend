// File: LandingPage.tsx
import { useTranslation } from "react-i18next";
import HeroCarousel from "../../modules/Home/Herocarousel";
import ServicesSection from "../../modules/Home/ServicesSection";

export default function LandingPage() {
  const { t } = useTranslation();


  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
