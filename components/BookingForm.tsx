"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

interface BookingFormProps {
  tourTitle: string;
}

export default function BookingForm({ tourTitle }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tour: tourTitle,
    travelers: '1-2 Person',
    timing: 'This Month',
    requests: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError(null);
    
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    
    try {
      const response = await fetch("/api/contact.php", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'booking' })
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsSending(false);
          setFormData(prev => ({ ...prev, name: '', email: '', phone: '', requests: '' }));
        }, 8000);
      } else {
        setError("Failed to send. Please try WhatsApp.");
        setIsSending(false);
      }
    } catch (err) {
      setError("Network error. Please try WhatsApp.");
      setIsSending(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-airbnb-md p-8 md:p-12 border border-hairline shadow-airbnb text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
          </svg>
        </motion.div>
        <h2 className="text-3xl font-bold text-ink mb-4">Shukran!</h2>
        <p className="text-muted font-medium">Your request for <strong>{tourTitle}</strong> has been sent. Our experts will contact you shortly.</p>
      </div>
    );
  }

  return (
    <div id="booking-form" className="bg-white rounded-airbnb-md p-8 border border-hairline shadow-airbnb">
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@example.com"
              className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Phone Number</label>
          <input 
            name="phone"
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
            className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm"
          />
        </div>

        <input type="hidden" name="tour" value={formData.tour} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">Travelers</label>
            <select 
              name="travelers" 
              value={formData.travelers}
              onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
              className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm appearance-none"
            >
              <option>1-2 Person</option>
              <option>3-5 People</option>
              <option>Group (6+)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-muted ml-1">When</label>
            <select 
              name="timing" 
              value={formData.timing}
              onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
              className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm appearance-none"
            >
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
            value={formData.requests}
            onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
            placeholder="Dietary needs, preferred cities, etc."
            className="w-full bg-white border border-hairline rounded-airbnb-sm px-4 py-3 focus:border-ink focus:outline-none transition-all text-sm resize-none"
          ></textarea>
        </div>

        <button 
          disabled={isSending}
          type="submit"
          className="w-full bg-primary text-white font-bold py-4 rounded-airbnb-sm shadow-sm hover:bg-primary-active transition-all active:scale-95 text-lg disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Reserve now'}
        </button>
        {error && <p className="text-xs text-rose-600 text-center mt-2 font-bold">{error}</p>}
      </form>
    </div>
  );
}
