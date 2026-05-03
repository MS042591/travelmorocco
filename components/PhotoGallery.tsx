"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from './SmartImage';

interface PhotoGalleryProps {
  mainImage: string;
  gallery: string[];
  title: string;
}

export default function PhotoGallery({ mainImage, gallery, title }: PhotoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const allImages = [mainImage, ...(gallery || [])].filter(Boolean);
  const displayImages = allImages.slice(0, 5);

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-20 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 h-[400px] md:h-[500px] w-full overflow-hidden rounded-airbnb-md">
        {/* Main Image */}
        <div 
          className="md:col-span-2 md:row-span-2 relative group overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(mainImage)}
        >
          <SmartImage 
            src={mainImage} 
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
        </div>

        {/* Gallery Images */}
        {displayImages.slice(1).map((img, i) => (
          <div 
            key={i} 
            className="hidden md:block relative group overflow-hidden cursor-pointer"
            onClick={() => setSelectedImage(img)}
          >
            <SmartImage 
              src={img} 
              alt={`${title} gallery ${i + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10" />
          </div>
        ))}

        {/* Fallback for missing gallery images to keep the grid full */}
        {displayImages.length < 5 && Array.from({ length: 5 - displayImages.length }).map((_, i) => (
          <div key={`empty-${i}`} className="hidden md:block bg-surface-soft animate-pulse" />
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button 
              className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current"><path d="m6 6 20 20M26 6 6 26" stroke="currentColor" strokeWidth="3" fill="none"></path></svg>
            </motion.button>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
                <SmartImage 
                  src={selectedImage} 
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
