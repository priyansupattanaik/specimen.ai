"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  motion, 
  useMotionValue, 
  useTransform, 
  useSpring,
  useVelocity,
  useAnimationFrame 
} from "framer-motion";
import { SpecimenCard } from "@/components/card/SpecimenCard";

// Types
type Specimen = {
  id: string;
  name: string;
  origin: string;
  classification: string;
  image: string;
};

interface CinematicStreamProps {
  items: Specimen[];
  onSelect: (id: string) => void;
}

// Configuration
const BASE_WIDTH = 300; // Reduced from 400
const GAP = 50;

/**
 * True Infinite Scroll Component
 * Uses modulo arithmetic to wrap items seamlessly.
 */
export const CinematicStream = ({ items, onSelect }: CinematicStreamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Resize Listener
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Responsive Card Width
  // On mobile (<768px), card takes up 70% of screen. On desktop, fixed 300px.
  const isMobile = containerWidth < 768;
  const cardWidth = isMobile ? containerWidth * 0.70 : BASE_WIDTH;
  const itemSize = cardWidth + GAP;
  
  // Physics State
  const x = useMotionValue(0);
  const velocity = useVelocity(x);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const skew = useTransform(smoothVelocity, [-1000, 1000], [-10, 10]);
  const scale = useTransform(smoothVelocity, [-2000, 2000], [0.9, 0.9]); // Shrink on fast scroll
  
  // Infinite Loop Logic
  // We strictly position absolute items based on a constantly moving 'x' value.
  const totalWidth = items.length * itemSize;


  // Auto-Scroll Logic
  const [isPaused, setIsPaused] = useState(false);
  
  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      // Move left continuously. Adjust 0.05 for speed.
      // We use subtraction because "forward" in this stream context feels like moving right-to-left
      x.set(x.get() - (delta * 0.05));
    }
  });

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center overflow-hidden cursor-grab active:cursor-grabbing perspective-1000"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        className="absolute z-20 h-full flex items-center justify-center top-0"
        drag="x"
        style={{ 
          x,
          width: 500000, // Massive width
          left: "50%",
          marginLeft: -250000 // Center it
        }}
        dragConstraints={{ left: -1000000, right: 1000000 }} // "Infinite"
        dragElastic={0.05} // Heavy feel
        onDragStart={() => {
            document.body.style.cursor = "grabbing";
            setIsPaused(true);
        }}
        onDragEnd={() => {
            document.body.style.cursor = "auto";
            setIsPaused(false);
        }}
      >
        {items.map((specimen, i) => (
          <InfiniteCard 
            key={specimen.id}
            index={i}
            specimen={specimen}
            x={x}
            totalWidth={totalWidth}
            itemSize={itemSize}
            skew={skew}
            cardWidth={cardWidth}
            containerWidth={containerWidth}
            onSelect={onSelect}
          />
        ))}
      </motion.div>

       {/* Cinematic Vignette (Mobile Optimized: Thinner on mobile) */}
       <div className="absolute inset-y-0 left-0 w-12 md:w-64 bg-gradient-to-r from-offwhite to-transparent pointer-events-none z-30" />
       <div className="absolute inset-y-0 right-0 w-12 md:w-64 bg-gradient-to-l from-offwhite to-transparent pointer-events-none z-30" />

    </div>
  );
};

interface InfiniteCardProps {
  index: number;
  specimen: Specimen;
  x: any;
  totalWidth: number;
  itemSize: number;
  skew: any;
  cardWidth: number;
  containerWidth: number;
  onSelect: (id: string) => void;
}

const InfiniteCard = ({ 
  index, 
  specimen, 
  x, 
  totalWidth, 
  itemSize, 
  skew, 
  cardWidth,
  containerWidth,
  onSelect 
}: InfiniteCardProps) => {
  
  // Transform x to wrap around
  const childX = useTransform(x, (latest) => {
    // Offset based on index
    const placeValue = (latest as number) + (index * itemSize);
    
    // Modulo wrapping. 
    // We add a large offset (10000 * totalWidth) to ensure 'modulo' works for negative numbers correctly in JS
    const wrappedValue = ((placeValue % totalWidth) + totalWidth) % totalWidth;
    
    // If the wrapped value puts it too far right, wrap to left?
    // Actually, simpler logic:
    // Just map [0, totalWidth] to a position relative to center.
    // To allow wrap-around left/right properly, we need to shift the range.
    
    let position = wrappedValue - (totalWidth / 2); // Center the loop range around 0
    
    // Correction: We actually want items to wrap geographically on screen.
    // Standard approach:
    // If item is too far right (> bounds), move to left.
    // If item is too far left (< bounds), move to right.
    
    // Re-calculate simplistic wrapping:
    const offset = index * itemSize; 
    const currentPos = (latest as number) + offset;
    // Where is this item relative to the viewport center?
    const relativePos = ((currentPos % totalWidth) + totalWidth) % totalWidth;
    
    // If relativePos is > totalWidth/2, shift it back by -totalWidth
    let visiblePos = relativePos;
    if (visiblePos > totalWidth / 2) visiblePos -= totalWidth;
    
    // CRITICAL FIX: Counteract parent movement
    // Since the parent moves by 'x', we must subtract 'x' to keep the modulo logic "absolute" visually
    return visiblePos - (latest as number);
  });

  return (
    <motion.div
      style={{ 
        x: childX, 
        skewX: skew,
        width: cardWidth,
        position: "absolute",
        zIndex: 10
      }}
      className="flex-shrink-0 h-[60%] md:h-[65%] cursor-pointer"
      whileHover={{ scale: 1.05, zIndex: 50, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      onTap={(event, info) => {
          onSelect(specimen.id);
      }}
    >
      <SpecimenCard {...specimen} onClick={() => onSelect(specimen.id)} priority={index < 4} /> 
    </motion.div>
  );
};
