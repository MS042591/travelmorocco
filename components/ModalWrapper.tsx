"use client";

import { useModal } from "@/lib/ModalContext";
import dynamic from 'next/dynamic';
const BookingModal = dynamic(() => import('./BookingModal'), { ssr: false });

export default function ModalWrapper() {
  const { isBookingOpen, closeBooking } = useModal();
  
  return (
    <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
  );
}
