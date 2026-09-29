// Warli-style illustrations (Maharashtra folk art) for the home page.
// Everything is drawn in `currentColor`, like white paint on a mud wall.

type Pose = "hands" | "down" | "basket" | "walk" | "talk" | "reach" | "stick" | "phone" | "stir" | "wave" | "read" | "give" | "pot" | "tarpa" | "diya";

// Round so server and browser render identical attribute strings (avoids hydration mismatch).
const r2 = (n: number) => Math.round(n * 100) / 100;

const ARMS: Record<Pose, string[]> = {
  hands: ["M11.5 16 L0 28", "M28.5 16 L40 28"],
  down: ["M11.5 16 L6 32", "M28.5 16 L34 32"],
  basket: ["M11.5 16 L6 0", "M28.5 16 L34 0"],
  walk: ["M11.5 16 L4 30", "M28.5 16 L37 23"],
  talk: ["M11.5 16 L3 27", "M28.5 16 L39 7"],
  reach: ["M11.5 16 L0 5", "M28.5 16 L35 30"],
  stick: ["M11.5 16 L4 30", "M28.5 16 L36 25"],
  phone: ["M11.5 16 L4 30", "M28.5 16 L33 9 L26 5"],
  stir: ["M11.5 16 L4 30", "M28.5 16 L44 30"],
  wave: ["M11.5 16 L5 31", "M28.5 16 L37 1"],
  read: ["M11.5 16 L19 29", "M28.5 16 L33 29"],
  give: ["M11.5 16 L5 31", "M28.5 16 L46 22"],
  pot: ["M11.5 16 L5 31", "M28.5 16 L27 -4"],
  tarpa: ["M11.5 16 L30 26", "M28.5 16 L36 24"],
  diya: ["M11.5 16 L16 27", "M28.5 16 L24 27"],
};

/** A woman in a 40×60 box, feet at the bottom. `flip` mirrors her to face left. */
export function Woman({
  x,
  y,
  s = 1,
  pose = "hands",
  flip = false,
  stride = false,
  animate = false,
  delay = 0,
}: {
  x: number;
  y: number;
  s?: number;
  pose?: Pose;
  flip?: boolean;
  stride?: boolean;
  /** Walk cycle for striding figures, a wave for pose "wave", and a step bob. */
  animate?: boolean;
  delay?: number;
}) {
  const legs = pose === "walk" || stride ? ["M15 47 L8 58", "M25 47 L32 58"] : ["M15 47 L13 58", "M25 47 L27 58"];
  const tx = flip ? x + 40 * s : x;
  const walking = animate && (pose === "walk" || stride);
  const anim = { animationDelay: `${delay}s` };
  return (
    <g transform={`translate(${tx} ${y}) scale(${flip ? -s : s} ${s})`}>
      <g className={walking ? "w-bob" : undefined} style={walking ? anim : undefined}>
        <circle cx="20" cy="8" r="5" />
        <path d="M11 15 H29 L20 30 Z" />
        <path d="M20 30 L9 47 H31 Z" />
        {pose === "basket" && <path d="M3 1 Q20 7 37 1 L33 -6 H7 Z" />}
        {pose === "phone" && <rect x="23" y="1" width="5" height="9" rx="1" />}
        {pose === "read" && <rect x="16" y="23" width="20" height="12" />}
        {pose === "pot" && (
          <>
            <circle cx="20" cy="-5" r="7" />
            <circle cx="20" cy="-17" r="5" />
            <rect x="17.5" y="-24" width="5" height="3" />
          </>
        )}
        {pose === "diya" && (
        <>
          <path d="M11 27 Q20 35 29 27 Z" />
          <path d="M20 26 C15.5 20 19.5 15 20 11 C20.5 15 24.5 20 20 26 Z" className="w-flicker" />
        </>
      )}
      {pose === "tarpa" && (
          <>
            <path d="M22 22 L60 34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="62" cy="35" rx="7" ry="5" />
          </>
        )}
        <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {ARMS[pose].map((d, i) => (
            <path key={d} d={d} className={animate && pose === "wave" && i === 1 ? "w-wave" : undefined} style={animate ? anim : undefined} />
          ))}
          {legs.map((d, i) => (
            <path key={d} d={d} className={walking ? (i === 0 ? "w-leg-l" : "w-leg-r") : undefined} style={walking ? anim : undefined} />
          ))}
          {pose === "stick" && <path d="M36 22 L38 58" strokeWidth="2.5" />}
          {pose === "stir" && <path d="M42 26 L50 44" strokeWidth="2.5" />}
          {pose === "wave" && <path d="M40 -2 l3 -3 M41 3 l4 -1" strokeWidth="1.5" />}
        </g>
      </g>
    </g>
  );
}

