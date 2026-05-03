"use client";

import { Review } from '@/lib/tours-shared';
import { motion } from 'framer-motion';

interface TourReviewsProps {
  reviews?: Review[];
  tourTitle: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    author: "Sarah Jenkins",
    location: "California, USA",
    rating: 5,
    date: "March 2024",
    comment: "An absolutely life-changing experience. The attention to detail and the authenticity of the desert camp was beyond my expectations. Our guide was incredibly knowledgeable and made us feel like family."
  },
  {
    author: "David Müller",
    location: "Berlin, Germany",
    rating: 5,
    date: "February 2024",
    comment: "I've traveled all over the world, but this journey through Morocco stands out. The organization was seamless, and the places we visited were pure magic. Highly recommend for anyone seeking the real soul of Morocco."
  },
  {
    author: "Elena Rossi",
    location: "Milan, Italy",
    rating: 5,
    date: "January 2024",
    comment: "The perfect balance of luxury and authenticity. We loved the private riads and the hidden spots our guide took us to. It felt like a true adventure, but with all the comforts we wanted."
  }
];

export default function TourReviews({ reviews = DEFAULT_REVIEWS, tourTitle }: TourReviewsProps) {
  const averageRating = 4.92;
  const reviewCount = 124;

  return (
    <section className="py-16 border-t border-hairline">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ink mb-2 font-heading tracking-tight">Guest Experiences</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-ink">
                  <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-bold text-ink">{averageRating}</span>
            <span className="text-muted-soft">·</span>
            <span className="text-ink font-bold underline decoration-hairline underline-offset-4">{reviewCount} verified reviews</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
        {reviews.map((review, i) => (
          <motion.div 
            key={review.author}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-soft flex items-center justify-center text-primary font-bold text-lg border border-hairline">
                {review.author[0]}
              </div>
              <div>
                <h4 className="font-bold text-ink leading-none">{review.author}</h4>
                <p className="text-xs text-muted-soft mt-1">{review.location}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <svg key={idx} viewBox="0 0 32 32" className={`w-2.5 h-2.5 ${idx < review.rating ? 'fill-ink' : 'fill-hairline'}`}>
                    <path d="M15.094 1.579l-4.124 8.885-9.86 1.27a1 1 0 0 0-.542 1.736l7.293 6.565-1.965 9.752a1 1 0 0 0 1.483 1.061L16 25.951l8.625 4.918a1 1 0 0 0 1.482-1.06l-1.965-9.753 7.293-6.565a1 1 0 0 0-.542-1.736l-9.86-1.27-4.124-8.885a1 1 0 0 0-1.812 0z" />
                  </svg>
                ))}
              </div>
              <span className="text-[10px] font-bold text-muted-soft uppercase tracking-widest">{review.date}</span>
            </div>

            <p className="text-body leading-relaxed line-clamp-4">
              {review.comment}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <button className="px-8 py-3.5 border border-ink rounded-airbnb-sm font-bold text-ink hover:bg-surface-soft transition-all active:scale-95">
          Show all {reviewCount} reviews
        </button>
      </div>
    </section>
  );
}
