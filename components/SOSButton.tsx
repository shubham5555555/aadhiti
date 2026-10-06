"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Phone, X } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function SOSButton({compact=false}:{compact?:boolean}) {
 const {t}=useLang();
 const [open,setOpen]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(open) dialog.current?.showModal();else dialog.current?.close();},[open]);
 return <>
 <button onClick={()=>setOpen(true)} aria-label={t({en:'Open emergency help',mr:'तातडीची मदत उघडा',hi:'आपातकालीन सहायता खोलें'})} className={compact?'inline-flex min-h-11 items-center gap-2 rounded-full bg-red-600 px-4 text-xs font-bold text-white':'grid h-36 w-36 place-items-center rounded-full bg-red-600 font-display text-4xl font-bold text-white'}><span className="flex items-center gap-2"><AlertTriangle size={compact?16:26}/>SOS</span></button>
 <dialog ref={dialog} onCancel={()=>setOpen(false)} onClose={()=>setOpen(false)} className="fixed inset-0 m-auto w-[calc(100%_-_2rem)] max-w-sm rounded-3xl bg-white p-6 text-ink shadow-2xl backdrop:bg-kokum-900/60" aria-labelledby="emergency-dialog-title">
 <div className="flex items-center justify-between gap-3"><h2 id="emergency-dialog-title" className="font-display text-xl font-bold text-red-700">{t({en:'Emergency help',mr:'तातडीची मदत',hi:'आपातकालीन सहायता'})}</h2><button autoFocus onClick={()=>setOpen(false)} className="grid min-h-11 min-w-11 place-items-center" aria-label={t({en:'Close',mr:'बंद करा',hi:'बंद करें'})}><X size={22}/></button></div>
 <p className="mt-3 text-sm leading-relaxed">{t({en:'This app has not contacted anyone or shared your location. Use a number below to open your phone’s dialler.',mr:'या ॲपने कोणालाही संपर्क केलेला नाही किंवा तुमचं ठिकाण पाठवलेलं नाही. फोनवर कॉल करण्यासाठी खालील नंबर निवडा.',hi:'इस ऐप ने किसी से संपर्क नहीं किया है और आपकी लोकेशन नहीं भेजी है। फ़ोन का डायलर खोलने के लिए नीचे नंबर चुनें।'})}</p>
 <a href="tel:112" className="mt-5 flex min-h-14 items-center justify-between rounded-xl bg-red-600 px-4 font-bold text-white"><span className="flex items-center gap-2"><Phone size={18}/>{t({en:'Emergency',mr:'आणीबाणी',hi:'आपातकाल'})}</span><span>112</span></a>
 <a href="tel:181" className="mt-3 flex min-h-14 items-center justify-between rounded-xl border border-kokum-200 px-4 font-bold text-kokum-800"><span>{t({en:'Women’s helpline',mr:'महिला हेल्पलाइन',hi:'महिला हेल्पलाइन'})}</span><span>181</span></a>
 <p className="mt-4 text-xs leading-relaxed text-ink-soft">{t({en:'You need to place the call yourself. This app cannot dispatch help.',mr:'कॉल तुम्हालाच करावा लागेल. हे ॲप मदत पथक पाठवू शकत नाही.',hi:'कॉल आपको स्वयं करना होगा। यह ऐप सहायता दल नहीं भेज सकता।'})}</p>
 </dialog>
 </>;
}
