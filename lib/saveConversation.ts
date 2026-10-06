import type { ChatTurn } from './ai';
/** Only the current exchange is submitted; the server independently checks saved consent. */
export async function saveConversation(turns:ChatTurn[]) {
 const question=turns.find(t=>t.role==='user')?.text;
 const answer=turns.find(t=>t.role==='assistant')?.text;
 if(!question||!answer)return;
 // Check consent first: do not upload the exchange when storage is off.
 try{const status=await fetch('/api/customer?consent=1',{cache:'no-store'});if(!status.ok)return;
 const data=await status.json();if(!data.customer?.consent.history)return;
 const result=await fetch('/api/customer',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:crypto.randomUUID(),question:question.slice(0,1000),answer:answer.slice(0,6000)})});
 if(!result.ok)window.dispatchEvent(new Event('aadhi-save-failed'));
 }catch{window.dispatchEvent(new Event('aadhi-save-failed'));}
}
