// File: HeroCarousel.tsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useTranslation } from 'react-i18next';
import hero1 from '../../assets/hero1.webp';
import hero2 from '../../assets/hero2.webp';
import hero3 from '../../assets/hero3.webp';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Build Your Dream Website',
    subtitle: 'We craft scalable and beautiful digital experiences.',
    bgImage: hero1,
  },
  {
    id: 2,
    title: 'Amazing UI/UX Design',
    subtitle: 'Intuitive and engaging interfaces for your users.',
    bgImage: hero2,
  },
  {
    id: 3,
    title: 'Grow Your Business Online',
    subtitle: 'E-commerce, SEO, and web solutions that convert.',
    bgImage: hero3,
  },
];

const HeroCarousel: React.FC = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: false,
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-[70vh] md:h-[80vh] flex items-center">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>

            {/* Text - Left Middle */}
            <div className="relative z-10 max-w-3xl px-6 md:px-12 text-left flex flex-col justify-center h-full">
              <div className="mt-auto mb-auto">

                {/* Main Big Title */}
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
                  {t(slide.title)}
                </h2>

                {/* Secondary Big Subtitle */}
                <h3 className="text-2xl md:text-4xl font-semibold mb-4 text-yellow-200/90">
                  {t(slide.subtitle)}
                </h3>

                {/* Smaller description line */}
                <p className="text-base md:text-lg text-white max-w-xl leading-relaxed">
                  {t("We provide modern solutions to help your business stand out online.")}
                </p>

              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
