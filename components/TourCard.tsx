"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TourData } from '@/lib/tours-shared';
import SmartImage from './SmartImage';

interface TourCardProps {
  tour: TourData;
  index: number;
  priority?: boolean;
}

export default function TourCard({ tour, index, priority = false }: TourCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickLook, setShowQuickLook] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [tour.image, ...(tour.gallery || [])].filter(Boolean);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };
  // Social Proof: Random booking count for effect
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    setBookingCount(Math.floor(Math.random() * 5) + 1);
  }, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          perspective: 1000,
          rotateX: mousePosition.y * -10,
          rotateY: mousePosition.x * 10,
          transition: "all 0.1s ease-out"
        }}
        className="relative group/card"
      >
        <div className="group cursor-pointer block relative">
          <Link href={`/tours/${tour.slug}`}>
              <div className="relative aspect-square overflow-hidden rounded-airbnb-md mb-3 shadow-sm group-hover:shadow-airbnb transition-all">
                  <div 
                    className="absolute inset-0 flex transition-transform duration-500 ease-out" 
                    style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                  >
                    {allImages.map((src, i) => (
                      <div key={i} className="relative w-full h-full flex-shrink-0">
                        <SmartImage 
                          src={src} 
                          alt={`${tour.title} ${i + 1}`}
                          fill
                          priority={priority && i === 0}
                          className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Carousel Controls */}
                  {allImages.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/card:opacity-100 transition-all z-30 hover:bg-white text-ink hover:scale-105"
                      >
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current"><path d="M20 24L10 16l10-8v16z"/></svg>
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover/card:opacity-100 transition-all z-30 hover:bg-white text-ink hover:scale-105"
                      >
                        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current"><path d="M12 8l10 8-10 8V8z"/></svg>
                      </button>
                      
                      {/* Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-30">
                        {allImages.map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white scale-110' : 'bg-white/60'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                {tour.bestSeller && (
                  <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-ink shadow-sm flex items-center gap-1.5">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-primary"><path d="m16 2a14 14 0 1 0 14 14 14.016 14.016 0 0 0 -14-14zm6.707 10.707-8 8a1 1 0 0 1 -1.414 0l-4-4a1 1 0 1 1 1.414-1.414l3.293 3.293 7.293-7.293a1 1 0 0 1 1.414 1.414z"></path></svg>
                    Guest favorite
                  </div>
                )}
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm"
                  >
                    {bookingCount} booked today
                  </motion.div>
                )}
              </div>
            </div>
          </Link>
          <div className="space-y-1">
            <Link href={`/tours/${tour.slug}`}>
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-bold text-ink group-hover:underline line-clamp-1">{tour.title}</h3>
              </div>
              <p className="text-sm text-muted">{tour.duration} experience</p>
              <p className="text-sm text-muted line-clamp-1">{tour.excerpt}</p>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-hairline/50">
                <p className="text-sm text-ink font-bold">Details & Booking</p>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickLook(true);
                  }}
                  className="bg-surface-soft text-ink px-3 py-1 rounded-airbnb-pill text-[10px] font-bold hover:bg-surface-strong transition-all"
                >
                  Quick View
                </button>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Look Modal */}
      <AnimatePresence>
        {showQuickLook && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickLook(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >
              <button 
                onClick={() => setShowQuickLook(false)}
                className="absolute top-4 left-4 z-50 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink" stroke="currentColor" strokeWidth="3"><path d="m6 6 20 20M26 6 6 26"></path></svg>
              </button>

              <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                <SmartImage 
                  src={tour.image} 
                  alt={tour.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
                <div className="absolute bottom-6 left-6 text-white md:hidden">
                   <h2 className="text-2xl font-bold">{tour.title}</h2>
                   <p className="text-sm opacity-90">{tour.duration} experience</p>
                </div>
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                <div className="hidden md:block mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-surface-strong text-[10px] font-bold text-ink rounded uppercase tracking-wider">{tour.category}</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z"></path></svg>
                      4.92 (120+ reviews)
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-ink tracking-tight mb-2">{tour.title}</h2>
                  <p className="text-muted font-medium">{tour.duration} experience</p>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-4">Highlights</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {tour.highlights?.map(h => (
                        <div key={h} className="flex items-center gap-2 text-sm text-body">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {h}
                        </div>
                      ))}
                    </div>
                  </div>


                  <div className="pt-8 border-t border-hairline flex flex-col sm:flex-row gap-4">
                    <Link 
                      href={`/tours/${tour.slug}`}
                      className="flex-1 bg-ink text-white text-center font-bold py-4 rounded-airbnb-sm hover:bg-ink/90 transition-all"
                    >
                      Full Details
                    </Link>
                    <button 
                      onClick={() => setShowQuickLook(false)}
                      className="flex-1 bg-surface-soft text-ink text-center font-bold py-4 rounded-airbnb-sm hover:bg-surface-strong transition-all"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
