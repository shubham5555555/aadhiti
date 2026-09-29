"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { L } from "@/lib/kb";

const items: { id: string; text: L; hint: L }[] = [
  {
    id: "numbers",
    text: { mr: "112 आणि 1091 फोनमध्ये save केले", en: "112 and 1091 saved in my phone", hi: "112 और 1091 फ़ोन में save किए" },
    hint: { mr: "Contacts मध्ये 'पोलीस' आणि 'महिला हेल्पलाइन' नावाने.", en: "In Contacts, as 'Police' and 'Women helpline'.", hi: "Contacts में 'पुलिस' और 'महिला हेल्पलाइन' नाम से।" },
  },
  {
    id: "sos",
    text: { mr: "फोनमधलं Emergency SOS सुरू केलं", en: "Emergency SOS turned on in my phone", hi: "फ़ोन में Emergency SOS चालू किया" },
    hint: {
      mr: "बहुतेक Android फोनमध्ये power बटण 5 वेळा दाबल्यावर SOS जातो. Settings → Safety & emergency मध्ये पाहा.",
      en: "On most Android phones, pressing power 5 times sends SOS. See Settings → Safety & emergency.",
      hi: "ज़्यादातर Android फ़ोन में power बटन 5 बार दबाने पर SOS जाता है। Settings → Safety & emergency देखें।",
    },
  },
  {
    id: "trusted",
    text: { mr: "दोन विश्वासू व्यक्ती ठरवल्या", en: "Two trusted people chosen", hi: "दो भरोसेमंद लोग तय किए" },
    hint: { mr: "ज्यांना रात्रीसुद्धा फोन करता येईल आणि ज्यांच्याशी live location शेअर करता येईल.", en: "People you can call at night and share live location with.", hi: "जिन्हें रात में भी फ़ोन कर सकें और live location शेयर कर सकें।" },
  },
  {
    id: "codeword",
    text: { mr: "घरच्यांसोबत एक code word ठरवला", en: "A code word agreed with family", hi: "घरवालों के साथ एक code word तय किया" },
    hint: { mr: "फोनवर हा शब्द म्हटला की समजायचं — मला लगेच मदत हवी आहे.", en: "Saying it on the phone means: I need help now.", hi: "फ़ोन पर यह शब्द बोलें तो समझें — मुझे तुरंत मदद चाहिए।" },
  },
  {
    id: "battery",
    text: { mr: "बाहेर जाताना फोन 30% पेक्षा जास्त चार्ज", en: "Phone above 30% when I go out", hi: "बाहर जाते समय फ़ोन 30% से ज़्यादा चार्ज" },
    hint: { mr: "लांबच्या प्रवासाला छोटी power bank सोबत.", en: "A small power bank for long journeys.", hi: "लंबे सफ़र में छोटा power bank साथ।" },
  },
  {
    id: "bag",
    text: { mr: "पर्समध्ये ओळखपत्र, थोडे पैसे आणि एक नंबर कागदावर", en: "ID, some cash and one number on paper in my bag", hi: "पर्स में पहचान पत्र, थोड़े पैसे और एक नंबर काग़ज़ पर" },
    hint: { mr: "फोन बंद पडला तरी कोणाला तरी कॉल करता यावा म्हणून.", en: "So you can still call someone if your phone dies.", hi: "ताकि फ़ोन बंद हो जाए तब भी किसी को कॉल कर सकें।" },
  },
];

const copy = {
  title: { mr: "माझी सुरक्षा योजना", en: "My safety plan", hi: "मेरी सुरक्षा योजना" },
  body: {
    mr: "धोका येण्याआधी दहा मिनिटं. जे झालंय त्यावर खूण करा. हे फक्त तुमच्या फोनमध्ये साठवलं जातं.",
    en: "Ten minutes, before anything happens. Tick what you've done. This is saved only on your phone.",
    hi: "कुछ होने से पहले दस मिनट। जो हो गया उस पर निशान लगाएँ। यह सिर्फ़ आपके फ़ोन में सेव होता है।",
  },
  ready: { mr: "तयार", en: "ready", hi: "तैयार" },
  done: { mr: "छान. तुमची योजना पूर्ण आहे. ही यादी घरच्या मुलींनाही दाखवा.", en: "Well done. Your plan is complete. Show this list to the girls at home too.", hi: "बहुत बढ़िया। आपकी योजना पूरी है। यह सूची घर की लड़कियों को भी दिखाएँ।" },
};

const KEY = "aadhi-safety-plan";

export default function SafetyPlan() {
  const { t } = useLang();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(saved)) setDone(saved.filter((x) => typeof x === "string"));
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
    <section className="grid gap-8 border-b border-ink/10 py-12 md:grid-cols-[1fr_2fr] md:gap-10 md:py-16">
      <div>
        <h2 className="font-serif text-3xl font-normal sm:text-[2.6rem] sm:leading-tight">{t(copy.title)}</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">{t(copy.body)}</p>
        <ProgressRing value={count} total={items.length} label={t(copy.ready)} />
      </div>

      <div>
        <ul className="border-t border-ink/15">
          {items.map((item) => {
            const on = done.includes(item.id);
            return (
              <li key={item.id} className="border-b border-ink/15">
                <button onClick={() => toggle(item.id)} aria-pressed={on} className="flex w-full items-start gap-4 py-4 text-left">
                  <span
                    className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center border-2 transition ${
                      on ? "border-kokum-600 bg-kokum-600 text-white" : "border-ink bg-white"
                    }`}
                  >
                    {on && <Check size={15} strokeWidth={3} />}
                  </span>
                  <span>
                    <span className={`block font-display text-[17px] font-bold ${on ? "text-ink-soft line-through decoration-kokum-400" : "text-ink"}`}>
                      {t(item.text)}
                    </span>
                    <span className="mt-0.5 block text-[14.5px] leading-relaxed text-ink-soft">{t(item.hint)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {count === items.length && <p className="mt-5 border-l-4 border-leaf-600 bg-white px-4 py-3 text-[15px]">{t(copy.done)}</p>}
      </div>
    </section>
  );
}

// Ring that fills as items are ticked.
function ProgressRing({ value, total, label }: { value: number; total: number; label: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const filled = total ? (value / total) * c : 0;
  return (
    <div className="relative mt-8 h-36 w-36">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="7" className="text-ink/10" />
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
            <span className="text-xl text-ink-soft">/{total}</span>
          </span>
          <span className="mt-1 block text-xs font-bold text-ink-soft">{label}</span>
        </span>
      </p>
    </div>
  );
}
