import { getJSON, setJSON } from './store';
export type SupportPresence = { available: boolean; until: number };
export async function supportAvailable() {
 const p=await getJSON<SupportPresence>('wati:support:presence');
 return !!p?.available && p.until>Date.now();
}
export async function setSupportPresence(available:boolean) {
 await setJSON('wati:support:presence',{available,until:Date.now()+15*60*1000},15*60);
}
