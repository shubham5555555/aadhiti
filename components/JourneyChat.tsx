"use client";
import {useEffect,useRef,useState} from 'react';
import {Send, RotateCcw, MessageCircle, LoaderCircle} from 'lucide-react';
import {useLang} from '@/lib/i18n';
import {useProfile,profileContext} from '@/lib/profile';
import {tr} from '@/lib/homeJourneys';
import type {AiAnswer,ChatTurn} from '@/lib/ai';
import type {L} from '@/lib/kb';
import {safetyRule,SAFETY_SCRIPTS} from '@/lib/safetyScripts';
import {detectLang} from '@/lib/detectLang';
import Onboarding from '@/components/Onboarding';
type Exchange={question:string;answer:AiAnswer;fixed:boolean};
export default function JourneyChat({slug,title,suggestions}:{slug:string;title:L;suggestions:L[]}){
 const {t,lang,age}=useLang();const {profile,save,ready}=useProfile();
 const [draft,setDraft]=useState('');const [turns,setTurns]=useState<Exchange[]>([]);const [busy,setBusy]=useState(false);const [error,setError]=useState('');const [setup,setSetup]=useState(false);
 const log=useRef<HTMLDivElement>(null);
 useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight;},[turns,busy]);
 const history=useRef<ChatTurn[]>([]);const request=useRef<AbortController|null>(null);const locked=useRef(false);const version=useRef(0);const input=useRef<HTMLTextAreaElement>(null);
 useEffect(()=>()=>{version.current++;request.current?.abort();},[]);
 const clear=()=>{version.current++;request.current?.abort();locked.current=false;history.current=[];setTurns([]);setBusy(false);setError('');setDraft('');input.current?.focus();};
 async function ask(question:string){
  question=question.trim();if(!question||question.length>800||locked.current)return;
  const scriptId=safetyRule(question);
  if(ready&&!profile.onboarded&&!scriptId){setDraft(question);setSetup(true);return;}
  const current=version.current;locked.current=true;setBusy(true);setError('');setDraft(question);
  const controller=new AbortController();request.current=controller;const timeout=setTimeout(()=>controller.abort(),45000);
  try{
   let answer:AiAnswer;
   if(scriptId){
    const selected=SAFETY_SCRIPTS[scriptId];const al=detectLang(question,lang);const text=selected.text[al]||selected.text.en!;
    const minor=age==='girl';
    answer={intent:'CONNECT',risk:selected.risk,understand:text.ack,answer:[...(minor?[tr('Tell an adult you trust right away.','विश्वासू मोठ्या व्यक्तीला लगेच सांगा.','अभी किसी भरोसेमंद बड़े को बताएँ।')[al]]:[]),...text.a],safetyCheck:text.fu,nextStep:text.n,options:[],helplines:[...new Set([...selected.hl,...(minor?[1098]:[])])],module:'safety',source:'AADHI TI',verify:'',lang:al,topicId:null};
   }else{
    const response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({message:question,lang,age,journey:slug,history:history.current.slice(-6),profile:profileContext(profile)})});
    if(!response.ok)throw new Error(response.status===429?'rate':'unavailable');answer=await response.json();
   }
   if(current!==version.current)return;
   setTurns(prev=>[...prev,{question,answer,fixed:!!scriptId}].slice(-20));
   history.current=[...history.current,{role:'user',text:question},{role:'assistant',text:[answer.understand,...answer.answer,answer.nextStep].join(' ')}].slice(-6) as ChatTurn[];
   setDraft('');
  }catch(e){if(current===version.current)setError(e instanceof Error&&e.message==='rate'?t(tr('Too many questions at once. Please wait a minute and try again.','खूप प्रश्न एकाच वेळी आले. एक मिनिट थांबून पुन्हा प्रयत्न करा.','बहुत सारे सवाल एक साथ आए। एक मिनट बाद फिर कोशिश करें।')):t(tr('The AI could not answer right now. Your question is still below; please try again.','आत्ता AI कडून उत्तर मिळालं नाही. तुमचा प्रश्न खाली आहे; पुन्हा प्रयत्न करा.','अभी AI से जवाब नहीं मिला। आपका सवाल नीचे है; फिर कोशिश करें।')));}
  finally{clearTimeout(timeout);if(current===version.current){locked.current=false;setBusy(false);}}
 }
 return <section id="ask-ai" className="mt-10 scroll-mt-32 overflow-hidden rounded-[1.75rem] border border-kokum-200 bg-white">
  <div className="flex items-start justify-between gap-3 bg-kokum-800 p-5 text-white sm:p-7"><div><p className="flex items-center gap-2 text-xs font-bold tracking-wide text-kokum-100"><MessageCircle size={17}/>AADHI TI · AI</p><h2 className="mt-2 font-serif text-3xl">{t(tr('Ask here. Keep exploring.','इथेच विचारा. पुढे जाणून घ्या.','यहीं पूछें। आगे जानें।'))}</h2><p className="mt-2 text-sm text-kokum-100">{t(title)}</p></div>{turns.length>0&&<button type="button" onClick={clear} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30" aria-label={t(tr('Clear this conversation','हा संवाद मिटवा','यह बातचीत साफ़ करें'))}><RotateCcw size={18}/></button>}</div>
  <div className="p-5 sm:p-7">
   {turns.length===0&&<div className="mb-5 flex flex-wrap gap-2">{suggestions.map((s,i)=><button type="button" key={i} className="soft-chip min-h-11 text-left" disabled={busy||!ready} onClick={()=>ask(t(s))}>{t(s)}</button>)}</div>}
   <div ref={log} className="max-h-[42svh] md:max-h-[560px] space-y-6 overflow-y-auto overscroll-contain" role="log" aria-live="polite" aria-relevant="additions" aria-label={t(tr('Conversation','संवाद','बातचीत'))}>
    {turns.map((turn,i)=><div key={i} className="space-y-3"><p className="ml-auto w-fit max-w-[90%] whitespace-pre-wrap break-words rounded-2xl bg-kokum-700 px-4 py-3 text-white">{turn.question}</p><div className="rounded-2xl bg-[#fff8f5] p-4 sm:p-5" lang={turn.answer.lang}>
     <p className="font-semibold text-kokum-800">{turn.answer.understand}</p><ul className="mt-3 list-disc space-y-2 pl-5 text-ink">{turn.answer.answer.map((a,n)=><li key={n}>{a}</li>)}</ul>
     {turn.answer.safetyCheck&&<p className="mt-4 font-semibold text-kokum-800">{turn.answer.safetyCheck}</p>}
     {turn.answer.nextStep&&<div className="mt-4 border-l-2 border-kokum-400 pl-3"><p className="text-xs font-bold text-kokum-600">{t(tr('Next step','पुढचं पाऊल','अगला कदम'))}</p><p className="mt-1">{turn.answer.nextStep}</p></div>}
     <div className="mt-3 flex flex-wrap gap-2">{turn.answer.helplines.map(n=><a key={n} href={`tel:${n}`} className="soft-chip min-h-11 font-bold">{t(tr('Call','कॉल करा','कॉल करें'))} {n}</a>)}</div>
     <p className="mt-3 text-xs leading-relaxed text-ink-soft">{turn.fixed?t(tr('Safety guidance','सुरक्षा मार्गदर्शन','सुरक्षा मार्गदर्शन')):t(tr('AI-generated guidance. Verify important details with the relevant professional or office.','AI मार्गदर्शन. महत्त्वाची माहिती संबंधित तज्ज्ञ किंवा कार्यालयाकडे तपासा.','AI मार्गदर्शन। महत्वपूर्ण जानकारी संबंधित विशेषज्ञ या कार्यालय से जाँचें।'))} {turn.answer.source} {turn.answer.verify}</p>
     {i===turns.length-1&&<div className="mt-4 flex flex-wrap gap-2">{turn.answer.options.map((q,n)=><button type="button" key={n} disabled={busy} onClick={()=>ask(q)} className="soft-chip min-h-11 text-left">{q}</button>)}</div>}
    </div></div>)}
   </div>
   {setup&&<div className="my-5"><Onboarding initial={{...profile,age:profile.age??age}} onDone={p=>{save(p);setSetup(false);input.current?.focus();}}/></div>}
   {busy&&<p role="status" className="my-4 flex items-center gap-2 text-kokum-700"><LoaderCircle className="animate-spin" size={18}/>{t(tr('Thinking…','उत्तर तयार करत आहे…','जवाब तैयार हो रहा है…'))}</p>}
   {error&&<p role="alert" className="my-4 text-sm text-red-700">{error}</p>}
   <form className="mt-5" onSubmit={e=>{e.preventDefault();void ask(draft);}}><label htmlFor={`question-${slug}`} className="text-sm font-bold text-kokum-800">{t(tr('Your question','तुमचा प्रश्न','आपका सवाल'))}</label><textarea disabled={busy} ref={input} id={`question-${slug}`} value={draft} onChange={e=>setDraft(e.target.value)} maxLength={800} required rows={3} className="soft-input mt-2 w-full resize-y" placeholder={t(tr('Ask in Marathi, Hindi or English…','मराठी, हिंदी किंवा इंग्रजीत विचारा…','मराठी, हिंदी या अंग्रेज़ी में पूछें…'))}/><div className="mt-3 flex items-start justify-between gap-3"><p className="max-w-sm text-xs leading-relaxed text-ink-soft">{t(tr('Questions and recent replies are sent to Google Gemini. Leave out names, phone numbers and addresses. This conversation is not saved on your device.','प्रश्न आणि अलीकडील उत्तरं Google Gemini कडे पाठवली जातात. नाव, फोन नंबर किंवा पत्ता लिहू नका. हा संवाद तुमच्या डिव्हाइसवर जतन होत नाही.','सवाल और हाल के जवाब Google Gemini को भेजे जाते हैं। नाम, फ़ोन नंबर और पता न लिखें। यह बातचीत आपके डिवाइस पर सेव नहीं होती।'))}</p><button type="submit" disabled={!ready||busy||!draft.trim()} className="campaign-primary shrink-0 disabled:opacity-50" aria-label={t(tr('Send question','प्रश्न पाठवा','सवाल भेजें'))}><Send size={18}/></button></div></form>
  </div>
 </section>;
}
