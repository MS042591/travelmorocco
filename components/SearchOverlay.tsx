"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { performSearch, SearchData } from '@/lib/search-utils';
import Image from 'next/image';

declare global {
  interface Window {
    __SEARCH_INDEX__?: SearchData;
  }
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{tours: any[], destinations: any[], posts: any[]}>({ tours: [], destinations: [], posts: [] });
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchIndex, setSearchIndex] = useState<SearchData | null>(null);

  // Focus and Fetch index on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      
      // Fetch index if not already loaded
      if (!searchIndex) {
        fetch('/search.json')
          .then(res => res.json())
          .then(data => setSearchIndex(data))
          .catch(err => console.error("Failed to load search index:", err));
      }
    } else {
      setQuery('');
      setResults({ tours: [], destinations: [], posts: [] });
    }
  }, [isOpen, searchIndex]);

  // Real-time search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2 && searchIndex) {
        setIsSearching(true);
        try {
          const data = performSearch(query, searchIndex);
          setResults(data);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults({ tours: [], destinations: [], posts: [] });
      }
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [query, searchIndex]);

  // Close on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const hasResults = results.tours.length > 0 || results.destinations.length > 0 || results.posts.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-xl flex flex-col overflow-y-auto"
        >
          <div className="container mx-auto px-4 md:px-8 lg:px-20 pt-10 pb-20">
            <div className="flex justify-between items-center mb-16">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Discovery Console</span>
              <button 
                onClick={onClose}
                className="p-3 text-ink hover:rotate-90 transition-all duration-300"
              >
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-none stroke-current stroke-2"><path d="M2 2l28 28M30 2L2 30"></path></svg>
              </button>
            </div>

            <div className="max-w-5xl mx-auto w-full">
              <div className="relative mb-20">
                <input 
                  ref={inputRef}
                  type="text" 
                  placeholder="Where can we take you?" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-b-2 border-hairline py-8 text-3xl md:text-5xl font-bold focus:outline-none focus:border-primary transition-colors text-ink placeholder:text-muted/20 tracking-tighter"
                />
                <div className="absolute right-0 bottom-8 text-muted-soft">
                  {isSearching ? (
                    <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  ) : (
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-none stroke-current stroke-2"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></svg>
                  )}
                </div>
              </div>

              {/* Dynamic Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-8 space-y-12">
                  {results.tours.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted border-b border-hairline pb-4">Top Expeditions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {results.tours.map(tour => (
                          <Link 
                            key={tour.slug} 
                            href={`/tours/${tour.slug}`}
                            onClick={onClose}
                            className="group flex gap-4 p-4 rounded-3xl hover:bg-surface-soft transition-all border border-transparent hover:border-hairline"
                          >
                            <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                              <Image src={tour.image} alt={tour.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="py-1">
                              <h4 className="font-bold text-ink group-hover:text-primary transition-colors line-clamp-1">{tour.title}</h4>
                              <p className="text-xs text-muted mt-1">{tour.duration} • {tour.category}</p>
                              <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-2 block opacity-0 group-hover:opacity-100 transition-opacity">View Journey →</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.posts.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted border-b border-hairline pb-4">Journal Stories</h3>
                      <div className="space-y-4">
                        {results.posts.map(post => (
                          <Link 
                            key={post.slug} 
                            href={`/blog/${post.slug}`}
                            onClick={onClose}
                            className="group flex items-center justify-between p-4 rounded-2xl hover:bg-surface-soft transition-all"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <h4 className="font-bold text-ink group-hover:translate-x-2 transition-transform">{post.title}</h4>
                            </div>
                            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-none stroke-current stroke-2 text-muted group-hover:text-primary"><path d="m12 1 12 12-12 12"></path></svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {!hasResults && query.length >= 2 && !isSearching && (
                    <div className="py-20 text-center">
                      <div className="text-6xl mb-6 opacity-20">🏜️</div>
                      <p className="text-muted text-lg italic">No journeys found for &quot;{query}&quot;. Try exploring our popular hubs below.</p>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-4 space-y-12">
                  {results.destinations.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted border-b border-hairline pb-4">Destinations</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {results.destinations.map(dest => (
                          <Link 
                            key={dest.slug} 
                            href={`/destinations/${dest.slug}`}
                            onClick={onClose}
                            className="group relative h-32 rounded-3xl overflow-hidden block shadow-sm"
                          >
                            <Image src={dest.image} alt={dest.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <h4 className="text-white font-bold text-xl tracking-tight">{dest.title}</h4>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-muted border-b border-hairline pb-4">Quick Links</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Marrakech', 'Sahara', 'Luxury', 'Hiking', 'Medina', 'Chefchaouen'].map(tag => (
                        <button 
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-5 py-2 rounded-full border border-hairline text-[10px] font-black uppercase tracking-widest text-muted hover:border-ink hover:text-ink transition-all"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
