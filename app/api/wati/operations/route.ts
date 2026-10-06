import {bearerMatches} from '@/lib/server/adminAuth';
import {getJSON,setJSON,hasRedis} from '@/lib/server/store';
import {setSupportPresence,supportAvailable} from '@/lib/server/waSupport';
import {validEvent,events,remindersReady,type ReminderEvent} from '@/lib/server/waReminders';
export async function GET(req:Request){
 if(!bearerMatches(req,process.env.WATI_OPERATIONS_SECRET))return Response.json({error:'Unauthorized'},{status:401});
 const day=new Date().toISOString().slice(0,10);
 return Response.json({persistentStorage:hasRedis,supportAvailable:await supportAvailable(),remindersReady:remindersReady(),events:await events(),feedback:await getJSON(`wati:feedback:${day}`),unanswered:await getJSON(`wati:unanswered:${day}`)});
}
export async function POST(req:Request){
 if(!bearerMatches(req,process.env.WATI_OPERATIONS_SECRET))return Response.json({error:'Unauthorized'},{status:401});
 if(!hasRedis)return Response.json({error:'Persistent storage required'},{status:503});
 let body;try{body=await req.json();}catch{return Response.json({error:'Invalid JSON'},{status:400});}
 if(body.action==='availability'&&typeof body.available==='boolean'){await setSupportPresence(body.available);return Response.json({ok:true,expiresInSeconds:900});}
 if(body.action==='events'&&Array.isArray(body.events)&&body.events.length<=10&&body.events.every((e:ReminderEvent)=>validEvent(e))&&new Set(body.events.map((e:ReminderEvent)=>e.id)).size===body.events.length){
  await setJSON('wati:events',body.events,100*86400);return Response.json({ok:true});
 }
 return Response.json({error:'Invalid operation or unconfirmed event'},{status:400});
}
