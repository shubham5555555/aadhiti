// Kitchen matching: typed ingredient parsing (Marathi / Hindi / English / romanised),
// ingredient equivalence and per-recipe food cautions. Mirrors the prototype's parseIngredients().

import { foodCautions, ingredients, type FoodCaution, type Recipe } from "./everyday";

/** Longest synonym first, so "मूग डाळ" wins over "डाळ" and "double roti" over "roti". */
const MATCHES: [string, string][] = ingredients
  .flatMap((i) => [...i.match, i.name.en, i.name.mr, i.name.hi].map((m) => [m.toLowerCase().trim(), i.id] as [string, string]))
  .filter(([m]) => m.length > 0 && !/[()]/.test(m))
  .sort((a, b) => b[0].length - a[0].length);

/** Joining words and filler — never reported as "didn't recognise". */
const STOP = new Set(
  [
    // English
    "and", "i", "have", "has", "got", "some", "a", "an", "the", "of", "in", "my", "kitchen", "with", "only", "little", "few",
    "there", "is", "are", "we", "at", "home", "also", "plus", "bit", "left", "whats", "what's",
    // romanised
    "ani", "aani", "ahe", "ahet", "aahe", "aahet", "thoda", "thode", "thodi", "ghari", "majhyakade", "mazyakade", "aur", "hai", "hain",
    "kuch", "mere", "paas", "pas", "ghar", "me", "mein", "bhi", "pan", "pn",
    // Marathi
    "आणि", "आहे", "आहेत", "थोडा", "थोडे", "थोडी", "थोडं", "घरी", "माझ्याकडे", "आमच्याकडे", "पण", "व", "फक्त", "सुद्धा", "पण", "आणखी",
    // Hindi
    "और", "है", "हैं", "थोड़ा", "थोड़े", "थोड़ी", "कुछ", "मेरे", "पास", "घर", "में", "भी", "सिर्फ़", "सिर्फ",
  ].map((w) => w.toLowerCase()),
);

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const isLatin = (s: string) => /^[a-z0-9' ]+$/.test(s);

export type ParseResult = { ids: string[]; unknown: string[] };

/**
 * "पोहे, कांदा आणि शेंगदाणे आहेत" -> { ids: ["poha", "onion", "peanuts"], unknown: [] }
 * Latin synonyms must be whole words (plural -s/-es allowed). Devanagari synonyms must start a
 * word; any ending is allowed so inflections like "पोह्यांचे" or "कांद्याची" still match the stem.
 */
export function parseKitchen(text: string): ParseResult {
  let t = " " + text.toLowerCase().replace(/[.,;:!?()/\-+"“”‘’|।]+/g, " ").replace(/\s+/g, " ") + " ";
  const ids: string[] = [];
  const blank = (start: number, len: number) => (t = t.slice(0, start) + " ".repeat(len) + t.slice(start + len));

  for (const [m, id] of MATCHES) {
    const re = isLatin(m) ? new RegExp(`(?<=[^a-z])${esc(m)}(?:s|es)?(?=[^a-z])`, "g") : new RegExp(`(?<=\\s)${esc(m)}`, "g");
    let hit: RegExpExecArray | null;
    let found = false;
    while ((hit = re.exec(t))) {
      found = true;
      // Blank out the whole word (Devanagari endings included) so it isn't matched twice.
      let end = hit.index + hit[0].length;
      if (!isLatin(m)) while (end < t.length && t[end] !== " ") end++;
      blank(hit.index, end - hit.index);
    }
    if (found && !ids.includes(id)) ids.push(id);
  }

  const unknown = [...new Set(t.split(/\s+/).filter((w) => w && !STOP.has(w) && !/^\d+$/.test(w)))];
  return { ids, unknown };
}

/* ---------- equivalence: "dal" is covered by any dal, generic fish by any fish ---------- */

const DALS = ["toor_dal", "moong_dal", "masoor_dal", "chana_dal", "udid_dal"];
const FISH = ["fish", "bangda", "bombil"];
const ALT: Record<string, string[]> = {
  dal: DALS,
  ...Object.fromEntries(DALS.map((d) => [d, ["dal"]])),
  ...Object.fromEntries(FISH.map((f) => [f, FISH.filter((x) => x !== f)])),
};

export function hasIngredient(have: Set<string>, id: string): boolean {
  return have.has(id) || (ALT[id] ?? []).some((a) => have.has(a));
}

/* ---------- food cautions relevant to a recipe ---------- */

const PREGNANT = ["pregnant_t1", "pregnant_t2", "pregnant_t3"];

export function cautionsFor(r: Recipe): FoodCaution[] {
  // Salt is assumed in every recipe, so the "no salt under 1" rule applies wherever a baby may eat.
  const used = new Set([...r.needs, ...(r.optional ?? []), "salt"]);
  for (const id of [...used]) (ALT[id] ?? []).forEach((a) => used.add(a));
  const youngest = r.minChildMonths ?? 12;
  const forPregnancy = !!r.pregnancyNote || (r.goodFor ?? []).some((s) => PREGNANT.includes(s)) || !r.goodFor;
  return foodCautions.filter((c) => {
    if (!c.ingredients.some((i) => used.has(i))) return false;
    if (c.pregnancy) return forPregnancy;
    return c.underMonths !== undefined && youngest < c.underMonths;
  });
}
