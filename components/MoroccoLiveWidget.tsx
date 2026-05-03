"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function MoroccoLiveWidget() {
  const [time, setTime] = useState('');
  const [weather] = useState({
    temp: 24,
    condition: 'Golden Sun',
    city: 'Marrakesh'
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const moroccoTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Africa/Casablanca',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setTime(moroccoTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-strong/50 backdrop-blur-sm border border-hairline rounded-airbnb-md p-4 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-primary"><path d="M16 31c-8.28 0-15-6.72-15-15s6.72-15 15-15 15 6.72 15 15-6.72 15-15 15zm0-28c-7.17 0-13 5.83-13 13s5.83 13 13 13 13-5.83 13-13-5.83-13-13-13zm-1 7h2v9h-2zm0 11h2v2h-2z"></path></svg>
        </div>
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">Local Time</h4>
          <p className="text-sm font-bold text-ink">{time || 'Loading...'}</p>
        </div>
      </div>
      
      <div className="h-8 w-px bg-hairline" />

      <div className="flex items-center gap-4 text-right">
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted">{weather.city}</h4>
          <p className="text-sm font-bold text-ink">{weather.temp}°C • {weather.condition}</p>
        </div>
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
          <span className="text-xl">☀️</span>
        </div>
      </div>
    </motion.div>
  );
}
