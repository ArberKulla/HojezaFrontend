import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import contactImage from "../../assets/contactform1.webp";
import { COMPANY_CONTACT } from "../../constants/contact";
import { InstagramOutlined, LinkedinOutlined, FacebookFilled } from "@ant-design/icons";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");

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

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const companyName = formData.get("companyName")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const message = formData.get("message")?.toString().trim();

    const emailValid = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = phone && /^\+?\d{6,15}$/.test(phone);

    if (!email && !phone) {
      setError(t("Please provide either an email address or a phone number."));
      return;
    }

    if (email && !emailValid) {
      setError(t("Please enter a valid email address."));
      return;
    }

    if (phone && !phoneValid) {
      setError(t("Please enter a valid phone number."));
      return;
    }

    console.log({ companyName, email, phone, message });
    form.reset();
  };

  return (
    <div className="flex flex-col py-20 bg-transparent items-center">

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
        <div className="lg:mt-[-120px] w-full ">
          <motion.div
            className="bg-white shadow-2xl border border-yellow-200 p-8 rounded-3xl w-full"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl font-extrabold mb-6 text-yellow-700 text-center">
              {t("Contact Us")}
            </h2>

            {error && (
              <p className="mb-4 text-red-600 font-semibold bg-red-100 p-3 rounded-lg border border-red-300">
                {error}
              </p>
            )}

            <motion.form
              className="space-y-5"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.15 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
            >
              {/* Company Name */}
              <motion.div variants={fadeUp} className="flex flex-col">
                <label className="font-semibold text-yellow-700 mb-1">
                  {t("Your Company Name")}
                </label>
                <input
                  name="companyName"
                  type="text"
                  className="border border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500/60"
                  placeholder={t("Enter your company name")}
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={fadeUp} className="flex flex-col">
                <label className="font-semibold text-yellow-700 mb-1">
                  {t("Email Address")}
                </label>
                <input
                  name="email"
                  type="email"
                  className="border border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500/60"
                  placeholder={t("example@domain.com")}
                />
              </motion.div>

              {/* Phone */}
              <motion.div variants={fadeUp} className="flex flex-col">
                <label className="font-semibold text-yellow-700 mb-1">
                  {t("Phone Number")}
                </label>
                <input
                  name="phone"
                  type="text"
                  className="border border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500/60"
                  placeholder={t("+355 68 123 4567")}
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={fadeUp} className="flex flex-col">
                <label className="font-semibold text-yellow-700 mb-1">
                  {t("What service do you need?")}
                </label>
                <textarea
                  name="message"
                  className="border border-yellow-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500/60 h-36 resize-none"
                  placeholder={t("Describe the service you require...")}
                  required
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                variants={fadeIn}
                className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {t("Send Message")}
              </motion.button>

            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
