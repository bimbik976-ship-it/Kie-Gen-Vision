function sendJson(res: any, status: number, payload: unknown) { res.statusCode=status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.setHeader('Cache-Control','no-store'); res.end(JSON.stringify(payload)); }
export default async function handler(req: any,res: any) {
 if(req.method!=='GET'){res.setHeader('Allow','GET');return sendJson(res,405,{success:false,error:'Method not allowed.'});}
 const h=req.headers?.['x-kie-api-key']; const key=String(Array.isArray(h)?h[0]:h||process.env.KIE_AI_API_KEY||'').trim();
 if(!key)return sendJson(res,401,{success:false,error:'Kie.ai API Key is not connected. Save your key and try again.'});
 try {
  const upstream=await fetch('https://api.kie.ai/api/v1/chat/credit',{method:'GET',headers:{Authorization:`Bearer ${key}`,Accept:'application/json'},signal:AbortSignal.timeout(15000)});
  const raw=await upstream.text(); let data:any=null; try{data=raw?JSON.parse(raw):null;}catch{}
  if(upstream.status===401||upstream.status===403)return sendJson(res,401,{success:false,error:'Kie.ai rejected this API Key. Check the key in your Kie.ai account.'});
  if(!upstream.ok){const msg=String(data?.msg||data?.message||raw||'');if(upstream.status===402||/insufficient|credit/i.test(msg))return sendJson(res,402,{success:false,error:'Insufficient Kie.ai Credits.'});return sendJson(res,502,{success:false,error:`Kie.ai credit service returned HTTP ${upstream.status}.`});}
  if(!data||typeof data!=='object')return sendJson(res,502,{success:false,error:'Kie.ai returned an empty or non-JSON balance response.'});
  if(data.code!==undefined&&data.code!==0&&data.code!==200)return sendJson(res,502,{success:false,error:String(data.msg||data.message||'Kie.ai could not verify the balance.')});
  const n=data.data; const balance=typeof n==='number'||typeof n==='string'?n:n&&typeof n==='object'?(n.credit??n.balance??n.credits??n.amount??n.total_credit):(data.credit??data.balance??data.credits??data.amount);
  if(balance===undefined||balance===null||!Number.isFinite(Number(balance)))return sendJson(res,502,{success:false,error:'Kie.ai response did not contain a readable credit balance.'});
  const numeric=Number(balance);return sendJson(res,200,{success:true,balance:numeric,lastChecked:new Date().toLocaleString('en-US',{year:'numeric',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}),warning:numeric<=0?'Insufficient Kie.ai Credits.':null});
 }catch(e:any){console.error('Kie.ai credit check failed:',e?.message||'Unknown error');return sendJson(res,502,{success:false,error:'Could not reach Kie.ai credit service. Please retry.'});}
}
