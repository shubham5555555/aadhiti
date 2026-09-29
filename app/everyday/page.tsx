"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Baby,
  Castle,
  Check,
  ChefHat,
  ChevronDown,
  Landmark,
  Luggage,
  Share2,
  Shuffle,
  Soup,
  Sparkles,
  Trees,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";
import { WeekGrid } from "@/components/PageArt";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";
import { ingredients, kids, outingTips, outings, recipes, selfCare, type Meal, type Recipe, type Tip } from "@/lib/everyday";

type Tab = "cook" | "care" | "kids" | "outings";
type Filter = "quick" | "lowOil" | "kids" | "leftover" | "guests";

const copy = {
  eyebrow: { mr: "AADHI TI — रोजचं", en: "AADHI TI — Everyday", hi: "AADHI TI — रोज़मर्रा" },
  title: { mr: "आज काय बनवू?", en: "What should I cook today?", hi: "आज क्या बनाऊँ?" },
  body: {
    mr: "स्वयंपाक, self-care, मुलं आणि फिरणं — रोजच्या छोट्या प्रश्नांसाठी झटपट मदत.",
    en: "Cooking, self-care, kids and outings — quick help for everyday questions.",
    hi: "खाना, self-care, बच्चे और घूमना — रोज़ के छोटे सवालों के लिए झटपट मदद।",
  },
  tabs: {
    cook: { mr: "स्वयंपाक", en: "Cooking", hi: "खाना" },
    care: { mr: "Self-care", en: "Self-care", hi: "Self-care" },
    kids: { mr: "मुलं", en: "Kids", hi: "बच्चे" },
    outings: { mr: "फिरायला", en: "Outings", hi: "घूमना" },
  } satisfies Record<Tab, L>,
  kitchen: { mr: "माझ्या स्वयंपाकघरात काय आहे?", en: "What's in my kitchen?", hi: "मेरी रसोई में क्या है?" },
  kitchenHint: { mr: "तुमच्याकडे असलेलं साहित्य निवडा", en: "Pick what you have", hi: "जो सामग्री है, चुनें" },
  clear: { mr: "सगळं काढा", en: "Clear", hi: "सब हटाएँ" },
  filters: {
    quick: { mr: "20 मिनिटांत", en: "Under 20 min", hi: "20 मिनट में" },
    lowOil: { mr: "कमी तेल", en: "Low oil", hi: "कम तेल" },
    kids: { mr: "मुलांचा डबा", en: "Kids' tiffin", hi: "बच्चों का टिफ़िन" },
    leftover: { mr: "उरलेलं", en: "Leftover magic", hi: "बचा हुआ" },
    guests: { mr: "पाहुणे", en: "Guests", hi: "मेहमान" },
  } satisfies Record<Filter, L>,
  have: { mr: "तुमच्याकडे", en: "You have", hi: "आपके पास" },
  missing: { mr: "लागेल", en: "Need", hi: "चाहिए" },
  min: { mr: "मि.", en: "min", hi: "मि." },
  addList: { mr: "यादीत टाका", en: "Add to list", hi: "सूची में डालें" },
  added: { mr: "यादीत आहे", en: "In list", hi: "सूची में" },
  steps: { mr: "कृती", en: "Steps", hi: "विधि" },
  noMatch: { mr: "या निवडीसाठी recipe नाही — एखादा filter काढा.", en: "No recipes for this selection — remove a filter.", hi: "इस चुनाव के लिए recipe नहीं — कोई filter हटाएँ।" },
  today: { mr: "आजचा मेनू", en: "Today's menu", hi: "आज का मेनू" },
  week: { mr: "आठवड्याचं जेवण नियोजन", en: "Weekly meal planner", hi: "हफ़्ते की भोजन योजना" },
  shuffle: { mr: "बदला", en: "Shuffle", hi: "बदलें" },
  list: { mr: "Shopping list", en: "Shopping list", hi: "Shopping list" },
  listEmpty: { mr: "Recipe वरचं '+ यादीत टाका' दाबा — लागणारं साहित्य इथे येईल.", en: "Tap '+ Add to list' on a recipe — the ingredients you need will appear here.", hi: "Recipe पर '+ सूची में डालें' दबाएँ — ज़रूरी सामग्री यहाँ आएगी।" },
  share: { mr: "WhatsApp वर पाठवा", en: "Share on WhatsApp", hi: "WhatsApp पर भेजें" },
  places: { mr: "श्रीवर्धनच्या आसपास", en: "Around Shrivardhan", hi: "श्रीवर्धन के आसपास" },
  solo: { mr: "एकटी प्रवास करताय? सुरक्षिततेच्या टिप्स", en: "Travelling alone? Safety tips", hi: "अकेले सफ़र? सुरक्षा टिप्स" },
  kidsSafety: { mr: "मुलीच्या सुरक्षेबद्दल बोलायचं आहे?", en: "Want to talk to your daughter about safety?", hi: "बेटी से सुरक्षा पर बात करनी है?" },
  healthNote: { mr: "त्वचा / केसांची समस्या असल्यास — AADHI TI आरोग्य विभाग", en: "Skin or hair problem? — AADHI TI health section", hi: "त्वचा / बालों की समस्या? — AADHI TI स्वास्थ्य सेक्शन" },
};

