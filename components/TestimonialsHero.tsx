"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialsHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image 
        src="/images/tours/amazing-pov-photo-of-latin-young-woman-leading-her-boyfriend-into-a-sunset-at-desert-looking-and-smiling-to-camera.webp" 
        alt="Travel Morocco Testimonials" 
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
          Shared Memories
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold !text-white tracking-tight font-heading leading-tight"
        >
          The Wall of <br />
          <span className="italic font-serif text-white/90 text-primary">Trust</span>
        </motion.h1>
      </div>
    </section>
  );
}
