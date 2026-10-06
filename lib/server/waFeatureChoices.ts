import type {Lang} from '@/lib/kb';
import {setJSON} from './store';
import {sendText} from './wati';
import {mainMenu,type Menu,type Offered} from './waMenu';
import {modeMenu,recordMetric,reminderMenu,reminderConsent,subscribe,documentsMessage,say,type ReplyMode} from './waExperience';
type FeatureState={mode?:ReplyMode;lastTopic?:string;feedbackPending?:boolean;offered?:Offered|null};
type Context={lang:Lang;key:string;waId:string;target:string;state:FeatureState;save:(patch:Partial<FeatureState>)=>Promise<void>;offer:(menu:Menu)=>Promise<void>};
export async function handleFeatureChoice(id:string,c:Context):Promise<boolean>{
 const {lang:l,key,waId,target,state,save,offer}=c;
 if(id==='menu'){await offer(mainMenu(l));return true;}
 if(id==='voice'){await offer(modeMenu(l));return true;}
 if(id.startsWith('mode:')){
  const mode=id.slice(5) as ReplyMode;if(!['text','audio','both'].includes(mode))return true;
  await setJSON(`wati:preferences:${key}`,{mode,lang:l},90*86400);await save({mode,offered:null});
  await sendText(target,say(l,'Preference saved. Send text or a voice note. Menus, source links and emergency contacts remain available as text.','पसंती जतन केली. संदेश किंवा आवाजातील प्रश्न पाठवा. मेनू, दुवे आणि तातडीचे नंबर मजकुरात उपलब्ध राहतील.','पसंद सेव हुई। संदेश या वॉइस नोट भेजें। मेनू, लिंक और आपातकालीन नंबर लिखित उपलब्ध रहेंगे।'));
  await offer(mainMenu(l));return true;
 }
 if(id.startsWith('feedback:')){
  if(state.feedbackPending)await recordMetric('feedback',state.lastTopic??'general',id==='feedback:yes'?'helpful':'not-helpful');
  await save({feedbackPending:false,offered:null});
  await sendText(target,say(l,'Thank you. Ask another question whenever you need.','धन्यवाद. आणखी प्रश्न विचारा.','धन्यवाद। अगला सवाल पूछ सकती हैं।'));
  if(id==='feedback:no')await offer({kind:'buttons',body:say(l,'What would help next?','पुढे कशाची मदत हवी?','अब किससे मदद मिलेगी?'),buttons:[{id:'person',title:say(l,'Talk to someone','व्यक्तीशी बोला','किसी से बात करें')},{id:'menu',title:say(l,'Choose a topic','विषय निवडा','विषय चुनें')}]});
  return true;
 }
 if(id==='reminders'){
  const menu=await reminderMenu(l);if(menu)await offer(menu);else {await sendText(target,say(l,'No confirmed reminders are available right now. Nothing has been subscribed.','सध्या निश्चित स्मरणपत्रं उपलब्ध नाहीत. कोणतीही नोंदणी झालेली नाही.','अभी पुष्ट रिमाइंडर उपलब्ध नहीं हैं। कोई सदस्यता नहीं ली गई है।'));await save({offered:null});}return true;
 }
 if(id.startsWith('reminder:')){const menu=await reminderConsent(id.slice(9),l);if(menu)await offer(menu);else await handleFeatureChoice('reminders',c);return true;}
 if(id.startsWith('subscribe:')){
  try{await subscribe(key,waId,id.slice(10),l);await sendText(target,say(l,'One reminder scheduled. Reply STOP to cancel pending reminders.','एक स्मरणपत्र नियोजित केलं. रद्द करण्यासाठी STOP लिहा.','एक रिमाइंडर तय हुआ। लंबित रिमाइंडर रद्द करने के लिए STOP लिखें।'));}
  catch{await sendText(target,say(l,'Could not schedule this reminder. Try again later.','स्मरणपत्र नियोजित झालं नाही. नंतर प्रयत्न करा.','रिमाइंडर तय नहीं हुआ। बाद में कोशिश करें।'));}
  await save({offered:null});return true;
 }
 if(id.startsWith('docs:')){const body=documentsMessage(id.slice(5),l);if(body)await sendText(target,body);await save({offered:null});return true;}
 return false;
}
