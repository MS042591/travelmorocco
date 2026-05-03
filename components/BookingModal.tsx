"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useModal } from '@/lib/ModalContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { selectedTour } = useModal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tour: '',
    travelers: '1-2 Person',
    duration: '3-5 Days',
    requests: ''
  });

  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, tour: selectedTour }));
    }
  }, [isOpen, selectedTour]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get form data
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    
    try {
      const response = await fetch("https://formspree.io/f/sardaoui.m@gmail.com", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setIsSubmitted(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-airbnb-md shadow-airbnb overflow-hidden border border-hairline"
          >
            <div className="absolute top-6 left-6 z-10">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-surface-soft rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-ink" />
              </button>
            </div>

            <div className="p-8 md:p-12">
              {!isSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold text-ink mb-2 tracking-tight">Reserve your journey</h2>
                  <p className="text-sm text-muted mb-8">Tell us about your trip and we&apos;ll handle the rest.</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Your Name</label>
                        <input 
                          required
                          name="name"
                          type="text" 
                          placeholder="Full Name"
                          className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Email</label>
                        <input 
                          required
                          name="email"
                          type="email" 
                          placeholder="email@example.com"
                          className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Selected Tour</label>
                      <input 
                        type="text" 
                        name="tour"
                        value={formData.tour}
                        onChange={(e) => setFormData({ ...formData, tour: e.target.value })}
                        placeholder="e.g. Sahara Desert Trek"
                        className="w-full bg-surface-soft border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm font-semibold text-ink"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Travelers</label>
                        <select name="travelers" className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm appearance-none">
                          <option>1-2 Person</option>
                          <option>3-5 People</option>
                          <option>Group (6+)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">When</label>
                        <select name="timing" className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm appearance-none">
                          <option>This Month</option>
                          <option>Next 3 Months</option>
                          <option>Later this year</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Special Requests</label>
                      <textarea 
                        name="requests"
                        rows={3}
                        placeholder="Dietary needs, preferred cities, etc."
                        className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-airbnb-sm shadow-sm hover:bg-primary-active transition-all active:scale-95 text-base"
                    >
                      Reserve now
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                  <h2 className="text-4xl font-bold text-ink mb-4">Shukran!</h2>
                  <p className="text-muted font-medium">Your request has been sent. Our experts will contact you shortly.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
