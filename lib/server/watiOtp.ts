/** WATI must have an approved authentication template with a copy-code button. */
export async function sendOtp(phone:string,code:string){
 const base=(process.env.WATI_API_URL||'https://live-mt-server.wati.io').replace(/\/+$/,'');
 const template=process.env.WATI_OTP_TEMPLATE;if(!template||!process.env.WATI_API_TOKEN)return false;
 const names=(process.env.WATI_OTP_PARAMETERS||'otp').split(',').map(s=>s.trim()).filter(Boolean);
 const res=await fetch(`${base}/api/ext/v3/messageTemplates/send`,{method:'POST',signal:AbortSignal.timeout(15000),cache:'no-store',headers:{Authorization:`Bearer ${process.env.WATI_API_TOKEN.replace(/^Bearer\s+/i,'')}`,'Content-Type':'application/json'},body:JSON.stringify({template_name:template,broadcast_name:'aadhi-login',channel:process.env.WATI_CHANNEL||null,recipients:[{phone_number:phone,custom_params:names.map(name=>({name,value:code}))}]})});
 if(!res.ok)return false;const data=await res.json().catch(()=>null);return !!data&&data.result!==false;
}
