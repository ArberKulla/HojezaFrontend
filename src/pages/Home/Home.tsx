// File: LandingPage.tsx
import { useTranslation } from "react-i18next";
import HeroCarousel from "../../modules/Home/Herocarousel";
import ServicesSection from "../../modules/Home/ServicesSection";
import ContactFormSection from "../../modules/Home/ContactFormSection";

export default function LandingPage() {
  const { t } = useTranslation();


  return (
    <div className="flex flex-col text-gray-800">
      {/* Hero Section */}
      <HeroCarousel />

      <div className='mx-auto px-6'>
        {/* Services Section */}
        <ServicesSection />

        {/* Contact Form Section */}
        <ContactFormSection />
      </div>
    </div>
  );
}
