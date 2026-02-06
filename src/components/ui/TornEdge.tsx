export const TornEdge = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 5" 
    preserveAspectRatio="none" 
    className={`w-full h-3 text-newsprint fill-current ${className}`}
    style={{ filter: 'drop-shadow(0px 2px 0px var(--color-xerox))' }}
  >
    <path d="M0,0 L0,5 L5,2 L10,5 L15,3 L20,5 L25,2 L30,5 L35,3 L40,5 L45,2 L50,5 L55,3 L60,5 L65,2 L70,5 L75,3 L80,5 L85,2 L90,5 L95,2 L100,5 L100,0 Z" />
  </svg>
);