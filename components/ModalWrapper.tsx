"use client";

import { useModal } from "@/lib/ModalContext";
import BookingModal from "./BookingModal";

export default function ModalWrapper() {
  const { isBookingOpen, closeBooking } = useModal();
  
  return (
    <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
  );
}
