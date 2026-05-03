"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Next.js
const fixLeafletIcons = () => {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/icons/leaflet/marker-icon-2x.png',
    iconUrl: '/icons/leaflet/marker-icon.png',
    shadowUrl: '/icons/leaflet/marker-shadow.png',
  });
};

interface RouteMapProps {
  tourTitle: string;
  route?: string[];
  itinerary?: { day: number; title: string; description: string }[];
}

// Comprehensive coordinates for Moroccan cities/locations
const cityCoords: Record<string, [number, number]> = {
  "Casablanca": [33.5731, -7.5898],
  "Marrakech": [31.6295, -7.9811],
  "Fes": [34.0181, -5.0078],
  "Merzouga": [31.0801, -4.0118],
  "Chefchaouen": [35.1688, -5.2636],
  "Tangier": [35.7595, -5.8340],
  "Rabat": [34.0209, -6.8416],
  "Ait Ben Haddou": [31.0418, -7.1331],
  "Ouarzazate": [30.9189, -6.9325],
  "Essaouira": [31.5085, -9.7595],
  "Agadir": [30.4278, -9.5981],
  "Tetouan": [35.5785, -5.3684],
  "Asilah": [35.4646, -6.0311],
  "Ifrane": [33.5333, -5.1167],
  "Azrou": [33.4333, -5.2167],
  "Midelt": [32.6833, -4.7333],
  "Erfoud": [31.4333, -4.2333],
  "Rissani": [31.2847, -4.2694],
  "Skoura": [31.0667, -6.5500],
  "Boumalne Dades": [31.3753, -5.9839],
  "Dades Valley": [31.3753, -5.9839],
  "Tinghir": [31.5167, -5.5333],
  "Todra Gorge": [31.5500, -5.5833],
  "Agdz": [30.6931, -6.4447],
  "Zagora": [30.3333, -5.8333],
  "M'hamid": [29.8239, -5.7225],
  "Imlil": [31.1350, -7.9231],
  "Ourika": [31.3333, -7.7833],
  "Ourika Valley": [31.3333, -7.7833],
  "Agafay": [31.4833, -8.2167],
  "Agafay Desert": [31.4833, -8.2167],
  "Volubilis": [34.0722, -5.5542],
  "Meknes": [33.8935, -5.5473],
  "Moulay Idriss": [34.0575, -5.5539],
  "Erg Chigaga": [29.8333, -6.1667],
};

