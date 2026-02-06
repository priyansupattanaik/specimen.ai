"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface RedactedTextProps {
  text: string;
}

export const RedactedText = ({ text }: RedactedTextProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sound effect simulation (visual only for now, can add Audio later)
  const handleReveal = () => {
    setIsRevealed(true);
  };

  return (
    <motion.span
      className={`relative inline-block px-1 mx-1 align-middle cursor-pointer overflow-hidden rounded-sm transition-all duration-300 ${
        isRevealed 
          ? "bg-transparent text-federal font-bold" 
          : "bg-xerox hover:bg-xerox/90 text-transparent select-none"
      } ${isHovered && !isRevealed ? "animate-pulse" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleReveal}
      title={isRevealed ? "Decrypted" : "Click to decrypt"}
    >
      {/* The Actual Text */}
      <span className="relative z-10">
        {isRevealed ? text : "REDACTED"}
      </span>

      {/* Static Noise Overlay (When hovered but not revealed) */}
      {!isRevealed && isHovered && (
        <motion.span
          className="absolute inset-0 bg-noise opacity-50 z-20 pointer-events-none"
          animate={{ x: [-2, 2, -1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
        />
      )}
      
      {/* Scanline for "Decrypted" effect */}
      {isRevealed && (
         <motion.span 
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           className="absolute bottom-0 left-0 right-0 h-[1px] bg-federal"
         />
      )}
    </motion.span>
  );
};
