"use client";

import { useModal } from "@/lib/ModalContext";

interface PlannerButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PlannerButton({ 
  className = "bg-primary text-white px-12 py-5 rounded-full font-bold hover:bg-primary-active transition-all hover:scale-105 shadow-xl shadow-primary/20",
  children = "Plan Your Journey" 
}: PlannerButtonProps) {
  const { openPlanner } = useModal();

  return (
    <button onClick={openPlanner} className={className}>
      {children}
    </button>
  );
}
