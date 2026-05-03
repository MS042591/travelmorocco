"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Realistic loading simulation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  const variants = {
    initial: {
      y: 0
    },
    exit: {
      y: "-100%",
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          variants={variants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink"
        >
          <div className="relative z-10 flex flex-col items-center">
            {/* Elegant Moroccan Geometric Pattern Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative w-32 h-32 mb-12"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full text-primary fill-current opacity-20 absolute inset-0">
                <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
              </svg>
              <motion.svg 
                viewBox="0 0 100 100" 
                className="w-full h-full text-primary stroke-current fill-none stroke-[0.5]"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
                <circle cx="50" cy="50" r="15" />
                <circle cx="50" cy="50" r="30" />
              </motion.svg>
            </motion.div>
 
            {/* Logo */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative h-12 w-56"
            >
              <Image 
                src="/logo.png" 
                alt="Travel Morocco" 
                fill
                className="object-contain brightness-0 invert"
                priority
              />
            </motion.div>
 
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-6 text-white text-[10px] font-black uppercase tracking-[0.5em] text-center"
            >
              Excellence in Hospitality
            </motion.p>
 
            {/* Discreet Progress Line */}
            <div className="mt-12 w-40 h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-primary w-full h-full"
              />
            </div>
          </div>
 
          {/* Decorative Curtain Background - Optimized with scaleY */}
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: "bottom" }}
            className="absolute bottom-0 left-0 w-full h-full bg-primary/5 z-0"
            transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
