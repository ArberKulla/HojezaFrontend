// File: ServicesSection.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, Variants } from 'framer-motion';

interface Service {
  titleKey: string;
  descKey: string;
}

const services: Service[] = [
  { titleKey: "Web Development", descKey: "Custom websites built with modern technologies." },
  { titleKey: "UI/UX Design", descKey: "Beautiful and intuitive designs focused on user experience." },
  { titleKey: "E-commerce Solutions", descKey: "Scalable online stores optimized for conversion." },
  { titleKey: "SEO Optimization", descKey: "Improve your visibility and rank higher on search engines." },
  { titleKey: "Maintenance & Support", descKey: "Reliable long-term support for your applications." },
  { titleKey: "Branding", descKey: "From logos to full identity systems, we help you stand out." },
];

// Animation variants
const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
};

const ServicesSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="services"
      className="relative px-8 py-24 my-8 overflow-hidden bg-transparent"
    >
      {/* Grand Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={headerVariants}
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-700 mb-6 leading-tight">
          {t("Our Services")}
        </h2>
        <p className="text-yellow-800 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          {t("We offer a wide range of services to help your business grow and succeed online.")}
        </p>
      </motion.div>

      {/* Service Cards */}
      <motion.div
        className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {services.map((service, i) => (
          <motion.div
            key={i}
            className="bg-white p-10 rounded-3xl shadow-lg cursor-pointer hover:shadow-3xl transform hover:-translate-y-3 hover:scale-105 transition-all duration-500"
            variants={cardVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-600">
              {t(service.titleKey)}
            </h3>
            <p className="text-yellow-800 text-lg">{t(service.descKey)}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default ServicesSection;
