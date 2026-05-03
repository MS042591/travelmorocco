"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/SectionReveal';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
          <Image 
            src="/travelmorocco/images/tours/architecture-moroccan-archway-with-ornamental-tiles-interior-design.webp" 
            alt="About Travel Morocco Heritage" 
            fill 
            className="object-cover brightness-[0.6] grayscale-[0.1]"
            priority
          />
          <div className="absolute inset-0 bg-black/40 z-[5]" />
          <div className="relative z-10 text-center px-4">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white mb-4 block"
            >
              Our Heritage
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold !text-white tracking-tight font-heading"
            >
              The Soul of <br />
              <span className="italic font-serif text-white/90 text-primary">Our Story</span>
            </motion.h1>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <SectionReveal>
                <div className="space-y-8">
                  <h2 className="text-4xl font-bold text-ink tracking-tight font-heading">Born from a Passion for Discovery</h2>
                  <p className="text-muted text-lg leading-relaxed">
                    Travel Morocco was founded not as a business, but as a calling. It began in the winding alleys of the Fes Medina and the silent expanses of the Sahara, where we realized that the true magic of Morocco isn&apos;t found in guidebooks—it&apos;s found in the warmth of a Berber family&apos;s tea, the intricate stories carved into zellige tiles, and the rhythm of the Atlantic tides.
                  </p>
                  <p className="text-muted text-lg leading-relaxed">
                    Our mission is simple: to bridge the gap between the curious traveler and the authentic soul of the Kingdom. We don&apos;t just provide tours; we curate deep, immersive experiences that leave a lasting mark on your spirit.
                  </p>
                  <div className="pt-4">
                    <div className="flex items-center gap-4">
                      <div className="h-px w-12 bg-primary"></div>
                      <span className="text-sm font-bold text-ink uppercase tracking-widest">Hand-Crafted Since 2012</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>

              <div className="relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image 
                  src="/travelmorocco/images/tours/traveling-by-morocco-happy-young-woman-in-traditional-riad-interior-in-medina.webp" 
                  alt="Exploring Morocco" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-24 bg-surface-soft">
          <div className="container mx-auto px-4 md:px-8 lg:px-20">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold text-ink mb-6 font-heading">Our Guided Principles</h2>
              <p className="text-muted">Every itinerary we build and every mile we travel is rooted in these four core values.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Authenticity", desc: "We bypass the tourist traps to show you the real, unfiltered Morocco.", icon: "🏺" },
                { title: "Expertise", desc: "Our local guides are storytellers with decades of ancestral knowledge.", icon: "📖" },
                { title: "Impact", desc: "We support local artisans and communities to ensure sustainable tourism.", icon: "🤝" }
              ].map((value, i) => (
                <motion.div 
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{value.icon}</div>
                  <h3 className="text-xl font-bold text-ink mb-4">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
