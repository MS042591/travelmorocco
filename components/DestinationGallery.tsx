"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface DestinationGalleryProps {
  images: string[];
  title: string;
}

export default function DestinationGallery({ images, title }: DestinationGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="pt-12">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-ink mb-8 font-heading"
      >
        Capturing the Essence
      </motion.h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
        {images.map((img, i) => {
          // Define a bento-like pattern for the grid
          let gridClass = "relative rounded-[2rem] overflow-hidden shadow-sm group cursor-pointer";
          
          if (i === 0) {
            gridClass += " col-span-2 row-span-2"; // First image is large
          } else if (i === 1) {
            gridClass += " col-span-2 row-span-1"; // Second is wide
          } else if (i === 2) {
            gridClass += " col-span-1 row-span-1"; // Small
          } else if (i === 3) {
            gridClass += " col-span-1 row-span-1"; // Small
          } else {
            gridClass += " col-span-1 row-span-1"; // Small for others
          }

          return (
            <motion.div
              key={i}
              layoutId={`image-${i}`}
              className={gridClass}
              onClick={() => setSelectedImage(img)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Image 
                src={img} 
                alt={`${title} gallery ${i}`} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white p-3 hover:bg-white/10 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[80vh] max-w-6xl">
                <Image
                  src={selectedImage}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="mt-8 text-white/60 text-sm font-medium tracking-widest uppercase">
                {title} — Morocco
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
