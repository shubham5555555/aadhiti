"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, MapPin, PhoneCall, PhoneIncoming } from "lucide-react";
import { useLang } from "@/lib/i18n";

const copy = {
  title: {
    mr: "आत्ता काही धोका वाटतोय का?",
    en: "Do you feel in danger right now?",
    hi: "क्या अभी कोई खतरा महसूस हो रहा है?",
  },
  sub: {
    mr: "वाट पाहू नका. गर्दीच्या आणि सुरक्षित, उजेडाच्या ठिकाणी जा, जसे की दुकान, मेडिकल किंवा एसटी स्थानक. त्यानंतर खालीलपैकी एक कृती करा.",
    en: "Do not wait. Go to a busy, safe, well-lit place, such as a shop, pharmacy or bus station. Then take one of the steps below.",
    hi: "इंतज़ार न करें। भीड़भाड़ वाली, सुरक्षित और रोशनी वाली जगह जाएँ, जैसे दुकान, मेडिकल स्टोर या बस अड्डा। फिर नीचे दिए विकल्पों में से कोई कदम उठाएँ।",
  },
  callTitle: { mr: "112 ला कॉल करा", en: "Call 112", hi: "112 पर कॉल करें" },
  callBody: {
    mr: "पोलीस, रुग्णवाहिका आणि अग्निशमन सेवा — २४ तास, मोफत.",
    en: "Police, ambulance and fire services — free, 24 hours a day.",
    hi: "पुलिस, एम्बुलेंस और दमकल सेवा — २४ घंटे, मुफ़्त।",
  },
  locTitle: {
    mr: "आपले लोकेशन पाठवा",
    en: "Send your location",
    hi: "अपनी लोकेशन भेजें",
  },
  locBody: {
    mr: "तुमचे अचूक लोकेशन मॅप लिंकद्वारे WhatsApp वर विश्वासू व्यक्तीसोबत शेअर करा.",
    en: "Share your exact location with someone you trust on WhatsApp using a map link.",
    hi: "अपनी सटीक लोकेशन की मैप लिंक WhatsApp पर किसी भरोसेमंद व्यक्ति के साथ साझा करें।",
  },
  locButton: { mr: "लोकेशन पाठवा", en: "Send location", hi: "लोकेशन भेजें" },
  locating: {
    mr: "ठिकाण शोधत आहे…",
    en: "Finding you…",
    hi: "जगह ढूँढ रहे हैं…",
  },
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
  fakeTitle: { mr: "बनावट कॉल", en: "Fake call", hi: "बनावटी कॉल" },
  fakeBody: {
    mr: "एखाद्या व्यक्तीपासून दूर जायचे असल्यास, ‘आई’ला तुम्हाला फोन करायला सांगा आणि तिथून निघा.",
    en: "To get away from someone, ring a fake call from “Maa” and leave.",
    hi: "किसी व्यक्ति से दूर जाने के लिए ‘माँ’ का बनावटी कॉल बजाएँ और वहाँ से निकलें।",
  },
  fakeButton: { mr: "आत्ताच कॉल करा", en: "Call now", hi: "अभी कॉल करें" },
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
          window.open(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
            "_blank",
            "noopener",
          );
        }
      },
      () => setLoc("denied"),
      { enableHighAccuracy: true, timeout: 12000 },
    );
  };

  const cols = [
    {
      n: 1,
      title: copy.callTitle,
      body: copy.callBody,
      action: (
        <a
          href="tel:112"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-[0_10px_22px_-10px_rgba(220,38,38,0.9)] hover:bg-red-700"
        >
          <PhoneCall size={17} />{" "}
          <span className="font-serif text-2xl leading-none font-normal">
            112
          </span>
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
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-kokum-700 hover:bg-sand-100 disabled:opacity-70"
          >
            <MapPin size={17} />{" "}
            {loc === "locating" ? t(copy.locating) : t(copy.locButton)}
          </button>
          {loc === "denied" && (
            <p className="mt-2 text-sm text-turmeric-300">
              {t(copy.locDenied)}
            </p>
          )}
        </div>
      ),
    },
    {
      n: 3,
      title: copy.fakeTitle,
      body: copy.fakeBody,
      action: (
        <Link
          href="/call?mode=fake"
          className="inline-flex items-center gap-2 rounded-full border-2 border-white/80 px-6 py-2.5 font-bold text-white hover:bg-white hover:text-kokum-700"
        >
          <PhoneIncoming size={17} /> {t(copy.fakeButton)}{" "}
          <ArrowRight size={15} />
        </Link>
      ),
    },
  ];

  return (
    <section
      aria-labelledby="danger-title"
      className="-mx-4 bg-gradient-to-br from-kokum-700 to-kokum-900 px-4 py-10 text-white sm:mx-0 sm:rounded-[2rem] sm:px-8 sm:py-12 lg:px-10"
    >
      <h2
        id="danger-title"
        className="font-serif text-[2.2rem] leading-tight font-normal sm:text-5xl"
      >
        {t(copy.title)}
      </h2>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-white/80">
        {t(copy.sub)}
      </p>

      <ol className="mt-7 grid gap-3 md:grid-cols-3">
        {cols.map((c) => (
          <li
            key={c.n}
            className="flex flex-col rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15 font-serif text-xl text-turmeric-300">
              {c.n}
            </span>
            <p className="mt-2 font-display text-xl font-bold">{t(c.title)}</p>
            <p className="mt-1.5 flex-1 text-[15px] leading-relaxed text-white/80">
              {t(c.body)}
            </p>
            <div className="mt-5">{c.action}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}
