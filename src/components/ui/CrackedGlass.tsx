"use client";

import React from "react";
import { motion } from "framer-motion";

export const CrackedGlass = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden mix-blend-overlay opacity-80">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
         {/* Crack 1 */}
         <motion.path
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 0.2, ease: "linear" }}
           d="M0,0 L30,40 L10,60 L40,80"
           fill="none"
           stroke="white"
           strokeWidth="0.5"
         />
         {/* Crack 2 */}
         <motion.path
           initial={{ pathLength: 0 }}
           animate={{ pathLength: 1 }}
           transition={{ duration: 0.3, delay: 0.1, ease: "linear" }}
           d="M100,20 L70,50 L90,80"
           fill="none"
           stroke="white"
           strokeWidth="0.5"
         />
         {/* Spiderweb Crack Center */}
         <motion.path 
           initial={{ scale: 0, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.1 }}
           d="M50,50 L40,40 M50,50 L60,30 M50,50 L70,60 M50,50 L30,60"
           stroke="white"
           strokeWidth="0.5"
         />
      </svg>
    </div>
  );
};
