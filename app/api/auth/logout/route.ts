import {sameOrigin,signOut} from '@/lib/server/auth';
export async function POST(req:Request){if(!sameOrigin(req))return Response.json({error:'ORIGIN'},{status:403});try{await signOut();return Response.json({signedOut:true});}catch{return Response.json({error:'UNAVAILABLE'},{status:503});}}
