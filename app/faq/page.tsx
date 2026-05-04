"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import SectionReveal from '@/components/SectionReveal';
import PlannerButton from '@/components/PlannerButton';
import { motion, AnimatePresence } from 'framer-motion';
import UniversalHero from '@/components/UniversalHero';

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const faqData = [
    {
      category: "Logistics",
      items: [
        {
          question: "Do I need a visa to visit Morocco?",
          answer: "Citizens of the US, UK, EU, Canada, and Australia do not currently need a visa for stays up to 90 days. Your passport must be valid for at least six months beyond your date of entry."
        },
        {
          question: "What is the official currency?",
          answer: "The Moroccan Dirham (MAD) is the official currency. It is a closed currency, meaning you can only get it once you arrive. ATMs are widely available, and credit cards are accepted in hotels and upscale restaurants."
        },
        {
          question: "What is the best way to travel between cities?",
          answer: "The ONCF train network (including the high-speed Al Boraq) is excellent for major cities. For remote areas like the Sahara or Chefchaouen, our private drivers or national bus lines (CTM) are the best options."
        }
      ]
    },
    {
      category: "Culture",
      items: [
        {
          question: "What should I wear as a traveler?",
          answer: "Morocco is conservative. We recommend dressing modestly—covering shoulders and knees—especially in rural areas. Loose, breathable fabrics are best for the climate."
        },
        {
          question: "How does tipping work in Morocco?",
          answer: "Tipping (baksheesh) is deeply ingrained. A standard tip for a private driver is $20-$30 per day. In restaurants, a 10% tip is appreciated if service is not included."
        },
        {
          question: "Is alcohol widely available?",
          answer: "While Muslim, Morocco serves alcohol in licensed hotels, bars, and tourist restaurants. It is not generally served in local cafes, and public consumption outside venues is frowned upon."
        }
      ]
    },
    {
      category: "Safety",
      items: [
        {
          question: "Is Morocco safe for solo female travelers?",
          answer: "Yes, Morocco is generally very safe. Common sense applies—avoid walking alone late at night in unfamiliar medina alleys. Dressing modestly also helps minimize unwanted attention."
        },
        {
          question: "Can I drink the tap water?",
          answer: "We highly recommend sticking to bottled or filtered water to avoid stomach upsets. Even for brushing teeth, bottled water is the safer choice for visitors."
        }
      ]
    },
    {
      category: "Planning",
      items: [
        {
          question: "How far in advance should I book?",
          answer: "For the best riads and desert camps, 3 to 6 months is ideal, especially for travel in Spring or Autumn. We can handle last-minute requests, but choice may be limited."
        },
        {
          question: "Are your tours private or group-based?",
          answer: "We specialize exclusively in private, bespoke journeys. You will have a dedicated vehicle and driver-guide, ensuring total privacy and flexibility."
        }
      ]
    }
  ];

  const categories = ['All', ...faqData.map(d => d.category)];
  
  const filteredData = activeCategory === 'All' 
    ? faqData 
    : faqData.filter(d => d.category === activeCategory);

  return (
    <>
      <Navbar />
      <main className="bg-canvas">
        <UniversalHero 
          subtitle="Support & Planning"
          title="Essential Travel FAQ"
          image="/images/tours/a-luxury-camp-in-the-moroccan-sahara-desert-near-erg-chebbi.webp"
        />

        <div className="container mx-auto px-4 md:px-8 lg:px-20 py-32">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <SectionReveal>
              <h2 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8">The Master FAQ</h2>
              <p className="text-muted text-xl leading-relaxed font-medium italic">
                Everything you need to know, organized for clarity. Select a category to filter your questions.
              </p>
            </SectionReveal>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-ink text-white shadow-xl scale-105' 
                    : 'bg-white text-ink border border-hairline hover:bg-canvas'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-16"
              >
                {filteredData.map((group, i) => (
                  <div key={i}>
                    <h3 className="text-2xl font-bold text-ink mb-10 font-heading border-b border-hairline pb-4 flex items-center justify-between">
                      {group.category}
                      <span className="text-[10px] text-muted-soft uppercase tracking-[0.3em] font-black">{group.items.length} Questions</span>
                    </h3>
                    <FAQAccordion items={group.items} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Need More Help */}
            <SectionReveal>
              <div className="mt-40 p-16 md:p-24 bg-ink rounded-[4rem] text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">Still have a unique question?</h3>
                  <p className="text-white/60 mb-10 max-w-lg mx-auto italic leading-relaxed">
                    Our travel curators are on hand to assist with specific logistical or cultural inquiries for your private journey.
                  </p>
                  <PlannerButton>Talk to an Expert</PlannerButton>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
