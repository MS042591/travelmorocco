"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionReveal from './SectionReveal';

const items = [
  {
    title: "The Spirit of Craft",
    subtitle: "Hand-carved stories in every stone",
    image: "/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.jpg",
    className: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto"
  },
  {
    title: "The Golden Pour",
    subtitle: "A tradition of hospitality",
    image: "/images/tours/moroccan-man-preparing-maghrebi-mint-tea.jpg",
    className: "md:col-span-1 md:row-span-1 aspect-square"
  },
  {
    title: "Market Rhythms",
    subtitle: "The vibrant pulse of the souk",
    image: "/images/tours/colorful-spices-and-herbs-on-display-in-the-souk.jpg",
    className: "md:col-span-1 md:row-span-2 aspect-square md:aspect-auto"
  },
  {
    title: "Woven Dreams",
    subtitle: "Patterns of the Berber tribes",
    image: "/images/tours/moroccan-handmade-carpets-and-rugs-in-marrakech.jpg",
    className: "md:col-span-1 md:row-span-1 aspect-square"
  },
  {
    title: "Artisan Soul",
    subtitle: "Mastery in every detail",
    image: "/images/tours/young-traveling-woman-visiting-a-copper-souvenir-handicraft-shop-in-marrakesh-morocco-travel-lifestyle-concept.jpg",
    className: "md:col-span-2 md:row-span-1 aspect-video md:aspect-auto"
  }
];

export default function SensoryPalette() {
  return (
    <section className="pt-24 pb-12 bg-canvas overflow-hidden">
      <SectionReveal>
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
          <div className="max-w-2xl mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-soft mb-4 block">The Soul of Morocco</span>
            <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight font-heading leading-tight mb-6">
              Beyond the Map: <br />
              <span className="text-muted-soft italic font-serif">A Sensory Journey</span>
            </h2>
            <p className="text-muted text-lg leading-relaxed">
              Morocco is not just a destination; it&apos;s a symphony of intricate patterns, 
              aromatic spices, and ancient traditions waiting to be touched.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-700 ${item.className}`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="!text-white text-2xl font-bold mb-1 drop-shadow-md">{item.title}</h3>
                  <p className="!text-white/90 text-sm font-medium drop-shadow-sm">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
