"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image 
        src="/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp" 
        alt="About Travel Morocco Heritage" 
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
          Our Heritage
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold !text-white tracking-tight font-heading"
        >
          About Travel Morocco: <br />
          <span className="italic font-serif text-white/90 text-primary">Authentic Discovery</span>
        </motion.h1>
      </div>
    </section>
  );
}

export function MissionCard({ value, index }: { value: any, index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
      <h3 className="text-xl font-bold text-ink mb-4">{value.title}</h3>
      <p className="text-muted leading-relaxed">{value.desc}</p>
    </motion.div>
  );
}