const meals: { id: Meal; label: L }[] = [
  { id: "breakfast", label: { mr: "नाश्ता", en: "Breakfast", hi: "नाश्ता" } },
  { id: "lunch", label: { mr: "दुपारचं जेवण", en: "Lunch", hi: "दोपहर का खाना" } },
  { id: "dinner", label: { mr: "रात्रीचं जेवण", en: "Dinner", hi: "रात का खाना" } },
];

const days: L[] = [
  { mr: "सोम", en: "Mon", hi: "सोम" },
  { mr: "मंगळ", en: "Tue", hi: "मंगल" },
  { mr: "बुध", en: "Wed", hi: "बुध" },
  { mr: "गुरु", en: "Thu", hi: "गुरु" },
  { mr: "शुक्र", en: "Fri", hi: "शुक्र" },
  { mr: "शनि", en: "Sat", hi: "शनि" },
  { mr: "रवि", en: "Sun", hi: "रवि" },
];

const tabIcons: Record<Tab, LucideIcon> = { cook: ChefHat, care: Sparkles, kids: Baby, outings: Luggage };
const outingIcons = { beach: Waves, temple: Landmark, fort: Castle, nature: Trees, food: Soup } satisfies Record<string, LucideIcon>;

const ingredientById = new Map(ingredients.map((i) => [i.id, i]));

// Small deterministic PRNG so the menu is stable per seed but changes on "shuffle".
function pick<T>(list: T[], seed: number, salt: number): T | undefined {
  if (list.length === 0) return undefined;
  const x = Math.sin(seed * 9301 + salt * 49297) * 233280;
  return list[Math.floor((x - Math.floor(x)) * list.length)];
}

const linkCls = "inline-flex items-center gap-2 font-bold text-kokum-600 underline decoration-kokum-200 underline-offset-4 hover:decoration-kokum-500";
const h2Cls = "font-serif text-2xl font-normal text-ink sm:text-3xl";

export default function EverydayPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>("cook");

  return (
    <div className="pb-6">
      {/* Opening */}
      <section className="grid gap-8 border-b border-ink/10 pt-10 pb-12 md:grid-cols-[1.25fr_1fr] md:items-center">
        <div>
          <p className="text-sm font-semibold tracking-wide text-sea-700">{t(copy.eyebrow)}</p>
          <h1 className="mt-3 font-serif text-[3rem] leading-[1] font-normal text-kokum-600 sm:text-[4.25rem]">{t(copy.title)}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">{t(copy.body)}</p>
        </div>
        <figure className="w-full">
          <WeekGrid t={t} />
        </figure>
      </section>

      {/* Tabs */}
      <div className="no-scrollbar -mx-4 overflow-x-auto border-b border-ink/10 px-4 sm:mx-0 sm:px-0" role="tablist">
        <div className="flex gap-6">
          {(Object.keys(copy.tabs) as Tab[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`-mb-px flex shrink-0 items-center gap-1.5 border-b-2 py-3 text-[15px] font-bold whitespace-nowrap transition ${
                tab === k ? "border-kokum-500 text-ink" : "border-transparent text-ink-soft hover:text-ink"
              }`}
            >
              <TabIcon k={k} /> {t(copy.tabs[k])}
            </button>
          ))}
        </div>
      </div>

      <div key={tab} className="animate-fade-up pt-10">
        {tab === "cook" && <Cooking />}
        {tab === "care" && (
          <TipGrid
            tips={selfCare}
            footer={
              <Link href="/chat?cat=health" className={linkCls}>
                {t(copy.healthNote)} <ArrowRight size={16} />
              </Link>
            }
          />
        )}
        {tab === "kids" && (
          <TipGrid
            tips={kids}
            footer={
              <Link href="/chat?topic=daughter_safety" className={linkCls}>
                {t(copy.kidsSafety)} <ArrowRight size={16} />
              </Link>
            }
          />
        )}
        {tab === "outings" && <Outings />}
      </div>
    </div>
  );
}

