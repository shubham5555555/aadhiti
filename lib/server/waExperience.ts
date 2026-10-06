import type {Lang} from '@/lib/kb';
import {documentLabel} from './waDocuments';
import {SCHEMES} from '@/lib/schemes';
import type {Menu} from './waMenu';
import {getJSON,setJSON,withLock} from './store';
import {events,remindersReady,subscribe,stopReminders} from './waReminders';
export type ReplyMode='text'|'audio'|'both';
export const say=(l:Lang,en:string,mr:string,hi:string)=>l==='en'?en:l==='hi'?hi:mr;
export function modeMenu(l:Lang):Menu{return {kind:'buttons',body:say(l,'How would you like answers? You can change this any time with “voice settings”.','उत्तरं कशी हवीत? “voice settings” लिहून कधीही बदला.','जवाब कैसे चाहिए? “voice settings” से कभी भी बदलें।'),buttons:[{id:'mode:text',title:say(l,'Text','मजकूर','लिखित')},{id:'mode:audio',title:say(l,'Audio','आवाज','आवाज़')},{id:'mode:both',title:say(l,'Text + audio','मजकूर + आवाज','लिखित + आवाज़')}]};}
export function guidedMenu(id:string,l:Lang):Menu|null {
 const safety=id==='cat:safety';if(!safety&&id!=='cat:skills')return null;
 return {kind:'buttons',body:safety?say(l,'What kind of help do you need? In immediate danger, call 112 yourself. This chat does not dispatch help.','कशासाठी मदत हवी? तातडीचा धोका असल्यास स्वतः 112 वर कॉल करा. या चॅटमधून मदत पथक पाठवलं जात नाही.','किस तरह की मदद चाहिए? तत्काल खतरे में खुद 112 पर कॉल करें। यह चैट सहायता दल नहीं भेजती।'):say(l,'What would you like to do first?','आधी काय करायला आवडेल?','पहले क्या करना चाहेंगी?'),buttons:safety?[
 {id:'helplines',title:say(l,'Urgent help','तातडीची मदत','तत्काल मदद')},{id:'topic:following_me',title:say(l,'Someone follows me','कोणीतरी पाठलाग करतंय','कोई पीछा कर रहा है')},{id:'cat:g_digital',title:say(l,'Online safety','ऑनलाइन सुरक्षा','ऑनलाइन सुरक्षा')}]:[
 {id:'topic:job_skills',title:say(l,'Learn a skill','कौशल्य शिका','कौशल सीखें')},{id:'topic:jobs_nearby',title:say(l,'Find work','काम शोधा','काम ढूँढें')},{id:'topic:start_business',title:say(l,'Start a business','व्यवसाय सुरू करा','व्यवसाय शुरू करें')} ]};
}
export function feedbackMenu(l:Lang):Menu{return {kind:'buttons',body:say(l,'Did this help? You can also ask another question. Feedback records only a rating and topic, not your message.','हे उपयोगी पडलं का? आणखी प्रश्नही विचारा. अभिप्रायात फक्त मत आणि विषय नोंदवतो, तुमचा संदेश नाही.','क्या इससे मदद मिली? आप अगला सवाल भी पूछ सकती हैं। प्रतिक्रिया में केवल रेटिंग और विषय दर्ज होता है, आपका संदेश नहीं।'),buttons:[{id:'feedback:yes',title:say(l,'Yes, helpful','हो, उपयोगी','हाँ, मदद मिली')},{id:'feedback:no',title:say(l,'Not yet','अजून नाही','अभी नहीं')},{id:'person',title:say(l,'Talk to someone','व्यक्तीशी बोला','किसी से बात करें')}]};}
export async function recordMetric(kind:'feedback'|'unanswered',topic:string,rating:string){
 const day=new Date().toISOString().slice(0,10);const key=`wati:${kind}:${day}`;
 await withLock(key,async()=>{const counts=await getJSON<Record<string,number>>(key)??{};const field=`${topic.slice(0,60)}:${rating}`;counts[field]=(counts[field]??0)+1;await setJSON(key,counts,30*86400);});
}
export async function reminderMenu(l:Lang):Promise<Menu|null>{
 if(!remindersReady())return null;
 const list=await events();if(!list.length)return null;
 return {kind:'list',body:say(l,'Choose a confirmed event to review a one-time reminder. Nothing is subscribed yet.','एकदाच येणाऱ्या स्मरणपत्रासाठी निश्चित कार्यक्रम निवडा. अजून नोंदणी झालेली नाही.','एक बार के रिमाइंडर के लिए पुष्ट कार्यक्रम चुनें। अभी सदस्यता नहीं ली गई है।'),button:say(l,'View events','कार्यक्रम पाहा','कार्यक्रम देखें'),sections:[{title:say(l,'Confirmed events','निश्चित कार्यक्रम','पुष्ट कार्यक्रम'),rows:list.map(e=>({id:`reminder:${e.id}`,title:e.title[l].slice(0,24),description:new Date(e.eventAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})}))}]};
}
export async function reminderConsent(id:string,l:Lang):Promise<Menu|null>{const e=(await events()).find(e=>e.id===id);if(!e)return null;return {kind:'buttons',body:say(l,`Send one reminder for ${e.title[l]} on ${new Date(e.dueAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST? We store your encrypted WhatsApp number for this. Reply STOP to cancel.\n${e.sourceUrl}`,`${e.title[l]} साठी ${new Date(e.dueAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST रोजी एक स्मरणपत्र पाठवू? यासाठी तुमचा WhatsApp नंबर कूटबद्ध स्वरूपात जतन करतो. रद्द करण्यासाठी STOP लिहा.\n${e.sourceUrl}`,`${e.title[l]} के लिए ${new Date(e.dueAt).toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST पर एक रिमाइंडर भेजें? इसके लिए आपका WhatsApp नंबर एन्क्रिप्ट करके रखते हैं। रद्द करने के लिए STOP लिखें।\n${e.sourceUrl}`),buttons:[{id:`subscribe:${id}`,title:say(l,'Yes, remind me','हो, आठवण द्या','हाँ, याद दिलाएँ')},{id:'menu',title:say(l,'No thanks','नको, धन्यवाद','नहीं, धन्यवाद')}]};}
export {subscribe,stopReminders};
export function documentsMessage(id:string,l:Lang){const s=SCHEMES.find(x=>x.id===id);if(!s)return null;return [s.name[l],say(l,'Document checklist from the registry:','माहितीसंचातील कागदपत्रांची यादी:','संग्रह की दस्तावेज़ सूची:'),...(s.docs?.map(d=>`□ ${documentLabel(d,l)}`)??[say(l,'No confirmed checklist is stored. Ask the official service.','निश्चित यादी उपलब्ध नाही. अधिकृत सेवेकडे विचारा.','पुष्ट सूची उपलब्ध नहीं है। आधिकारिक सेवा से पूछें।')]),say(l,'This is guidance, not approval. Confirm current requirements before applying. Do not send documents, Aadhaar numbers or OTPs here.','हे मार्गदर्शन आहे, मंजुरी नाही. अर्जापूर्वी सध्याचे नियम तपासा. कागदपत्रं, आधार नंबर किंवा OTP इथे पाठवू नका.','यह मार्गदर्शन है, मंज़ूरी नहीं। आवेदन से पहले वर्तमान नियम जाँचें। दस्तावेज़, आधार नंबर या OTP यहाँ न भेजें।'),s.url].join('\n\n');}
