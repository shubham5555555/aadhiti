// Keeps AADHI TI's replies clean: detects abusive words (English, Hindi, Marathi — Latin and Devanagari).
// Used to block any AI answer that contains them, and to answer an angry message calmly.
// Latin words match whole words only, so "class" or "Scunthorpe"-style false alarms don't happen.

const LATIN = [
  "fuck",
  "fucking",
  "fucker",
  "motherfucker",
  "shit",
  "bullshit",
  "bitch",
  "bastard",
  "asshole",
  "cunt",
  "whore",
  "slut",
  "chutiya",
  "chutiye",
  "chootiya",
  "madarchod",
  "behenchod",
  "bhenchod",
  "bhosdi",
  "bhosdike",
  "bhosadi",
  "gandu",
  "gaand",
  "randi",
  "harami",
  "haramkhor",
  "kutti",
  "kamina",
  "kamine",
  "lavde",
  "lawde",
  "lund",
  "zavadya",
  "zhavadya",
  "bhadva",
  "bhadwa",
  "chinal",
  "aai zhavli",
  "aighalya",
  "gandya",
];

const DEVANAGARI = [
  "चूतिया",
  "चुतिया",
  "मादरचोद",
  "बहनचोद",
  "भेनचोद",
  "भोसड",
  "गांडू",
  "गांड",
  "रंडी",
  "हरामी",
  "हरामखोर",
  "कुत्ती",
  "कमीना",
  "कमीनी",
  "लवडे",
  "लौडे",
  "झवाड्या",
  "भडवा",
  "भडव्या",
  "छिनाल",
  "आयघाल्या",
  "गांड्या",
  "रांड",
];

const latinRe = new RegExp(
  `\\b(${LATIN.map((w) => w.replace(/\s+/g, "\\s+")).join("|")})\\b`,
  "i",
);

/** True if the text contains an abusive word. */
export function hasAbuse(text: string): boolean {
  if (!text) return false;
  if (latinRe.test(text)) return true;
  return DEVANAGARI.some((w) => text.includes(w));
}
