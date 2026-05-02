"use client";

import Image from 'next/image';
import heroImg from '../src/assets/images/hero-sahara.jpg';
import { useModal } from '@/lib/ModalContext';

export default function Hero() {
  const { openBooking } = useModal();

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImg} 
          alt="Sahara Desert Sunset" 
          className="w-full h-full object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in">
          Authentic Moroccan <br/><span className="text-terracotta">Adventures</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 text-white/90 font-medium max-w-2xl mx-auto">
          Immerse yourself in the vibrant colors, ancient traditions, and breathtaking landscapes of the Kingdom of Morocco.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={openBooking}
            className="bg-terracotta hover:bg-[#d1624b] text-white px-10 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Explore Tours
          </button>
          <a href="#destinations" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-10 py-4 rounded-full font-bold text-lg transition-all text-center">
            View Destinations
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

    </section>
  );
}
