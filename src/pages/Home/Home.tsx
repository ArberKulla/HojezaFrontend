// File: LandingPage.tsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroTextEls = Array.from(heroRef.current.querySelectorAll<HTMLElement>("h2, p"));
        const heroButton = heroRef.current.querySelector<HTMLButtonElement>("button");

        // Animate heading & paragraph
        gsap.fromTo(heroTextEls,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" }
        );

        // Animate button
        if (heroButton) {
          gsap.fromTo(heroButton,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
          );
        }
      }

      // Services cards scroll animation (same as before)
      serviceRefs.current.forEach((el, i) => {
        if (el) {
          gsap.fromTo(el,
            { opacity: 0, y: 60, scale: 0.9, rotation: -2 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: i * 0.15,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                markers: false
              }
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const services = [
    { title: "Web Development", desc: "Custom websites built with modern technologies." },
    { title: "UI/UX Design", desc: "Beautiful and intuitive designs focused on user experience." },
    { title: "E-commerce Solutions", desc: "Scalable online stores optimized for conversion." },
    { title: "SEO Optimization", desc: "Improve your visibility and rank higher on search engines." },
    { title: "Maintenance & Support", desc: "Reliable long-term support for your applications." },
    { title: "Branding", desc: "From logos to full identity systems, we help you stand out." },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-yellow-600">SoftForge</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#services" className="hover:text-yellow-500 transition">Services</a>
          <a href="#about" className="hover:text-yellow-500 transition">About</a>
          <a href="#contact" className="hover:text-yellow-500 transition">Contact</a>
        </nav>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded-lg transition">
          Get Started
        </button>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center flex-grow px-6 py-20 bg-gradient-to-b from-yellow-50 to-white"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-yellow-600">
          Building Sweet Digital Experiences
        </h2>
        <p className="text-lg md:text-xl text-yellow-800 max-w-2xl mb-8">
          We craft beautiful, scalable web solutions that grow your business and delight your users.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 text-lg rounded-xl transition">
          Start Your Project
        </button>
      </section>

      {/* Services Section */}
      <section id="services" className="px-8 py-20 bg-yellow-50">
        <h3 className="text-3xl font-bold text-center mb-12 text-yellow-700">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) serviceRefs.current[i] = el;
              }}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h4 className="text-xl font-semibold mb-3 text-yellow-600">{service.title}</h4>
              <p className="text-yellow-800">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-20 bg-white text-center">
        <h3 className="text-3xl font-bold mb-6 text-yellow-700">About Us</h3>
        <p className="max-w-3xl mx-auto text-yellow-800 text-lg">
          SoftForge is a team of passionate developers, designers, and innovators.
          We believe in crafting web solutions that are elegant, efficient, and empowering.
        </p>
      </section>

      {/* Contact / CTA */}
      <section id="contact" className="px-8 py-20 text-center bg-yellow-500 text-white">
        <h3 className="text-3xl font-bold mb-4">Let's Build Something Sweet Together</h3>
        <p className="text-lg mb-6">Reach out today to start your project.</p>
        <button className="bg-white text-yellow-500 hover:bg-yellow-100 font-semibold px-6 py-3 rounded-xl transition">
          Contact Us
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-700 text-yellow-100 py-8 text-center text-sm">
        <p>© {new Date().getFullYear()} SoftForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
