"use client";

import { SPECIMENS } from "@/data/specimens";

const STORAGE_KEY = "specimen_interaction_history";

type InteractionHistory = Record<string, number>; // specimenId -> timestamp

export const saveInteraction = (specimenId: string) => {
  if (typeof window === "undefined") return;
  
  try {
    const history: InteractionHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    history[specimenId] = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (e) {
    console.error("Failed to save interaction", e);
  }
};

export const getRecentInteractions = (excludeId: string): string[] => {
  if (typeof window === "undefined") return [];

  try {
    const history: InteractionHistory = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const now = Date.now();
    const ONE_HOUR = 60 * 60 * 1000;

    // Filter for interactions within the last hour, excluding current
    const recentIds = Object.entries(history)
      .filter(([id, timestamp]) => id !== excludeId && (now - timestamp) < ONE_HOUR)
      .sort(([, a], [, b]) => b - a) // Recent first
      .map(([id]) => id);

    // Map IDs to Names
    return recentIds.map(id => SPECIMENS.find(s => s.id === id)?.name || id);
  } catch (e) {
    return [];
  }
};
