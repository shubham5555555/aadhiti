"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

const items: { id: string; text: L; hint: L }[] = [
  {
    id: "numbers",
    text: {
      mr: "112 आणि 1091 माझ्या फोनमध्ये सेव्ह केले आहेत.",
      en: "112 and 1091 saved on my phone",
      hi: "112 और 1091 फ़ोन में save किए",
    },
    hint: {
      mr: "Contacts मध्ये ‘पोलीस’ आणि ‘महिला हेल्पलाइन’ या नावाने सेव्ह केले आहेत.",
      en: "Save them in Contacts as \"Police\" and \"Women's Helpline\".",
      hi: "Contacts में 'पुलिस' और 'महिला हेल्पलाइन' नाम से।",
    },
  },
  {
    id: "sos",
    text: {
      mr: "माझ्या फोनमध्ये Emergency SOS सुरू केले आहे.",
      en: "Emergency SOS switched on",
      hi: "फ़ोन में Emergency SOS चालू किया",
    },
    hint: {
      mr: "बहुतेक Android फोनमध्ये Power बटण ५ वेळा दाबल्यास SOS पाठवले जाते. Settings → Safety & emergency मध्ये तपासा.",
      en: "On many Android phones, pressing the power button 5 times sends an SOS. The steps vary by phone, so check Settings → Safety & emergency.",
      hi: "ज़्यादातर Android फ़ोन में power बटन 5 बार दबाने पर SOS जाता है। Settings → Safety & emergency देखें।",
    },
  },
  {
    id: "trusted",
    text: {
      mr: "दोन विश्वासू व्यक्ती निवडल्या आहेत.",
      en: "Two trusted people chosen",
      hi: "दो भरोसेमंद लोग तय किए",
    },
    hint: {
      mr: "ज्यांना रात्री फोन करू शकता आणि ज्यांच्यासोबत Live Location शेअर करू शकता.",
      en: "People you can call at night and share your live location with.",
      hi: "जिन्हें रात में भी फ़ोन कर सकें और live location शेयर कर सकें।",
    },
  },
  {
    id: "codeword",
    text: {
      mr: "कुटुंबासोबत एक सांकेतिक शब्द ठरवला आहे.",
      en: "A code word agreed with family",
      hi: "घरवालों के साथ एक code word तय किया",
    },
    hint: {
      mr: "फोनवर तो शब्द बोलणे म्हणजे — मला आत्ता मदतीची गरज आहे.",
      en: "Saying it on a phone call means \"I need help now.\"",
      hi: "फ़ोन पर यह शब्द बोलें तो समझें — मुझे तुरंत मदद चाहिए।",
    },
  },
  {
    id: "battery",
    text: {
      mr: "बाहेर पडताना माझ्या फोनची बॅटरी ३०% पेक्षा जास्त आहे.",
      en: "Phone charged above 30% when I go out",
      hi: "बाहर जाते समय फ़ोन 30% से ज़्यादा चार्ज",
    },
    hint: {
      mr: "लांबच्या प्रवासासाठी छोटा Power Bank सोबत ठेवा.",
      en: "Carry a small power bank for long journeys.",
      hi: "लंबे सफ़र में छोटा power bank साथ।",
    },
  },
  {
    id: "bag",
    text: {
      mr: "माझ्या बॅगेत ओळखपत्र, थोडे रोख पैसे आणि एक संपर्क क्रमांक कागदावर आहे.",
      en: "ID, some cash and one phone number on paper in my bag",
      hi: "पर्स में पहचान पत्र, थोड़े पैसे और एक नंबर काग़ज़ पर",
    },
    hint: {
      mr: "फोन बंद पडला तर तुम्ही कोणाला तरी कॉल करू शकाल.",
      en: "So you can still call someone from another phone if yours stops working.",
      hi: "ताकि फ़ोन बंद हो जाए तब भी किसी को कॉल कर सकें।",
    },
  },
];

