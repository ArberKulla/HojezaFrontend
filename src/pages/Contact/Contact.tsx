// File: LandingPage.tsx
import { useTranslation } from "react-i18next";
import ContactForm from "../../modules/Contact/ContactForm";
import { motion, Variants } from "framer-motion";
import { COMPANY_CONTACT } from "../../constants/contact";
import { InstagramOutlined, LinkedinOutlined, FacebookFilled } from "@ant-design/icons";

export default function LandingPage() {
  const { t } = useTranslation();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex flex-col">

      {/* ================= Hero Section ================= */}
      <section
        className="relative w-full overflow-hidden"
        style={{
            background: "linear-gradient(135deg, #fffdf5 0%, #fff8e3 40%, #fef3c7 100%)"
        }}
      >
        <div className="flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-16 py-24 text-center relative z-10">
            
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-yellow-700 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Contact Us")}
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-yellow-900 mb-6 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("We’d love to hear from you! Whether you have a question, an idea, or just want to chat, our team is here to help.")}
          </motion.p>

          <motion.div
            className="flex justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="inline-block w-12 h-1 bg-yellow-700 rounded-full" />
            <span className="inline-block w-8 h-1 bg-yellow-500 rounded-full" />
            <span className="inline-block w-4 h-1 bg-yellow-300 rounded-full" />
          </motion.div>
        </div>

        {/* Floating shapes for liveliness */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute -top-10 -left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-30 animate-bounce-slow"></div>
          <div className="absolute bottom-0 -right-10 w-32 h-32 bg-yellow-100 rounded-full opacity-20 animate-pulse-slow"></div>
        </div>
      </section>

      {/* ================= Main Contact Section ================= */}
      <div className="flex flex-col-reverse lg:flex-row mx-auto px-6 gap-6 py-16 max-w-7xl w-full items-center">

        {/* Left: Contact Info */}
        <div className="flex flow-row items-center w-full lg:w-3/5 h-fit">
        <motion.section
          className="flex flex-col items-center justify-start lg:items-start w-full px-6 lg:px-16 relative h-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-700 mb-6">
            {t("Get in Touch")}
          </h2>
          <p className="text-center lg:text-start text-yellow-800 text-lg md:text-xl mb-6">
            {t("Reach us via phone, email, or social media. We respond fast and love connecting with our community.")}
          </p>

          <div className="flex flex-col space-y-4 md:space-y-6 text-yellow-900 text-lg md:text-xl">
            <div>
              <span className="font-bold">{t("Phone")}:</span> {COMPANY_CONTACT.phone}
            </div>
            <div>
              <span className="font-bold">{t("Email")}:</span> {COMPANY_CONTACT.email}
            </div>
          </div>

          <div className="flex space-x-4 md:space-x-6 text-2xl md:text-3xl mt-6 flex-wrap">
            <a
              href={COMPANY_CONTACT.socials.instagram}
              aria-label="Instagram"
              className="text-yellow-700 hover:text-yellow-400 transition-colors duration-300"
            >
              <InstagramOutlined />
            </a>
            <a
              href={COMPANY_CONTACT.socials.linkedin}
              aria-label="LinkedIn"
              className="text-yellow-700 hover:text-yellow-400 transition-colors duration-300"
            >
              <LinkedinOutlined />
            </a>
            <a
              href={COMPANY_CONTACT.socials.facebook}
              aria-label="Facebook"
              className="text-yellow-700 hover:text-yellow-400 transition-colors duration-300"
            >
              <FacebookFilled />
            </a>
          </div>

          {/* Divider on large screens */}
        </motion.section>

        <div className="hidden lg:block w-[3px] bg-yellow-700 rounded self-stretch mt-8" />

        </div>


        {/* Right: Contact Form */}
        <div className="w-full lg:w-2/3 px-6 lg:px-16 mb-10 lg:mb-0">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
