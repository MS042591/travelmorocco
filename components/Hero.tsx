"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import SmartImage from './SmartImage';

const slides = [
  { src: "/images/hero-sahara-opt.jpg", alt: "Sahara Desert golden dunes" },
  { src: "/images/tours/blue-stairway-with-colourful-flowerpots.webp", alt: "Blue streets of Chefchaouen" },
  { src: "/images/tours/ait-benhaddou-kasbah-at-dawn-morocco.webp", alt: "Ancient Kasbah Ait Ben Haddou" },
  { src: "/images/tours/beautiful-sunset-in-the-jemaa-el-fna-square-in-the-city-of-marrakech-with-bustle-activity-street-food-market-lights-and-colorful-sky-picture-taken-during-travel-vacations-in-morocco.webp", alt: "Vibrant Marrakech market" },
  { src: "/images/tours/blue-wooden-rowboats-port-essaouira-harbor-morocco-north-africa.webp", alt: "Essaouira coastal harbour" },
];

const destinations = [
  { label: "Sahara Desert", image: "/images/tours/beautiful-sand-dunes-in-the-sahara-desert-morocco-at-sunset.webp", href: "/tours?category=Desert+Tours", count: 10 },
  { label: "Marrakech", image: "/images/tours/marrakech-djemaa-el-fna-square.webp", href: "/tours?category=Tours+from+Marrakech", count: 8 },
  { label: "Chefchaouen", image: "/images/tours/morocco-rif-area-chefchaouen-chaouen-town-the-blue-city.webp", href: "/tours?category=Tours+from+Tangier", count: 6 },
  { label: "Imperial Cities", image: "/images/tours/the-royal-palace-golden-doors-fez-morocco.webp", href: "/tours?category=Tours+from+Casablanca", count: 8 },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const advance = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent(prev => (prev + 1) % slides.length);
      setIsTransitioning(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 6000);
    return () => clearInterval(timer);
  }, [advance]);

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Image Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: index === current && !isTransitioning ? 1 : 0 }}
        >
          <SmartImage
            src={slide.src}
            alt={slide.alt}
            fill
            priority={index === 0}
            data-fetchpriority={index === 0 ? "high" : "low"}
            sizes="100vw"
            className="object-cover"
            style={{
              animation: index === current ? 'kenburns 6s ease-in-out forwards' : 'none',
            }}
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 tracking-tight font-heading drop-shadow-xl max-w-4xl leading-[1.1]">
          The Soul of Morocco, <br />
          <span className="!text-white/90">Curated for You.</span>
        </h1>

        <p className="text-white/75 text-base md:text-lg max-w-xl mb-10 leading-relaxed font-light">
          Handcrafted journeys through ancient medinas, golden deserts, and mountain villages — designed by local experts.
        </p>

        <Link
          href="/tours"
          className="inline-flex items-center gap-3 bg-white text-ink text-[11px] font-black uppercase tracking-[0.2em] px-10 py-4 rounded-full hover:bg-white/90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group"
        >
          Browse 39 Experiences
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-ink group-hover:translate-x-1 transition-transform">
            <path d="m12 4 12 12-12 12-1.414-1.414L21.172 16 10.586 5.414z"></path>
          </svg>
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-28 md:bottom-32 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { setIsTransitioning(true); setTimeout(() => { setCurrent(index); setIsTransitioning(false); }, 500); }}
            className={`h-[3px] rounded-full transition-all duration-500 ${index === current ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/60'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Destination Strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 md:px-8 lg:px-20 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {destinations.map((dest) => (
              <Link
                key={dest.label}
                href={dest.href}
                className="group relative h-16 md:h-20 rounded-2xl overflow-hidden border border-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <SmartImage
                  src={dest.image}
                  alt={dest.label}
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white text-xs font-bold tracking-wide">{dest.label}</span>
                  <span className="text-white/70 text-[10px] font-bold">{dest.count} tours</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