function Tree({ x, y, h }: { x: number; y: number; h: number }) {
  const levels = [0.3, 0.45, 0.6, 0.75];
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - h} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      {levels.map((f, i) => {
        const by = y - h * f;
        const reach = (1 - f) * h * 0.55 + 10;
        return (
          <g key={i} stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1={x} y1={by} x2={x - reach} y2={by - reach * 0.6} />
            <line x1={x} y1={by} x2={x + reach} y2={by - reach * 0.6} />
            <circle cx={x - reach} cy={by - reach * 0.6} r="4" stroke="none" />
            <circle cx={x + reach} cy={by - reach * 0.6} r="4" stroke="none" />
            <circle cx={r2(x - reach / 2)} cy={r2(by - reach * 0.3 - 4)} r="3" stroke="none" />
            <circle cx={r2(x + reach / 2)} cy={r2(by - reach * 0.3 - 4)} r="3" stroke="none" />
          </g>
        );
      })}
      <circle cx={x} cy={y - h - 4} r="5" />
    </g>
  );
}

function Palm({ x, y, h }: { x: number; y: number; h: number }) {
  const top = { x: x + 8, y: y - h };
  const fronds = [-150, -115, -80, -45, -15, 20];
  return (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d={`M${x} ${y} Q${x + 14} ${y - h / 2} ${top.x} ${top.y}`} strokeWidth="3.5" />
      {fronds.map((deg) => {
        const a = (deg * Math.PI) / 180;
        const ex = r2(top.x + Math.cos(a) * 34);
        const ey = r2(top.y + Math.sin(a) * 34 + 14);
        const cx = r2(top.x + Math.cos(a) * 18);
        const cy = r2(top.y + Math.sin(a) * 18 - 6);
        return <path key={deg} d={`M${top.x} ${top.y} Q${cx} ${cy} ${ex} ${ey}`} strokeWidth="2.5" />;
      })}
      <circle cx={top.x - 3} cy={top.y + 6} r="3.5" fill="currentColor" stroke="none" />
      <circle cx={top.x + 4} cy={top.y + 7} r="3.5" fill="currentColor" stroke="none" />
    </g>
  );
}

function Boat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 H64 L54 12 H10 Z" />
      <line x1="32" y1="0" x2="32" y2="-42" stroke="currentColor" strokeWidth="2" />
      <path d="M34 -40 V-4 H56 Z" />
    </g>
  );
}

function Fish({ x, y, flip = false }: { x: number; y: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <ellipse cx="0" cy="0" rx="11" ry="4.5" />
      <path d="M9 0 L17 -6 V6 Z" />
    </g>
  );
}

function Hut({ x, y }: { x: number; y: number }) {
  // (x, y) is the bottom-left corner of the walls.
  return (
    <g transform={`translate(${x} ${y - 56})`}>
      <path d="M-6 26 L28 0 L62 26 Z" />
      <rect x="4" y="26" width="48" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <rect x="21" y="36" width="14" height="20" />
    </g>
  );
}

