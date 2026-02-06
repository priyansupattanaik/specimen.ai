"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ZineContainerProps {
  children: React.ReactNode;
}

export const ZineContainer = ({ children }: ZineContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for global parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Background Parallax: The grid moves slower than the content (0.5x speed)
  // We map scroll progress (0 to 1) to vertical pixels
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full pl-16 md:pl-24 bg-newsprint overflow-hidden">
      
      {/* Layer 1: The Base Grid (Moves slowly) */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 pointer-events-none opacity-10"
      >
        <div 
          className="w-full h-[200%] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)]"
          style={{ backgroundSize: '40px 40px' }} 
        />
      </motion.div>

      {/* Layer 2: Main Content Stream (The Zine Pages) */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:px-12 max-w-7xl">
        
        {/* Header Area */}
        <header className="mb-24 relative">
          <h1 className="text-6xl md:text-9xl text-federal mb-4 tracking-tighter mix-blend-multiply text-bleed">
            SPECIMEN<span className="text-fluorescic">.AI</span>
          </h1>
          <div className="font-mono text-sm md:text-base max-w-md bg-xerox text-newsprint p-2 rotate-1 inline-block shadow-[4px_4px_0px_#FF69B4]">
            [SYSTEM READY] :: SELECT CHARACTER TO BEGIN INTERVIEW
          </div>
          
          {/* Decorative Ink Splat */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-cyanErr mix-blend-multiply blur-2xl opacity-40 animate-pulse" />
        </header>

        {/* The Grid Slot - Where cards will go */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-24">
          {children}
        </div>

      </main>

      {/* Layer 3: Foreground Noise/Dust (Static overlay from global.css is here via layout) */}
    </div>
  );
};