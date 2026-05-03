"use client";

import ReactMarkdown from 'react-markdown';

interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  image?: string;
}

interface TourItineraryProps {
  itinerary: ItineraryItem[];
  duration: string;
}

export default function TourItinerary({ itinerary, duration }: TourItineraryProps) {
  if (!itinerary || itinerary.length === 0) return null;

  return (
    <div id="itinerary" className="pb-16 border-b border-hairline">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold text-ink tracking-tight">Your Detailed Journey</h2>
        <span className="px-4 py-1.5 bg-surface-soft rounded-full text-[11px] font-bold text-ink border border-hairline uppercase tracking-wider">
          {duration} Experience
        </span>
      </div>
      <div className="space-y-0 relative">
        {/* Vertical Line */}
        <div className="absolute left-3 top-2 bottom-8 w-px bg-gradient-to-b from-primary via-hairline to-hairline/20 hidden md:block" />
        
        {itinerary.map((item, idx) => (
          <div key={idx} className="relative pl-0 md:pl-12 pb-12 last:pb-0 group">
            {/* Day Indicator Dot */}
            <div className="absolute left-2 md:left-2 top-1.5 w-3 h-3 rounded-full border-2 border-primary bg-white group-hover:bg-primary transition-all duration-300 hidden md:block z-10" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-14 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                  Day {item.day}
                </span>
                <h4 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
              </div>
              <div className="prose prose-sm max-w-3xl text-muted-soft leading-relaxed">
                <ReactMarkdown>{item.description}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
