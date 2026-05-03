"use client";

import Link from 'next/link';
import { TourData } from '@/lib/tours-shared';
import TourCard from './TourCard';
import SectionReveal from './SectionReveal';

interface FeaturedToursProps {
  tours: TourData[];
  totalToursCount: number;
}

export default function FeaturedTours({ tours, totalToursCount }: FeaturedToursProps) {
  return (
    <section className="py-24 bg-canvas overflow-hidden">
      <SectionReveal>
        <div className="container mx-auto px-4 md:px-8 lg:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-ink tracking-tight mb-2">Featured Expeditions</h2>
            <p className="text-muted text-sm max-w-md">Our most beloved journeys, hand-crafted for the curious traveler.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {tours.map((tour, index) => (
            <TourCard key={tour.slug} tour={tour} index={index} />
          ))}
        </div>
        </div>
      </SectionReveal>
    </section>
  );
}
