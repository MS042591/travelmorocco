"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TourData } from '@/lib/tours-shared';

interface FeaturedToursProps {
  tours: TourData[];
}

export default function FeaturedTours({ tours }: FeaturedToursProps) {
  return (
    <section className="py-24 bg-canvas">
      <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-2">Featured Expeditions</h2>
            <p className="text-muted text-sm max-w-md">Our most beloved journeys, hand-crafted for the curious traveler.</p>
          </div>
          <Link 
            href="/tours" 
            className="text-sm font-bold text-ink underline underline-offset-4 hover:text-primary transition-colors"
          >
            Show all {tours.length} experiences
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {tours.slice(0, 3).map((tour, index) => (
            <motion.div
              key={tour.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/tours/${tour.slug}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-airbnb-md mb-4 shadow-sm group-hover:shadow-airbnb transition-all duration-500">
                  <Image 
                    src={tour.image} 
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {tour.bestSeller && (
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-bold text-ink shadow-sm">
                      Guest favorite
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <button className="p-2 text-white/90 hover:scale-110 transition-transform">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 stroke-white fill-black/30 stroke-2"><path d="m16 28c7-4.733 14-10 14-17 0-3.86599325-3.1340068-7-7-7-2.2666524 0-4.302302 1.08756041-5.6021876 2.81881682l-.3978124.52836636-.3978124-.52836636c-1.2998856-1.73125641-3.33553515-2.81881682-5.6021876-2.81881682-3.86599325 0-7 3.13400675-7 7 0 7 7 12.267 14 17z"></path></svg>
                    </button>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-bold text-ink group-hover:text-primary transition-colors">{tour.title}</h3>
                    <div className="flex items-center space-x-1 text-sm text-ink">
                      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-ink"><path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z"></path></svg>
                      <span>4.92</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted">{tour.duration} experience</p>
                  <p className="text-sm text-ink font-bold mt-2">{tour.price} <span className="font-normal text-muted">/ person</span></p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
