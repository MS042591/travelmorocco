"use client";

import Image from 'next/image';
import heroImg from '../src/assets/images/hero-sahara.jpg';
import { useModal } from '@/lib/ModalContext';

export default function Hero() {
  const { openBooking } = useModal();

  return (
    <section className="relative h-[85vh] min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImg} 
          alt="Moroccan Landscape" 
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center">
        {/* Typographically quiet H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight text-center">
          Inspiration for future getaways.
        </h1>
        
        {/* Signature Search Pill */}
        <div className="w-full max-w-3xl bg-white rounded-full shadow-airbnb p-2 flex items-center h-16 border border-hairline">
          <button className="flex-1 px-8 text-left hover:bg-surface-soft h-full rounded-full transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Where</span>
            <span className="text-sm text-muted">Search destinations</span>
          </button>
          <div className="w-px h-8 bg-hairline"></div>
          <button className="flex-1 px-8 text-left hover:bg-surface-soft h-full rounded-full transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">When</span>
            <span className="text-sm text-muted">Add dates</span>
          </button>
          <div className="w-px h-8 bg-hairline"></div>
          <button className="flex-1 px-8 text-left hover:bg-surface-soft h-full rounded-full transition-colors flex flex-col justify-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink">Who</span>
            <span className="text-sm text-muted">Add guests</span>
          </button>
          
          <button className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white ml-2 hover:bg-primary-active transition-colors shadow-sm">
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-white" stroke="white" strokeWidth="4"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
