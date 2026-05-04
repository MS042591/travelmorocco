"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  question?: string;
  answer?: string;
  q?: string;
  a?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const question = item.question || item.q;
        const answer = item.answer || item.a;
        
        if (!question || !answer) return null;

        return (
          <div 
            key={index} 
            className="bg-white border border-hairline rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-8 py-6 text-left flex justify-between items-center group"
            >
              <span className="text-lg font-bold text-ink tracking-tight font-heading group-hover:text-primary transition-colors">
                {question}
              </span>
            <span className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-muted stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </span>
          </button>
          
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className="px-8 pb-8 text-muted leading-relaxed">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        );
      })}
    </div>
  );
}
