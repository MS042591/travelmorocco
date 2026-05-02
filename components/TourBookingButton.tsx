"use client";

import { useModal } from '@/lib/ModalContext';

export default function TourBookingButton({ tourTitle }: { tourTitle: string }) {
  const { openBooking } = useModal();

  return (
    <button 
      onClick={() => openBooking(tourTitle)}
      className="w-full bg-primary text-white py-3.5 rounded-airbnb-sm font-semibold text-base hover:bg-primary-active transition-all active:scale-95"
    >
      Reserve this tour
    </button>
  );
}
