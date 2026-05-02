"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
    }, 3000);
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
            className="absolute inset-0 bg-slate/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/20"
          >
            <div className="absolute top-6 right-6">
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate" />
              </button>
            </div>

            <div className="p-8 md:p-12">
              {!isSubmitted ? (
                <>
                  <h2 className="text-3xl font-bold text-slate mb-2">Book Your Adventure</h2>
                  <p className="text-gray-500 mb-8">Tell us about your dream trip to Morocco.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-slate mb-2 uppercase tracking-wider">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-terracotta transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate mb-2 uppercase tracking-wider">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-terracotta transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate mb-2 uppercase tracking-wider">Travelers</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-terracotta transition-colors">
                          <option>1-2 Person</option>
                          <option>3-5 People</option>
                          <option>Group (6+)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate mb-2 uppercase tracking-wider">Duration</label>
                        <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-terracotta transition-colors">
                          <option>3-5 Days</option>
                          <option>1 Week</option>
                          <option>2 Weeks+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate mb-2 uppercase tracking-wider">Special Requests</label>
                      <textarea 
                        rows={3}
                        placeholder="Sahara trek, dietary requirements, etc."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 focus:outline-none focus:border-terracotta transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-terracotta text-white font-bold py-4 rounded-xl shadow-lg shadow-terracotta/20 hover:bg-[#d1624b] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Send Request
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-slate mb-2">Request Received!</h2>
                  <p className="text-gray-500">Our local experts will contact you within 24 hours.</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
