// AADHI TI mark: "ती" (she) on kokum, with a sea wave along the bottom.
export default function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-[32%] bg-kokum-500 font-display font-extrabold text-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.5, lineHeight: 1 }}
      aria-hidden
    >
      <span className="relative z-10 -mt-[8%]">ती</span>
      <svg viewBox="0 0 40 12" className="absolute bottom-0 left-0 w-full" preserveAspectRatio="none" style={{ height: size * 0.28 }}>
        <path d="M0 6 Q5 1 10 6 T20 6 T30 6 T40 6 V12 H0 Z" fill="#167e8f" />
      </svg>
    </span>
  );
}
