import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [error, setError] = useState("");

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
        <div className="w-full">
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
  )
};

export default ContactForm;