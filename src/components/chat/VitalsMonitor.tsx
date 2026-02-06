"use client";

import React from "react";
import { motion } from "framer-motion";

interface VitalsMonitorProps {
  stats: {
    aggression: number;
    trust: number;
    stability: number;
  };
}

export const VitalsMonitor = ({ stats }: VitalsMonitorProps) => {
  return (
    <div className="font-mono text-[10px] space-y-3 p-2 md:p-4 border border-xerox/20 bg-black/5 mt-2 md:mt-4">
      <div className="border-b border-xerox/20 pb-1 mb-2 text-xerox/50 tracking-widest uppercase">
        Live Vitals Monitor
      </div>

      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="space-y-1">
          <div className="flex justify-between uppercase">
            <span>{key}</span>
            <span>{value}%</span>
          </div>
          <div className="h-1 w-full bg-xerox/10 relative overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 1, type: "spring" }}
              className={`absolute inset-y-0 left-0 ${getColor(key, value)}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Color Logic
const getColor = (key: string, value: number) => {
  if (key === "aggression") {
    // Low aggression = good (green/blue), High = bad (red)
    return value > 70 ? "bg-red-500" : value > 30 ? "bg-yellow-500" : "bg-federal";
  }
  if (key === "trust") {
    // High trust = good (green), Low = bad (red)
    return value > 70 ? "bg-green-500" : value > 30 ? "bg-yellow-500" : "bg-red-500";
  }
  if (key === "stability") {
    return value > 50 ? "bg-federal" : "bg-fluorescic";
  }
  return "bg-federal";
};
