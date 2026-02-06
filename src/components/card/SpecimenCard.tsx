"use client";

import React from "react";
import { motion } from "framer-motion";
import { HalftonePortrait } from "../ui/HalftonePortrait";
import { TornEdge } from "../ui/TornEdge";

interface SpecimenCardProps {
  id: string;
  name: string;
  origin: string;
  classification: string;
  image: string;
  onClick: () => void;
  priority?: boolean;
}

export const SpecimenCard = ({ id, name, origin, classification, image, onClick, priority = false }: SpecimenCardProps) => {
  return (
    <motion.div
      layoutId={`card-${id}`}
      onClick={onClick}
      className="group relative w-full bg-newsprint cursor-pointer h-full"
      initial="idle"
      whileHover="hover"
      animate="idle"
    >
      {/* --- SHADOW LAYER (The "Double Exposure" Logic) --- */}
      <div className="absolute inset-0 bg-fluorescic translate-x-1 translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
      <div className="absolute inset-0 bg-federal -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
      
      {/* --- MAIN CARD BODY --- */}
      <div className="border-2 border-xerox bg-newsprint p-4 relative overflow-hidden transition-transform duration-300 group-hover:-rotate-1 group-hover:-translate-y-2 h-full flex flex-col">
        
        {/* Header: Staple & File No */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-8 h-2 bg-xerox/20 -rotate-3 rounded-sm border border-xerox/50" /> {/* Staple */}
          <span className="font-mono text-xs tracking-widest text-xerox/60 group-hover:text-federal">
            FILE NO. {id}
          </span>
        </div>

        {/* Portrait Container */}
        <div className="mb-4 relative w-full aspect-square">
          <HalftonePortrait src={image} alt={name} priority={priority} />
        </div>

        {/* Name Block (The "Loud" Type) */}
        <div className="mb-4 relative">
          <h2 className="text-4xl leading-[0.85] text-xerox uppercase mix-blend-multiply break-words">
            {name.split(" ").map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          {/* Decorative Arrow */}
          <span className="absolute top-0 right-0 text-xl text-fluorescic opacity-0 group-hover:opacity-100 transition-opacity">
            ↙
          </span>
        </div>

        {/* Separation */}
        <div className="relative h-4 mb-4 mt-auto">
           <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-xerox" />
        </div>

        {/* Data Block */}
        <div className="space-y-1 font-mono text-xs uppercase">
          <div className="flex justify-between">
            <span className="text-xerox/50">Origin:</span>
            <span className="font-bold bg-yellow-200/50 px-1">{origin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xerox/50">Class:</span>
            <span className="text-federal">{classification}</span>
          </div>
        </div>

        {/* Bottom Marquee Instruction */}
        <div className="mt-6 border-t-2 border-xerox pt-1 overflow-hidden">
          <div className="whitespace-nowrap animate-marquee opacity-50 group-hover:opacity-100">
            <span className="text-[10px] font-bold tracking-widest">
              ◄ DRAG TO EXAMINE ► CONFIDENTIAL ► DRAG TO EXAMINE ►
            </span>
          </div>
        </div>

      </div>

      {/* Torn Edge at the bottom for "Physicality" */}
      <div className="absolute -bottom-2 left-0 right-0 z-10">
        <TornEdge />
      </div>

    </motion.div>
  );
};