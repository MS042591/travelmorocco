"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

interface UniversalHeroProps {
  title?: string;
  subtitle?: string;
  image: string;
  height?: string;
  overlayOpacity?: number;
  grayscale?: boolean;
  textAlign?: 'center' | 'left';
  priority?: boolean;
  children?: React.ReactNode;
}

export default function UniversalHero({
  title,
  subtitle,
  image,
  height = "60vh",
  overlayOpacity = 0.4,
  grayscale = true,
  textAlign = "center",
  priority = true,
  children
}: UniversalHeroProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.2]);

  return (
    <section 
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden" 
      style={{ height }}
    >
      <motion.div 
        style={{ y, scale, height: '140%', top: '-20%', position: 'absolute', width: '100%' }}
        className="z-0"
      >
        <Image 
          src={image} 
          alt={title || "Hero Image"} 
          fill 
          className={`object-cover brightness-[0.7] ${grayscale ? 'grayscale-[0.1]' : ''}`}
          priority={priority}
        />
      </motion.div>
      <div 
        className="absolute inset-0 z-[5]" 
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }} 
      />
      
      {(title || subtitle || children) && (
        <div className={`relative z-10 px-4 w-full ${textAlign === 'center' ? 'text-center' : 'text-left container mx-auto md:px-8 lg:px-20'}`}>
          {subtitle && (
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white mb-4 block"
            >
              {subtitle}
            </motion.span>
          )}
          {title && (
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold !text-white tracking-tight font-heading leading-tight"
            >
              {title}
            </motion.h1>
          )}
          {children}
        </div>
      )}
    </section>
  );
}