const getRoute = (title: string, customRoute?: string[], itinerary?: any[]): [number, number][] => {
  // 1. Use custom route if explicitly provided in frontmatter
  if (customRoute && customRoute.length > 0) {
    const coords = customRoute
      .map(city => cityCoords[city])
      .filter(coord => !!coord);
    if (coords.length > 0) return coords;
  }

  // 2. Try to extract locations from itinerary
  if (itinerary && itinerary.length > 0) {
    const extractedCoords: [number, number][] = [];
    const seenCities = new Set<string>();

    itinerary.forEach(item => {
      const fullText = (item.title + " " + item.description).toLowerCase();
      
      // Find all cities mentioned in this day's text and their positions
      const dayCities = Object.keys(cityCoords)
        .map(city => ({
          name: city,
          index: fullText.indexOf(city.toLowerCase())
        }))
        .filter(item => item.index !== -1 && !seenCities.has(item.name))
        .sort((a, b) => a.index - b.index);

      dayCities.forEach(cityItem => {
        extractedCoords.push(cityCoords[cityItem.name]);
        seenCities.add(cityItem.name);
      });
    });

    if (extractedCoords.length >= 2) {
      return extractedCoords;
    }
  }

  // 3. Smart Keyword Detection based on Title
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('casablanca') && lowerTitle.includes('imperial')) {
    return [cityCoords["Casablanca"], cityCoords["Rabat"], cityCoords["Meknes"], cityCoords["Fes"], cityCoords["Marrakech"]];
  }
  if (lowerTitle.includes('fes') && lowerTitle.includes('merzouga')) {
    return [cityCoords["Fes"], cityCoords["Midelt"], cityCoords["Erfoud"], cityCoords["Merzouga"]];
  }
  if (lowerTitle.includes('marrakech') && lowerTitle.includes('fes')) {
    return [cityCoords["Marrakech"], cityCoords["Ouarzazate"], cityCoords["Boumalne Dades"], cityCoords["Merzouga"], cityCoords["Midelt"], cityCoords["Fes"]];
  }
  if (lowerTitle.includes('marrakech') && lowerTitle.includes('merzouga')) {
    return [cityCoords["Marrakech"], cityCoords["Ouarzazate"], cityCoords["Boumalne Dades"], cityCoords["Merzouga"]];
  }
  if (lowerTitle.includes('chefchaouen')) {
    if (lowerTitle.includes('marrakech')) return [cityCoords["Marrakech"], cityCoords["Rabat"], cityCoords["Chefchaouen"]];
    if (lowerTitle.includes('tangier')) return [cityCoords["Tangier"], cityCoords["Tetouan"], cityCoords["Chefchaouen"]];
    if (lowerTitle.includes('casablanca')) return [cityCoords["Casablanca"], cityCoords["Rabat"], cityCoords["Chefchaouen"]];
  }
  if (lowerTitle.includes('essaouira')) {
    if (lowerTitle.includes('marrakech')) return [cityCoords["Marrakech"], cityCoords["Essaouira"]];
    if (lowerTitle.includes('casablanca')) return [cityCoords["Casablanca"], cityCoords["Essaouira"]];
  }
  if (lowerTitle.includes('casablanca') && lowerTitle.includes('marrakech')) {
    return [cityCoords["Marrakech"], cityCoords["Casablanca"]];
  }
  if (lowerTitle.includes('agafay')) return [cityCoords["Marrakech"], cityCoords["Agafay"]];
  if (lowerTitle.includes('ourika')) return [cityCoords["Marrakech"], cityCoords["Ourika"]];
  if (lowerTitle.includes('imlil')) return [cityCoords["Marrakech"], cityCoords["Imlil"]];
  if (lowerTitle.includes('zagora')) return [cityCoords["Marrakech"], cityCoords["Ouarzazate"], cityCoords["Zagora"]];
  if (lowerTitle.includes('chigaga')) return [cityCoords["Marrakech"], cityCoords["Ouarzazate"], cityCoords["Zagora"], cityCoords["Erg Chigaga"]];

  // 4. Default Fallback
  return [cityCoords["Marrakech"], cityCoords["Casablanca"], cityCoords["Rabat"], cityCoords["Fes"]];
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function RouteMap({ tourTitle, route: customRoute, itinerary }: RouteMapProps) {
  const [isMounted, setIsMounted] = useState(false);
  const route = getRoute(tourTitle, customRoute, itinerary);
  const center = route.length > 0 ? route[Math.floor(route.length / 2)] : cityCoords["Marrakech"];

  useEffect(() => {
    setIsMounted(true);
    fixLeafletIcons();
  }, []);

  if (!isMounted) {
    return (
      <div className="relative aspect-[16/9] w-full bg-surface-soft rounded-2xl border border-hairline flex items-center justify-center">
        <p className="text-sm font-bold text-ink">Loading Map...</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full rounded-2xl border border-hairline overflow-hidden z-0">
      <MapContainer 
        center={center} 
        zoom={6} 
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.webp"
        />
        <Polyline positions={route} color="#c2410c" weight={3} opacity={0.6} dashArray="5, 10" />
        {route.map((pos, idx) => (
          <Marker key={idx} position={pos}>
            <Popup>
              <span className="font-bold">{Object.keys(cityCoords).find(key => cityCoords[key] === pos) || "Stop"}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeView center={center} zoom={6} />
      </MapContainer>
    </div>
  );
}
