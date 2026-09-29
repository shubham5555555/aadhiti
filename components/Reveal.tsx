"use client";

import { useEffect, useRef, useState } from "react";

/** Fades its children up once they scroll into view. Skipped for reduced-motion users via `motion-safe`. */
export default function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "motion-safe:translate-y-6 motion-safe:opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