function Sun({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI * 2) / 12;
        return (
          <line
            key={i}
            x1={r2(Math.cos(a) * (r + 6))}
            y1={r2(Math.sin(a) * (r + 6))}
            x2={r2(Math.cos(a) * (r + 13))}
            y2={r2(Math.sin(a) * (r + 13))}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
}

function Birds({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M0 10 l6 5 l6 -5" />
      <path d="M22 0 l5 4 l5 -4" />
      <path d="M40 14 l5 4 l5 -4" />
    </g>
  );
}

export function Ground({ x1, x2, y, ticks = true }: { x1: number; x2: number; y: number; ticks?: boolean }) {
  const n = Math.floor((x2 - x1) / 20);
  return (
    <g stroke="currentColor" strokeLinecap="round">
      <line x1={x1} y1={y} x2={x2} y2={y} strokeWidth="2.5" />
      {ticks && Array.from({ length: n }, (_, i) => <line key={i} x1={x1 + 8 + i * 20} y1={y + 8} x2={x1 + 12 + i * 20} y2={y + 14} strokeWidth="1.5" />)}
    </g>
  );
}

function Waves({ x, y, w }: { x: number; y: number; w: number }) {
  const n = Math.floor(w / 24);
  const d = Array.from({ length: n }, (_, i) => `M${x + i * 24} ${y} q6 -7 12 0 q6 7 12 0`).join(" ");
  return <path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />;
}

type ArtProps = { className?: string };

/** Two women talking under a tree. */
export function WarliTalk({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 240 190" className={className} fill="currentColor" aria-hidden>
      <Birds x={20} y={16} />
      <Tree x={120} y={176} h={140} />
      <Woman x={26} y={108} s={1.15} pose="talk" />
      <Woman x={168} y={108} s={1.15} pose="down" flip />
      <Ground x1={8} x2={232} y={176} />
    </svg>
  );
}

/** A woman walking three stepping stones to her home — the three steps of an answer. */
export function WarliPath({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 280 175" className={className} fill="currentColor" aria-hidden>
      <Sun x={236} y={32} r={14} />
      <Woman x={10} y={94} s={1.1} pose="walk" />
      <line x1={62} y1={158} x2={190} y2={158} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 6" />
      {[92, 128, 164].map((cx, i) => (
        <g key={cx}>
          <circle cx={cx} cy={158} r={9} />
          <text x={cx} y={162} textAnchor="middle" fontSize="11" fontWeight="700" className="fill-sand-50">
            {i + 1}
          </text>
        </g>
      ))}
      <Hut x={200} y={160} />
      <Ground x1={6} x2={274} y={170} ticks={false} />
    </svg>
  );
}

/** A mother holding her daughter's hand. */
export function WarliMotherDaughter({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 220 170" className={className} fill="currentColor" aria-hidden>
      <Birds x={130} y={14} />
      <Woman x={30} y={86} s={1.25} pose="hands" />
      <Woman x={80} y={116} s={0.72} pose="reach" />
      <Tree x={178} y={158} h={96} />
      <Ground x1={8} x2={212} y={158} />
    </svg>
  );
}

/** A girl, a woman and an older woman with a stick: health through the ages. */
export function WarliAges({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 220 170" className={className} fill="currentColor" aria-hidden>
      <Sun x={190} y={28} r={12} />
      <Woman x={14} y={114} s={0.75} pose="down" />
      <Woman x={70} y={92} s={1.1} pose="down" />
      <Woman x={138} y={94} s={1.07} pose="stick" />
      <Ground x1={6} x2={214} y={158} />
    </svg>
  );
}

/** Konkan coast panorama: sea, boats, fish, palms, huts, and women carrying fish baskets home. */
export function WarliCoast({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 1200 250" preserveAspectRatio="xMidYMid slice" className={className} fill="currentColor" aria-hidden>
      <Sun x={1090} y={58} r={20} />
      <Birds x={930} y={40} />
      <Birds x={300} y={30} />

      {/* sea */}
      <Boat x={50} y={150} />
      <Boat x={230} y={165} s={0.8} />
      <Waves x={0} y={182} w={400} />
      <Waves x={12} y={200} w={380} />
      <Waves x={0} y={218} w={400} />
      <Fish x={120} y={236} />
      <Fish x={300} y={232} flip />

      {/* shore */}
      <Palm x={420} y={222} h={160} />
      <Palm x={505} y={222} h={120} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Woman key={i} x={560 + i * 52} y={152} s={1.2} pose={i === 4 ? "walk" : "basket"} />
      ))}
      <Hut x={860} y={222} />
      <Tree x={975} y={222} h={120} />
      <Hut x={1030} y={222} />
      <Palm x={1140} y={222} h={130} />
      <Ground x1={400} x2={1200} y={223} />
    </svg>
  );
}

