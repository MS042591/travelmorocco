"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Option {
  id: string;
  label: string;
  sub: string;
  icon: string;
  image?: string;
}

interface Step {
  id: string;
  question: string;
  options?: Option[];
  isForm?: boolean;
}

interface TripPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEPS: Step[] = [
  {
    id: 'vibe',
    question: "What kind of soul are you seeking?",
    options: [
      { id: 'desert', label: "Desert Nomad", sub: "Silence & Stars", icon: "🏜️", image: "/images/tours/sunset-on-the-dunes-and-camels-of-the-merzouga-desert-in-morocco.webp" },
      { id: 'medina', label: "Medina Explorer", sub: "Culture & Crafts", icon: "🕌", image: "/images/tours/marrakech-djemaa-el-fna-square.webp" },
      { id: 'coastal', label: "Coastal Wanderer", sub: "Ocean & Art", icon: "🌊", image: "/images/tours/blue-wooden-rowboats-port-essaouira-harbor-morocco-north-africa.webp" },
      { id: 'mountain', label: "Mountain Hiker", sub: "Peaks & Villages", icon: "⛰️", image: "/images/tours/stunning-view-of-the-famous-ouika-valley-near-marrakech-morocco-traditional-berber-houses-with-the-high-atlas-mountain-in-the-background.webp" },
    ]
  },
  {
    id: 'duration',
    question: "How much time do you have?",
    options: [
      { id: 'short', label: "3-5 Days", sub: "The Quick Escape", icon: "⏱️" },
      { id: 'medium', label: "7-10 Days", sub: "The Classic Loop", icon: "📅" },
      { id: 'long', label: "14+ Days", sub: "The Grand Journey", icon: "🌍" },
    ]
  },
  {
    id: 'comfort',
    question: "Select your comfort level",
    options: [
      { id: 'authentic', label: "Boutique & Authentic", sub: "Historic Riads", icon: "🕯️" },
      { id: 'premium', label: "Premium Luxury", sub: "5-Star Service", icon: "✨" },
      { id: 'palatial', label: "Palatial Excellence", sub: "Ultra-Exclusive", icon: "👑" },
    ]
  },
  {
    id: 'contact',
    question: "Where should we send your plan?",
    isForm: true
  }
];

export default function TripPlannerModal({ isOpen, onClose }: TripPlannerModalProps) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setSelections({});
        setIsSuccess(false);
      }, 500);
    }
  }, [isOpen]);

  const handleSelect = (id: string, value: any) => {
    setSelections(prev => ({ ...prev, [id]: value }));
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const formProps = Object.fromEntries(formData);
    
    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formProps,
          ...selections,
          type: 'contact',
          subject: 'New Trip Planner Submission'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Submission failed. Please try WhatsApp.");
      }
    } catch (err) {
      alert("Network error. Please try WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepData = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[500px] flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 bg-surface-soft rounded-full hover:bg-surface-strong transition-colors"
            >
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-ink"><path d="m6 6 20 20M26 6 6 26" stroke="currentColor" strokeWidth="3"></path></svg>
            </button>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface-soft">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary"
              />
            </div>

            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6 py-12"
                  >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                      <span className="text-5xl">✨</span>
                    </div>
                    <h2 className="text-3xl font-bold text-ink">Your Story Begins!</h2>
                    <p className="text-muted max-w-sm mx-auto">
                      Our local experts are now crafting your bespoke Moroccan journey. Watch your inbox—the magic is on its way.
                    </p>
                    <button 
                      onClick={onClose}
                      className="bg-ink text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-transform"
                    >
                      Return to Exploration
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Step {step + 1} of {STEPS.length}</span>
                      <h2 className="text-3xl md:text-4xl font-bold text-ink tracking-tight">{currentStepData.question}</h2>
                    </div>

                    {currentStepData.isForm ? (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                          <input 
                            required
                            type="text" 
                            placeholder="Your Name"
                            className="w-full bg-surface-soft border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary transition-all outline-none"
                          />
                          <input 
                            required
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-surface-soft border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary transition-all outline-none"
                          />
                          <textarea 
                            placeholder="Any special wishes for your trip?"
                            rows={4}
                            className="w-full bg-surface-soft border-none rounded-2xl p-5 focus:ring-2 focus:ring-primary transition-all outline-none resize-none"
                          />
                        </div>
                        <button 
                          disabled={isSubmitting}
                          type="submit"
                          className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3"
                        >
                          {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>Generate My Itinerary ✨</>
                          )}
                        </button>
                      </form>
                    ) : (
                      <div className={`grid gap-4 ${currentStepData.id === 'vibe' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                        {currentStepData.options?.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleSelect(currentStepData.id, option.id)}
                            className={`group relative text-left p-6 rounded-3xl border-2 transition-all duration-300 ${
                              selections[currentStepData.id] === option.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-surface-soft bg-surface-soft hover:border-primary/30'
                            } ${currentStepData.id === 'vibe' ? 'h-48' : 'h-32'}`}
                          >
                            {option.image && (
                              <Image 
                                src={option.image} 
                                alt={option.label}
                                fill
                                className="object-cover opacity-10 group-hover:opacity-20 transition-opacity"
                              />
                            )}
                            <div className="relative z-10 flex flex-col h-full justify-between">
                              <span className="text-2xl">{option.icon}</span>
                              <div>
                                <h3 className="font-bold text-ink leading-tight">{option.label}</h3>
                                <p className="text-[10px] text-muted-soft font-bold uppercase tracking-wider mt-1">{option.sub}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {step > 0 && !isSuccess && (
                      <button 
                        onClick={() => setStep(step - 1)}
                        className="text-muted-soft text-xs font-bold uppercase tracking-widest hover:text-ink transition-colors flex items-center gap-2"
                      >
                        ← Back to previous
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
