import {
  KieKeyStatus,
  ImageModelConfig,
  VideoModelConfig,
  PromptOptions,
  GeneratedPromptItem,
  GenerationTask,
  ImageGenerationBatch,
  SeamlessLoopPromptResult,
} from '../types';



// Persist the user's Kie.ai key locally so it can be restored after closing
// Chrome, reopening the app, or switching tabs. The key is only used to
// re-establish the server-side session; it is never sent to any third party
// other than the app's own /api/kie/key endpoint.
const KIE_API_KEY_STORAGE = 'kiegen_kie_api_key_v1';

export function getStoredKieApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const value = window.localStorage.getItem(KIE_API_KEY_STORAGE);
    return value && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}

export function storeKieApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KIE_API_KEY_STORAGE, apiKey.trim());
  } catch {
    // Storage may be unavailable in restricted/private browser contexts.
  }
}

export function clearStoredKieApiKey(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(KIE_API_KEY_STORAGE);
  } catch {
    // Ignore storage cleanup errors.
  }
}

function getApiBaseCandidates(): string[] {
  const candidates = ['/api'];

  // AI Studio previews can expose the app under a nested URL. Generate several
  // standards-compliant relative candidates instead of assuming pathname is the
  // deployment root. The first successful JSON endpoint wins.
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname || '/';
    const trimmed = pathname.replace(/\/+$/, '');
    const parentPath = trimmed.includes('/') ? trimmed.slice(0, trimmed.lastIndexOf('/')) : '';

    const relativeCandidates = [
      new URL('./api', window.location.href).pathname,
      new URL('../api', window.location.href).pathname,
    ];

    if (trimmed) {
      relativeCandidates.push(`${trimmed}/api`);
      if (parentPath) relativeCandidates.push(`${parentPath}/api`);
    }

    for (const candidate of relativeCandidates) {
      if (candidate && candidate !== '/api') candidates.push(candidate.replace(/\/+$/, ''));
    }
  }

  return [...new Set(candidates)];
}

function apiUrl(path: string, base: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

async function fetchApi(path: string, init?: RequestInit): Promise<Response> {
  const bases = getApiBaseCandidates();
  const storedKey = getStoredKieApiKey();
  const requestHeaders = new Headers(init?.headers || {});
  if (storedKey && !requestHeaders.has('X-Kie-Api-Key')) {
    requestHeaders.set('X-Kie-Api-Key', storedKey);
  }
  let lastResponse: Response | null = null;

  for (let i = 0; i < bases.length; i += 1) {
    const base = bases[i];
    const res = await fetch(apiUrl(path, base), { ...init, headers: requestHeaders });
    lastResponse = res;

    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const looksLikeHtml = contentType.includes('text/html') || contentType.includes('application/xhtml');
    const likelyMissingRoute = res.status === 404;
    const hasFallback = i < bases.length - 1;

    // If the first candidate returns the AI Studio HTML shell (often HTTP 200)
    // or a 404, retry against the nested application path before failing.
    if ((looksLikeHtml || likelyMissingRoute) && hasFallback) {
      continue;
    }

    return res;
  }

  return lastResponse as Response;
}

async function readApiResponse<T = any>(res: Response, fallbackMessage: string): Promise<T> {
  const raw = await res.text();
  const contentType = (res.headers.get('content-type') || '').toLowerCase();
  let data: any = null;

  if (!raw.trim()) {
    const detail = `HTTP ${res.status}${res.statusText ? ` ${res.statusText}` : ''}`;
    throw new Error(`${fallbackMessage}: server returned an empty response (${detail}). Check the Vercel API function route and deployment logs.`);
  }

  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      const looksLikeHtml = contentType.includes('text/html') || /^\s*<!doctype html/i.test(raw) || /^\s*<html/i.test(raw);
      if (looksLikeHtml) {
        throw new Error(
          `API endpoint returned HTML instead of JSON (HTTP ${res.status}). The requested KieGen backend route did not return JSON. Check the Vercel API function routing and deployment logs.`
        );
      }
      throw new Error(`API returned an invalid response (HTTP ${res.status}). ${raw.slice(0, 180)}`);
    }
  }

  if (!res.ok) {
    throw new Error(data?.message || data?.error || fallbackMessage);
  }

  return data as T;
}


