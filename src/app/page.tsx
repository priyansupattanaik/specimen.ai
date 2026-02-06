"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CinematicStream } from "@/components/layout/CinematicStream";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { InvestigationMode } from "@/components/visual/InvestigationMode";
import { SPECIMENS } from "@/data/specimens";
import { Network } from "lucide-react";

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showInvestigation, setShowInvestigation] = useState(false);

  const selectedSpecimen = SPECIMENS.find(s => s.id === selectedId);

  return (
    <div className="relative min-h-screen bg-offwhite overflow-hidden flex flex-col justify-center">
      
      {/* Background Noise/Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/noise.svg')]" />
      
      {/* Cinematic Title & Logo */}
      <div className="absolute top-8 left-0 right-0 z-10 pointer-events-none mix-blend-multiply flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-4 pointer-events-auto">
          {/* Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16">
             <img src="/logo.png" alt="Specimen.ai Logo" className="object-contain w-full h-full" />
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-federal/20">
            specimen.ai
          </h1>
        </div>
      </div>

      {/* Investigation Toggle (Top Right) */}
      <button 
        onClick={() => setShowInvestigation(true)}
        className="absolute top-[calc(2rem+var(--safe-top))] right-[calc(2rem+var(--safe-right))] z-40 flex items-center gap-2 px-4 py-2 border border-xerox bg-newsprint/80 hover:bg-federal hover:text-white transition-colors font-mono text-xs uppercase tracking-widest shadow-lg"
      >
        <Network className="w-4 h-4" />
        <span className="hidden md:inline">Investigation Mode</span>
      </button>

      {/* Cinematic Stream: Manual Physics Scroll */}
      <div className="relative w-full h-[100vh] py-4 md:py-8">
        <CinematicStream 
          items={SPECIMENS} 
          onSelect={setSelectedId} 
        />
      </div>

      {/* THE MANIFESTATION LAYER (Modal) */}
      <AnimatePresence>
        {selectedId && selectedSpecimen && (
          <ChatInterface 
            key="chat-modal"
            specimen={selectedSpecimen} 
            onClose={() => setSelectedId(null)} 
          />
        )}
      </AnimatePresence>

      {/* INVESTIGATION LAYER (Overlay) */}
      <AnimatePresence>
        {showInvestigation && (
          <InvestigationMode onClose={() => setShowInvestigation(false)} />
        )}
      </AnimatePresence>
      
    </div>
  );
}