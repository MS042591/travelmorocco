"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: 'contact' }),
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-surface-soft p-8 md:p-16 rounded-[3rem] border border-hairline shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-ink ml-1">Your Name</label>
            <input 
              required
              type="text" 
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full bg-white border border-hairline rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-ink ml-1">Email Address</label>
            <input 
              required
              type="email" 
              id="email"
              name="email"
              placeholder="john@example.com"
              className="w-full bg-white border border-hairline rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-ink ml-1">Subject</label>
          <select 
            id="subject"
            name="subject"
            className="w-full bg-white border border-hairline rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all shadow-sm appearance-none"
          >
            <option>Plan a custom tour</option>
            <option>Inquiry about existing tour</option>
            <option>Business partnership</option>
            <option>Other questions</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-ink ml-1">Your Message</label>
          <textarea 
            required
            id="message"
            name="message"
            rows={6}
            placeholder="Tell us about your dream trip to Morocco..."
            className="w-full bg-white border border-hairline rounded-2xl px-6 py-4 focus:border-primary focus:outline-none transition-all shadow-sm resize-none"
          ></textarea>
        </div>

        <button 
          disabled={status === 'sending'}
          type="submit"
          className="w-full bg-primary text-white font-bold py-5 rounded-2xl shadow-lg hover:bg-primary-active hover:scale-[1.02] active:scale-[0.98] transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-emerald-600 font-bold text-center animate-fade-in">Shukran! Your message has been sent successfully.</p>
        )}
        {status === 'error' && (
          <p className="text-rose-600 font-bold text-center animate-fade-in">Oops! Something went wrong. Please try again or contact us via WhatsApp.</p>
        )}
      </form>
    </div>
  );
}
