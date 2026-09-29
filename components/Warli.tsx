// Warli-style figures (Maharashtra folk art): women holding hands in a line — the brand's signature motif.

function Figure({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <circle cx="20" cy="8" r="5" />
      <path d="M11 15 H29 L20 30 Z" />
      <path d="M20 30 L9 47 H31 Z" />
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M11.5 16 L0 28" />
        <path d="M28.5 16 L40 28" />
        <path d="M15 47 L13 58" />
        <path d="M25 47 L27 58" />
      </g>
    </g>
  );
}

/** A row of `count` figures holding hands. Colour comes from `currentColor`. */
export default function WarliRow({ count = 8, className = "" }: { count?: number; className?: string }) {
  return (
    <svg viewBox={`0 0 ${count * 40} 60`} preserveAspectRatio="xMinYMid meet" className={className} fill="currentColor" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <Figure key={i} x={i * 40} />
      ))}
    </svg>
  );
}

/**
 * Warli circle dance (tarpa nāch): women holding hands around a sun.
 * Figures stand on the ring with heads outward; hands meet between neighbours.
 */
export function WarliCircle({ className = "" }: { className?: string }) {
  const n = 12;
  const r = 46; // feet radius; hands land at r + 30, spaced ~40 apart for n = 12
  return (
    <svg viewBox="-150 -150 300 300" className={className} fill="currentColor" aria-hidden>
      <circle r="20" />
      <circle r="30" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 5" />
      {Array.from({ length: n }, (_, i) => (
        <g key={i} transform={`rotate(${(360 / n) * i}) translate(-20 ${-(r + 58)})`}>
          <Figure x={0} />
        </g>
      ))}
      <circle r="142" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

// Round so server and browser render identical attribute strings (avoids hydration mismatch).
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Warli village scene: sun, birds, a hut, and five women holding hands on the ground line. */
export function WarliScene({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 12 }, (_, i) => (i * Math.PI * 2) / 12);
  return (
    <svg viewBox="0 0 300 250" className={className} fill="currentColor" aria-hidden>
      {/* sun */}
      <g transform="translate(236 52)">
        <circle r="17" />
        {rays.map((a, i) => (
          <line key={i} x1={r2(Math.cos(a) * 23)} y1={r2(Math.sin(a) * 23)} x2={r2(Math.cos(a) * 31)} y2={r2(Math.sin(a) * 31)} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        ))}
      </g>
      {/* birds */}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M150 44 l6 5 l6 -5" />
        <path d="M170 30 l5 4 l5 -4" />
        <path d="M128 58 l5 4 l5 -4" />
      </g>
      {/* hut */}
      <g transform="translate(34 70)">
        <path d="M0 34 L28 8 L56 34 Z" />
        <rect x="8" y="34" width="40" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <rect x="22" y="44" width="12" height="20" />
      </g>
      {/* women */}
      <g transform="translate(20 142) scale(1.3)">
        {[0, 1, 2, 3, 4].map((i) => (
          <Figure key={i} x={i * 40} />
        ))}
      </g>
      {/* ground */}
      <line x1="8" y1="222" x2="292" y2="222" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={16 + i * 20} y1="230" x2={20 + i * 20} y2="236" />
        ))}
      </g>
    </svg>
  );
}
