import type { Lang } from "./kb/types";

const ROMAN_INDIAN =
  /\b(aahe|ahe|mala|maza|mazi|majh\w*|kay|nahi|nahin|mujhe|mera|meri|hai|hain|kya|kaise|kaisa|karu|karaycha|karaychi|kara|karna|pahije|chahiye|kuthe|kuthun|kahan|kidhar|aap|tumhi|konti|kaun|paise|milel|milega|milegi|sathi|tyasathi|liye|kasa|kashi|kase|ka|ki|ke|ko|se|mein|madhe|hota|hoti|zala|zali|hoil|bhi|pan|ani|aur)\b/gi;
const ROMAN_HINDI = /\b(mujhe|mera|meri|hai|hain|kya|kaise|kaisa|chahiye|kahan|kidhar|kaun|milega|milegi|liye|mein|bhi|aur|nahin)\b/gi;
const ROMAN_MARATHI = /\b(aahe|ahe|mala|maza|mazi|majh\w*|kay|karu|karaycha|karaychi|pahije|kuthe|kuthun|tumhi|konti|milel|sathi|tyasathi|kasa|kashi|kase|madhe|zala|zali|hoil|ani)\b/gi;
const ENGLISH = /\b(the|is|are|am|what|how|where|when|why|can|could|should|my|me|i|to|for|of|and|with|do|does|get|want|need|help|please)\b/gi;

/** Answer in the language she wrote in; romanised Marathi/Hindi follows her chosen app language. */
export function detectLang(q: string, uiLang: Lang): Lang {
  if (/[ऀ-ॿ]/.test(q)) {
    return /ळ|ॲ|आहे|मला|माझ|तुम्ही|तुमच|काय|नाही|करू|झालं|झाली|होतं|पाहिजे|कसं|कसा|कशी|आम्ही|आपल्या|केलं|कोणी|कुठे|मिळेल|सांगा|हवं|नको|त्यांच|आमच|करायच|कधी|येतंय|चालेल/.test(q) ? "mr" : "hi";
  }
  if (uiLang === "en") return "en";
  const indian = q.match(ROMAN_INDIAN)?.length ?? 0;
  const english = q.match(ENGLISH)?.length ?? 0;
  // Mixed text ("mala loan kuthun milel") has a few English nouns but Indian grammar words.
  if (english > indian) return "en";
  const hindi = q.match(ROMAN_HINDI)?.length ?? 0;
  const marathi = q.match(ROMAN_MARATHI)?.length ?? 0;
  return hindi > marathi ? "hi" : marathi > hindi ? "mr" : uiLang;
}
