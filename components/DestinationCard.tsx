"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DestinationData } from '@/lib/destinations-shared';

interface DestinationCardProps {
  destination: DestinationData;
  index: number;
  className?: string;
}

export default function DestinationCard({ destination, index, className = "" }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`group bg-white rounded-[2rem] overflow-hidden border border-hairline shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-700 ${className}`}
    >
      <Link href={`/destinations/${destination.slug}`} className="block">
        {/* Image Container with Shorter Aspect Ratio */}
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image 
            src={destination.image} 
            alt={destination.title} 
            fill 
            className="object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
          />
          {/* Subtle Corner Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-[8px] font-black uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-full text-ink border border-white/20">
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </span>
          </div>
        </div>

        {/* Content Area - Reduced Padding */}
        <div className="p-7 text-center space-y-3">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-primary uppercase tracking-[0.4em] mb-2 opacity-60 group-hover:opacity-100 transition-opacity">
              Morocco
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-ink font-heading tracking-tight leading-tight group-hover:text-primary transition-colors duration-500">
              {destination.title}
            </h2>
          </div>
          
          <div className="w-8 h-px bg-hairline mx-auto group-hover:w-16 group-hover:bg-primary/30 transition-all duration-700" />
          
          <p className="text-muted text-xs leading-relaxed line-clamp-2 max-w-[240px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
            {destination.description}
          </p>

          <div className="pt-2 overflow-hidden">
            <div className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-ink translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
              <span>View the Guide</span>
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none stroke-current stroke-[3]" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
