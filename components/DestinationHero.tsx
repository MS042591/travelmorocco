"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DestinationHero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-hairline">
      <Image 
        src="/images/tours/panoramic-view-of-marrakesh-and-the-snow-capped-atlas-mountains-morocco.webp"
        alt="Morocco Destinations"
        fill
        className="object-cover brightness-[0.4] grayscale-[0.2]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      
      <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/80 mb-6 block">Curated Exploration</span>
          <h1 className="text-6xl md:text-9xl font-bold text-white tracking-tighter font-heading leading-none mb-8">
            The Moroccan <br />
            <span className="text-primary italic font-serif">Atlas</span>
          </h1>
          <p className="text-white/70 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
            From ancient imperial cities to secret desert oases, discover the legends carved into the Moroccan landscape.
          </p>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">Scroll to Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
}
