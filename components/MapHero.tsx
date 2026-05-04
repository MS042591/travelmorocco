"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function MapHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image 
        src="/images/tours/ait-benhaddou-ancient-city-in-morocco-north-africa.webp" 
        alt="Discovery Map Morocco" 
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
          Visual Exploration
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold !text-white tracking-tighter font-heading leading-tight"
        >
          The Kingdom <br />
          <span className="italic font-serif text-white/90 text-primary">at a Glance</span>
        </motion.h1>
      </div>
    </section>
  );
}
