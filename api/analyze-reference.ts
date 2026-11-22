import app from '../server';

/** Normalize the Vercel function URL before forwarding to the shared Express app. */
export default function handler(req: any, res: any) {
  const queryIndex = typeof req.url === 'string' ? req.url.indexOf('?') : -1;
  const query = queryIndex >= 0 ? req.url.slice(queryIndex) : '';
  req.url = `/api/analyze-reference${query}`;
  return app(req, res);
}
