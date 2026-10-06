"use client";
// Basic information she gives before her first question (as in the AADHI TI prototype's onboarding).
// Stored locally by default. Optional server storage is managed separately on /my-data.
import { useCallback, useEffect, useState } from "react";
import type { AgeGroup, L } from "./kb/types";

export type LifeStage = "pregnant" | "breastfeeding" | "none";
export type ChildBand = "baby" | "toddler" | "preschool" | "school" | "girl";
export type AnswerMode = "text" | "voice" | "both";

export type Profile = {
  onboarded: boolean;
  name: string;
  taluka: string;
  age: AgeGroup | null;
  stage: LifeStage;
  /** Month of pregnancy, 1–9. */
  month: number | null;
  children: ChildBand[];
  answerMode: AnswerMode;
  remember: boolean;
};

export const emptyProfile: Profile = {
  onboarded: false,
  name: "",
  taluka: "shrivardhan",
  age: null,
  stage: "none",
  month: null,
  children: [],
  answerMode: "text",
  remember: false,
};

export const TALUKAS: { id: string; name: L }[] = [
  { id: "shrivardhan", name: { mr: "श्रीवर्धन", en: "Shrivardhan", hi: "श्रीवर्धन" } },
  { id: "mhasla", name: { mr: "म्हसळा", en: "Mhasla", hi: "म्हसला" } },
  { id: "mangaon", name: { mr: "माणगाव", en: "Mangaon", hi: "माणगाँव" } },
  { id: "tala", name: { mr: "तळा", en: "Tala", hi: "तला" } },
  { id: "roha", name: { mr: "रोहा", en: "Roha", hi: "रोहा" } },
  { id: "alibag", name: { mr: "अलिबाग", en: "Alibag", hi: "अलीबाग" } },
  { id: "murud", name: { mr: "मुरुड", en: "Murud", hi: "मुरुड" } },
  { id: "mahad", name: { mr: "महाड", en: "Mahad", hi: "महाड" } },
  { id: "pen", name: { mr: "पेण", en: "Pen", hi: "पेण" } },
  { id: "panvel", name: { mr: "पनवेल", en: "Panvel", hi: "पनवेल" } },
];

export const CHILD_BANDS: { id: ChildBand; label: L; en: string }[] = [
  { id: "baby", label: { mr: "1 वर्षाखालील बाळ", en: "Baby under 1", hi: "1 साल से छोटा शिशु" }, en: "a baby under 1" },
  { id: "toddler", label: { mr: "1–3 वर्षं", en: "1–3 years", hi: "1–3 साल" }, en: "a child aged 1-3" },
  { id: "preschool", label: { mr: "3–6 वर्षं", en: "3–6 years", hi: "3–6 साल" }, en: "a child aged 3-6" },
  { id: "school", label: { mr: "6–10 वर्षं", en: "6–10 years", hi: "6–10 साल" }, en: "a child aged 6-10" },
  { id: "girl", label: { mr: "मुलगी 10–18", en: "Daughter 10–18", hi: "बेटी 10–18" }, en: "a daughter aged 10-18" },
];

const KEY = "aadhi-profile";

function load(): Profile {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...emptyProfile, ...JSON.parse(raw) };
  } catch {}
  return emptyProfile;
}

export function useProfile() {
  const [profile, setState] = useState<Profile>(emptyProfile);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setState(load());
    setReady(true);
  }, []);
  const save = useCallback((p: Profile) => {
    setState(p);
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
  }, []);
  return { profile, save, ready };
}

/** What the AI may know about her: no name, no free text. */
export function profileContext(p: Profile) {
  return { taluka: p.taluka, stage: p.stage, month: p.month, children: p.children };
}
