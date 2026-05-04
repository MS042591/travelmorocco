'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Compass, Map, ArrowRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const router = useRouter();
  const pathname = usePathname();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Smart Redirect Logic for GitHub Pages / Static Export
    const redirectMap: Record<string, string> = {
      '/tour': '/tours/',
      '/tour/': '/tours/',
      '/luxury': '/tours/luxury-tours/',
      '/marrakech': '/tours/tours-from-marrakech/',
      '/fes': '/tours/from-fes-tours/',
      '/tangier': '/tours/tours-from-tangier/',
      '/casablanca': '/tours/tours-from-casablanca/',
      '/desert': '/tours/desert-tours/',
    };

    const path = pathname?.toLowerCase() || '';
    
    // Check if current path matches any redirect rules
    for (const [oldPath, newPath] of Object.entries(redirectMap)) {
      if (path === oldPath || path === oldPath + '/') {
        setRedirecting(true);
        router.push(newPath);
        return;
      }
    }
  }, [pathname, router]);

  if (redirecting) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-ink font-medium">Redirecting you to the right path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center relative overflow-hidden pt-20 pb-12 px-4">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <div className="max-w-3xl w-full text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 text-primary mb-8">
              <Compass size={48} strokeWidth={1.5} className="animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-playfair italic mb-4 text-ink">
              Lost in the Medina?
            </h1>
            
            <p className="text-xl md:text-2xl text-body font-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Even the best travelers lose their way sometimes. The path you&apos;re looking for seems to have shifted like the Sahara dunes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
              <Link 
                href="/"
                className="group flex items-center justify-center gap-3 bg-ink text-white py-4 px-8 rounded-airbnb-pill hover:bg-ink/90 transition-all shadow-airbnb"
              >
                <Home size={20} />
                <span>Back to Oasis</span>
              </Link>
              
              <Link 
                href="/tours"
                className="group flex items-center justify-center gap-3 bg-primary text-white py-4 px-8 rounded-airbnb-pill hover:bg-primary-active transition-all shadow-airbnb"
              >
                <Map size={20} />
                <span>Explore Tours</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links Suggestions */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-20 pt-10 border-t border-hairline"
          >
            <p className="text-sm font-heading uppercase tracking-widest text-muted-soft mb-6">Popular Destinations</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12">
              <Link href="/tours/luxury-tours" className="text-ink hover:text-primary transition-colors font-medium">Luxury Retreats</Link>
              <Link href="/tours/desert-tours" className="text-ink hover:text-primary transition-colors font-medium">Sahara Expeditions</Link>
              <Link href="/tours/tours-from-marrakech" className="text-ink hover:text-primary transition-colors font-medium">From Marrakech</Link>
              <Link href="/destinations" className="text-ink hover:text-primary transition-colors font-medium">City Guides</Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