// ---------- Cooking ----------

function Cooking() {
  const { t } = useLang();
  const [have, setHave] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Set<Filter>>(new Set());
  const [list, setList] = useState<string[]>([]);
  const [open, setOpen] = useState<string | null>(null);
  const [seed, setSeed] = useState(0);

  // Seed from today's date after mount so server and client render the same markup first.
  useEffect(() => setSeed(Math.floor(Date.now() / 86_400_000)), []);

  const toggle = <T,>(set: Set<T>, v: T) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    return next;
  };

  const ranked = useMemo(() => {
    return recipes
      .filter((r) => [...filters].every((f) => (f === "quick" ? r.minutes <= 20 || r.tags.includes("quick") : r.tags.includes(f))))
      .map((r) => ({ r, got: r.needs.filter((n) => have.has(n)).length }))
      .sort((a, b) => (have.size ? b.got / b.r.needs.length - a.got / a.r.needs.length : 0) || a.r.minutes - b.r.minutes);
  }, [have, filters]);

  const forMeal = (m: Meal) => recipes.filter((r) => r.meals.includes(m));

  // One recipe per meal for a day, never repeating a dish within that day.
  const dayMenu = (daySeed: number) => {
    const used = new Set<string>();
    return meals.map((m, mi) => {
      const r = pick(forMeal(m.id).filter((x) => !used.has(x.id)), daySeed, mi + 1);
      if (r) used.add(r.id);
      return r;
    });
  };

  // Ingredients still needed for recipes in the list (skipping ones already in the kitchen).
  const shopping = useMemo(() => {
    const need = new Map<string, number>();
    for (const id of list) {
      const r = recipes.find((x) => x.id === id);
      r?.needs.filter((n) => !have.has(n)).forEach((n) => need.set(n, (need.get(n) ?? 0) + 1));
    }
    return [...need.keys()];
  }, [list, have]);
  const [bought, setBought] = useState<Set<string>>(new Set());

  const shareText = shopping.map((id) => `• ${t(ingredientById.get(id)!.name)}`).join("\n");

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12">
      {/* min-w-0 stops the wide planner table from stretching this column past the screen. */}
      <div className="min-w-0 space-y-12">
        {/* What's in my kitchen */}
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2Cls}>{t(copy.kitchen)}</h2>
            {have.size > 0 && (
              <button onClick={() => setHave(new Set())} className="text-sm font-bold text-ink-soft underline underline-offset-4 hover:text-kokum-600">
                {t(copy.clear)}
              </button>
            )}
          </div>
          <p className="mt-1 text-ink-soft">{t(copy.kitchenHint)}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {ingredients.map((i) => (
              <button
                key={i.id}
                aria-pressed={have.has(i.id)}
                onClick={() => setHave((s) => toggle(s, i.id))}
                className={`border px-3 py-1.5 text-sm transition ${
                  have.has(i.id) ? "border-ink bg-ink text-white" : "border-ink/20 bg-white text-ink hover:border-ink"
                }`}
              >
                {t(i.name)}
              </button>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2 border-t border-ink/10 pt-5">
            {(Object.keys(copy.filters) as Filter[]).map((f) => (
              <button
                key={f}
                aria-pressed={filters.has(f)}
                onClick={() => setFilters((s) => toggle(s, f))}
                className={`border px-2.5 py-1 text-[13px] font-semibold transition ${
                  filters.has(f) ? "border-kokum-600 bg-kokum-600 text-white" : "border-ink/15 text-ink-soft hover:border-ink/40 hover:text-ink"
                }`}
              >
                {t(copy.filters[f])}
              </button>
            ))}
          </div>
        </section>

        {/* Recipes */}
        {ranked.length === 0 ? (
          <p className="border-y border-ink/15 py-6 text-ink-soft">{t(copy.noMatch)}</p>
        ) : (
          <ul className="grid border-t border-ink/15 md:grid-cols-2 md:gap-x-10">
            {ranked.map(({ r, got }) => (
              <RecipeItem
                key={r.id}
                r={r}
                got={got}
                have={have}
                showMatch={have.size > 0}
                open={open === r.id}
                onToggle={() => setOpen(open === r.id ? null : r.id)}
                inList={list.includes(r.id)}
                onAdd={() => setList((l) => (l.includes(r.id) ? l.filter((x) => x !== r.id) : [...l, r.id]))}
              />
            ))}
          </ul>
        )}

        {/* Weekly planner */}
        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className={h2Cls}>{t(copy.week)}</h2>
            <button onClick={() => setSeed((s) => s + 7)} className={`text-sm ${linkCls}`}>
              <Shuffle size={14} /> {t(copy.shuffle)}
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] border-t-2 border-ink text-[15px]">
              <thead>
                <tr className="border-b border-ink/15 text-left text-sm text-ink-soft">
                  <th className="py-2.5 pr-4 font-semibold" />
                  {meals.map((m) => (
                    <th key={m.id} className="px-3 py-2.5 font-semibold">
                      {t(m.label)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((d, di) => (
                  <tr key={d.en} className="border-b border-ink/10">
                    <td className="py-3 pr-4 font-serif text-lg text-kokum-600">{t(d)}</td>
                    {dayMenu(seed + di).map((r, mi) => (
                      <td key={meals[mi].id} className="px-3 py-3 text-ink">
                        {r && t(r.name)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Side: today's menu + shopping list */}
      <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
        <section className="border-2 border-ink bg-turmeric-100 p-5">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-2xl font-normal text-ink">{t(copy.today)}</h2>
            <button onClick={() => setSeed((s) => s + 1)} className="flex items-center gap-1 text-sm font-bold text-ink underline underline-offset-4 hover:text-kokum-600">
              <Shuffle size={14} /> {t(copy.shuffle)}
            </button>
          </div>
          <ul className="mt-3 border-t border-ink/20">
            {dayMenu(seed).map((r, mi) => {
              const m = meals[mi];
              return (
                <li key={m.id} className="border-b border-ink/20 py-3 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-sea-700">{t(m.label)}</p>
                  {r && (
                    <p className="font-display text-lg font-bold text-ink">
                      {t(r.name)} <span className="text-sm font-normal text-ink-soft">· {r.minutes} {t(copy.min)}</span>
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>

        <section className="border-2 border-ink bg-white p-5">
          <h2 className="font-serif text-2xl font-normal text-ink">{t(copy.list)}</h2>
          {list.length === 0 ? (
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t(copy.listEmpty)}</p>
          ) : (
            <>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
                {list.map((id) => {
                  const r = recipes.find((x) => x.id === id)!;
                  return (
                    <li key={id} className="flex items-center gap-1 font-semibold text-ink">
                      {t(r.name)}
                      <button onClick={() => setList((l) => l.filter((x) => x !== id))} aria-label="Remove" className="text-ink-soft hover:text-kokum-600">
                        <X size={14} />
                      </button>
                    </li>
                  );
                })}
              </ul>
              <ul className="mt-4 border-t border-ink/15">
                {shopping.map((id) => {
                  const ing = ingredientById.get(id)!;
                  const done = bought.has(id);
                  return (
                    <li key={id} className="border-b border-ink/10">
                      <button
                        onClick={() => setBought((s) => toggle(s, id))}
                        className={`flex w-full items-center gap-3 py-2 text-left text-[15px] ${done ? "text-ink-soft line-through" : "text-ink"}`}
                      >
                        <span className={`grid h-4 w-4 shrink-0 place-items-center border ${done ? "border-leaf-600 bg-leaf-600 text-white" : "border-ink/50"}`}>
                          {done && <Check size={12} strokeWidth={3} />}
                        </span>
                        {t(ing.name)}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {shopping.length > 0 && (
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${t(copy.list)}\n${shareText}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 bg-leaf-600 py-2.5 text-sm font-bold text-white hover:bg-leaf-700"
                >
                  <Share2 size={16} /> {t(copy.share)}
                </a>
              )}
            </>
          )}
        </section>
      </aside>
    </div>
  );
}

function RecipeItem({
  r,
  got,
  have,
  showMatch,
  open,
  onToggle,
  inList,
  onAdd,
}: {
  r: Recipe;
  got: number;
  have: Set<string>;
  showMatch: boolean;
  open: boolean;
  onToggle: () => void;
  inList: boolean;
  onAdd: () => void;
}) {
  const { t } = useLang();
  const missing = r.needs.filter((n) => !have.has(n));
  return (
    <li className="border-b border-ink/15 py-4">
      <button onClick={onToggle} aria-expanded={open} className="group flex w-full items-baseline justify-between gap-3 text-left">
        <span className="min-w-0">
          <span className="font-display text-lg font-bold text-ink group-hover:text-kokum-600">{t(r.name)}</span>
          <span className="ml-2 text-sm whitespace-nowrap text-ink-soft">
            {r.minutes} {t(copy.min)}
          </span>
        </span>
        <ChevronDown size={17} className={`shrink-0 self-center text-ink/30 transition group-hover:text-kokum-600 ${open ? "rotate-180" : ""}`} />
      </button>

      {showMatch && (
        <div className="mt-2">
          <div className="h-[2px] bg-ink/10">
            <div className="h-full bg-turmeric-500" style={{ width: `${(got / r.needs.length) * 100}%` }} />
          </div>
          <p className="mt-1.5 text-sm text-ink-soft">
            {t(copy.have)} {got}/{r.needs.length}
            {missing.length > 0 && (
              <>
                {" · "}
                {t(copy.missing)}: {missing.map((m) => t(ingredientById.get(m)!.name)).join(", ")}
              </>
            )}
          </p>
        </div>
      )}

      {open && (
        <div className="mt-3 animate-fade-up">
          <p className="text-sm font-semibold text-sea-700">{t(copy.steps)}</p>
          <ol className="mt-2 space-y-2">
            {r.steps.map((s, i) => (
              <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-2 text-[15px] leading-relaxed text-ink">
                <span className="font-serif text-lg leading-snug text-kokum-500 tabular-nums">{i + 1}.</span>
                <span>{t(s)}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <button onClick={onAdd} className={`mt-3 text-sm ${inList ? "inline-flex items-center gap-1.5 font-bold text-leaf-700" : linkCls}`}>
        {inList ? <Check size={14} /> : "+"} {inList ? t(copy.added) : t(copy.addList)}
      </button>
    </li>
  );
}

// ---------- Tips & outings ----------

function TipGrid({ tips, footer }: { tips: Tip[]; footer?: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div>
      <div className="grid border-t border-ink/15 md:grid-cols-2 md:gap-x-12">
        {tips.map((tip) => (
          <section key={tip.title.en} className="border-b border-ink/15 py-7">
            <h2 className={h2Cls}>{t(tip.title)}</h2>
            <ul className="mt-4 space-y-2.5">
              {tip.points.map((p, i) => (
                <li key={i} className="grid grid-cols-[1rem_1fr] gap-2 text-[15px] leading-relaxed text-ink">
                  <span className="text-kokum-500">–</span>
                  <span>{t(p)}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      {footer && <div className="mt-8">{footer}</div>}
    </div>
  );
}

function Outings() {
  const { t } = useLang();
  return (
    <div className="space-y-12">
      <section>
        <h2 className={h2Cls}>{t(copy.places)}</h2>
        <ul className="mt-5 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10">
          {outings.map((o) => (
            <li key={o.id} className="flex gap-4 border-b border-ink/15 py-5">
              <OutingIcon kind={o.kind} />
              <span className="min-w-0">
                <span className="block font-display text-lg font-bold text-ink">{t(o.name)}</span>
                <span className="mt-0.5 block text-[15px] leading-relaxed text-ink-soft">{t(o.desc)}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
      <TipGrid
        tips={outingTips}
        footer={
          <Link href="/chat?topic=solo_travel" className={linkCls}>
            {t(copy.solo)} <ArrowRight size={16} />
          </Link>
        }
      />
    </div>
  );
}

function TabIcon({ k }: { k: Tab }) {
  const Icon = tabIcons[k];
  return <Icon size={16} />;
}

function OutingIcon({ kind }: { kind: keyof typeof outingIcons }) {
  const Icon = outingIcons[kind];
  return <Icon size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sea-600" />;
}
