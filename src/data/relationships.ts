export interface Relationship {
  source: string;
  target: string;
  label: string;
}

export const RELATIONSHIPS: Relationship[] = [
  // Spider-Man (001)
  { source: "001", target: "104", label: "Mentor/Recruit (Uneasy)" }, // Batman
  { source: "001", target: "X09", label: "Avengers Teammate" },       // Wolverine
  { source: "001", target: "089", label: "NYC Incident" },            // Loki

  // Loki (089)
  { source: "089", target: "616", label: "Arcane Interest" },         // Scarlet Witch
  { source: "089", target: "002", label: "God vs Alien" },            // Superman

  // Batman (104)
  { source: "104", target: "002", label: "World's Finest" },          // Superman
  { source: "104", target: "X09", label: "Tactical Respect" },        // Wolverine

  // Superman (002)
  { source: "002", target: "616", label: "Raw Power Level" },         // Scarlet Witch

  // Wolverine (X09)
  { source: "X09", target: "616", label: "House of M" },              // Scarlet Witch

  // --- NEW CONNECTIONS ---

  // The Boys
  { source: "TB1", target: "HL1", label: "Nemesis" },                 // Butcher vs Homelander
  { source: "TB1", target: "SL1", label: "Uneasy Ally" },             // Butcher vs Starlight
  { source: "HL1", target: "SL1", label: "Coerced Teammate" },        // Homelander vs Starlight
  
  // Marvel
  { source: "003", target: "MK1", label: "Civil War" },               // Cap vs Iron Man
  { source: "THR", target: "089", label: "Brothers" },                // Thor vs Loki
  { source: "THR", target: "G01", label: "Revengers" },               // Thor vs Hulk
  { source: "MAG", target: "616", label: "Bloodline" },               // Magneto vs Scarlet Witch
  { source: "DDD", target: "MK1", label: "Tech Rival" },              // Doom vs Iron Man
  { source: "OCT", target: "001", label: "Arch-Nemesis" },            // Doc Ock vs Spidey

  // Cross-Verse
  { source: "HL1", target: "002", label: "Dark Mirror" },             // Homelander vs Superman
  { source: "104", target: "MK1", label: "Billionaire Genius" },      // Batman vs Iron Man
  { source: "TB1", target: "X09", label: "Kindred Spirits" },         // Butcher vs Wolverine
];
