"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "01", label: "HEROES" },
  { id: "02", label: "VILLAINS" },
  { id: "03", label: "ARCHIVE" },
];

export const StapleSidebar = () => {
  const [active, setActive] = useState("01");

  return (
    <nav className="fixed left-0 top-0 h-screen w-16 md:w-24 border-r-2 border-xerox bg-newsprint z-40 flex flex-col items-center py-8 select-none">
      {/* The "Binding" Visual - Metal Staples */}
      <div className="absolute left-2 top-0 bottom-0 w-px border-l border-dashed border-xerox/30" />
      
      <div className="flex-1 flex flex-col justify-center space-y-12">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => setActive(section.id)}
            className="group relative flex items-center justify-center w-8"
          >
            {/* The Metal Staple Graphic */}
            <div className="absolute w-12 h-4 border-t-2 border-b-2 border-xerox bg-gray-300 z-10 shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-transform duration-150 group-active:scale-95 group-hover:-rotate-2">
               {/* Shine effect on staple */}
               <div className="absolute top-0 right-2 w-px h-full bg-white/50" />
            </div>

            {/* Hover Label (Appears like a margin note) */}
            <span className="absolute left-14 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-marker text-federal text-sm -rotate-6">
              {section.label}
            </span>

            {/* Active Indicator (Ink Bleed) */}
            {active === section.id && (
              <motion.div 
                layoutId="staple-active"
                className="absolute -inset-4 bg-fluorescic/20 rounded-full blur-md" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Bottom Metadata */}
      <div className="text-[10px] font-mono rotate-180 writing-mode-vertical text-xerox/60">
        VOL. 2025 // ED. 1
      </div>
    </nav>
  );
};