const copy = {
  title: {
    mr: "माझी सुरक्षा योजना",
    en: "My safety plan",
    hi: "मेरी सुरक्षा योजना",
  },
  body: {
    mr: "काही घडण्यापूर्वी दहा मिनिटे सुरक्षिततेची तयारी करा. तुम्ही केलेल्या गोष्टींना ✓ करा. ही माहिती फक्त तुमच्या फोनवर सेव्ह होते.",
    en: "Ten minutes of preparation before anything happens. Tick what you have already done. This is saved only on this device.",
    hi: "कुछ होने से पहले दस मिनट। जो हो गया उस पर निशान लगाएँ। यह सिर्फ़ आपके फ़ोन में सेव होता है।",
  },
  ready: { mr: "तयार", en: "done", hi: "तैयार" },
  done: {
    mr: "छान. तुमची योजना पूर्ण आहे. ही यादी घरच्या मुलींनाही दाखवा.",
    en: "Well done. Your plan is complete. Show this list to the girls at home too.",
    hi: "बहुत बढ़िया। आपकी योजना पूरी है। यह सूची घर की लड़कियों को भी दिखाएँ।",
  },
};

const KEY = "aadhi-safety-plan";

export default function SafetyPlan() {
  const { t } = useLang();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved))
        setDone(saved.filter((x) => typeof x === "string"));
    } catch {
      // Storage unavailable — the checklist still works for this visit.
    }
  }, []);

  const toggle = (id: string) => {
    setDone((d) => {
      const next = d.includes(id) ? d.filter((x) => x !== id) : [...d, id];
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const count = items.filter((i) => done.includes(i.id)).length;

  return (
    <section
      id="safety-plan"
      className="soft-card scroll-mt-28 grid gap-6 p-5 sm:p-8 md:grid-cols-[1fr_2fr] md:gap-8"
    >
      <div>
        <h2 className="font-serif text-3xl leading-tight font-normal text-kokum-700 sm:text-[2.6rem]">
          {t(copy.title)}
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{t(copy.body)}</p>
        <ProgressRing
          value={count}
          total={items.length}
          label={t(copy.ready)}
          separator={t({mr: "/", en: " of ", hi: "/"})}
        />
      </div>

      <div>
        <ul className="grid gap-2.5 lg:grid-cols-2">
          {items.map((item) => {
            const on = done.includes(item.id);
            return (
              <li key={item.id}>
                <button
                  onClick={() => toggle(item.id)}
                  aria-pressed={on}
                  className={`flex h-full w-full items-start gap-3.5 rounded-2xl p-4 text-left transition ${on ? "bg-kokum-50" : "bg-sand-50 hover:bg-kokum-50"}`}
                >
                  <span
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition ${
                      on
                        ? "border-kokum-600 bg-kokum-600 text-white"
                        : "border-kokum-300 bg-white"
                    }`}
                  >
                    {on && <Check size={15} strokeWidth={3} />}
                  </span>
                  <span>
                    <span
                      className={`block font-display text-[17px] font-bold ${on ? "text-ink-soft line-through decoration-kokum-400" : "text-ink"}`}
                    >
                      {t(item.text)}
                    </span>
                    <span className="mt-0.5 block text-[14.5px] leading-relaxed text-ink-soft">
                      {t(item.hint)}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {count === items.length && (
          <p className="mt-4 rounded-2xl bg-leaf-50 px-4 py-3 text-[15px] text-leaf-700">
            {t(copy.done)}
          </p>
        )}
      </div>
    </section>
  );
}

// Ring that fills as items are ticked.
function ProgressRing({
  value,
  total,
  label,
  separator,
}: {
  value: number;
  total: number;
  label: string;
  separator: string;
}) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const filled = total ? (value / total) * c : 0;
  return (
    <div className="relative mt-8 h-36 w-36">
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          className="text-kokum-100"
        />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeDasharray={`${filled.toFixed(2)} ${c.toFixed(2)}`}
          className="text-kokum-600 transition-[stroke-dasharray] duration-500"
        />
      </svg>
      <p className="absolute inset-0 grid place-items-center text-center">
        <span>
          <span className="block font-serif text-4xl leading-none text-kokum-600 tabular-nums">
            {value}
            <span className="text-xl text-ink-soft">{separator}{total}</span>
          </span>
          <span className="mt-1 block text-xs font-bold text-ink-soft">
            {label}
          </span>
        </span>
      </p>
    </div>
  );
}