export function Moon({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return <path transform={`translate(${x} ${y})`} d={`M0 ${-r} A${r} ${r} 0 1 0 0 ${r} A${r * 0.72} ${r} 0 1 1 0 ${-r} Z`} />;
}

export function Stars({ pts, twinkle = false }: { pts: [number, number][]; twinkle?: boolean }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r="1.8"
          className={twinkle ? "w-twinkle" : undefined}
          style={twinkle ? { animationDelay: `${(i * 0.43) % 3}s` } : undefined}
        />
      ))}
    </g>
  );
}

export function LampPost({ x, y, lit = true }: { x: number; y: number; lit?: boolean }) {
  // (x, y) is the foot of the post.
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 110} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1={x} y1={y - 110} x2={x + 22} y2={y - 110} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x + 14} ${y - 110} h16 l-4 8 h-8 Z`} />
      {lit ? (
        <path d={`M${x + 18} ${y - 102} L${x - 6} ${y} H${x + 50} L${x + 26} ${y - 102} Z`} opacity="0.18" className="w-glow" />
      ) : (
        <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1={x + 16} y1={y - 96} x2={x + 26} y2={y - 86} />
          <line x1={x + 26} y1={y - 96} x2={x + 16} y2={y - 86} />
        </g>
      )}
    </g>
  );
}

function Chulha({ x, y }: { x: number; y: number }) {
  // Three-stone clay stove with a pot and smoke; (x, y) is the base centre.
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-30 0 L-22 -18 H-12 L-10 0 Z" />
      <path d="M10 0 L12 -18 H22 L30 0 Z" />
      <path d="M-6 0 L0 -12 L6 0 Z" />
      <path d="M-22 -18 Q0 -48 22 -18 Z" />
      <line x1="-24" y1="-18" x2="24" y2="-18" stroke="currentColor" strokeWidth="2.5" />
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M-6 -46 q-6 -8 0 -16 q6 -8 0 -16" />
        <path d="M6 -44 q-6 -7 0 -14 q6 -7 0 -14" />
      </g>
    </g>
  );
}

function Stall({ x, y }: { x: number; y: number }) {
  // Market stall with an awning and a counter of fruit; (x, y) is the bottom-left.
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-8 -86 L44 -110 L96 -86 Z" />
      <line x1="0" y1="-86" x2="0" y2="0" stroke="currentColor" strokeWidth="2.5" />
      <line x1="88" y1="-86" x2="88" y2="0" stroke="currentColor" strokeWidth="2.5" />
      <rect x="-4" y="-34" width="96" height="8" />
      {[10, 26, 42, 58, 74].map((cx) => (
        <circle key={cx} cx={cx} cy="-42" r="7" />
      ))}
      {[18, 34, 50, 66].map((cx) => (
        <circle key={cx} cx={cx} cy="-54" r="6" />
      ))}
    </g>
  );
}

/** A woman waving hello — the chat's welcome. */
export function WarliWelcome({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 220 150" className={className} fill="currentColor" aria-hidden>
      <Sun x={176} y={34} r={13} />
      <Birds x={96} y={18} />
      <Woman x={40} y={70} s={1.2} pose="wave" />
      <Tree x={150} y={140} h={70} />
      <Ground x1={8} x2={212} y={140} />
    </svg>
  );
}

/** A woman walking home at night on the phone, under a street lamp. */
export function WarliCall({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 260 190" className={className} fill="currentColor" aria-hidden>
      <Moon x={214} y={36} r={16} />
      <Stars pts={[[150, 24], [180, 52], [240, 70], [120, 44], [196, 14]]} />
      <LampPost x={40} y={176} />
      <Woman x={110} y={106} s={1.2} pose="phone" stride />
      <Hut x={186} y={176} />
      <Ground x1={8} x2={252} y={176} ticks={false} />
      <line x1={20} y1={184} x2={240} y2={184} stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 8" />
    </svg>
  );
}

/** A woman cooking at a chulha. */
export function WarliKitchen({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 240 170" className={className} fill="currentColor" aria-hidden>
      <Sun x={140} y={28} r={12} />
      <Woman x={28} y={88} s={1.25} pose="stir" />
      <Chulha x={122} y={158} />
      <Palm x={196} y={158} h={100} />
      <Ground x1={8} x2={232} y={158} />
    </svg>
  );
}

/** A market stall: one woman selling, one buying — earning and schemes. */
export function WarliMarket({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 260 170" className={className} fill="currentColor" aria-hidden>
      <Birds x={196} y={14} />
      <Stall x={24} y={158} />
      <Woman x={126} y={94} s={1.1} pose="give" />
      <circle cx={180} cy={120} r={4} />
      <circle cx={188} cy={126} r={4} />
      <Woman x={188} y={94} s={1.1} pose="basket" flip />
      <Ground x1={8} x2={252} y={158} />
    </svg>
  );
}

/** A street at night: one lamp lit, one broken — reporting unsafe places. */
export function WarliStreet({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 260 180" className={className} fill="currentColor" aria-hidden>
      <Moon x={130} y={30} r={13} />
      <Stars pts={[[70, 20], [190, 26], [220, 50], [40, 46]]} />
      <LampPost x={24} y={166} />
      <LampPost x={176} y={166} lit={false} />
      <Woman x={84} y={96} s={1.2} pose="walk" />
      <Ground x1={8} x2={252} y={166} ticks={false} />
      <line x1={16} y1={174} x2={244} y2={174} stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 8" />
    </svg>
  );
}

/** A woman and a girl reading under a tree. */
export function WarliLearn({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 240 170" className={className} fill="currentColor" aria-hidden>
      <Sun x={206} y={30} r={12} />
      <Tree x={120} y={158} h={120} />
      <Woman x={24} y={86} s={1.25} pose="read" />
      <Woman x={156} y={114} s={0.75} pose="read" />
      <Ground x1={8} x2={232} y={158} />
    </svg>
  );
}

function Hill({ x, w, h, y }: { x: number; w: number; h: number; y: number }) {
  // Outlined hill with Warli-style hatch lines inside.
  const peak = x + w / 2;
  const lines = Array.from({ length: Math.floor(w / 14) }, (_, i) => x + 10 + i * 14).filter((lx) => lx < x + w - 6);
  return (
    <g>
      <path d={`M${x} ${y} L${peak} ${y - h} L${x + w} ${y}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.45" strokeLinecap="round">
        {lines.map((lx) => {
          const top = lx < peak ? y - ((lx - x) / (w / 2)) * h : y - ((x + w - lx) / (w / 2)) * h;
          return <line key={lx} x1={lx} y1={y - 2} x2={lx} y2={r2(top + 8)} />;
        })}
      </g>
    </g>
  );
}

