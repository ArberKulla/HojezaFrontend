import React from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import contactImage from "../../assets/contactform1.webp";
import { COMPANY_CONTACT } from "../../constants/contact";
import { InstagramOutlined, LinkedinOutlined, FacebookFilled } from "@ant-design/icons";
import ContactForm from "../Contact/ContactForm";

const ContactFormSection: React.FC = () => {
  const { t } = useTranslation();

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col bg-transparent items-center">

      {/* Header */}
      <motion.div
        className="text-center mb-16 max-w-4xl"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={headerVariants}
      >
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-700 mb-6">
          {t("Get in Touch with Us")}
        </h2>
        <p className="text-yellow-800 text-xl md:text-2xl max-w-3xl leading-relaxed">
          {t("Fill out the form below and we will get back to you as soon as possible.")}
        </p>
      </motion.div>

      {/* Hero Section with animation */}
      <motion.div
        className="flex flex-col lg:flex-row items-center w-full mb-12 gap-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Hero Image */}
        <div className="flex-shrink-0">
          <img
            src={contactImage}
            alt="Contact"
            className="w-full lg:w-[45em] rounded-3xl shadow-2xl border border-yellow-300/50 object-cover"
          />
        </div>

        {/* Divider + Text */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 w-full max-w-xl">

          {/* Vertical Divider */}
          <div className="hidden lg:block bg-yellow-700 w-[6px] self-stretch rounded"></div>

          {/* Text */}
          <div className="text-center lg:text-left">
            <h2 className="text-5xl font-extrabold text-yellow-700 mb-4">
              {t("Let's Work Together")}
            </h2>
            <p className="text-lg text-yellow-800">
              {t("We love creating digital experiences that make an impact. Reach out and let's build something amazing together.")}
            </p>
          </div>

        </div>
      </motion.div>

      {/* Contact Form Section with animation */}
      <motion.div
        className="flex flex-col-reverse lg:flex-row justify-center items-center gap-8 lg:z-10 flex flex-col w-full"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Contact Info */}
        <div className="flex flex-col justify-center lg:flex-row items-center gap-8 lg:w-[45em]">

          {/* Text Info */}
          <div className="text-center lg:text-right max-w-xl">
            <h3 className="text-5xl font-extrabold text-yellow-700 mb-4">
              {t("Contact Our Team")}
            </h3>

            <p className="text-lg md:text-xl text-yellow-800 mb-4">
              {t("Phone")}: {COMPANY_CONTACT.phone} <br />
              {t("Email")}: {COMPANY_CONTACT.email}
            </p>

            {/* Socials */}
            <div className="flex justify-center lg:justify-end space-x-6 text-3xl mt-4">
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
          </div>

          <div className="hidden lg:block bg-yellow-700 w-[3px] self-stretch rounded"></div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:mt-[-120px]">
          <ContactForm/>
        </div>
        
      </motion.div>
    </div>
  );
};

export default ContactFormSection;
