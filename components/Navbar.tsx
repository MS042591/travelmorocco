"use client";

import Link from 'next/link';
import { useModal } from '@/lib/ModalContext';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import TripPlannerModal from './TripPlannerModal';

export default function Navbar() {
  const { openBooking } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isSolid = scrolled || !isHomepage;

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 flex items-center ${scrolled ? 'h-20 bg-white/80 backdrop-blur-xl border-b border-hairline shadow-sm' : 'h-32 bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-8 lg:px-20 flex justify-between items-center">
          <Link href="/" className="flex items-center group">
            <div className={`relative transition-all duration-500 group-hover:scale-105 ${scrolled ? 'h-12 w-48' : 'h-24 w-96'}`}>
              <Image 
                src="/logo.png" 
                alt="Travel Morocco" 
                fill
                className={`object-contain transition-all duration-500 ${!isSolid ? 'brightness-0 invert' : ''}`}
                priority
              />
            </div>
          </Link>
          
          <div className={`hidden lg:flex items-center space-x-10 text-xs font-black uppercase tracking-[0.2em] ${isSolid ? 'text-ink' : 'text-white'}`}>
            <Link href="/tours" className="hover:text-primary transition-colors relative group py-2">
              Tours
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/destinations" className="hover:text-primary transition-colors relative group py-2">
              Destinations
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/blog" className="hover:text-primary transition-colors relative group py-2">
              Journal
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPlannerOpen(true)}
              className={`hidden md:block text-[11px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full transition-all duration-300 ${isSolid ? 'bg-primary text-white shadow-lg hover:bg-primary-active hover:scale-105' : 'bg-white text-ink hover:bg-white/90 shadow-xl'}`}
            >
              Plan Your Journey
            </button>
            <button className={`p-2.5 rounded-full border flex items-center justify-center transition-all ${isSolid ? 'border-hairline bg-white shadow-sm hover:shadow-md' : 'border-white/20 bg-white/10 text-white hover:bg-white/20'}`}>
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${isSolid ? 'fill-ink' : 'fill-white'}`}><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
            </button>
          </div>
        </div>
      </nav>

      <TripPlannerModal isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
    </>
  );
}
