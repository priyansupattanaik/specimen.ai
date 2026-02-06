"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface HalftonePortraitProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export const HalftonePortrait = ({ src, alt, priority = false, className = "" }: HalftonePortraitProps) => {
  return (
    <div className={`relative w-full aspect-square overflow-hidden bg-federal/10 border-2 border-xerox ${className}`}>
      {/* 1. The Base Image (Grayscale & High Contrast) */}
      <motion.div 
        className="absolute inset-0"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.4 }}
      >
        <Image 
          src={src} 
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-top"
        />
      </motion.div>

      {/* 2. The Halftone Pattern Overlay (REMOVED for Full Color) */}

      {/* 3. The "Ink Bleed" Glitch Layers (Visible on Hover) */}
      <motion.div 
        className="absolute inset-0 z-0 bg-fluorescic mix-blend-screen opacity-0"
        whileHover={{ x: 3, opacity: 0.4 }}
      />
      <motion.div 
        className="absolute inset-0 z-0 bg-cyan-err mix-blend-screen opacity-0"
        whileHover={{ x: -3, opacity: 0.4 }}
      />
    </div>
  );
};