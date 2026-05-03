"use client";

import dynamic from 'next/dynamic';

const RouteMap = dynamic(() => import('./RouteMap'), { 
  ssr: false,
  loading: () => (
    <div className="relative aspect-[16/9] w-full bg-surface-soft rounded-2xl border border-hairline flex items-center justify-center">
      <p className="text-sm font-bold text-ink italic">Loading interactive map...</p>
    </div>
  )
});

interface MapWrapperProps {
  tourTitle: string;
  route?: string[];
  itinerary?: any[];
}

export default function MapWrapper({ tourTitle, route, itinerary }: MapWrapperProps) {
  return <RouteMap tourTitle={tourTitle} route={route} itinerary={itinerary} />;
}
