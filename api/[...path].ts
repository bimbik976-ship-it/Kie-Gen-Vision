import app from '../server';

/**
 * Vercel catch-all functions can expose the route suffix without the `/api`
 * prefix to the imported Express application. Restore the prefix before
 * Express route matching so `/api/*` handlers are reached instead of the
 * default HTML 404 response.
 */
export default function handler(req: any, res: any) {
  const originalUrl = typeof req.url === 'string' && req.url ? req.url : '/';
  const queryIndex = originalUrl.indexOf('?');
  const pathname = queryIndex >= 0 ? originalUrl.slice(0, queryIndex) : originalUrl;
  const query = queryIndex >= 0 ? originalUrl.slice(queryIndex) : '';

  if (pathname === '/api' || pathname.startsWith('/api/')) {
    req.url = `${pathname}${query}`;
  } else {
    const suffix = pathname === '/' ? '' : pathname;
    req.url = `/api${suffix}${query}`;
  }

  return app(req, res);
}
