"use client";

import { useEffect, useRef } from "react";

// Heights (px) of the phone bottom tab bar and the sticky top header, which cover the strip.
const BOTTOM_BAR = 84;
const TOP_BAR = 110;

/**
 * A sideways-scrolling strip that pans with the page: as it travels up the screen, it scrolls
 * from its left edge to its right edge. Only matters when the content is wider than the screen
 * (phones); manual swiping still works. Stays manual for reduced-motion users.
 */
export default function ScrollPan({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) return;
      const vh = window.innerHeight;
      const { top, height } = el.getBoundingClientRect();
      // Start only once the whole strip is visible above the bottom tab bar (so it opens on its
      // left edge), and finish when it reaches just under the sticky header.
      const start = vh - BOTTOM_BAR - height;
      const end = TOP_BAR;
      const p = start > end ? (start - top) / (start - end) : top < end ? 1 : 0;
      el.scrollLeft = Math.min(1, Math.max(0, p)) * max;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className={`no-scrollbar overflow-x-auto ${className}`}>
      {children}
    </div>
  );
}
