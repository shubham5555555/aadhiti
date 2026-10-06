import {createCipheriv,createDecipheriv,randomBytes,createHash} from 'node:crypto';
import type {Lang,L} from '@/lib/kb';
import {getJSON,setJSON,hasRedis,enqueue,dueJobs,dequeue,setOnce,withLock} from './store';

export type ReminderEvent={id:string;title:L;dueAt:string;eventAt:string;sourceUrl:string;confirmed:boolean;template:Record<Lang,string>};
export type ReminderJob={user:string;recipient:string;eventId:string;eventVersion:string;lang:Lang;status:'pending'|'accepted'|'failed'|'unknown'|'cancelled';createdAt:number};
export const QUEUE='wati:reminders:due';
const TTL=100*86400;
const eventVersion=(e:ReminderEvent)=>createHash('sha256').update(JSON.stringify(e)).digest('hex');
const encryptionKey=()=>Buffer.from(process.env.WATI_REMINDER_KEY??'','hex');
export const remindersReady=()=>hasRedis&&encryptionKey().length===32&&!!process.env.WATI_API_TOKEN;
export function validEvent(e:ReminderEvent,now=Date.now()) {
 return !!e && /^[a-z0-9-]{1,60}$/.test(e.id)&&e.confirmed===true&&
 ['en','mr','hi'].every(l=>typeof e.title?.[l as Lang]==='string'&&e.title[l as Lang].length>0&&e.title[l as Lang].length<=100&&/^[a-z0-9_]+$/.test(e.template?.[l as Lang]??''))&&
 /^https:\/\//.test(e.sourceUrl)&&/([+-]\d{2}:\d{2}|Z)$/.test(e.dueAt)&&/([+-]\d{2}:\d{2}|Z)$/.test(e.eventAt)&&Date.parse(e.dueAt)>now&&Date.parse(e.dueAt)<now+90*86400000&&Date.parse(e.eventAt)>Date.parse(e.dueAt);
}
export async function events(){return (await getJSON<ReminderEvent[]>('wati:events')??[]).filter(e=>validEvent(e));}
export function seal(value:string){const iv=randomBytes(12);const c=createCipheriv('aes-256-gcm',encryptionKey(),iv);return Buffer.concat([iv,c.update(value,'utf8'),c.final(),c.getAuthTag()]).toString('base64');}
export function unseal(value:string){const b=Buffer.from(value,'base64');const d=createDecipheriv('aes-256-gcm',encryptionKey(),b.subarray(0,12));d.setAuthTag(b.subarray(-16));return Buffer.concat([d.update(b.subarray(12,-16)),d.final()]).toString('utf8');}
export async function subscribe(user:string,phone:string,id:string,lang:Lang){
 if(!remindersReady())throw new Error('Reminders not configured');
 const event=(await events()).find(e=>e.id===id);if(!event)throw new Error('Event unavailable');
 await withLock(`reminder-user:${user}`,async()=>{
 const ids=await getJSON<string[]>(`wati:subscriptions:${user}`)??[];
 for(const id of ids){const prior=await getJSON<ReminderJob>(`wati:reminder:${id}`);if(prior?.eventId===event.id&&prior.status==='pending')return;}
 const jobId=createHash('sha256').update(`${user}:${id}:${randomBytes(12).toString('hex')}`).digest('hex');
 const job:ReminderJob={user,recipient:seal(phone),eventId:id,eventVersion:eventVersion(event),lang,status:'pending',createdAt:Date.now()};
 await setJSON(`wati:reminder:${jobId}`,job,TTL);
 await setJSON(`wati:subscriptions:${user}`,[...ids,jobId].slice(-100),TTL);
 await enqueue(QUEUE,jobId,Date.parse(event.dueAt));
 });
}
export async function stopReminders(user:string){
 const ids=await getJSON<string[]>(`wati:subscriptions:${user}`)??[];
 for(const id of ids){await withLock(`reminder-user:${user}`,async()=>{const job=await getJSON<ReminderJob>(`wati:reminder:${id}`);if(job)await setJSON(`wati:reminder:${id}`,{...job,recipient:'',status:'cancelled'},TTL);await dequeue(QUEUE,id);});}
 await setJSON(`wati:subscriptions:${user}`,[],TTL);
}
/** Claim once before sending: ambiguous network outcomes are never blindly retried. */
export async function runReminders(send:(phone:string,event:ReminderEvent,lang:Lang,id:string)=>Promise<boolean>){
 const result={accepted:0,failed:0,unknown:0,cancelled:0};
 const catalog=await getJSON<ReminderEvent[]>('wati:events')??[];
 for(const id of (await dueJobs(QUEUE,Date.now())).slice(0,3)){
  if(!await setOnce(`wati:reminder-claim:${id}`,TTL)){await dequeue(QUEUE,id);continue;}
  const job=await getJSON<ReminderJob>(`wati:reminder:${id}`);
  if(!job||job.status!=='pending'){await dequeue(QUEUE,id);continue;}
  const event=catalog.find(e=>e.id===job.eventId&&e.confirmed);
  if(!event || eventVersion(event)!==job.eventVersion || Date.parse(event.eventAt)<=Date.now()){await setJSON(`wati:reminder:${id}`,{...job,recipient:'',status:'cancelled'},TTL);await dequeue(QUEUE,id);result.cancelled++;continue;}
  await withLock(`reminder-user:${job.user}`,async()=>{
  const fresh=await getJSON<ReminderJob>(`wati:reminder:${id}`);
  if(fresh?.status!=="pending"){await dequeue(QUEUE,id);return;}
  let status:ReminderJob['status']='unknown';
  try{status=await send(unseal(job.recipient),event,job.lang,id)?'accepted':'failed';}catch{status='unknown';}
  result[status]++;
  await setJSON(`wati:reminder:${id}`,{...job,recipient:'',status},TTL);await dequeue(QUEUE,id);
  });
 }
 return result;
}
