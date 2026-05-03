"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';
import Link from 'next/link';

const features = [
  {
    tag: "Philosophy",
    title: "Slow Travel, Deep Immersion",
    desc: "We don't believe in rushed itineraries or 'checking boxes'. Our journeys are designed to let you breathe, to sit for a third glass of mint tea, and to truly connect with the rhythm of Moroccan life.",
    image: "/images/tours/moroccan-man-preparing-maghrebi-mint-tea.jpg",
    align: "left"
  },
  {
    tag: "Expertise",
    title: "Born in Marrakech, Vetted for Excellence",
    desc: "Our founders are Moroccans who have spent decades exploring every corner of the Kingdom. We personally stay at every Riad and vet every guide to ensure they meet our rigorous standards of hospitality and knowledge.",
    image: "/images/tours/riad-in-marrakesh-medina.jpg",
    align: "right"
  },
  {
    tag: "Access",
    title: "Beyond the Velvet Rope",
    desc: "Because of our deep local roots, we open doors that are closed to others. Private dinners in hidden palaces, workshops with master artisans, and exclusive desert camps far from the tourist trails.",
    image: "/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.jpg",
    align: "left"
  }
];

const values = [
  {
    title: "Tailor-Made Integrity",
    desc: "Every itinerary is built from scratch. No templates, no compromise.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: "Ethical Impact",
    desc: "We prioritize local suppliers and ensure your travel spend supports heritage preservation.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    title: "24/7 Concierge",
    desc: "From landing to departure, our team is a WhatsApp message away.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  }
];

export default function WhyChooseUsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Editorial Hero */}
        <section className="relative pt-48 pb-40 overflow-hidden border-b border-hairline">
          <Image 
            src="/images/tours/beautiful-sunset-in-the-jemaa-el-fna-square-in-the-city-of-marrakech-with-bustle-activity-street-food-market-lights-and-colorful-sky-picture-taken-during-travel-vacations-in-morocco.jpg"
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
                Crafting Legacies, <br />
                <span className="!text-white/60 italic font-serif">Not Just Trips</span>
              </h1>
              <p className="text-white/80 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto font-medium">
                Morocco is a symphony of history and hospitality. We are the conductors who ensure every note is played to perfection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Values Strip */}
        <section className="py-16 bg-surface-soft border-b border-hairline">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {values.map((v, i) => (
                <motion.div 
                  key={v.title}
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
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Editorial Sections */}
        <section className="py-32 space-y-40">
          {features.map((f, i) => (
            <div key={f.title} className="container mx-auto px-4 md:px-8 lg:px-20">
              <div className={`flex flex-col ${f.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2 relative aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <Image src={f.image} alt={f.title} fill className="object-cover" />
                </motion.div>
                
                <div className="w-full lg:w-1/2 space-y-8">
                  <SectionReveal>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-muted-soft block">{f.tag}</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink tracking-tight font-heading leading-tight">
                      {f.title}
                    </h2>
                    <p className="text-muted text-lg md:text-xl leading-relaxed">
                      {f.desc}
                    </p>
                    <div className="pt-4">
                       <div className="w-20 h-1 bg-primary/20 rounded-full" />
                    </div>
                  </SectionReveal>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Trust Stats Section */}
        <section className="py-32 bg-ink text-white overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-8 lg:px-20 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { label: "Hand-picked Riads", value: "150+" },
                { label: "Expert Local Guides", value: "45" },
                { label: "Custom Itineraries", value: "2k+" },
                { label: "Years of Heritage", value: "15" }
              ].map((stat, i) => (
                <div key={stat.label}>
                  <div className="text-4xl md:text-6xl font-bold mb-2 font-heading text-primary">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5 mix-blend-overlay" />
        </section>

        {/* Final CTA */}
        <section className="py-40 bg-canvas text-center">
          <div className="container mx-auto px-4">
             <SectionReveal>
                <h2 className="text-4xl md:text-6xl font-bold text-ink mb-10 font-heading tracking-tight">Your story is waiting. <br />Shall we write the first chapter?</h2>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link href="/contact" className="bg-primary text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-primary-active transition-all hover:scale-105 shadow-xl shadow-primary/20">
                    Plan Your Journey
                  </Link>
                  <Link href="/tours" className="text-ink font-bold group flex items-center gap-2">
                    Browse Signature Tours
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2 group-hover:translate-x-1 transition-transform" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
             </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
