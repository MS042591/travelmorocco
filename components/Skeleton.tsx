"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden bg-surface-strong ${className}`}>
      <motion.div
        initial={{ left: "-100%" }}
        animate={{ left: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
      />
    </div>
  );
}
