"use client";

import Link from 'next/link';
import { useModal } from '@/lib/ModalContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { openBooking } = useModal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 h-20 flex items-center ${scrolled ? 'bg-white border-b border-hairline shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 md:px-8 lg:px-20 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-1">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-primary" aria-hidden="true" role="presentation" focusable="false"><path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415.001.228c0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.392 3.42-6.72 3.42-3.481 0-6.358-2.416-6.358-6.478 0-4.062 2.877-6.478 6.357-6.478 2.224 0 4.556 1.258 6.709 3.386l.257.26.172.179h.011l.176-.185c2.044-2.1 4.392-3.42 6.72-3.42 3.481 0 6.358 2.416 6.358 6.478 0 4.062-2.877 6.478-6.357 6.478-2.224 0-4.556-1.258-6.709-3.386l-.257-.26-.172-.179h-.011l-.176.185c-2.044 2.1-4.392 3.42-6.72 3.42-3.481 0-6.358-2.416-6.358-6.478 0-4.062 2.877-6.478 6.357-6.478 2.224 0 4.556 1.258 6.709 3.386l.257.26.172.179h.011l.176-.185c2.044-2.1 4.392-3.42 6.72-3.42 3.481 0 6.358 2.416 6.358 6.478z"></path></svg>
          <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-primary' : 'text-white'}`}>
            travelmorocco
          </span>
        </Link>
        
        <div className={`hidden lg:flex items-center space-x-8 text-sm font-medium ${scrolled ? 'text-ink' : 'text-white'}`}>
          <Link href="/tours" className="hover:text-muted transition-colors relative group">
            Stays
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-ink scale-0 group-hover:scale-100 transition-transform"></span>
          </Link>
          <Link href="/destinations" className="hover:text-muted transition-colors relative group">
            Experiences
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-ink scale-0 group-hover:scale-100 transition-transform"></span>
          </Link>
          <Link href="/blog" className="hover:text-muted transition-colors">Journal</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/host" className={`hidden md:block text-sm font-semibold hover:bg-surface-soft px-4 py-3 rounded-full transition-colors ${scrolled ? 'text-ink' : 'text-white hover:bg-white/10'}`}>
            Become a host
          </Link>
          <button className={`p-3 rounded-full border border-hairline flex items-center space-x-3 bg-white shadow-sm hover:shadow-airbnb transition-all ${scrolled ? '' : 'bg-white/10 border-white/20'}`}>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink"><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
