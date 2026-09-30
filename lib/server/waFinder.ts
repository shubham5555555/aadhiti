// "Which schemes can I get?" on WhatsApp: six tap questions, then the same fixed eligibility rules
// as the website's Scheme Finder (lib/schemes findSchemes). Guidance only; the office decides.
import type { Lang } from "@/lib/kb";
import {
  AGE_BANDS,
  FINDER_FLAGS,
  INCOME_BANDS,
  MARITAL,
  RATION_CARDS,
  SCHEMES,
  VERDICT_LABEL,
  findSchemes,
  type AgeBand,
  type FinderAnswers,
  type FinderFlag,
  type IncomeBand,
  type Marital,
  type RationCard,
} from "@/lib/schemes";
import { SITE_URL, type ButtonsMenu, type ListMenu, type Menu } from "./waMenu";

const t3 = (lang: Lang, mr: string, hi: string, en: string) =>
  lang === "en" ? en : lang === "hi" ? hi : mr;
const cut = (s: string, n: number) =>
  s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s;

/** Answers collected so far (stored per chat for 24 hours). */
export type FinderState = {
  age?: AgeBand;
  income?: IncomeBand | "skip";
  ration?: RationCard | "skip";
  marital?: Marital;
  daughter?: "born23" | "girl10" | "none";
  flag?: FinderFlag | "none";
};

const STEPS = 6;
const step = (lang: Lang, n: number) =>
  t3(
    lang,
    `योजना तपासणी · ${n}/${STEPS}`,
    `योजना जाँच · ${n}/${STEPS}`,
    `Scheme check · ${n}/${STEPS}`,
  );
const skipRow = (lang: Lang, id: string) => ({
  id,
  title: t3(lang, "माहीत नाही", "पता नहीं", "Don't know"),
});

function list(
  lang: Lang,
  n: number,
  body: string,
  rows: ListMenu["sections"][number]["rows"],
): ListMenu {
  return {
    kind: "list",
    header: step(lang, n),
    body,
    footer: t3(
      lang,
      "उत्तर गोपनीय राहतं",
      "जवाब गोपनीय रहते हैं",
      "Your answers stay private",
    ),
    button: t3(lang, "निवडा", "चुनें", "Choose"),
    sections: [{ title: t3(lang, "पर्याय", "विकल्प", "Options"), rows }],
  };
}

/** The next question for the answers so far, or null when all are answered. */
export function nextQuestion(s: FinderState, lang: Lang): Menu | null {
  if (!s.age)
    return list(
      lang,
      1,
      t3(
        lang,
        "तुमच्यासाठी कोणत्या योजना लागू होतात ते 6 सोप्या प्रश्नांमधून पाहूया.\n\nतुमचं वय किती आहे?",
        "6 आसान सवालों से देखते हैं कि आप पर कौन-सी योजनाएँ लागू होती हैं।\n\nआपकी उम्र कितनी है?",
        "Let's see which schemes fit you, in 6 quick questions.\n\nHow old are you?",
      ),
      AGE_BANDS.map((a) => ({ id: `f:age:${a.id}`, title: a.label[lang] })),
    );
  if (!s.income)
    return list(
      lang,
      2,
      t3(
        lang,
        "कुटुंबाचं वर्षाचं एकूण उत्पन्न किती आहे?",
        "परिवार की सालाना कुल आमदनी कितनी है?",
        "What is your family's total yearly income?",
      ),
      [
        ...INCOME_BANDS.map((i) => ({
          id: `f:inc:${i.id}`,
          title: cut(i.label[lang], 24),
        })),
        skipRow(lang, "f:inc:skip"),
      ],
    );
  if (!s.ration)
    return list(
      lang,
      3,
      t3(
        lang,
        "तुमचं रेशन कार्ड कोणत्या रंगाचं आहे?",
        "आपका राशन कार्ड किस रंग का है?",
        "What colour is your ration card?",
      ),
      [
        ...RATION_CARDS.map((r) => ({
          id: `f:ration:${r.id}`,
          title: r.label[lang],
        })),
        skipRow(lang, "f:ration:skip"),
      ],
    );
  if (!s.marital)
    return list(
      lang,
      4,
      t3(
        lang,
        "तुमची सध्याची स्थिती?",
        "आपकी अभी की स्थिति?",
        "Your current status?",
      ),
      MARITAL.map((m) => ({ id: `f:mar:${m.id}`, title: m.label[lang] })),
    );
  if (!s.daughter) {
    const b: ButtonsMenu = {
      kind: "buttons",
      body: `*${step(lang, 5)}*\n\n${t3(lang, "तुम्हाला मुलगी आहे का?", "क्या आपकी बेटी है?", "Do you have a daughter?")}`,
      buttons: [
        {
          id: "f:dau:born23",
          title: t3(
            lang,
            "2023 नंतर जन्मलेली",
            "2023 के बाद जन्मी",
            "Born after Apr 2023",
          ),
        },
        {
          id: "f:dau:girl10",
          title: t3(lang, "10 वर्षांखालील", "10 साल से छोटी", "Under 10"),
        },
        {
          id: "f:dau:none",
          title: t3(lang, "नाही / मोठी आहे", "नहीं / बड़ी है", "No / older"),
        },
      ],
    };
    return b;
  }
  if (!s.flag)
    return list(
      lang,
      6,
      t3(
        lang,
        "यापैकी तुम्हाला सगळ्यात जास्त काय लागू होतं?",
        "इनमें से आप पर सबसे ज़्यादा क्या लागू होता है?",
        "Which of these fits you best?",
      ),
      [
        ...FINDER_FLAGS.filter((f) => !["born23", "girl10"].includes(f.id)).map(
          (f) => ({
            id: `f:flag:${f.id}`,
            title: cut(f.label[lang], 24),
            description:
              f.label[lang].length > 24 ? cut(f.label[lang], 72) : undefined,
          }),
        ),
        {
          id: "f:flag:none",
          title: t3(
            lang,
            "यापैकी काही नाही",
            "इनमें से कोई नहीं",
            "None of these",
          ),
        },
      ],
    );
  return null;
}

