"use client";

import Link from 'next/link';
import { TourData } from '@/lib/tours-shared';
import SmartImage from './SmartImage';
import { motion } from 'framer-motion';

interface BlogRelatedToursProps {
  tours: TourData[];
  postTitle: string;
}

export default function BlogRelatedTours({ tours, postTitle }: BlogRelatedToursProps) {
  if (tours.length === 0) return null;

  return (
    <section className="mt-20 pt-20 border-t border-hairline">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4 block">Recommended Expeditions</span>
          <h2 className="text-3xl font-bold text-ink tracking-tight font-heading">Experience the story in person</h2>
        </div>
        <Link href="/tours" className="text-xs font-bold uppercase tracking-widest text-ink hover:text-primary transition-colors border-b-2 border-hairline pb-1">
          Explore All Tours
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {tours.map((tour, i) => (
          <motion.div
            key={tour.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <Link href={`/tours/${tour.slug}`} className="block">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <SmartImage 
                  src={tour.image} 
                  alt={tour.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[9px] font-bold text-ink uppercase tracking-wider">
                    {tour.duration}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors line-clamp-1">{tour.title}</h3>
              <p className="text-xs text-muted-soft font-bold uppercase tracking-widest mt-2">Private Journey • Inquiry Only</p>
            </Link>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 p-8 rounded-[2.5rem] bg-surface-soft border border-hairline flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-md text-center md:text-left">
          <h3 className="text-xl font-bold text-ink mb-2">Want to customize this journey?</h3>
          <p className="text-sm text-muted">Our experts can tailor any of these expeditions to match the interests sparked by this article.</p>
        </div>
        <Link 
          href="/contact" 
          className="bg-ink text-white px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all shadow-lg active:scale-95"
        >
          Plan My Trip
        </Link>
      </div>
    </section>
  );
}
