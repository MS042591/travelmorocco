"use client";

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TourData, TOUR_CATEGORIES } from '@/lib/tours-shared';
import TourCard from './TourCard';
import Skeleton from './Skeleton';
import SectionReveal from './SectionReveal';

interface TourListingProps {
  initialTours: TourData[];
}

const TESTIMONIALS = [
  { text: "The magic of the Sahara under the stars was the highlight of our decade.", author: "Julian & Elena, Spain" },
  { text: "Seamless, professional, and deeply authentic. Every city felt like a dream.", author: "Marcus T., United Kingdom" },
  { text: "The Fes Medina tour was sensory overload in the best possible way.", author: "Yuki W., Japan" }
];

const CATEGORY_ICONS: Record<string, string> = {
  "All": "M16 2L2 22h28L16 2z", // Globe-like
  "Desert Tours": "M16 2c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z", // Sun/Desert
  "Tours from Marrakech": "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z", // Pin/Marrakech
  "Tours from Casablanca": "M19 13h-4V3c0-1.1-.9-2-2-2s-2 .9-2 2v10H7c-1.1 0-2 .9-2 2s.9 2 2 2h4v10c0 1.1.9 2 2 2s2-.9 2-2V17h4c1.1 0 2-.9 2-2s-.9-2-2-2z", // City/Building
  "Tours from Tangier": "M20 21c-1.39 0-2.55-.47-3.48-1.27-.92-.8-1.52-1.87-1.52-3.23 0-2.73 2.55-4.5 5-4.5s5 1.77 5 4.5c0 1.36-.6 2.43-1.52 3.23-.93.8-2.09 1.27-3.48 1.27z", // Sea/Port
  "From Fes Tours": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z", // Medina Circle
  "Luxury Tours": "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" // Shield/Crown
};

