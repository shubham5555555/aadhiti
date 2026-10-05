"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Plus, Minus, BookOpen, UtensilsCrossed, PhoneCall } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { journeys, tr } from '@/lib/homeJourneys';
import { leader, initiativeBanner } from '@/lib/leader';
import { helplines } from '@/lib/data';
import ThreePillars from '@/components/home/ThreePillars';
import SafetyPlan from '@/components/home/SafetyPlan';
import DangerBand from '@/components/home/DangerBand';

const whatsapp = 'https://wa.me/919326416290?text=Hi';
export default function Home() {
 const {t} = useLang();
 const [open,setOpen] = useState<number|null>(0);
 const [question,setQuestion] = useState('');
 return <div className="campaign-home pb-8">
  <section id="home-banner" className="campaign-hero mobile-first-hero">
   <div className="hero-layout">
    <div className="hero-art">
     <Image src="/illustrations/campaign-hero-v2.webp" alt={t(tr('Women across generations connected by a flowing red and gold sari','लाल आणि सोनेरी पदराने जोडलेली स्त्रीशक्तीची विविध रूपं','लाल और सुनहरे आँचल से जुड़े नारी शक्ति के विभिन्न रूप'))} fill priority sizes="(min-width:1024px) 560px, (min-width:640px) 700px, 100vw" className="hero-image"/>
     <div className="hero-art-shade" aria-hidden="true"/>
     <p className="hero-art-caption">{t(tr('Her strength. Her next step.','तिची शक्ती. तिचं पुढचं पाऊल.','उसकी शक्ति। उसका अगला कदम।'))}</p>
    </div>
    <div className="hero-copy">
     <p className="hero-eyebrow">{t(tr('AADHI TI · FOR EVERY WOMAN','आधी ती · प्रत्येक महिलेसाठी','आधी ती · हर महिला के लिए'))}</p>
     <h1 className="hero-title">{t(tr('Every age. Every chapter. Always her.','प्रत्येक वयात. प्रत्येक रूपात. प्रत्येक घरात.','हर उम्र में। हर रूप में। हर घर में।'))}</h1>
     <p className="hero-description">{t(tr('Safety, financial security and skills. Find support for your next step, in your own language.','सुरक्षा, आर्थिक स्वावलंबन आणि कौशल्ये. तुमच्या पुढच्या पावलासाठी, तुमच्या भाषेत मार्गदर्शन.','सुरक्षा, आर्थिक आत्मनिर्भरता और कौशल। आपके अगले कदम के लिए, आपकी भाषा में मार्गदर्शन।'))}</p>
     <div className="hero-actions">
      <Link className="campaign-primary" href="/chat">{t(tr('Ask AADHI TI','AADHI TI ला विचारा','AADHI TI से पूछें'))}<ArrowUpRight size={18}/></Link>
      <a className="campaign-secondary" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>WhatsApp</a>
     </div>
     <p className="hero-languages">{t(tr('Marathi · Hindi · English','मराठी · हिंदी · इंग्रजी','मराठी · हिंदी · अंग्रेज़ी'))}</p>
    </div>
   </div>
   <Link href="/aditi-tatkare" className="hero-credit">
    <Image src={leader.photo} alt={t(leader.name)} width={56} height={56} className="hero-credit-photo"/>
    <div className="min-w-0 flex-1"><p className="text-xs text-ink-soft">{t(initiativeBanner.by)}</p><p className="hero-credit-name">{t(initiativeBanner.name)}</p><p className="hero-credit-role">{leader.roles.map(r=>t(r)).join(' · ')}</p></div><ArrowUpRight size={18} className="shrink-0 text-kokum-600"/>
   </Link>
  </section>

  <div className="my-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-kokum-100 bg-white px-5 py-4"><p className="text-sm text-ink">{t(tr('Need help right now? You do not have to navigate this alone.','आत्ता मदत हवी आहे? तुम्ही एकट्या नाही.','अभी मदद चाहिए? आप अकेली नहीं हैं।'))}</p><a href="tel:112" className="inline-flex items-center gap-2 font-bold text-kokum-700"><Phone size={16}/>{t(tr('Emergency · 112','आपत्कालीन मदत · 112','आपातकालीन मदद · 112'))}</a></div>

  <section className="campaign-section"><ThreePillars/></section>

  <section id="nine-pathways" className="campaign-section scroll-mt-32">
   <div className="mb-9 grid gap-5 md:grid-cols-[1.2fr_1fr] md:items-end">
    <div><p className="campaign-kicker">{t(tr('NINE FORMS. ONE SHARED PURPOSE.','नऊ रूपं. एकच ध्येय.','नौ रूप। एक साझा उद्देश्य।'))}</p><h2 className="campaign-heading mt-3">{t(tr('A step for every part of her life.','तिच्या आयुष्याच्या प्रत्येक टप्प्यासाठी.','उसके जीवन के हर पड़ाव के लिए।'))}</h2></div>
    <p className="max-w-md leading-relaxed text-ink-soft">{t(tr('Inspired by the nine forms of Shakti. Nine ways to find information, build confidence and take your next step. Choose what matters to you today.','शक्तीच्या नऊ रूपांतून प्रेरणा. माहिती, आत्मविश्वास आणि पुढचं पाऊल शोधण्याचे नऊ मार्ग. आज तुम्हाला आवश्यक असलेला विषय निवडा.','शक्ति के नौ रूपों से प्रेरित। जानकारी, आत्मविश्वास और अगला कदम खोजने के नौ रास्ते। आज आपके लिए ज़रूरी विषय चुनें।'))}</p>
   </div>
   <div className="grid gap-5 md:grid-cols-3">
    {journeys.map((j,i)=><article key={j.name.en} className="journey-card overflow-hidden rounded-[1.5rem] border border-kokum-100 bg-[#fffaf6]">
     <div role="img" aria-label={t(j.title)} className="journey-art hidden aspect-square md:block" style={{backgroundImage:'url(/illustrations/nine-journeys-v2.webp)',backgroundSize:'300% 300%',backgroundPosition:`${(i%3)*50}% ${Math.floor(i/3)*50}%`}}/>
     <button aria-expanded={open===i} aria-controls={`journey-${i}`} onClick={()=>setOpen(open===i?null:i)} className="flex w-full items-center gap-4 p-5 text-left md:hidden">
      <span aria-hidden className="journey-art h-24 w-24 shrink-0 rounded-xl" style={{backgroundImage:'url(/illustrations/nine-journeys-v2.webp)',backgroundSize:'300% 300%',backgroundPosition:`${(i%3)*50}% ${Math.floor(i/3)*50}%`}}/>
      <span className="flex-1"><span className="campaign-kicker text-[10px]">0{i+1} / {t(j.name)}</span><span className="mt-1 block font-serif text-xl text-kokum-800">{t(j.title)}</span></span>{open===i?<Minus size={16}/>:<Plus size={16}/>}</button>
     <div id={`journey-${i}`} className={`${open===i?'block':'hidden'} px-6 pb-6 md:block md:pt-5`}>
      <p className="campaign-kicker hidden text-[10px] md:block">0{i+1} / {t(j.name)}</p><h3 className="mt-2 hidden font-serif text-[1.65rem] leading-tight text-kokum-800 md:block">{t(j.title)}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t(j.body)}</p><Link href={`/journeys/${j.name.en.toLowerCase()}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-kokum-700">{t(j.link)}<ArrowRight size={16}/></Link>
     </div>
    </article>)}
   </div>
  </section>

  <section className="campaign-section rounded-[2rem] bg-kokum-800 px-6 py-9 text-white sm:p-10">
   <div className="grid gap-8 md:grid-cols-2 md:items-center"><div><p className="text-xs font-bold tracking-widest text-kokum-200">{t(tr('A QUESTION IS A BEGINNING','एका प्रश्नातून सुरुवात','एक सवाल से शुरुआत'))}</p><h2 className="mt-3 font-serif text-4xl leading-tight">{t(tr('Big questions. Everyday questions. Yours.','प्रश्न मोठा असो वा रोजचा. विचारा.','बड़ा सवाल हो या रोज़मर्रा का। पूछिए।'))}</h2><p className="mt-4 text-kokum-100">{t(tr('Tell us what is on your mind, in your own words.','तुमच्या मनातलं तुमच्या शब्दांत सांगा.','अपने मन की बात अपने शब्दों में कहें।'))}</p></div>
   <form action="/chat" className="rounded-2xl bg-white p-5 text-ink"><label htmlFor="home-question" className="text-sm font-bold text-kokum-700">{t(tr('What would you like to know?','तुम्हाला काय जाणून घ्यायचं आहे?','आप क्या जानना चाहती हैं?'))}</label><textarea id="home-question" name="q" required maxLength={800} rows={3} value={question} onChange={e=>setQuestion(e.target.value)} placeholder={t(tr('Type your question…','तुमचा प्रश्न लिहा…','अपना सवाल लिखें…'))} className="mt-3 w-full resize-none rounded-xl border border-kokum-100 bg-sand-50 p-3 outline-kokum-600"/><div className="mt-3 flex items-center justify-between gap-3"><p className="max-w-[16rem] text-xs leading-relaxed text-ink-soft">{t(tr('Sent to AI for a reply. Please leave out names, phone numbers and addresses.','उत्तरासाठी AI कडे पाठवला जातो. नाव, फोन नंबर किंवा पत्ता लिहू नका.','जवाब के लिए AI को भेजा जाता है। नाम, फ़ोन नंबर और पता न लिखें।'))}</p><button className="campaign-primary" type="submit" aria-label={t(tr('Send question','प्रश्न पाठवा','सवाल भेजें'))}><ArrowRight size={20}/></button></div></form></div>
  </section>

  <section className="campaign-section"><div className="mb-7"><p className="campaign-kicker">{t(tr('A LITTLE HELP, EVERY DAY','रोजच्या जगण्यात थोडी सोबत','हर दिन थोड़ा साथ'))}</p><h2 className="campaign-heading mt-3">{t(tr('Useful today. Here tomorrow.','आज उपयोगी. उद्याही सोबत.','आज उपयोगी। कल भी साथ।'))}</h2></div>
   <div className="grid gap-4 sm:grid-cols-3">{[
    {icon:PhoneCall,href:'/call',title:tr('A voice alongside you','सोबतीचा आवाज','साथ देने वाली आवाज़'),body:tr('Talk with the AI companion, or start a one-sided fake call.','AI सोबतीशी बोला किंवा एकतर्फी फेक कॉल सुरू करा.','AI साथी से बात करें या एकतरफ़ा फ़ेक कॉल शुरू करें।')},
    {icon:UtensilsCrossed,href:'/everyday',title:tr('What can I cook today?','आज काय बनवू?','आज क्या पकाएँ?'),body:tr('Recipe ideas from your ingredients, and a weekly menu planner.','घरातल्या साहित्यापासून पाककृती आणि आठवड्याचं नियोजन.','घर की सामग्री से व्यंजन और साप्ताहिक भोजन की योजना।')},
    {icon:BookOpen,href:'/awareness',title:tr('Information you can use','उपयोगी माहिती','काम की जानकारी'),body:tr('Explore clear explanations about health, safety and your rights.','आरोग्य, सुरक्षितता आणि तुमच्या हक्कांबद्दल सोपी माहिती.','स्वास्थ्य, सुरक्षा और आपके अधिकारों पर सरल जानकारी।')}
   ].map(item=><Link key={item.href} href={item.href} className="group rounded-2xl border border-kokum-100 bg-white p-6 transition hover:border-kokum-400"><item.icon size={25} strokeWidth={1.4} className="text-kokum-600"/><h3 className="mt-5 font-serif text-2xl text-kokum-800">{t(item.title)}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{t(item.body)}</p><ArrowUpRight className="mt-5 text-kokum-600 transition group-hover:translate-x-1" size={20}/></Link>)}</div>
  </section>

  <section className="campaign-section grid overflow-hidden rounded-[2rem] bg-[#f1e1dc] md:grid-cols-2">
   <div className="relative min-h-[300px] bg-[#fff8ed] md:min-h-[430px]"><Image src="/illustrations/campaign-wheels-v2.webp" alt={t(tr('Concept artwork from the presentation showing AADHI TI on Wheels and community support','समुदायात एकत्र आलेल्या महिलांचं चित्र','समुदाय में एक साथ महिलाओं का चित्रण'))} fill sizes="(min-width:768px) 550px, 100vw" className="object-contain"/></div>
   <div className="p-7 sm:p-10"><p className="campaign-kicker">{t(tr('THE COMMUNITY VISION · PLANNED','समुदायासाठी संकल्पना · नियोजित','समुदाय की परिकल्पना · प्रस्तावित'))}</p><h2 className="campaign-heading mt-4">{t(tr('From her phone to her village.','तिच्या फोनपासून तिच्या गावापर्यंत.','उसके फ़ोन से उसके गाँव तक।'))}</h2><p className="mt-5 leading-relaxed text-ink-soft">{t(tr('The nine-day initiative is envisioned as a beginning: mother–daughter circles, practical workshops and AADHI TI on Wheels, bringing information closer to communities in Shrivardhan and nearby talukas.','नऊ दिवसांचा उपक्रम ही एक सुरुवात: आई–मुलीचा संवाद, उपयुक्त कार्यशाळा आणि AADHI TI on Wheels मधून श्रीवर्धन आणि आसपासच्या तालुक्यांतील गावांपर्यंत माहिती पोहोचवण्याची संकल्पना.','नौ दिन की पहल एक शुरुआत है: माँ–बेटी संवाद, उपयोगी कार्यशालाएँ और AADHI TI on Wheels के माध्यम से श्रीवर्धन और आसपास के तालुकों तक जानकारी पहुँचाने की परिकल्पना।'))}</p><p className="mt-4 text-sm leading-relaxed text-ink-soft">{t(tr('Anganwadi and ASHA workers, teachers and self-help groups can help women listen, learn and connect with appropriate services. Event locations and dates will be shared when confirmed.','अंगणवाडी व आशा सेविका, शिक्षक आणि बचत गट महिलांना ऐकून घेण्यासाठी, शिकण्यासाठी आणि योग्य सेवांशी जोडण्यासाठी मदत करू शकतात. कार्यक्रमांची ठिकाणं व तारखा निश्चित झाल्यावर दिल्या जातील.','आंगनवाड़ी और आशा कार्यकर्ता, शिक्षक और स्वयं सहायता समूह महिलाओं को सुनने, सीखने और सही सेवाओं से जुड़ने में सहयोग कर सकते हैं। आयोजन के स्थान और तारीखें तय होने पर साझा की जाएँगी।'))}</p></div>
  </section>

  <section className="campaign-section"><DangerBand/></section>
  <section className="campaign-section"><SafetyPlan/></section>
  <section className="campaign-section"><h2 className="campaign-heading">{t(tr('Help, a phone call away.','मदत, एका फोनवर.','मदद, एक फ़ोन पर।'))}</h2><div className="mt-7 grid gap-x-8 sm:grid-cols-2">{helplines.map(h=><a key={h.number} href={`tel:${h.number}`} className="flex items-center justify-between gap-4 border-b border-kokum-100 py-5"><div><p className="font-bold text-kokum-800">{t(h.name)}</p><p className="mt-1 text-sm text-ink-soft">{t(h.desc)}</p></div><span className="shrink-0 font-serif text-2xl text-kokum-700">{h.number} ↗</span></a>)}</div></section>
 </div>;
}
