import {timingSafeEqual} from 'node:crypto';
export function bearerMatches(req:Request,secret:string|undefined){
 const a=Buffer.from(req.headers.get('authorization')??'');const b=Buffer.from(`Bearer ${secret??''}`);
 return !!secret&&a.length===b.length&&timingSafeEqual(a,b);
}
