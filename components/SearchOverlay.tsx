"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-4"
        >
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 p-4 text-ink hover:scale-110 transition-transform"
          >
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="M2 2l28 28M30 2L2 30"></path></svg>
          </button>

          <div className="w-full max-w-4xl space-y-12">
            <div className="text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Search Discovery</span>
              <h2 className="text-4xl md:text-6xl font-bold text-ink tracking-tight font-heading">Where can we take you?</h2>
            </div>

            <div className="relative">
              <input 
                autoFocus
                type="text" 
                placeholder="Search destinations, tours, or stories..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-hairline py-6 text-2xl md:text-4xl font-medium focus:outline-none focus:border-primary transition-colors text-ink placeholder:text-muted/30"
              />
              <div className="absolute right-0 bottom-6 text-muted-soft">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></svg>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Marrakech', 'Sahara', 'Luxury Tours', 'Fes Medina', 'Trekking'].map(tag => (
                <Link 
                  key={tag}
                  href={`/tours?search=${encodeURIComponent(tag)}`}
                  onClick={onClose}
                  className="px-6 py-2 rounded-full border border-hairline text-xs font-bold uppercase tracking-widest text-muted hover:border-ink hover:text-ink transition-all"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