function Fence({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  const posts = Array.from({ length: Math.floor((x2 - x1) / 9) + 1 }, (_, i) => x1 + i * 9);
  return (
    <g stroke="currentColor" strokeLinecap="round">
      {posts.map((px) => (
        <line key={px} x1={px} y1={y} x2={px} y2={y - 16} strokeWidth="1.8" />
      ))}
      <line x1={x1} y1={y - 11} x2={x2} y2={y - 11} strokeWidth="1.5" />
    </g>
  );
}

function Hen({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M0 -8 Q2 -16 10 -12 L12 -16 L14 -12 Q20 -12 18 -4 Q14 2 4 0 Z" />
      <line x1="7" y1="0" x2="6" y2="5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="11" y1="0" x2="12" y2="5" stroke="currentColor" strokeWidth="1.5" />
    </g>
  );
}

/**
 * Detailed Warli village for the home page hero: hills, sun and birds; huts, a fence, a tree and
 * palms on the far ground; in front, a woman carrying water pots, women dancing hand in hand,
 * a tarpa player leading them, and hens by the path.
 */
export function WarliVillage({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 420 330" className={className} fill="currentColor" aria-hidden>
      {/* sky */}
      <Sun x={352} y={46} r={17} />
      <Birds x={214} y={26} />
      <Birds x={120} y={52} />

      {/* hills */}
      <Hill x={0} w={190} h={96} y={196} />
      <Hill x={150} w={230} h={120} y={196} />

      {/* far ground */}
      <g transform="translate(18 0) scale(0.85)">
        <Hut x={0} y={272} />
      </g>
      <Tree x={112} y={232} h={104} />
      <Fence x1={150} x2={246} y={232} />
      <g transform="translate(252 38) scale(0.85)">
        <Hut x={0} y={228} />
      </g>
      <Palm x={338} y={232} h={128} />
      <Palm x={384} y={232} h={98} />
      <Ground x1={0} x2={420} y={232} ticks={false} />

      {/* front: water carrier, dancers, tarpa player */}
      <Woman x={4} y={250} s={1} pose="pot" stride />
      {[0, 1, 2, 3, 4].map((i) => (
        <Woman key={i} x={70 + i * 40} y={250} s={1} pose="hands" />
      ))}
      <Woman x={296} y={250} s={1} pose="tarpa" />
      <Hen x={372} y={306} />
      <Hen x={394} y={300} />

      <Ground x1={0} x2={420} y={310} />
      <g>
        {Array.from({ length: 26 }, (_, i) => (
          <circle key={i} cx={8 + i * 16} cy={326} r="1.6" />
        ))}
      </g>
    </svg>
  );
}

// ---------- Safety scenes ----------

function Bus({ x, y }: { x: number; y: number }) {
  // ST bus; (x, y) is the top-left of the body. Windows are cut out of the body.
  const w = 150;
  const h = 46;
  const windows = [10, 38, 66, 94].map((wx) => `M${wx} 8 h20 v14 h-20 Z`).join(" ");
  return (
    <g transform={`translate(${x} ${y})`}>
      <path fillRule="evenodd" d={`M0 0 H${w} Q${w + 8} 0 ${w + 8} 10 V${h} H0 Z ${windows} M124 8 h22 v30 h-22 Z`} />
      {[30, 118].map((cx) => (
        <path key={cx} fillRule="evenodd" d={`M${cx - 10} ${h + 2} a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0 Z M${cx - 4} ${h + 2} a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 Z`} />
      ))}
    </g>
  );
}

function LitHut({ x, y }: { x: number; y: number }) {
  // A hut whose window is lit, with light spilling out.
  return (
    <g>
      <Hut x={x} y={y} />
      <rect x={x + 38} y={y - 26} width="9" height="9" className="w-flicker" />
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-flicker">
        <line x1={x + 51} y1={y - 28} x2={x + 58} y2={y - 33} />
        <line x1={x + 51} y1={y - 22} x2={x + 60} y2={y - 22} />
        <line x1={x + 51} y1={y - 16} x2={x + 58} y2={y - 11} />
      </g>
    </g>
  );
}

function SignPost({ x, y, label }: { x: number; y: number; label: string }) {
  // (x, y) is the foot of the post.
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 64} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <rect x={x - 22} y={y - 88} width="44" height="26" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <text x={x} y={y - 69} textAnchor="middle" fontSize="15" fontWeight="700" fill="currentColor" fontFamily="inherit">
        {label}
      </text>
    </g>
  );
}

