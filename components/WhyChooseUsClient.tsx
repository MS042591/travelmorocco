"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

export function WhyHero() {
  return (
    <section className="relative pt-48 pb-40 overflow-hidden border-b border-hairline">
      <Image 
        src="/images/tours/beautiful-sunset-in-the-jemaa-el-fna-square-in-the-city-of-marrakech-with-bustle-activity-street-food-market-lights-and-colorful-sky-picture-taken-during-travel-vacations-in-morocco.webp"
        alt="Morocco Background"
        fill
        className="object-cover brightness-[0.35] grayscale-[0.2]"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-[5]" />
      <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-6 block">The Travel Morocco Standard</span>
          <h1 className="text-5xl md:text-8xl font-bold !text-white tracking-tighter font-heading leading-none mb-10">
            Crafting Legacies: <br />
            <span className="!text-white/60 italic font-serif">Your Private Travel Partner</span>
          </h1>
          <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
            Morocco is a symphony of history and hospitality. We are the conductors who ensure every note is played to perfection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ValueItem({ v, i }: { v: any, i: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.1 }}
      className="flex gap-6 items-start"
    >
      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-hairline flex-shrink-0">
        {v.icon}
      </div>
      <div>
        <h3 className="font-bold text-ink text-lg mb-1">{v.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{v.desc}</p>
      </div>
    </motion.div>
  );
}

export function FeatureImage({ image, title }: { image: string, title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-1/2 relative aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl"
    >
      <Image src={image} alt={title} fill className="object-cover" />
    </motion.div>
  );
}
