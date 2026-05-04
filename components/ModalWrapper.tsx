"use client";

import { useModal } from "@/lib/ModalContext";
import dynamic from 'next/dynamic';
const BookingModal = dynamic(() => import('./BookingModal'), { ssr: false });
const TripPlannerModal = dynamic(() => import('./TripPlannerModal'), { ssr: false });

export default function ModalWrapper() {
  const { isBookingOpen, closeBooking, isPlannerOpen, closePlanner } = useModal();
  
  return (
    <>
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      <TripPlannerModal isOpen={isPlannerOpen} onClose={closePlanner} />
    </>
  );
}