export async function fetchKieStatus(): Promise<KieKeyStatus> {
  try {
    const res = await fetchApi('/kie/status');
    return await readApiResponse<KieKeyStatus>(res, 'Failed to fetch Kie.ai status');
  } catch (err) {
    console.error('Error checking Kie.ai status:', err);
    return { connected: false };
  }
}

export async function saveKieKey(apiKey: string): Promise<{ success: boolean; maskedKey?: string; message?: string }> {
  try {
    const res = await fetchApi('/kie/key', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey }),
    });
    const data = await readApiResponse<any>(res, 'Failed to save API key');
    if (!data || typeof data !== 'object') {
      throw new Error('The server returned an empty response. Check the Vercel API deployment and function logs.');
    }
    if (data?.success) storeKieApiKey(apiKey);
    return data;
  } catch (err: any) {
    return { success: false, message: err.message || 'Kie.ai API Key is invalid or not connected.' };
  }
}

export async function disconnectKieKey(): Promise<boolean> {
  try {
    const res = await fetchApi('/kie/key', { method: 'DELETE' });
    if (res.ok) clearStoredKieApiKey();
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchKieCredit(): Promise<{
  success: boolean;
  balance?: number;
  lastChecked?: string;
  error?: string;
  warning?: string;
}> {
  try {
    const res = await fetchApi('/kie/credit');
    const data = await readApiResponse<any>(res, 'Unable to check Kie.ai balance');
    if (!res.ok || !data?.success) {
      return {
        success: false,
        error: data.error || 'Unable to check Kie.ai balance',
      };
    }
    return data;
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Unable to check Kie.ai balance. Verify the Vercel API function and Kie.ai response.',
    };
  }
}

export async function fetchImageModels(): Promise<ImageModelConfig[]> {
  try {
    const res = await fetchApi('/models/image');
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Using local image models catalog fallback:', err);
  }
  const { KIE_IMAGE_MODELS } = await import('../data/modelCatalog');
  return KIE_IMAGE_MODELS;
}

export async function fetchVideoModels(): Promise<VideoModelConfig[]> {
  try {
    const res = await fetchApi('/models/video');
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Using local video models catalog fallback:', err);
  }
  const { KIE_VIDEO_MODELS } = await import('../data/modelCatalog');
  return KIE_VIDEO_MODELS;
}

export async function analyzeReference(params: {
  chatModel: string;
  referenceImageData: string;
  referenceImageName?: string;
}): Promise<import('../types').ReferenceAnalysis> {
  const res = await fetchApi('/analyze-reference', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return await readApiResponse<import('../types').ReferenceAnalysis>(res, 'Reference image analysis failed');
}

export async function requestSpaDecorationPrompt(params: {
  chatModel: string; referenceImageData: string; referenceImageName?: string;
  referenceAnalysis: import('../types').ReferenceAnalysis; selectedFlowers: string[]; flowerColor: string;
  selectedPlacements: string[]; selectedDecor: string[]; quantity: string; arrangement: string; customNotes?: string;
}): Promise<{ prompts: string[] }> {
  const res = await fetchApi('/generate-spa-decoration-prompt', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(params),
  });
  return await readApiResponse<{ prompts: string[] }>(res, 'Failed to generate spa decoration prompt.');
}

export async function requestPrompts(options: PromptOptions): Promise<GeneratedPromptItem[]> {
  const res = await fetchApi('/generate-prompts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Failed to generate prompts');
  }
  return await res.json();
}

export async function requestImageGeneration(params: {
  modelId: string;
  prompt: string;
  aspectRatio: string;
  quality?: string;
  count?: number;
}): Promise<ImageGenerationBatch> {
  const res = await fetchApi('/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'The generation task failed. Please try again or select another model.');
  }
  return data;
}

