"use client";

import { useModal } from '@/lib/ModalContext';

interface InquiryButtonProps {
  destinationTitle: string;
}

export default function InquiryButton({ destinationTitle }: InquiryButtonProps) {
  const { openBooking } = useModal();

  return (
    <button 
      onClick={() => openBooking(`Inquiry: ${destinationTitle}`)}
      className="w-full bg-primary text-white py-4 rounded-full font-bold hover:bg-primary-active transition-all active:scale-[0.98]"
    >
      Inquire About {destinationTitle}
    </button>
  );
}
