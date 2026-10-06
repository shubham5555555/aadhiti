import {authConfigured,currentSession} from '@/lib/server/auth';
export async function GET(){try{const session=await currentSession();return Response.json({authenticated:!!session,configured:authConfigured(),last4:session?.last4??null},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'UNAVAILABLE'},{status:503,headers:{'Cache-Control':'no-store'}});}}
