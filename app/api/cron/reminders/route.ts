import {bearerMatches} from '@/lib/server/adminAuth';
import {runReminders,remindersReady} from '@/lib/server/waReminders';
import {sendReminderTemplate} from '@/lib/server/wati';
export const maxDuration=60;
export async function GET(req:Request){
 if(!bearerMatches(req,process.env.CRON_SECRET))return Response.json({error:'Unauthorized'},{status:401});
 if(!remindersReady())return Response.json({error:'Reminders not configured'},{status:503});
 return Response.json(await runReminders(sendReminderTemplate));
}
