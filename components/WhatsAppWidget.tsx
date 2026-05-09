"use client";

import { useState, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tooltip after a delay, but only if the chat isn't already open
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const phoneNumber = "212699048087";
  const message = "Hi! I'm interested in planning a trip to Morocco. Could you help me?";

  const handleStartChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-80 overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] pointer-events-auto"
          >
            {/* Header */}
            <div className="bg-primary p-7 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/10">
                     <MessageCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base leading-none mb-1">Travel Morocco</h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest font-black">Typically replies in minutes</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 p-2 rounded-full transition-colors focus:outline-none"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Body */}
            <div className="p-8 space-y-6">
              <div className="bg-surface-soft p-5 rounded-3xl rounded-tl-none border border-hairline-soft shadow-sm">
                <p className="text-[15px] text-ink leading-relaxed">
                  Salam! How can we help you plan your perfect Moroccan adventure today? 🇲🇦
                </p>
              </div>
              
              <button 
                onClick={handleStartChat}
                className="w-full bg-[#25D366] text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group focus:outline-none"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Start WhatsApp Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button & Tooltip */}
      <div className="relative pointer-events-auto">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-white px-5 py-3 rounded-2xl shadow-airbnb border border-hairline whitespace-nowrap hidden sm:block"
            >
              <p className="text-sm font-bold text-ink">Chat with our experts!</p>
              <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-hairline rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 focus:outline-none ${
            isOpen ? 'bg-ink text-white' : 'bg-primary text-white'
          }`}
          aria-label={isOpen ? "Close WhatsApp Chat" : "Open WhatsApp Chat"}
        >
          {isOpen ? <X className="w-8 h-8" /> : (
            <div className="relative">
               <MessageCircle className="w-8 h-8" />
               <motion.span 
                 animate={{ scale: [1, 1.2, 1] }}
                 transition={{ repeat: Infinity, duration: 2 }}
                 className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"
               ></motion.span>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
