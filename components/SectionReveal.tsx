"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  delay?: number;
  width?: "fit-content" | "100%";
  className?: string;
}

export default function SectionReveal({ children, delay = 0, width = "100%", className = "" }: SectionRevealProps) {
  return (
    <div className={className} style={{ position: "relative", width, overflow: "visible" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 30, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
          delay: delay,
          ease: [0.16, 1, 0.3, 1] // Liquid cubic-bezier
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
