"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, PhoneCall, PhoneIncoming } from "lucide-react";
import { useLang } from "@/lib/i18n";

const copy = {
  title: { mr: "आत्ता धोका वाटतोय?", en: "Feel unsafe right now?", hi: "अभी खतरा लग रहा है?" },
  sub: {
    mr: "थांबू नका. गर्दीच्या, उजेडाच्या ठिकाणी जा — दुकान, मेडिकल, ST stand. मग यापैकी एक करा.",
    en: "Don't wait. Move to a busy, well-lit place — a shop, a chemist, the ST stand. Then do one of these.",
    hi: "रुकिए मत। भीड़ वाली, रोशनी वाली जगह जाइए — दुकान, मेडिकल, बस स्टैंड। फिर इनमें से एक कीजिए।",
  },
  callTitle: { mr: "112 ला कॉल करा", en: "Call 112", hi: "112 पर कॉल करें" },
  callBody: { mr: "पोलीस, ॲम्ब्युलन्स, अग्निशमन. 24 तास, मोफत.", en: "Police, ambulance, fire. 24 hours, free.", hi: "पुलिस, एम्बुलेंस, फ़ायर। 24 घंटे, मुफ़्त।" },
  locTitle: { mr: "तुमचं ठिकाण पाठवा", en: "Send your location", hi: "अपनी जगह भेजें" },
  locBody: {
    mr: "विश्वासातल्या व्यक्तीला WhatsApp वर तुमचं अचूक ठिकाण, नकाशाच्या लिंकसह.",
    en: "Your exact spot, as a map link, to someone you trust on WhatsApp.",
    hi: "भरोसेमंद व्यक्ति को WhatsApp पर आपकी सही जगह, नक्शे के लिंक के साथ।",
  },
  locButton: { mr: "ठिकाण पाठवा", en: "Send location", hi: "जगह भेजें" },
  locating: { mr: "ठिकाण शोधत आहे…", en: "Finding you…", hi: "जगह ढूँढ रहे हैं…" },
  locDenied: {
    mr: "ठिकाण मिळालं नाही. फोनमध्ये Location सुरू करा, किंवा थेट 112 ला कॉल करा.",
    en: "Couldn't get your location. Turn on Location in your phone, or call 112 directly.",
    hi: "जगह नहीं मिली। फ़ोन में Location चालू करें, या सीधे 112 पर कॉल करें।",
  },
  message: {
    mr: "मला मदत हवी आहे. मी इथे आहे:",
    en: "I need help. I am here:",
    hi: "मुझे मदद चाहिए। मैं यहाँ हूँ:",
  },
  fakeTitle: { mr: "Fake call", en: "Fake call", hi: "Fake call" },
  fakeBody: {
    mr: "कोणाला टाळायचं असेल तर 'आईचा' फोन वाजवा आणि निघा.",
    en: "Need to get away from someone? Make 'Maa' call you, and leave.",
    hi: "किसी से बचना हो तो 'माँ' का फ़ोन बजाइए और निकलिए।",
  },
  fakeButton: { mr: "आत्ता वाजवा", en: "Ring now", hi: "अभी बजाएँ" },
};

type LocState = "idle" | "locating" | "denied";

export default function DangerBand() {
  const { t } = useLang();
  const [loc, setLoc] = useState<LocState>("idle");

  // Reads GPS, then hands a Google Maps link to the phone's share sheet (or WhatsApp on desktop).
  const sendLocation = () => {
    if (!navigator.geolocation) {
      setLoc("denied");
      return;
    }
    setLoc("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const text = `${t(copy.message)} https://maps.google.com/?q=${latitude.toFixed(6)},${longitude.toFixed(6)}`;
        setLoc("idle");
        if (navigator.share) {
          navigator.share({ text }).catch(() => {});
        } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
        }
      },
      () => setLoc("denied"),
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const cols = [
    {
      n: 1,
      title: copy.callTitle,
      body: copy.callBody,
      action: (
        <a href="tel:112" className="inline-flex items-center gap-2 bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700">
          <PhoneCall size={17} /> <span className="font-serif text-2xl leading-none font-normal">112</span>
        </a>
      ),
    },
    {
      n: 2,
      title: copy.locTitle,
      body: copy.locBody,
      action: (
        <div>
          <button
            onClick={sendLocation}
            disabled={loc === "locating"}
            className="inline-flex items-center gap-2 bg-sand-50 px-5 py-3 font-bold text-ink hover:bg-white disabled:opacity-70"
          >
            <MapPin size={17} /> {loc === "locating" ? t(copy.locating) : t(copy.locButton)}
          </button>
          {loc === "denied" && <p className="mt-2 text-sm text-turmeric-300">{t(copy.locDenied)}</p>}
        </div>
      ),
    },
    {
      n: 3,
      title: copy.fakeTitle,
      body: copy.fakeBody,
      action: (
        <Link href="/call?mode=fake" className="inline-flex items-center gap-2 border-2 border-sand-50 px-5 py-2.5 font-bold text-sand-50 hover:bg-sand-50 hover:text-ink">
          <PhoneIncoming size={17} /> {t(copy.fakeButton)} <ArrowRight size={15} />
        </Link>
      ),
    },
  ];

  return (
    <section aria-labelledby="danger-title" className="-mx-4 bg-ink px-5 py-10 text-sand-50 sm:mx-0 sm:px-10 sm:py-12">
      <h2 id="danger-title" className="font-serif text-[2.2rem] leading-tight font-normal sm:text-5xl">
        {t(copy.title)}
      </h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-sand-200">{t(copy.sub)}</p>

      <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0">
        {cols.map((c, i) => (
          <li key={c.n} className={`flex flex-col ${i > 0 ? "border-t border-white/15 pt-8 md:border-t-0 md:border-l md:pt-0 md:pl-8" : ""} md:pr-8`}>
            <span className="font-serif text-3xl text-turmeric-300">{c.n}</span>
            <p className="mt-2 font-display text-xl font-bold">{t(c.title)}</p>
            <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-sand-200">{t(c.body)}</p>
            <div className="mt-5">{c.action}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
