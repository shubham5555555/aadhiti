// Warli-style illustrations (Maharashtra folk art) for the home page.
// Everything is drawn in `currentColor`, like white paint on a mud wall.

type Pose = "hands" | "down" | "basket" | "walk" | "talk" | "reach" | "stick" | "phone" | "stir" | "wave" | "read" | "give";

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
};

/** A woman in a 40×60 box, feet at the bottom. `flip` mirrors her to face left. */
function Woman({ x, y, s = 1, pose = "hands", flip = false, stride = false }: { x: number; y: number; s?: number; pose?: Pose; flip?: boolean; stride?: boolean }) {
  const legs = pose === "walk" || stride ? ["M15 47 L8 58", "M25 47 L32 58"] : ["M15 47 L13 58", "M25 47 L27 58"];
  const tx = flip ? x + 40 * s : x;
  return (
    <g transform={`translate(${tx} ${y}) scale(${flip ? -s : s} ${s})`}>
      <circle cx="20" cy="8" r="5" />
      <path d="M11 15 H29 L20 30 Z" />
      <path d="M20 30 L9 47 H31 Z" />
      {pose === "basket" && <path d="M3 1 Q20 7 37 1 L33 -6 H7 Z" />}
      {pose === "phone" && <rect x="23" y="1" width="5" height="9" rx="1" />}
      {pose === "read" && <rect x="16" y="23" width="20" height="12" />}
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[...ARMS[pose], ...legs].map((d) => (
          <path key={d} d={d} />
        ))}
        {pose === "stick" && <path d="M36 22 L38 58" strokeWidth="2.5" />}
        {pose === "stir" && <path d="M42 26 L50 44" strokeWidth="2.5" />}
        {pose === "wave" && <path d="M40 -2 l3 -3 M41 3 l4 -1" strokeWidth="1.5" />}
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

function Ground({ x1, x2, y, ticks = true }: { x1: number; x2: number; y: number; ticks?: boolean }) {
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

function Moon({ x, y, r = 14 }: { x: number; y: number; r?: number }) {
  return <path transform={`translate(${x} ${y})`} d={`M0 ${-r} A${r} ${r} 0 1 0 0 ${r} A${r * 0.72} ${r} 0 1 1 0 ${-r} Z`} />;
}

function Stars({ pts }: { pts: [number, number][] }) {
  return (
    <g>
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" />
      ))}
    </g>
  );
}

function LampPost({ x, y, lit = true }: { x: number; y: number; lit?: boolean }) {
  // (x, y) is the foot of the post.
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 110} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1={x} y1={y - 110} x2={x + 22} y2={y - 110} stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${x + 14} ${y - 110} h16 l-4 8 h-8 Z`} />
      {lit ? (
        <path d={`M${x + 18} ${y - 102} L${x - 6} ${y} H${x + 50} L${x + 26} ${y - 102} Z`} opacity="0.18" />
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
