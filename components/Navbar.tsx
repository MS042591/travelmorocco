"use client";

import Link from 'next/link';
import { useModal } from '@/lib/ModalContext';

export default function Navbar() {
  const { openBooking } = useModal();

  return (
    <nav className="fixed w-full z-50 transition-all duration-300 glass py-4">
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tighter text-slate">
            TRAVEL<span className="text-terracotta">MOROCCO</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="#tours" className="hover:text-terracotta transition-colors">Tours</Link>
          <Link href="#destinations" className="hover:text-terracotta transition-colors">Destinations</Link>
          <Link href="#experiences" className="hover:text-terracotta transition-colors">Experiences</Link>
          <Link href="#blog" className="hover:text-terracotta transition-colors">Blog</Link>
        </div>
        
        <button 
          onClick={openBooking}
          className="bg-terracotta text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all shadow-lg shadow-terracotta/20"
        >
          Book Now
        </button>
      </div>
    </nav>
  );
}
