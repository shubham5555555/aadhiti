"use client";
import {useState} from 'react';
import Link from 'next/link';
import {useLang} from '@/lib/i18n';
import {JOURNEYS,AGE_BANDS,SCHEME_AGES,type AgeBand} from '@/lib/journeys';
import {SCHEMES} from '@/lib/schemes';

export default function JourneyPage({slug}:{slug:string}){
 const {t,lang}=useLang();
 const [age,setAge]=useState<AgeBand|'all'>('all');
 const journey=JOURNEYS.find(j=>j.slug===slug)!;
 const schemes=journey.schemes.map(id=>SCHEMES.find(s=>s.id===id)!).filter(s=>s&&(age==='all'||SCHEME_AGES[s.id]?.includes(age)));
 const q=t({en:`Please help me find schemes for ${journey.theme.en}${age==='all'?'':', age group '+AGE_BANDS.find(a=>a.id===age)!.label.en}. Ask me one eligibility question at a time.`,mr:`${journey.theme.mr} यासाठी योजना समजावून सांगा.${age==='all'?'':' वयोगट: '+AGE_BANDS.find(a=>a.id===age)!.label.mr} पात्रतेबद्दल एकावेळी एक प्रश्न विचारा.`,hi:`${journey.theme.hi} के लिए योजनाएँ समझाएँ।${age==='all'?'':' आयु वर्ग: '+AGE_BANDS.find(a=>a.id===age)!.label.hi} पात्रता के बारे में एक बार में एक सवाल पूछें।`});
 return <div className="mx-auto max-w-4xl pb-10">
 <Link href="/#home-banner" className="text-sm text-kokum-700">← {t({en:'All nine forms',mr:'सर्व नऊ रूपं',hi:'सभी नौ रूप'})}</Link>
 <header className="mt-5 rounded-3xl bg-kokum-50 p-6 sm:p-9">
 <p className="text-sm text-kokum-600">{t(journey.name)}</p>
 <h1 className="mt-2 font-display text-3xl font-bold text-kokum-900 sm:text-4xl">{t(journey.theme)}</h1>
 <p className="mt-4 max-w-2xl leading-relaxed">{t({en:'Explore schemes and support programmes by age group. These are suggestions to explore, not confirmation of eligibility or approval. Pregnancy, income, residence and other conditions may also apply.',mr:'वयोगटानुसार योजना आणि सहाय्य कार्यक्रम पाहा. ही माहिती मार्गदर्शनासाठी आहे; पात्रता किंवा मंजुरीची खात्री नाही. गर्भधारणा, उत्पन्न, रहिवास आणि इतर अटीही लागू होऊ शकतात.',hi:'आयु वर्ग के अनुसार योजनाएँ और सहायता कार्यक्रम देखें। यह मार्गदर्शन है, पात्रता या मंज़ूरी की पुष्टि नहीं। गर्भावस्था, आय, निवास और अन्य शर्तें भी लागू हो सकती हैं।'})}</p>
 </header>
 <fieldset className="my-6"><legend className="mb-3 font-semibold">{t({en:'Age of the person who needs support',mr:'मदत हवी असलेल्या व्यक्तीचा वयोगट',hi:'जिसे सहायता चाहिए उसका आयु वर्ग'})}</legend>
 <div className="flex flex-wrap gap-2">{[{id:'all',label:{en:'All ages',mr:'सर्व वयोगट',hi:'सभी आयु वर्ग'}},...AGE_BANDS].map(a=><button key={a.id} aria-pressed={age===a.id} onClick={()=>setAge(a.id as AgeBand|'all')} className={`min-h-11 rounded-full border px-4 py-2 text-sm ${age===a.id?'border-kokum-700 bg-kokum-700 text-white':'border-kokum-100 bg-white text-kokum-800'}`}>{t(a.label)}</button>)}</div></fieldset>
 <Link href={`/chat?q=${encodeURIComponent(q)}`} className="mb-6 inline-flex rounded-full bg-kokum-700 px-5 py-3 font-semibold text-white">{t({en:'Ask AI about my options →',mr:'माझ्या पर्यायांबद्दल AI ला विचारा →',hi:'मेरे विकल्पों के बारे में AI से पूछें →'})}</Link>
 <p aria-live="polite" className="mb-4 text-sm text-ink-soft">{schemes.length} {t({en:'schemes and programmes to explore',mr:'योजना आणि कार्यक्रम पाहण्यासाठी',hi:'योजनाएँ और कार्यक्रम देखने के लिए'})}</p>
 <div className="space-y-5">{schemes.map(s=><article key={s.id} className="rounded-2xl border border-kokum-100 bg-white p-5 sm:p-7">
 <p className="text-xs text-kokum-700">{s.status==='general'?t({en:'Programme / policy guidance',mr:'कार्यक्रम / धोरण मार्गदर्शन',hi:'कार्यक्रम / नीति मार्गदर्शन'}):t({en:'Scheme',mr:'योजना',hi:'योजना'})} · {t({en:'Registry checked',mr:'नोंदी तपासल्या',hi:'रिकॉर्ड की जाँच'})}: {s.lastChecked}</p>
 <h2 className="mt-2 text-xl font-bold text-kokum-900">{t(s.name)}</h2><p className="mt-3 leading-relaxed">{t(s.what)}</p>
 <h3 className="mt-4 font-semibold">{t({en:'Who it is for',mr:'कोणासाठी',hi:'किसके लिए'})}</h3>
 <ul className="mt-2 list-disc space-y-1 pl-5">{s.who[lang].map(v=><li key={v}>{v}</li>)}</ul>
 {s.caution&&<p className="mt-4 rounded-xl bg-kokum-50 p-3 text-sm">{t(s.caution)}</p>}
 {s.status!=='official'&&<p className="mt-3 text-sm text-kokum-700">{t({en:'Current availability and rules need confirmation with the department.',mr:'सध्याची उपलब्धता व नियम संबंधित विभागाकडे तपासा.',hi:'वर्तमान उपलब्धता और नियम संबंधित विभाग से जाँचें।'})}</p>}
 <div className="mt-5 flex flex-wrap gap-4"><Link href={`/schemes#${s.id}`} className="font-semibold text-kokum-700 underline underline-offset-4">{t({en:'Benefits, documents & application',mr:'लाभ, कागदपत्रे आणि अर्ज',hi:'लाभ, दस्तावेज़ और आवेदन'})}</Link><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-kokum-700 underline underline-offset-4">{t({en:'Official website ↗',mr:'अधिकृत संकेतस्थळ ↗',hi:'आधिकारिक वेबसाइट ↗'})}</a></div>
 </article>)}</div>
 {!schemes.length&&<div className="rounded-2xl bg-kokum-50 p-6">{t({en:'No matching programme is listed for this age group in this theme. This does not mean support is unavailable. Try all ages or ask for guidance.',mr:'या विषयात या वयोगटासाठी कार्यक्रम नोंदलेला नाही. याचा अर्थ मदत उपलब्ध नाही असा नाही. सर्व वयोगट पाहा किंवा मार्गदर्शन विचारा.',hi:'इस विषय में इस आयु वर्ग का कार्यक्रम सूचीबद्ध नहीं है। इसका मतलब सहायता उपलब्ध नहीं है, ऐसा नहीं। सभी आयु वर्ग देखें या मार्गदर्शन माँगें।'})}</div>}
 <nav aria-label={t({en:'Other forms',mr:'इतर रूपं',hi:'अन्य रूप'})} className="mt-8 flex flex-wrap gap-2">{JOURNEYS.filter(j=>j.slug!==slug).map(j=><Link key={j.slug} href={`/journeys/${j.slug}`} className="rounded-full border border-kokum-100 px-4 py-2 text-sm text-kokum-700">{t(j.name)}</Link>)}</nav>
 </div>;
}