export default function TourListing({ initialTours }: TourListingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [durationFilter, setDurationFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Featured');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    // Simulate initial loading for skeleton effect
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const filteredTours = useMemo(() => {
    let result = initialTours.filter(tour => {
      const title = tour.title || "";
      const excerpt = tour.excerpt || "";
      const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tour.category === activeCategory;
      
      let matchesDuration = true;
      if (durationFilter !== 'All') {
        const daysMatch = tour.duration.match(/\d+/);
        const days = daysMatch ? parseInt(daysMatch[0]) : 0;
        if (durationFilter === 'short') matchesDuration = days <= 3;
        else if (durationFilter === 'medium') matchesDuration = days > 3 && days <= 7;
        else if (durationFilter === 'long') matchesDuration = days > 7;
      }

      return matchesSearch && matchesCategory && matchesDuration;
    });

    // Sorting logic
    if (sortBy === 'Duration: Shortest') {
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortBy === 'Duration: Longest') {
      result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    }

    return result;
  }, [initialTours, searchQuery, activeCategory, durationFilter, sortBy]);

  const categories = ['All', ...TOUR_CATEGORIES];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All': initialTours.length };
    TOUR_CATEGORIES.forEach(cat => {
      counts[cat] = initialTours.filter(t => t.category === cat).length;
    });
    return counts;
  }, [initialTours]);

  return (
    <div className="space-y-12 pb-32">
      {/* Sticky Filter Bar Container */}
      <div className={`sticky top-20 z-40 bg-canvas/95 backdrop-blur-md transition-all duration-300 py-4 ${isScrolled ? 'shadow-md border-b border-hairline translate-y-0' : 'border-b border-hairline/30'}`}>
        <div className="max-w-[1400px] mx-auto px-4 space-y-6">
          {/* Top Row: Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md group">
              <input 
                type="text" 
                placeholder="Search for cities, experiences..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-soft border border-hairline rounded-full py-3.5 pl-12 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all group-hover:bg-white"
              />
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 fill-muted" stroke="currentColor" strokeWidth="2"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></svg>
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-ink">
                  <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current" stroke="currentColor" strokeWidth="3"><path d="m6 6 20 20M26 6 6 26"></path></svg>
                </button>
              )}
            </div>

            <div className="flex gap-4 w-full md:w-auto overflow-x-auto no-scrollbar">
              <select 
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value)}
                className="bg-white border border-hairline rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-ink hover:border-ink transition-all cursor-pointer focus:outline-none"
              >
                <option value="All">All Durations</option>
                <option value="short">Short (1-3 days)</option>
                <option value="medium">Classic (4-7 days)</option>
                <option value="long">Grand (8+ days)</option>
              </select>

              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-hairline rounded-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-ink hover:border-ink transition-all cursor-pointer focus:outline-none"
              >
                <option value="Featured">Featured</option>
                <option value="Duration: Shortest">Duration: Shortest</option>
                <option value="Duration: Longest">Duration: Longest</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-2 whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${
                  activeCategory === cat 
                  ? 'bg-ink text-white border-ink shadow-lg shadow-ink/10' 
                  : 'bg-white text-muted border-hairline hover:border-ink hover:text-ink'
                }`}
              >
                {/* Visual Category Pill Icons */}
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 ${activeCategory === cat ? 'fill-white' : 'fill-muted group-hover:fill-ink'}`}>
                  <path d={CATEGORY_ICONS[cat] || "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"} />
                </svg>
                {cat === 'All' ? 'All Expeditions' : cat}
                <span className={`text-[10px] ${activeCategory === cat ? 'text-white/60' : 'text-muted-soft'}`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Listing Content */}
      <div className="space-y-24">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-[1400px] mx-auto">
            {[1, 2, 3, 4, 5, 6].map(n => <Skeleton key={n} className="aspect-square rounded-airbnb-md" />)}
          </div>
        ) : activeCategory === 'All' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 max-w-[1400px] mx-auto">
            {filteredTours.map((tour, index) => (
              <TourCard key={tour.slug} tour={tour} index={index} priority={index < 6} />
            ))}
          </div>
        ) : (
          <div className="space-y-32">
            {TOUR_CATEGORIES.filter(c => activeCategory === 'All' || c === activeCategory).map((category, catIndex) => {
              const toursInCategory = filteredTours.filter(tour => tour.category === category);
              if (toursInCategory.length === 0) return null;
              const testimonial = TESTIMONIALS[catIndex % TESTIMONIALS.length];

              return (
                <div key={category} className="space-y-16">
                  <SectionReveal>
                    <div className="px-4 max-w-[1400px] mx-auto">
                      <h2 className="text-3xl font-bold text-ink tracking-tight mb-2 font-heading">{category}</h2>
                      <p className="text-sm text-muted">Hand-picked itineraries for authentic discovery in {category.replace('Tours from ', '').replace(' Tours', '')}.</p>
                    </div>
                  </SectionReveal>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4 max-w-[1400px] mx-auto">
                    {toursInCategory.map((tour, index) => (
                      <TourCard key={tour.slug} tour={tour} index={index} priority={index < 3 && catIndex === 0} />
                    ))}
                  </div>
                  <SectionReveal delay={0.2}>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="py-16 text-center max-w-3xl mx-auto px-4"
                    >
                      <div className="text-6xl text-hairline mb-8 font-serif italic">“</div>
                      <h3 className="text-xl md:text-3xl font-bold text-ink mb-8 tracking-tight leading-snug font-heading italic">
                        {testimonial.text}
                      </h3>
                      <p className="text-muted text-sm font-bold uppercase tracking-widest">— {testimonial.author}</p>
                    </motion.div>
                  </SectionReveal>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <AnimatePresence>
        {!isLoading && filteredTours.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="text-center py-40 bg-surface-soft rounded-[4rem] mx-4 border border-hairline/50"
          >
            <div className="text-9xl mb-12 animate-bounce">🏜️</div>
            <h3 className="text-4xl font-bold text-ink mb-6 font-heading tracking-tight">The desert is quiet...</h3>
            <p className="text-muted text-lg max-w-md mx-auto leading-relaxed">
              We couldn&apos;t find any journeys matching your current filters. 
              Try broadening your search or resetting your preferences.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All'); setDurationFilter('All'); setSortBy('Featured');}}
              className="mt-12 bg-ink text-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-primary transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Show All Journeys
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
