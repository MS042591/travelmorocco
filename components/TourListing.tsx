"use client";

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { TourData, TOUR_CATEGORIES } from '@/lib/tours-shared';
import { useModal } from '@/lib/ModalContext';

interface TourListingProps {
  initialTours: TourData[];
}

const TESTIMONIALS = [
  { text: "The magic of the Sahara under the stars was the highlight of our decade.", author: "Julian & Elena, Spain" },
  { text: "Seamless, professional, and deeply authentic. Every city felt like a dream.", author: "Marcus T., United Kingdom" },
  { text: "The Fes Medina tour was sensory overload in the best possible way.", author: "Yuki W., Japan" }
];

export default function TourListing({ initialTours }: TourListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { openBooking } = useModal();
  const { scrollY } = useScroll();

  const filteredTours = useMemo(() => {
    return initialTours.filter(tour => {
      const matchesSearch = tour.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tour.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tour.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [initialTours, searchQuery, activeCategory]);

  const categories = ['All', ...TOUR_CATEGORIES];

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(category.toLowerCase().replace(/\s+/g, '-'));
    if (element) {
      const offset = 150;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="space-y-16 pb-32">
      {/* Search & Floating Pill Nav */}
      <div className="flex flex-col items-center gap-8 sticky top-24 z-40 px-4">
        <div className="w-full max-w-2xl bg-white rounded-full shadow-airbnb p-2 flex items-center h-14 border border-hairline group">
          <div className="flex-1 px-6 flex flex-col justify-center border-r border-hairline">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Location</span>
            <input
              type="text"
              placeholder="Where to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm text-ink placeholder:text-muted"
            />
          </div>
          <div className="flex-1 px-6 flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Guest</span>
            <span className="text-sm text-muted">Add guests</span>
          </div>
          
          <button className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white ml-2 hover:bg-primary-active transition-colors shadow-sm">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-white" stroke="white" strokeWidth="4"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></svg>
          </button>
        </div>
        
        <div className="flex space-x-8 overflow-x-auto no-scrollbar pb-2 border-b border-hairline w-full max-w-5xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => scrollToCategory(cat)}
              className={`whitespace-nowrap pb-3 text-xs font-semibold transition-all border-b-2 ${
                activeCategory === cat 
                ? 'border-ink text-ink' 
                : 'border-transparent text-muted hover:text-ink hover:border-hairline'
              }`}
            >
              {cat === 'All' ? 'All Stays' : cat.replace('Tours from ', '').replace('Tour from ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-32 mt-16">
        {TOUR_CATEGORIES.map((category, catIndex) => {
          const toursInCategory = filteredTours.filter(tour => tour.category === category);
          if (toursInCategory.length === 0) return null;

          const testimonial = TESTIMONIALS[catIndex % TESTIMONIALS.length];

          return (
            <div key={category} className="space-y-24">
              <section id={category.toLowerCase().replace(/\s+/g, '-')} className="scroll-mt-48">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-4">
                  <div>
                    <h2 className="text-2xl font-bold text-ink tracking-tight">
                      {category}
                    </h2>
                    <p className="text-sm text-muted">Hand-picked itineraries for authentic discovery.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
                  {toursInCategory.map((tour, index) => (
                    <motion.div
                      key={tour.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <Link href={`/tours/${tour.slug}`} className="group cursor-pointer block">
                        <div className="relative aspect-square overflow-hidden rounded-airbnb-md mb-3 shadow-sm group-hover:shadow-airbnb transition-all">
                          <img 
                            src={tour.image} 
                            alt={tour.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          {tour.bestSeller && (
                            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-ink shadow-sm">
                              Guest favorite
                            </div>
                          )}
                          <div className="absolute top-3 right-3">
                            <button className="p-2 text-white/90 hover:scale-110 transition-transform">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-white fill-black/30 stroke-2"><path d="m16 28c7-4.733 14-10 14-17 0-3.86599325-3.1340068-7-7-7-2.2666524 0-4.302302 1.08756041-5.6021876 2.81881682l-.3978124.52836636-.3978124-.52836636c-1.2998856-1.73125641-3.33553515-2.81881682-5.6021876-2.81881682-3.86599325 0-7 3.13400675-7 7 0 7 7 12.267 14 17z"></path></svg>
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-bold text-ink group-hover:underline">{tour.title}</h3>
                            <div className="flex items-center space-x-1 text-sm text-ink">
                              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z"></path></svg>
                              <span>4.88</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted">{tour.duration} experience</p>
                          <p className="text-sm text-muted line-clamp-1">{tour.excerpt}</p>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-hairline/50">
                            <p className="text-sm text-ink"><span className="font-bold">{tour.price}</span> per person</p>
                            <span className="text-xs font-bold text-primary group-hover:underline">Details</span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Airbnb Style Testimonial */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="py-16 text-center max-w-2xl mx-auto px-4"
              >
                <div className="text-5xl text-hairline mb-6 font-serif">“</div>
                <h3 className="text-xl md:text-2xl font-bold text-ink mb-6 tracking-tight leading-snug">
                  {testimonial.text}
                </h3>
                <p className="text-muted text-sm">— {testimonial.author}</p>
              </motion.div>
            </div>
          );
        })}
      </div>
      
      <AnimatePresence>
        {filteredTours.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-32 bg-white rounded-[4rem] shadow-2xl mx-4 border border-slate-50"
          >
            <div className="text-8xl mb-10">🏜️</div>
            <h3 className="text-4xl font-black text-slate-900 mb-4 font-playfair italic">The desert is quiet...</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto leading-relaxed">We couldn&apos;t find any journeys matching your search. Perhaps try a different city?</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-12 bg-slate-900 text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] hover:bg-terracotta transition-all shadow-2xl"
            >
              Show All Journeys
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
