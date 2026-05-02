'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border-b border-hairline last:border-0 pb-4">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex justify-between items-center py-4 text-left group focus:outline-none"
          >
            <span className="font-bold text-ink group-hover:text-primary transition-colors">
              {item.q}
            </span>
            <span className="ml-4 flex-shrink-0">
              <svg 
                viewBox="0 0 32 32" 
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-4 h-4 fill-ink transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
              >
                <path d="m28 12-12 12-12-12 1.414-1.414L16 21.172l10.586-10.586z"></path>
              </svg>
            </span>
          </button>
          
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <p className="text-body text-sm leading-relaxed pb-4">
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
