// File: LandingPage.tsx
import { useTranslation } from "react-i18next";
import HeroCarousel from "../../modules/Home/HeroCarousel";
import ServicesSection from "../../modules/Home/ServicesSection";
import ContactFormSection from "../../modules/Home/ContactFormSection";
import { Helmet } from "react-helmet-async";

export default function LandingPage() {
  const { t } = useTranslation();


  return (
    <>
      <Helmet>
        <title>Hojeza</title>
        <meta name="description" content="Home" />
      </Helmet>
      
      <div className="flex flex-col text-gray-800">
        {/* Hero Section */}
        <HeroCarousel />

        <div className='flex flex-col gap-16 mx-auto px-6'>
          {/* Services Section */}
          <ServicesSection />

          {/* Contact Form Section */}
          <ContactFormSection />
        </div>
      </div>
    </>
  );
}
