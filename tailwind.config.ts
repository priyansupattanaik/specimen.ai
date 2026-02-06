import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette mapped to CSS Variables
        federal: "var(--color-federal)",
        fluorescic: "var(--color-fluorescic)",
        sunflower: "var(--color-sunflower)",
        newsprint: "var(--color-newsprint)",
        xerox: "var(--color-xerox)",
        
        // Glitch/System States
        cyanErr: "var(--color-cyan-err)",
        magentaMis: "var(--color-magenta-mis)",
      },
      fontFamily: {
        display: ["Times New Roman", "serif"],
        mono: ["var(--font-courier)", "monospace"],
        marker: ["var(--font-marker)", "cursive"],
      },
      backgroundImage: {
        'halftone': "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      spacing: {
        'gutter': '2rem', 
      },
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;