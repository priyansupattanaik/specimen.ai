"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConspiracyGraph } from "@/components/visual/ConspiracyGraph";
import { RELATIONSHIPS } from "@/data/relationships";
import { SPECIMENS } from "../../data/specimens";
// @ts-ignore
import { Network, X } from "lucide-react";
import Image from "next/image";

// Layout nodes in a circle
const getNodes = (width: number, height: number, radius: number = 300) => {
  return SPECIMENS.map((s: any, i: number) => {
    const angle = (i / SPECIMENS.length) * 2 * Math.PI;
    return {
      id: s.id,
      x: width / 2 + radius * Math.cos(angle),
      y: height / 2 + radius * Math.sin(angle),
      data: s
    };
  });
};

export const InvestigationMode = ({ onClose }: { onClose: () => void }) => {
  const [nodes, setNodes] = useState<{ id: string; x: number; y: number; data: any }[]>([]);

  useEffect(() => {
    // Calculate nodes only on client side
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.min(width, height) * 0.35; // Responsive radius
    setNodes(getNodes(width, height, radius));
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-newsprint/95 backdrop-blur-sm overflow-hidden"
    >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-50">
           <div className="font-mono text-xl tracking-widest text-federal border-b-2 border-federal pb-1">
             SPECIMEN_CONNECTIONS // CLASSIFIED
           </div>
           <button onClick={onClose} className="p-2 border border-federal hover:bg-federal hover:text-white transition-colors">
             <X />
           </button>
        </div>

        {/* Draggable Nodes */}
        {nodes.map(node => (
            <div 
              key={node.id} 
              onPointerDown={(e) => {
                e.preventDefault();
                const startX = e.clientX;
                const startY = e.clientY;
                const initialX = node.x;
                const initialY = node.y;

                const onPointerMove = (moveEvent: PointerEvent) => {
                  const dx = moveEvent.clientX - startX;
                  const dy = moveEvent.clientY - startY;
                  
                  setNodes(prev => prev.map(n => 
                    n.id === node.id 
                    ? { ...n, x: initialX + dx, y: initialY + dy } 
                    : n
                  ));
                };

                const onPointerUp = () => {
                  window.removeEventListener("pointermove", onPointerMove);
                  window.removeEventListener("pointerup", onPointerUp);
                };

                window.addEventListener("pointermove", onPointerMove);
                window.addEventListener("pointerup", onPointerUp);
              }}
              className="absolute w-16 h-24 md:w-24 md:h-32 border-2 border-xerox bg-white shadow-lg p-1 cursor-grab active:cursor-grabbing hover:z-50 hover:scale-105 transition-transform"
              style={{ left: node.x - (window.innerWidth < 768 ? 32 : 48), top: node.y - (window.innerWidth < 768 ? 48 : 64) }}
            >
                <div className="relative w-full h-16 md:h-24 bg-gray-100 pointer-events-none">
                    <Image src={node.data.image} alt={node.data.name} fill className="object-contain" />
                </div>
                <div className="text-[7px] md:text-[9px] font-mono text-center mt-1 font-bold truncate px-1">{node.data.name}</div>
            </div>
        ))}

        {/* The Web */}
        <ConspiracyGraph relationships={RELATIONSHIPS} nodes={nodes} onClose={onClose} />
    </motion.div>
  );
};
