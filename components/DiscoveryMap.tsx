"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';

// Fix for default marker icons
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
};

const cityData = [
  { name: "Casablanca", coords: [33.5731, -7.5898] as [number, number], desc: "The economic heart and home to the Great Hassan II Mosque." },
  { name: "Marrakech", coords: [31.6295, -7.9811] as [number, number], desc: "The Red City, famous for its vibrant medina and Jemaa el-Fnaa." },
  { name: "Fes", coords: [34.0181, -5.0078] as [number, number], desc: "The spiritual capital with the world's largest car-free urban zone." },
  { name: "Merzouga", coords: [31.0801, -4.0118] as [number, number], desc: "Gateway to the golden dunes of Erg Chebbi and Sahara magic." },
  { name: "Chefchaouen", coords: [35.1688, -5.2636] as [number, number], desc: "The Blue Pearl nestled in the Rif Mountains." },
  { name: "Tangier", coords: [35.7595, -5.8340] as [number, number], desc: "Where the Mediterranean meets the Atlantic." },
  { name: "Essaouira", coords: [31.5085, -9.7595] as [number, number], desc: "The windy city by the sea, a haven for artists and kite-surfers." },
  { name: "Ait Ben Haddou", coords: [31.0418, -7.1331] as [number, number], desc: "Ancient Kasbah and UNESCO World Heritage site." },
  { name: "Ouarzazate", coords: [30.9189, -6.9325] as [number, number], desc: "Morocco's Hollywood and gateway to the Draa Valley." },
  { name: "Rabat", coords: [34.0209, -6.8416] as [number, number], desc: "The elegant capital, a blend of historical depth and modern greenery." },
  { name: "Meknes", coords: [33.8935, -5.5473] as [number, number], desc: "The Versailles of Morocco, home to the legendary Bab Mansour." },
  { name: "Volubilis", coords: [34.0722, -5.5542] as [number, number], desc: "Stunning Roman ruins and ancient mosaics in the Zerhoun mountains." }
];

export default function DiscoveryMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcons();
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[600px] w-full bg-surface-soft rounded-[3rem] border border-hairline flex items-center justify-center">
        <p className="text-ink font-bold animate-pulse">Initializing Morocco Discovery Map...</p>
      </div>
    );
  }

  return (
    <div className="h-[700px] w-full rounded-[4rem] border border-hairline overflow-hidden shadow-2xl relative z-0">
      <MapContainer 
        center={[31.7917, -7.0926]} 
        zoom={6} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.webp"
        />
        
        {cityData.map((city, idx) => (
          <Marker key={idx} position={city.coords}>
            <Popup className="custom-popup">
              <div className="p-2 min-w-[200px]">
                <h3 className="text-xl font-bold text-ink mb-2 font-heading">{city.name}</h3>
                <p className="text-muted text-sm mb-4 italic leading-relaxed">{city.desc}</p>
                <div className="flex flex-col space-y-2">
                   <Link 
                    href={`/destinations/${city.name.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-[10px] font-black uppercase tracking-widest text-center py-2 bg-ink text-white rounded-full hover:bg-primary transition-all"
                  >
                    Explore {city.name}
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend / Overlay */}
      <div className="absolute bottom-10 left-10 z-[400] bg-white/90 backdrop-blur-md p-8 rounded-[2rem] border border-hairline shadow-xl max-w-xs hidden md:block">
        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-4">Interactive Legend</h4>
        <p className="text-ink text-sm font-medium leading-relaxed mb-6">
          Click on any marker to discover the secrets of Morocco&apos;s most iconic destinations and view curated journeys starting from each location.
        </p>
        <div className="flex items-center space-x-3 text-[10px] font-bold text-ink/70">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Major Hubs & Gateways</span>
        </div>
      </div>
    </div>
  );
}
