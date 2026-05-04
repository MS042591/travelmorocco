"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ConciergeHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image 
        src="/images/tours/close-up-shot-of-man-pouring-mint-tea-on-rooftop-deck-of-luxury-hotel.webp" 
        alt="Private Morocco Concierge" 
        fill 
        className="object-cover brightness-[0.6] grayscale-[0.1]"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-[5]" />
      <div className="relative z-10 text-center px-4">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-4 block"
        >
          Bespoke Journeys
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold !text-white tracking-tight font-heading leading-tight"
        >
          Your Private <br />
          <span className="italic font-serif text-white/90 text-primary">Morocco Concierge</span>
        </motion.h1>
      </div>
    </section>
  );
}
