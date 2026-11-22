function sendJson(res: any, status: number, payload: unknown) {
  res.statusCode = status; res.setHeader('Content-Type', 'application/json; charset=utf-8'); res.setHeader('Cache-Control', 'no-store'); res.end(JSON.stringify(payload));
}
function maskKey(key: string) { return key.length <= 8 ? '••••••••••••••••' : `${key.slice(0, 3)}••••••••••••${key.slice(-3)}`; }
// The browser stores the key locally and sends it only to same-origin API functions.
export default function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const apiKey = typeof req.body?.apiKey === 'string' ? req.body.apiKey.trim() : '';
    if (apiKey.length < 6) return sendJson(res, 400, { success: false, message: 'Kie.ai API Key is required and appears invalid.' });
    return sendJson(res, 200, { success: true, maskedKey: maskKey(apiKey), message: 'Kie.ai API Key accepted by the application.' });
  }
  if (req.method === 'DELETE') return sendJson(res, 200, { success: true, message: 'Kie.ai API key disconnected in this browser.' });
  res.setHeader('Allow', 'POST, DELETE'); return sendJson(res, 405, { success: false, message: 'Method not allowed.' });
}
