"use client";

import dynamic from 'next/dynamic';

const DiscoveryMap = dynamic(() => import('./DiscoveryMap'), { 
  ssr: false,
  loading: () => <div className="h-[600px] w-full bg-surface-soft animate-pulse rounded-[3rem]" />
});

export default function MapClientWrapper() {
  return <DiscoveryMap />;
}