const nightStars: [number, number][] = [
  [20, 130], [70, 150], [118, 122], [168, 142], [250, 124], [300, 150], [206, 160], [330, 118],
];

/**
 * Hero: walking home together at night. Three women and a girl hand in hand, one on the phone,
 * under lit street lamps; a 112 signpost; a mother waiting at the door of a lit house.
 */
export function WarliSafeWalk({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 104 420 214" className={className} fill="currentColor" aria-hidden>
      <Moon x={378} y={138} r={20} />
      <Stars pts={nightStars} twinkle />

      <LampPost x={26} y={296} />
      <LampPost x={222} y={296} />

      {/* the group, walking right towards home */}
      <Woman x={52} y={228} s={1.05} pose="phone" stride animate />
      <Woman x={96} y={228} s={1.05} pose="hands" stride animate delay={-0.45} />
      <Woman x={140} y={256} s={0.66} pose="hands" stride animate delay={-0.2} />
      <Woman x={168} y={228} s={1.05} pose="hands" stride animate delay={-0.65} />

      <SignPost x={280} y={296} label="112" />

      {/* home, and someone waiting */}
      <LitHut x={306} y={296} />
      <Woman x={372} y={236} s={0.98} pose="wave" flip animate />

      <Ground x1={0} x2={420} y={296} ticks={false} />
      <g>
        {Array.from({ length: 24 }, (_, i) => (
          <circle key={i} cx={10 + i * 17} cy={308} r="1.8" />
        ))}
      </g>
    </svg>
  );
}

