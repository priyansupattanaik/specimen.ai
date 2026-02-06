import type { Metadata } from "next";
import { Courier_Prime, Permanent_Marker } from "next/font/google";
import "./globals.css";

// 1. Body Font: Typewriter authenticity
const courierPrime = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

// 2. Accent Font: Scrawled annotations
const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

export const metadata: Metadata = {
  title: "Specimen.AI | The Living Archive",
  description: "A digital specimen cabinet of living personas.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#F5F5DC", // Newsprint color
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${courierPrime.variable} ${permanentMarker.variable} bg-newsprint text-xerox antialiased selection:bg-fluorescic/30 selection:text-federal`}
      >
        {/* Global texture overlay for that "Scanlined Paper" feel */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-multiply" 
             style={{ backgroundImage: 'url("/noise.svg")' }}></div>
        
        {children}
      </body>
    </html>
  );
}