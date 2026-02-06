"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HalftonePortrait } from "../ui/HalftonePortrait";
import { TornEdge } from "../ui/TornEdge";
import LiquidLoader from "../ui/LiquidLoader";
import { X, Send, AlertTriangle } from "lucide-react"; 
import { PERSONAS } from "@/data/personas";
import { VitalsMonitor } from "./VitalsMonitor";
import { CrackedGlass } from "../ui/CrackedGlass";
import { saveInteraction, getRecentInteractions } from "@/lib/history";
import { RedactedText } from "../ui/RedactedText";
import { VariantSelector } from "./VariantSelector";

interface ChatInterfaceProps {
  specimen: {
    id: string;
    name: string;
    origin: string;
    classification: string;
    image: string;
  };
  onClose: () => void;
}

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
};

// Helper to parse [[redacted]] text
const parseMessageContent = (content: string) => {
  const parts = content.split(/(\[\[.*?\]\])/g);
  return parts.map((part, index) => {
    if (part.startsWith("[[") && part.endsWith("]]")) {
      const text = part.slice(2, -2);
      return <RedactedText key={index} text={text} />;
    }
    return part;
  });
};

export const ChatInterface = ({ specimen, onClose }: ChatInterfaceProps) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Sentinel System State: Initialize with Persona's unique stats or default
  const persona = PERSONAS[specimen.id];
  const [stats, setStats] = useState(
    persona?.initialStats || { aggression: 20, trust: 50, stability: 90 }
  );

  // Variant State
  const [activeVariantId, setActiveVariantId] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const activeVariant = persona?.variants?.find(v => v.id === activeVariantId);
  
  const handleVariantSelect = (id: string) => {
    setIsSwitching(true);
    
    // DELAY THE SWAP to happen in the "VOID" (Middle of animation)
    setTimeout(() => {
        if (id === 'original') {
            setActiveVariantId(null);
            // Restore Original Persona
             setMessages(prev => [...prev, { 
                role: "system", 
                content: `[SYSTEM RESTORE]: Timeline Restored. You are the original version of ${specimen.name}. Revert to your base factory settings and personality.` 
            }]);
        } else {
            setActiveVariantId(id);
            const variant = persona?.variants?.find(v => v.id === id);
            if (variant) {
                // 1. Add visual system log
                const sysMsg: Message = { 
                    role: "system", 
                    content: `[SYSTEM OVERRIDE]: TIMELINE BRANCH DETECTED. Variant Active: ${variant.name}.` 
                };
                setMessages(prev => [...prev, sysMsg]);

                // 2. TRIGGER AUTO-GREETING (Hidden User Action)
                const triggerContent = `[SYSTEM INSTRUCTION]: The user has activated the '${variant.name}' variant. Immediately introduce yourself in this specific persona. Ignore previous context if it conflicts.`;
                
                setIsLoading(true);
                
                // Construct context for the API
                const historyForApi = [...messages, sysMsg, { role: "user", content: triggerContent }];
                
                // Fetch
                fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        messages: historyForApi, 
                        characterId: specimen.id,
                        variantId: id 
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    let aiContent = data.content;
                     try {
                        const parsed = JSON.parse(data.content);
                        if (parsed.content) {
                            aiContent = parsed.content;
                            if (parsed.stats) setStats(parsed.stats);
                        }
                      } catch (e) { /* create simple handler */ }
                      
                      setMessages(prev => [...prev, { role: "assistant", content: aiContent }]);
                })
                .catch(err => {
                    setMessages(prev => [...prev, { role: "assistant", content: "[ERROR] Variant sync failed." }]);
                })
                .finally(() => setIsLoading(false));
            }
        }
    }, 750); // Swap at 50% of 1.5s animation (The Void)

    // End animation
    setTimeout(() => setIsSwitching(false), 1500);
  };

  // Connection Simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsConnecting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isBreached, setIsBreached] = useState(false);

  // Containment Breach Protocol
  useEffect(() => {
    if (stats.aggression >= 90 && !isBreached) {
       setIsBreached(true);
       
       // Lockdown Timer
       setTimeout(() => {
         setIsBreached(false);
         // Cooldown: Lower aggression slightly so it doesn't loop instantly
         setStats(prev => ({ ...prev, aggression: 75 }));
       }, 10000); // 10 seconds
    }
  }, [stats.aggression, isBreached]);

  // Initialize Chat & Meta-Memory
  useEffect(() => {
    saveInteraction(specimen.id);

    if (persona) {
      setMessages([
        { role: "assistant", content: persona.initialMessage }
      ]);
    } else {
      setMessages([
        { role: "assistant", content: "Identity unverified." }
      ]);
    }
  }, [specimen.id, persona, specimen.name]);

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]); 

  // --- TEXT HANDLER ---
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // --- CIRCADIAN RHYTHM INJECTION ---
      const now = new Date();
      const hour = now.getHours();
      let timeContext = `[CONTEXT: It is currently ${hour}:00.]`;

      const variantTimeBlocks = activeVariant?.timeBlocks;
      const personaTimeBlocks = persona?.timeBlocks;
      const blocks = variantTimeBlocks || personaTimeBlocks;

      if (blocks) {
        const activeBlock = blocks.find(block => {
            if (block.start > block.end) {
                return hour >= block.start || hour < block.end;
            }
            return hour >= block.start && hour < block.end;
        });

        if (activeBlock) {
            timeContext += ` ${activeBlock.context}`;
        }
      }

      let apiMessages = messages.map(({ role, content }) => ({ role, content }));
      
      const systemIndex = apiMessages.findIndex(m => m.role === 'system');
      if (systemIndex !== -1) {
         apiMessages[systemIndex].content += `\n\n${timeContext}`;
      } else {
         apiMessages.unshift({ role: 'system', content: timeContext });
      }
      
      apiMessages.push({ role: "user", content: userMsg.content });

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            messages: apiMessages, 
            characterId: specimen.id,
            variantId: activeVariantId 
        }),
      });

      if (!response.ok) throw new Error("Network error");
      const data = await response.json();
      
      let aiContent = data.content;
      
      try {
        const parsed = JSON.parse(data.content);
        if (parsed.content) {
            aiContent = parsed.content;
            if (parsed.stats) setStats(parsed.stats);
        }
      } catch (e) {
        // Warning: Non-JSON response received details
      }

      setMessages((prev) => [...prev, { role: "assistant", content: aiContent }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "[ERROR] Connection Lost." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 1. BACKDROP (Blurred & Dimmed) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, pointerEvents: "none" }}
        onClick={onClose} 
        className={`fixed inset-0 z-50 cursor-pointer backdrop-blur-md ${isBreached ? "bg-red-950/80" : "bg-black/60"}`}
      />

      <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-8 pointer-events-none">
        <motion.div
          layoutId={`card-${specimen.id}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isBreached ? { x: [0, -5, 5, -5, 5, 0], opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 }, pointerEvents: "none" }}
          transition={isBreached ? { x: { repeat: Infinity, duration: 0.2 } } : {}}
          className={`relative w-full max-w-5xl h-[100dvh] md:h-[85vh] bg-stone-100 border-0 md:border-2 shadow-2xl flex flex-col md:flex-row overflow-hidden pointer-events-auto transition-colors duration-300 ${
            isBreached ? "border-red-600 shadow-red-500/50" : "border-zinc-800"
          } ${isSwitching ? 'reality-shift-active' : ''} ${activeVariant?.style === 'noir' ? 'theme-noir' : ''} ${activeVariant?.style === 'future' ? 'theme-future' : ''} ${activeVariant?.style === 'retro' ? 'theme-retro' : ''}`}
        >
          {/* Flash Effect */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none hidden"
          />
          
          {/* BREACH OVERLAYS */}
          {isBreached && <CrackedGlass />}
          {isBreached && (
             <div className="absolute inset-0 pointer-events-none z-40 bg-red-500/10 mix-blend-overlay animate-pulse" />
          )}

          {/* LEFT COLUMN (Desktop: Visuals, Mobile: Hidden/Replaced by Header) */}
          <div className="hidden md:flex relative w-5/12 h-full border-r-2 border-xerox bg-newsprint flex-col shrink-0 z-20">
             
             {/* Desktop Portrait */}
             <div className="relative w-full h-auto flex-1 border-b border-zinc-200 p-6 shrink-0 bg-white">
                <div className="relative w-full h-full border border-zinc-200 p-2 bg-stone-50">
                  <HalftonePortrait 
                      src={activeVariant ? `/heroes/variants/${activeVariant.imageId}` : specimen.image} 
                      alt={specimen.name} 
                  />
                  
                  {/* Status Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 bg-newsprint border border-xerox p-2 font-mono text-xs shadow-sm">
                    <div className="flex justify-between border-b border-xerox/20 pb-1 mb-1">
                      <span className="text-xerox/50">SUBJECT:</span>
                      <span className="font-bold text-federal">{specimen.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xerox/50">STATUS:</span>
                      <span className="text-fluorescic animate-pulse">
                        {isConnecting ? "CONNECTING..." : (isLoading ? "PROCESSING..." : "ACTIVE / LISTENING")}
                      </span>
                    </div>
                  </div>
                </div>
             </div>

             {/* Desktop Variant Selector */}
             <div>
                {persona?.variants && (
                    <VariantSelector 
                        variants={persona.variants} 
                        currentVariantId={activeVariantId || 'original'} 
                        onSelect={(id) => !isSwitching && handleVariantSelect(id)} 
                    />
                )}
             </div>

             {/* Desktop Sentinel System */}
             <div className="flex-1 overflow-y-auto">
                <VitalsMonitor stats={stats} />
             </div>
          </div>

          {/* MAIN CHAT COLUMN (Mobile: Full Screen, Desktop: Right Side) */}
          <div className="flex-1 flex flex-col min-h-0 relative bg-newsprint">
             {/* No texture background on generic container to ensure solidity */}
            
            {/* --- MOBILE HEADER REDESIGN --- */}
            <div className={`md:hidden h-16 border-b-2 border-zinc-200 flex items-center justify-between px-4 bg-stone-100 z-20 shrink-0 ${isBreached ? "bg-red-50" : ""}`}>
                 <div className="flex items-center gap-3">
                    {/* Small Avatar Portrait */}
                    <div className="w-10 h-10 border border-zinc-300 bg-white overflow-hidden relative rounded-sm">
                       <HalftonePortrait 
                          src={activeVariant ? `/heroes/variants/${activeVariant.imageId}` : specimen.image} 
                          alt={specimen.name} 
                          className="opacity-100" // Ensure full opacity
                       />
                    </div>
                    
                    {/* Compact Info */}
                    <div className="flex flex-col">
                        <span className="font-bold font-mono text-sm leading-none text-federal uppercase">{specimen.name}</span>
                        <span className="text-[10px] font-mono text-xerox/60 leading-tight">
                             {isConnecting ? "CONNECTING..." : "ONLINE"}
                        </span>
                    </div>
                 </div>

                 <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="relative z-[100] p-2 w-10 h-10 flex items-center justify-center bg-white border border-xerox shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all">
                    <X className="w-5 h-5 text-federal" />
                 </button>
            </div>

            {/* --- MOBILE CONTEXT BAR (Variants) --- */}
            <div className="md:hidden w-full bg-white border-b border-xerox z-10 shrink-0">
               {persona?.variants && (
                   <div className="overflow-x-auto no-scrollbar py-1">
                      <VariantSelector 
                          variants={persona.variants} 
                          currentVariantId={activeVariantId || 'original'} 
                          onSelect={(id) => !isSwitching && handleVariantSelect(id)} 
                          compact={true} // Pass a prop if the component supports it, otherwise styles handle it
                      />
                   </div>
               )}
            </div>

            {/* Header (Desktop Only) */}
            <div className={`hidden md:flex h-16 border-b-2 items-center justify-between px-6 transition-colors ${isBreached ? "bg-red-950 border-red-500" : "bg-newsprint border-xerox"}`}>
              <div className={`font-mono text-sm tracking-widest ${isBreached ? "text-red-500 animate-pulse font-bold" : "text-xerox/60"}`}>
                {isBreached ? "⚠️ CONTAINMENT BREACH ⚠️" : `INTERVIEW LOG // ${specimen.id}`}
              </div>
              <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="group relative z-[100] p-3 min-w-[48px] min-h-[48px] flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors">
                <X className={`w-6 h-6 group-hover:rotate-90 transition-transform duration-300 ${isBreached ? "text-red-500" : "text-xerox"}`} />
              </button>
            </div>

            {/* Chat History Area - Maximized */}
            <div ref={scrollRef} className="flex-1 p-4 md:p-6 overflow-y-auto font-mono text-sm space-y-4 scroll-smooth bg-newsprint relative">
               {/* Background Texture Overlay (Optional, keep subtle) - REMOVED FOR SOLIDITY */}
               {/* <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none mix-blend-multiply"></div> */}
              
              <div className="text-center text-xerox/40 text-xs my-4 relative z-10">--- SESSION START ---</div>

              {isConnecting ? (
                 <div className="flex flex-col items-center justify-center h-full gap-4 relative z-10">
                    <LiquidLoader />
                    <span className="text-fluorescic animate-pulse text-xs tracking-widest">ESTABLISHING LINK...</span>
                 </div>
              ) : (
                messages.filter(m => m.role !== 'system').map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }} // Slight vertical slide instead of horizontal
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 relative z-10 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatars in Chat */}
                    <div className={`w-8 h-8 flex-shrink-0 border border-xerox flex items-center justify-center text-[10px] font-bold rounded-sm ${msg.role === 'user' ? 'bg-xerox text-white' : 'bg-federal text-white'}`}>
                      {msg.role === 'user' ? 'U' : specimen.id.substring(0, 2)}
                    </div>

                    {/* Bubbles - High Contrast */}
                    <div className={`max-w-[85%] md:max-w-[80%] border border-xerox p-3 text-bleed shadow-sm ${msg.role === 'user' ? 'bg-white rounded-l-lg rounded-br-lg' : 'bg-white rounded-r-lg rounded-bl-lg'}`}>
                       {/* Note: using white/50 on newsprint creates a subtle difference, or just use white */}
                      <p className="whitespace-pre-wrap text-xerox">{parseMessageContent(msg.content)}</p>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 relative z-10">
                   <div className="w-8 h-8 border border-xerox bg-federal text-white flex items-center justify-center text-[10px] font-bold rounded-sm">AI</div>
                   <div className="text-xs text-xerox/50 flex items-center gap-2 mt-2">
                     <span className="animate-pulse">Writing...</span>
                   </div>
                </motion.div>
              )}
            </div>

            {/* Input Area - Solid & Fixed */}
            <div className={`p-3 md:p-4 border-t-2 bg-white relative z-30 ${isBreached ? "border-red-500" : "border-xerox"}`}>
              {isBreached ? (
                <div className="w-full flex items-center justify-center gap-2 py-2 text-red-600 font-mono font-bold animate-pulse tracking-widest border border-red-500/30 bg-red-50">
                   <AlertTriangle className="w-5 h-5" />
                   <span>SIGNAL LOST</span>
                </div>
              ) : (
                <div className="relative flex items-center gap-2">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={isLoading ? "Processing..." : "Type message..."}
                      disabled={isLoading}
                      autoFocus
                      // High contrast input
                      className="w-full bg-newsprint border border-xerox py-3 px-3 font-mono text-base focus:outline-none focus:ring-2 focus:ring-federal transition-all rounded-sm placeholder:text-xerox/30"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      title="Send Message"
                      // Big touch target
                      className="p-3 w-[50px] h-[50px] flex items-center justify-center bg-federal hover:bg-federal text-white border border-xerox shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all disabled:opacity-50 disabled:shadow-none"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
