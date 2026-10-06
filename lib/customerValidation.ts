export function parseCustomerProfile(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid profile');
  const p=value as Record<string,unknown>;
  function text(key:string,max:number){const v=p[key];if(typeof v!=='string'||v.length>max)throw new Error('Invalid '+key);return v.trim();}
  const age=p.age;
  if(age!==null&&!['girl','18','30','40','50'].includes(String(age)))throw new Error('Invalid age');
  if(!['mr','hi','en'].includes(String(p.language))||!['text','voice','both'].includes(String(p.answerMode)))throw new Error('Invalid preferences');
  return {name:text('name',80),taluka:text('taluka',80),age:age as string|null,language:p.language as string,answerMode:p.answerMode as string};
}
export function parseSavedTurn(value:unknown){
 if(!value||typeof value!=='object')throw new Error('Invalid conversation');
 const p=value as Record<string,unknown>;
 if(typeof p.id!=='string'||! /^[a-zA-Z0-9-]{8,64}$/.test(p.id))throw new Error('Invalid id');
 if(typeof p.question!=='string'||!p.question.trim()||p.question.length>1000||typeof p.answer!=='string'||!p.answer.trim()||p.answer.length>6000)throw new Error('Invalid conversation');
 return {id:p.id,question:p.question.trim(),answer:p.answer.trim(),savedAt:new Date()};
}