export async function pollTaskStatus(taskId: string): Promise<GenerationTask> {
  // Use the already-proven Kie status endpoint as the first compatibility path.
  // Some AI Studio preview proxies return the SPA HTML shell for newer nested
  // routes even though existing /api/kie/* endpoints are active.
  const encoded = encodeURIComponent(taskId);
  const routeCandidates = [
    `/kie/status?taskId=${encoded}`,
    `/kie-video-status/${encoded}`,
    `/kie/video/status/${encoded}`,
    `/task-status/${encoded}`,
  ];
  let lastResponse: Response | null = null;

  for (const route of routeCandidates) {
    const res = await fetchApi(route, { headers: { 'Accept': 'application/json' } });
    lastResponse = res;
    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const raw = await res.clone().text();
    const looksLikeHtml = contentType.includes('text/html') || /^\s*<!doctype html/i.test(raw) || /^\s*<html/i.test(raw);
    if ((looksLikeHtml || res.status === 404) && route !== routeCandidates[routeCandidates.length - 1]) continue;
    return await readApiResponse<GenerationTask>(res, 'Failed to retrieve task status.');
  }

  return await readApiResponse<GenerationTask>(lastResponse as Response, 'Failed to retrieve task status.');
}

export async function requestSeamlessLoopPrompt(imageUrl: string, existingPrompt?: string): Promise<SeamlessLoopPromptResult> {
  const res = await fetchApi('/seamless-loop-prompt', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl, existingPrompt }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Failed to analyze image for seamless loop prompt.');
  }
  return data;
}

export async function requestVideoGeneration(params: {
  modelId: string;
  imageUrl: string;
  prompt: string;
  duration: number;
  resolution: string;
  aspectRatio: string;
  loopMode?: boolean;
  motionStrength?: number;
}): Promise<GenerationTask> {
  // AI Studio preview is known to proxy the existing /api/generate-image route.
  // It dispatches generationType='video' to the real server-side video handler.
  // Try this known route first; dedicated aliases are fallback only.
  // First verify that the Express backend is reachable. A static AI Studio
  // preview can return index.html with HTTP 200 for unknown /api/* requests;
  // that is not a successful API response and must not be mistaken for KIE.
  const healthResponse = await fetchApi('/health', { headers: { 'Accept': 'application/json' } });
  const healthType = (healthResponse.headers.get('content-type') || '').toLowerCase();
  const healthText = await healthResponse.clone().text();
  const healthIsHtml = healthType.includes('text/html') || /^\s*<!doctype html/i.test(healthText) || /^\s*<html/i.test(healthText);
  if (!healthResponse.ok || healthIsHtml) {
    throw new Error(
      'KieGen backend is not reachable from this Google AI Studio Build preview. The /api/health request did not return JSON, so the app cannot securely submit a video task to KIE AI. Run/deploy the Express backend with this project; changing video endpoint aliases alone will not fix this.'
    );
  }

  const routeCandidates = [
    '/generate-image',
    '/kie-video-generate',
    '/generate-video',
    '/kie-video/generate',
    '/kie/video/generate',
  ];

  let lastResponse: Response | null = null;
  for (const route of routeCandidates) {
    const res = await fetchApi(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ ...params, generationType: 'video' }),
    });
    lastResponse = res;

    const contentType = (res.headers.get('content-type') || '').toLowerCase();
    const raw = await res.clone().text();
    const looksLikeHtml = contentType.includes('text/html') || /^\s*<!doctype html/i.test(raw) || /^\s*<html/i.test(raw);

    if ((looksLikeHtml || res.status === 404) && route !== routeCandidates[routeCandidates.length - 1]) {
      continue;
    }

    return await readApiResponse<GenerationTask>(
      res,
      'The video generation task failed. Please try again or select another model.'
    );
  }

  return await readApiResponse<GenerationTask>(
    lastResponse as Response,
    'The KieGen Image-to-Video backend route is unavailable in the current AI Studio runtime.'
  );
}
