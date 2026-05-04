"use client";

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isBookingOpen: boolean;
  selectedTour: string;
  openBooking: (tourTitle?: string) => void;
  closeBooking: () => void;
  isPlannerOpen: boolean;
  openPlanner: () => void;
  closePlanner: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState('');
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  const openBooking = (tourTitle?: string) => {
    if (tourTitle) setSelectedTour(tourTitle);
    else setSelectedTour('');
    setIsBookingOpen(true);
  };
  
  const closeBooking = () => {
    setIsBookingOpen(false);
    setSelectedTour('');
  };

  const openPlanner = () => {
    setIsPlannerOpen(true);
  };

  const closePlanner = () => {
    setIsPlannerOpen(false);
  };

  return (
    <ModalContext.Provider value={{ 
      isBookingOpen, selectedTour, openBooking, closeBooking,
      isPlannerOpen, openPlanner, closePlanner
    }}>
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
