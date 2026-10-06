import { requireAuth, sameOrigin } from '@/lib/server/auth';
import { rateLimited } from '@/lib/server/rateLimit';
export async function POST(req: Request) {
 if(!sameOrigin(req))return Response.json({error:'ORIGIN'},{status:403});
 const denied=await requireAuth();if(denied)return denied;
 if(rateLimited(req,'eleven-conversation',5))return Response.json({error:'LIMIT'},{status:429});
 const key=process.env.ELEVENLABS_API_KEY,agent=process.env.ELEVENLABS_AGENT_ID;
 if(!key||!agent)return Response.json({error:'SETUP_REQUIRED'},{status:503});
 try {
 const res=await fetch(`https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${encodeURIComponent(agent)}`,{headers:{'xi-api-key':key},cache:'no-store',signal:AbortSignal.timeout(15000)});
 if(!res.ok)throw Error();const data=await res.json();
 if(typeof data.signed_url!=='string')throw Error();
 return Response.json({signedUrl:data.signed_url},{headers:{'Cache-Control':'no-store'}});
 }catch{return Response.json({error:'UNAVAILABLE'},{status:503});}
}
