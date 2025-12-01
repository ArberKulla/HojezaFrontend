import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const WebDevelopmentPage: React.FC = () => {
  const { t } = useTranslation();

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="flex flex-col w-full">
      {/* Section 1 */}
      <motion.section
        className="flex flex-col items-center text-center px-6 py-16 bg-transparent max-w-4xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-700 mb-6">
          {t('Web Development')}
        </h2>
        <p className="text-yellow-800 text-xl md:text-2xl leading-relaxed">
          {t(
            'We create modern, responsive, and efficient web solutions that help your business grow.'
          )}
        </p>
      </motion.section>

      {/* Section 2 */}
      <motion.section
        className="flex flex-col lg:flex-row items-center justify-center gap-8 px-6 py-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-4xl font-extrabold text-yellow-700 mb-4">
            {t('Custom Websites')}
          </h3>
          <p className="text-yellow-800 text-lg md:text-xl">
            {t(
              'Tailored web solutions built specifically for your business needs, fully responsive and easy to manage.'
            )}
          </p>
        </div>

        <div className="hidden lg:block bg-yellow-700 w-1 self-stretch rounded"></div>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-4xl font-extrabold text-yellow-700 mb-4">
            {t('Scalable Solutions')}
          </h3>
          <p className="text-yellow-800 text-lg md:text-xl">
            {t(
              'Our web applications are designed to scale with your business, ensuring long-term performance and reliability.'
            )}
          </p>
        </div>
      </motion.section>

      {/* Section 3 */}
      <motion.section
        className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 px-6 py-16 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-4xl font-extrabold text-yellow-700 mb-4">
            {t('Performance & SEO')}
          </h3>
          <p className="text-yellow-800 text-lg md:text-xl">
            {t(
              'Optimized websites for speed, performance, and SEO, so your users and search engines love your site.'
            )}
          </p>
        </div>

        <div className="hidden lg:block bg-yellow-700 w-1 self-stretch rounded"></div>

        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-4xl font-extrabold text-yellow-700 mb-4">
            {t('Modern Technologies')}
          </h3>
          <p className="text-yellow-800 text-lg md:text-xl">
            {t(
              'We use the latest web technologies to ensure your projects are future-proof and maintainable.'
            )}
          </p>
        </div>
      </motion.section>
    </div>
  );
};

export default WebDevelopmentPage;
