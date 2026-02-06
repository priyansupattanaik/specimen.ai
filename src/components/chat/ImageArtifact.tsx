"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageArtifactProps {
  src: string;
  prompt: string;
}

export const ImageArtifact = ({ src, prompt }: ImageArtifactProps) => {
  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
      animate={{ scale: 1, opacity: 1, rotate: 0 }}
      className="relative max-w-sm mt-2 mb-4 group"
    >
      {/* The "Physical" Photo Paper Container */}
      <div className="bg-newsprint p-3 pb-8 shadow-[4px_4px_10px_rgba(0,0,0,0.2)] border border-xerox/20 rotate-1 group-hover:rotate-0 transition-transform duration-300">
        
        {/* The Image Itself */}
        <div className="relative aspect-square w-full bg-xerox/10 overflow-hidden border border-xerox/10">
           <Image 
             src={src} 
             alt={prompt}
             fill
             unoptimized={true} // <--- CRITICAL FIX: Bypasses Next.js server proxy (Fixes 502)
             className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
           />
           
           {/* Scanline Overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,6px_100%] pointer-events-none" />
        </div>

        {/* The Handwritten Label */}
        <div className="mt-2 font-marker text-xs text-federal/80 truncate px-1">
          FIG A. "{prompt}"
        </div>

        {/* "Paper Clip" Visual (CSS Art) */}
        <div className="absolute -top-3 right-8 w-4 h-12 border-2 border-xerox/60 rounded-full z-20" style={{ borderRadius: '10px' }} />
      </div>

    </motion.div>
  );
};