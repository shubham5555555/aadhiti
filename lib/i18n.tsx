"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { AgeGroup, L, Lang } from "./kb/types";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  age: AgeGroup | null;
  setAge: (a: AgeGroup | null) => void;
  t: (l: L) => string;
};

const LangContext = createContext<Ctx | null>(null);

export const LANGS: { id: Lang; label: string; short: string; speech: string }[] = [
  { id: "mr", label: "मराठी", short: "मराठी", speech: "mr-IN" },
  { id: "en", label: "English", short: "EN", speech: "en-IN" },
  { id: "hi", label: "हिंदी", short: "हिंदी", speech: "hi-IN" },
];

function read<T extends string>(key: string, allowed: readonly T[]): T | null {
  try {
    const v = localStorage.getItem(key);
    return v && (allowed as readonly string[]).includes(v) ? (v as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode) — preference just won't persist.
  }
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // Marathi first, as in the spec. Stored preferences load after mount to avoid hydration mismatch.
  const [lang, setLangState] = useState<Lang>("mr");
  const [age, setAgeState] = useState<AgeGroup | null>(null);

  useEffect(() => {
    const l = read("aadhi-lang", ["mr", "en", "hi"] as const);
    if (l) setLangState(l);
    const a = read("aadhi-age", ["girl", "18", "30", "40", "50"] as const);
    if (a) setAgeState(a);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    write("aadhi-lang", l);
  }, []);

  const setAge = useCallback((a: AgeGroup | null) => {
    setAgeState(a);
    write("aadhi-age", a);
  }, []);

  const t = useCallback((l: L) => l[lang] || l.en, [lang]);

  return <LangContext.Provider value={{ lang, setLang, age, setAge, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
