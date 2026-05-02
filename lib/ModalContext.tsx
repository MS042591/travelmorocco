"use client";

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isBookingOpen: boolean;
  selectedTour: string;
  openBooking: (tourTitle?: string) => void;
  closeBooking: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');

  const openBooking = (tourTitle?: string) => {
    if (tourTitle) setSelectedTour(tourTitle);
    else setSelectedTour('');
    setIsBookingOpen(true);
  };
  
  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedTour('');
  };

  return (
    <ModalContext.Provider value={{ isBookingOpen, selectedTour, openBooking, closeBooking }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
