"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Relationship } from "@/data/relationships";

interface ConspiracyGraphProps {
  relationships: Relationship[];
  nodes: { id: string; x: number; y: number }[]; // We'll map specimen cards to coordinates
  onClose: () => void;
}

export const ConspiracyGraph = ({ relationships, nodes, onClose }: ConspiracyGraphProps) => {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {relationships.map((rel, i) => {
          const start = nodes.find(n => n.id === rel.source);
          const end = nodes.find(n => n.id === rel.target);

          if (!start || !end) return null;

          return (
            <g key={i}>
              {/* Red String */}
              <motion.line
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: i * 0.2 }}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#ff004c" // Fluorescic Red
                strokeWidth="2"
                strokeDasharray="5,5"
                className="opacity-60"
              />
              
              {/* Label */}
              <motion.foreignObject
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 + i * 0.2 }}
                x={(start.x + end.x) / 2 - 50}
                y={(start.y + end.y) / 2 - 10}
                width="100"
                height="30"
              >
                <div className="bg-white/90 backdrop-blur-sm border border-xerox px-2 py-0.5 text-[9px] font-mono text-center text-federal font-bold shadow-sm rounded-full whitespace-nowrap">
                  {rel.label}
                </div>
              </motion.foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
