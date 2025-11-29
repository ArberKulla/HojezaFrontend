// File: HeroCarousel.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../../assets/hero1.webp";
import hero2 from "../../assets/hero2.webp";
import hero3 from "../../assets/hero3.webp";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Build Your Dream Website",
    subtitle: "We craft scalable and beautiful digital experiences.",
    bgImage: hero1,
  },
  {
    id: 2,
    title: "Amazing UI/UX Design",
    subtitle: "Intuitive and engaging interfaces for your users.",
    bgImage: hero2,
  },
  {
    id: 3,
    title: "Grow Your Business Online",
    subtitle: "E-commerce, SEO, and web solutions that convert.",
    bgImage: hero3,
  },
];

const HomeCarousel: React.FC = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isDragging, setIsDragging] = useState(false);
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      if (!isDragging) emblaApi.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [emblaApi, isDragging]);

  // Track dragging state
  useEffect(() => {
    if (!emblaApi) return;

    const handlePointerDown = () => setIsDragging(true);
    const handlePointerUp = () => setIsDragging(false);

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);

    return () => {
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
    };
  }, [emblaApi]);


  // Update index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full h-[70dvh] md:h-[80dvh] overflow-hidden">
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container flex h-full">
          {slides.map((slide, i) => (
            <div
              className="embla__slide relative flex-[0_0_100%] h-full"
              key={slide.id}
            >
              <SlideItem slide={slide} isActive={i === index} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-yellow-400 scale-110" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

// --------------------------------------------
// SlideItem Component with animation
// --------------------------------------------
const SlideItem: React.FC<{ slide: Slide; isActive: boolean }> = ({
  slide,
  isActive,
}) => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Background Image with cinematic zoom */}
      <motion.img
        key={slide.id + "-img"}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{
          opacity: loaded && isActive ? 1 : 0,
          scale: loaded && isActive ? 1 : 1.08,
        }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        onLoad={() => setLoaded(true)}
        src={slide.bgImage}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Fallback skeleton */}
      {!loaded && <div className="absolute inset-0 bg-gray-300 animate-pulse" />}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

      {/* Text */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key={slide.id + "-text"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center px-6 md:px-12 z-20"
          >
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-xl">
                {t(slide.title)}
              </h2>

              <h3 className="text-2xl md:text-4xl mb-4 text-yellow-200/90 font-semibold drop-shadow">
                {t(slide.subtitle)}
              </h3>

              <p className="text-base md:text-lg text-white max-w-xl leading-relaxed">
                {t(
                  "We provide modern solutions to help your business stand out online."
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeCarousel;