// Walk a group `dist` units to the right over `seconds`, fading in and out at the ends.
const travel = (dist: number, seconds: number, delay = 0) =>
  ({ "--dist": `${dist}px`, animationDuration: `${seconds}s`, animationDelay: `${delay}s` }) as React.CSSProperties;

/**
 * Mural: the way home, as one continuous night journey — off the ST bus (photographing the
 * number plate), along a lit road with a friend, past the open shop on a phone call, and home
 * to a mother at the door and a daughter running to meet her.
 */
export function WarliWayHome({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 1200 250" preserveAspectRatio="xMidYMid meet" className={className} fill="currentColor" aria-hidden>
      <Moon x={1110} y={52} r={22} />
      <Stars
        twinkle
        pts={[
          [60, 30], [150, 60], [260, 24], [340, 70], [450, 36], [560, 64], [640, 20], [720, 58], [830, 30], [930, 66], [1010, 26], [1170, 96],
        ]}
      />

      {/* 1. off the bus */}
      <Bus x={24} y={158} />
      <SignPost x={214} y={226} label="ST" />
      <Woman x={236} y={160} s={1.1} pose="phone" />

      {/* 2. a lit road, walking with a friend */}
      <LampPost x={330} y={226} />
      <g className="w-travel" style={travel(140, 10)}>
        <Woman x={372} y={160} s={1.1} pose="hands" stride animate />
        <Woman x={416} y={160} s={1.1} pose="hands" stride animate delay={-0.45} />
      </g>
      <LampPost x={530} y={226} />

      {/* 3. past the open shop, on the phone */}
      <Stall x={620} y={226} />
      <LampPost x={610} y={226} />
      <g className="w-travel" style={travel(110, 9, -4)}>
        <Woman x={742} y={160} s={1.1} pose="phone" stride animate delay={-0.3} />
      </g>

      {/* 4. home */}
      <LitHut x={900} y={226} />
      <Woman x={970} y={164} s={1.05} pose="wave" flip animate />
      <Woman x={1030} y={186} s={0.7} pose="walk" flip animate delay={-0.2} />
      <Palm x={1150} y={226} h={120} />

      <Ground x1={0} x2={1200} y={227} ticks={false} />
      <g>
        {Array.from({ length: 70 }, (_, i) => (
          <circle key={i} cx={10 + i * 17} cy={238} r="1.8" />
        ))}
      </g>
    </svg>
  );
}

// ---------- Hero options (painted style: white on geru) ----------



