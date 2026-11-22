function sendJson(res: any, status: number, payload: unknown) { res.statusCode=status; res.setHeader('Content-Type','application/json; charset=utf-8'); res.setHeader('Cache-Control','no-store'); res.end(JSON.stringify(payload)); }
function maskKey(key: string) { return key.length <= 8 ? '••••••••••••••••' : `${key.slice(0,3)}••••••••••••${key.slice(-3)}`; }
export default function handler(req: any, res: any) {
  if(req.method!=='GET'){res.setHeader('Allow','GET');return sendJson(res,405,{success:false,message:'Method not allowed.'});}
  const h=req.headers?.['x-kie-api-key']; const key=String(Array.isArray(h)?h[0]:h||process.env.KIE_AI_API_KEY||'').trim();
  return sendJson(res,200,{connected:Boolean(key),maskedKey:key?maskKey(key):null,source:process.env.KIE_AI_API_KEY&&key===process.env.KIE_AI_API_KEY.trim()?'env':'user'});
}
