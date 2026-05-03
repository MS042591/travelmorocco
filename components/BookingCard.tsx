"use client";

import { useState } from 'react';
import TourBookingButton from './TourBookingButton';

interface BookingCardProps {
  price: string;
  tourTitle: string;
}

export default function BookingCard({ price, tourTitle }: BookingCardProps) {
  const [guests, setGuests] = useState(1);
  const basePrice = parseInt(price.replace(/[^0-9]/g, '')) || 0;
  const totalPrice = basePrice * guests;

  return (
    <div className="bg-white rounded-airbnb-md p-6 shadow-airbnb border border-hairline">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-xl font-bold text-ink">${basePrice}</span>
          <span className="text-muted text-sm ml-1">per person</span>
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        <div className="grid grid-cols-1 border border-hairline rounded-airbnb-sm overflow-hidden divide-y divide-hairline shadow-sm">
          <div className="p-3 flex flex-col hover:bg-surface-soft transition-colors group relative">
            <span className="text-[10px] font-extrabold uppercase text-ink tracking-wider mb-1">Preferred Date</span>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-muted group-hover:fill-primary transition-colors"><path d="M25 3h-2V1h-2v2H11V1H9v2H7a4.012 4.012 0 0 0-4 4v18a4.012 4.012 0 0 0 4 4h18a4.012 4.012 0 0 0 4-4V7a4.012 4.012 0 0 0-4-4zm2 22a2.006 2.006 0 0 1-2 2H7a2.006 2.006 0 0 1-2-2V13h22zm0-14H5V7a2.006 2.006 0 0 1 2-2h2v2h2V5h10v2h2V5h2a2.006 2.006 0 0 1 2 2z"></path></svg>
              <input 
                type="date" 
                className="text-sm font-semibold text-ink bg-transparent border-none p-0 focus:ring-0 cursor-pointer w-full focus:outline-none appearance-none"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            {/* Overlay to handle the click anywhere in the box */}
            <div className="absolute inset-0 pointer-events-none" />
          </div>
          <div className="p-3 flex flex-col hover:bg-surface-soft transition-colors">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase text-ink">Guests</span>
                <span className="text-sm text-ink font-medium">{guests} {guests === 1 ? 'guest' : 'guests'}</span>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center hover:border-ink transition-colors"
                >
                  -
                </button>
                <button 
                  onClick={() => setGuests(Math.min(10, guests + 1))}
                  className="w-8 h-8 rounded-full border border-hairline flex items-center justify-center hover:border-ink transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TourBookingButton tourTitle={tourTitle} />
      
      <p className="text-center text-[12px] text-muted mt-4 font-medium italic">You won&apos;t be charged yet</p>
      
      <div className="mt-6 pt-6 border-t border-hairline space-y-4">
        <div className="flex justify-between text-ink text-sm">
          <span className="underline">${basePrice} x {guests} {guests === 1 ? 'guest' : 'guests'}</span>
          <span>${totalPrice}</span>
        </div>
        <div className="flex justify-between text-ink text-sm">
          <span className="underline">Service fee</span>
          <span>$0</span>
        </div>
        <div className="flex justify-between font-bold text-ink text-lg pt-4 border-t border-hairline">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
