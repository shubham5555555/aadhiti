"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, MapPin, Phone, Users, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

type Stage = "closed" | "countdown" | "sent";

const copy = {
  tap: { mr: "मदतीसाठी दाबा", en: "Tap for help", hi: "मदद के लिए दबाएँ" },
  sending: { mr: "SOS पाठवत आहे…", en: "Sending SOS alert…", hi: "SOS भेज रहे हैं…" },
  sendingBody: {
    mr: "तुमचं location तुमच्या विश्वासू व्यक्तींना आणि आणीबाणी सेवांना पाठवलं जाईल.",
    en: "Your location will be shared with your trusted contacts and emergency services.",
    hi: "आपकी location आपके भरोसेमंद लोगों और आपातकालीन सेवाओं को भेजी जाएगी।",
  },
  cancel: { mr: "रद्द करा — मी सुरक्षित आहे", en: "Cancel — I'm safe", hi: "रद्द करें — मैं सुरक्षित हूँ" },
  sent: { mr: "Alert पाठवला (demo)", en: "Alert sent (demo)", hi: "Alert भेजा गया (demo)" },
  location: { mr: "Live location शेअर केलं", en: "Live location shared", hi: "Live location शेयर की गई" },
  contacts: { mr: "3 विश्वासू व्यक्तींना कळवलं", en: "3 trusted contacts notified", hi: "3 भरोसेमंद लोगों को सूचना दी" },
  police: { mr: "जवळच्या पोलीस स्टेशनला कळवलं", en: "Nearest police station alerted", hi: "नज़दीकी पुलिस स्टेशन को सूचना दी" },
  call: { mr: "आत्ता 112 ला कॉल करा", en: "Call 112 now", hi: "अभी 112 पर कॉल करें" },
  demo: { mr: "हे demo आहे — खरा alert पाठवलेला नाही.", en: "This is a demo — no real alert was sent.", hi: "यह डेमो है — कोई असली alert नहीं भेजा गया।" },
};

export default function SOSButton({ compact = false }: { compact?: boolean }) {
  const { t } = useLang();
  const [stage, setStage] = useState<Stage>("closed");
  const [count, setCount] = useState(5);

  useEffect(() => {
    if (stage !== "countdown") return;
    if (count === 0) {
      setStage("sent");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [stage, count]);

  const start = () => {
    setCount(5);
    setStage("countdown");
  };

  return (
    <>
      {compact ? (
        <button
          onClick={start}
          className="relative flex items-center gap-1.5 bg-red-600 px-3 py-2 text-xs font-extrabold tracking-wide text-white hover:bg-red-700"
        >
          <AlertTriangle size={14} /> SOS
        </button>
      ) : (
        <button onClick={start} className="group relative grid h-40 w-40 place-items-center" aria-label="Send SOS">
          <span className="absolute inset-3 animate-ring rounded-full bg-red-400/40 [animation-duration:2.6s]" />
          <span className="relative grid h-36 w-36 place-items-center rounded-full bg-red-600 text-white transition group-hover:bg-red-700 group-active:scale-95">
            <span className="text-center">
              <span className="block font-display text-4xl font-extrabold tracking-wider">SOS</span>
              <span className="text-xs font-semibold opacity-90">{t(copy.tap)}</span>
            </span>
          </span>
        </button>
      )}

      {stage !== "closed" && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm animate-fade-up border-2 border-ink bg-white p-6 text-ink">
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-bold tracking-wide text-red-700">SOS</p>
              <button onClick={() => setStage("closed")} className="-m-1 p-1 text-ink-soft hover:text-ink" aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {stage === "countdown" ? (
              <>
                <p className="mt-2 font-serif text-[6.5rem] leading-none font-normal text-red-600 tabular-nums" aria-live="assertive">
                  {count}
                </p>
                <h3 className="mt-4 font-serif text-2xl font-normal">{t(copy.sending)}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t(copy.sendingBody)}</p>
                <button onClick={() => setStage("closed")} className="mt-6 w-full border-2 border-ink py-3 font-bold text-ink hover:bg-sand-100">
                  {t(copy.cancel)}
                </button>
              </>
            ) : (
              <>
                <h3 className="mt-2 flex items-center gap-2.5 font-serif text-2xl font-normal">
                  <CheckCircle2 size={24} className="shrink-0 text-leaf-600" /> {t(copy.sent)}
                </h3>
                <ul className="mt-5 border-t border-ink/15 text-[15px]">
                  {[
                    { icon: MapPin, text: copy.location },
                    { icon: Users, text: copy.contacts },
                    { icon: Phone, text: copy.police },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text.en} className="flex items-center gap-3 border-b border-ink/15 py-3">
                      <Icon size={16} className="shrink-0 text-leaf-600" /> {t(text)}
                    </li>
                  ))}
                </ul>
                <a href="tel:112" className="mt-6 flex w-full items-center justify-center gap-2 bg-red-600 py-3 font-bold text-white hover:bg-red-700">
                  <Phone size={18} /> {t(copy.call)}
                </a>
                <p className="mt-3 text-xs text-ink-soft">{t(copy.demo)}</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
