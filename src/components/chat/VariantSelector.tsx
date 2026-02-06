"use client";

import React from "react";
import { motion } from "framer-motion";
import { Variant } from "@/data/personas";

interface VariantSelectorProps {
  variants: Variant[];
  currentVariantId: string;
  onSelect: (variantId: string) => void;
  compact?: boolean;
}

export const VariantSelector = ({ variants, currentVariantId, onSelect, compact = false }: VariantSelectorProps) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div className={`${compact ? 'w-full flex items-center' : 'relative w-full md:absolute md:top-20 md:right-6 md:w-auto z-30 flex flex-col items-end pointer-events-auto mt-2 md:mt-0'}`}>
      {!compact && (
          <div className="text-[10px] uppercase font-bold text-xerox/50 tracking-widest mb-1 hidden md:block">
            TEMPORAL VARIANCE
          </div>
      )}
      <div className={`flex gap-1 bg-newsprint border border-xerox p-1 shadow-lg ${compact ? 'w-full overflow-x-auto no-scrollbar border-none shadow-none bg-transparent' : 'w-full md:w-auto md:flex-col overflow-x-auto md:overflow-visible'}`}>
        {/* ORIGINAL / PRIMARY VARIANT */}
        <button
            onClick={() => onSelect('original')}
            className={`relative px-3 py-1 text-xs font-mono uppercase transition-all duration-300 flex items-center justify-between gap-3 group shrink-0 ${
            currentVariantId === 'original'
                ? "bg-federal text-newsprint" 
                : "bg-transparent text-xerox hover:bg-gray-200"
            }`}
        >
            <span className="relative z-10 white-space-nowrap">PRIME</span>
            <span className="w-2 h-2 rounded-full bg-white border border-xerox shrink-0" />
            
            {currentVariantId === 'original' && (
            <motion.div
                layoutId="variant-active"
                className="absolute inset-0 bg-federal -z-0"
            />
            )}
        </button>

        {variants.map((v) => {
          const isActive = currentVariantId === v.id;
          return (
            <button
              key={v.id}
              onClick={() => onSelect(v.id)}
              className={`relative px-3 py-1 text-xs font-mono uppercase transition-all duration-300 flex items-center justify-between gap-3 group shrink-0 ${
                isActive 
                  ? "bg-federal text-newsprint" 
                  : "bg-transparent text-xerox hover:bg-gray-200"
              }`}
            >
              <span className="relative z-10 whitespace-nowrap">{v.name}</span>
              
              {/* Style Indicator */}
              <span className={`w-2 h-2 rounded-full shrink-0 ${
                  v.style === 'noir' ? 'bg-black' :
                  v.style === 'future' ? 'bg-cyan-400 shadow-[0_0_5px_cyan]' :
                  v.style === 'retro' ? 'bg-amber-600' :
                  'bg-fluorescic'
              }`} />

              {isActive && (
                <motion.div
                  layoutId="variant-active"
                  className="absolute inset-0 bg-federal -z-0"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
