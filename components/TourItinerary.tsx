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
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7 lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-14 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
                    Day {item.day}
                  </span>
                  <h4 className="text-xl font-bold text-ink group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h4>
                </div>
                <div className="prose prose-sm max-w-xl text-muted-soft leading-relaxed">
                  <ReactMarkdown>{item.description}</ReactMarkdown>
                </div>
              </div>
              {item.image && (
                <div className="md:col-span-5 lg:col-span-4 mt-2">
                  <div className="aspect-[16/10] md:aspect-[4/3] rounded-airbnb-md overflow-hidden shadow-sm hover:shadow-airbnb transition-all duration-500">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
