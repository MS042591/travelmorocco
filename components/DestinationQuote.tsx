"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function DestinationQuote() {
  return (
    <section className="py-40 bg-ink text-white text-center overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <svg className="w-16 h-16 mx-auto mb-10 text-primary opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H16.017C18.7784 2 21.017 4.23858 21.017 7V15C21.017 18.3137 18.3307 21 15.017 21H14.017ZM3 21L3 18C3 16.8954 3.89543 16 5 16H8C8.55228 16 9 15.5523 9 15V9C9 8.44772 8.55228 8 8 8H5C3.89543 8 3 7.10457 3 6V3L3 2H5C7.76142 2 10 4.23858 10 7V15C10 18.3137 7.31371 21 4 21H3Z" />
          </svg>
          <h3 className="text-3xl md:text-5xl font-serif italic mb-8 leading-relaxed">
            "Traveling – it leaves you speechless, then turns you into a storyteller."
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">— Ibn Battuta</p>
        </motion.div>
      </div>
      
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 opacity-[0.05] pointer-events-none -translate-x-1/2">
         <Image src="/logo.png" alt="Travel Morocco" fill className="object-contain brightness-0 invert" />
      </div>
    </section>
  );
}