/** Applies a tapped answer ("f:age:30-44" etc.). */
export function applyAnswer(s: FinderState, id: string): FinderState {
  const [, field, value] = id.split(":");
  const map: Record<string, keyof FinderState> = {
    age: "age",
    inc: "income",
    ration: "ration",
    mar: "marital",
    dau: "daughter",
    flag: "flag",
  };
  const k = map[field];
  return k ? { ...s, [k]: value } : s;
}

/** Runs the website's rules and returns the result message plus a list to open schemes. */
export function finderResult(
  s: FinderState,
  lang: Lang,
): { text: string; menu: ListMenu | null } {
  const flags: Partial<Record<FinderFlag, boolean>> = {};
  if (s.daughter === "born23") flags.born23 = flags.girl10 = true;
  if (s.daughter === "girl10") flags.girl10 = true;
  if (s.flag && s.flag !== "none") flags[s.flag] = true;
  const answers: FinderAnswers = {
    age: s.age ?? "30-44",
    income: s.income && s.income !== "skip" ? s.income : undefined,
    ration: s.ration && s.ration !== "skip" ? s.ration : undefined,
    marital: s.marital,
    flags,
  };
  const results = findSchemes(answers);
  const name = (id: string) =>
    SCHEMES.find((x) => x.id === id)?.name[lang] ?? id;
  const section = (v: "yes" | "check") => {
    const items = results.filter((r) => r.verdict === v);
    return items.length
      ? `*${VERDICT_LABEL[v][lang]}*\n${items.map((r) => `• *${name(r.id)}* — ${r.reason[lang]}`).join("\n")}`
      : "";
  };
  const yes = section("yes");
  const check = section("check");
  const text = [
    `*${t3(lang, "तुमच्यासाठी योजना", "आपके लिए योजनाएँ", "Schemes for you")}*`,
    yes,
    check,
    !yes && !check
      ? t3(
          lang,
          "या उत्तरांवरून सध्या एखादी योजना थेट लागू होताना दिसत नाही. अंगणवाडी सेविका किंवा सेतू केंद्रात विचारून खात्री करा.",
          "इन जवाबों से अभी कोई योजना सीधे लागू होती नहीं दिखती। आंगनवाड़ी सेविका या सेतु केंद्र में पूछकर पक्का करें।",
          "From these answers no scheme clearly applies right now. Please confirm with the Anganwadi sevika or a Setu centre.",
        )
      : "",
    `_${t3(lang, "हे मार्गदर्शन आहे, अंतिम निर्णय कार्यालयाचा. कोणत्याही एजंटला पैसे देऊ नका.", "यह मार्गदर्शन है, अंतिम फ़ैसला कार्यालय का है। किसी एजेंट को पैसे न दें।", "This is guidance, not a final decision; the office decides. Never pay an agent.")}_`,
    `${t3(lang, "सविस्तर", "विस्तार से", "Full details")}: ${SITE_URL}/schemes`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const open = results.filter((r) => r.verdict !== "no").slice(0, 10);
  const menu: ListMenu | null = open.length
    ? {
        kind: "list",
        body: t3(
          lang,
          "कोणत्याही योजनेची पूर्ण माहिती पाहण्यासाठी निवडा.",
          "किसी भी योजना की पूरी जानकारी देखने के लिए चुनें।",
          "Choose a scheme to see full details.",
        ),
        button: t3(lang, "योजना पाहा", "योजना देखें", "See scheme"),
        sections: [
          {
            title: t3(lang, "तुमच्या योजना", "आपकी योजनाएँ", "Your schemes"),
            rows: open.map((r) => ({
              id: `scheme:${r.id}`,
              title: cut(name(r.id), 24),
              description: cut(r.reason[lang], 72),
            })),
          },
        ],
      }
    : null;
  return { text, menu };
}
