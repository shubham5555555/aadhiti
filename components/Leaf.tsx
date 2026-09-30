// A faint leaf sprig for card corners and page headers (decorative only).
export default function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden className={`pointer-events-none ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M60 158 C58 120 62 70 92 8" />
      {[
        [66, 128, -1],
        [70, 104, 1],
        [74, 80, -1],
        [80, 58, 1],
        [86, 36, -1],
      ].map(([x, y, side], i) => (
        <path
          key={i}
          d={side > 0 ? `M${x} ${y} C${x + 16} ${y - 20} ${x + 34} ${y - 18} ${x + 42} ${y - 8} C${x + 30} ${y + 4} ${x + 14} ${y + 4} ${x} ${y} Z` : `M${x} ${y} C${x - 16} ${y - 20} ${x - 34} ${y - 18} ${x - 42} ${y - 8} C${x - 30} ${y + 4} ${x - 14} ${y + 4} ${x} ${y} Z`}
          fill="currentColor"
          fillOpacity="0.35"
        />
      ))}
    </svg>
  );
}
