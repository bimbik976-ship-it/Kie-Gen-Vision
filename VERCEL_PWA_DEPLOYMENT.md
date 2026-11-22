# Vercel Deployment & PWA Installation

## Before deploying

- Use Node.js 20 or newer.
- Keep the project root structure intact, especially `api/`, `src/`, `public/`, `server.ts`, `package.json`, and `vercel.json`.
- In Vercel Project → Settings → Environment Variables, add `KIE_AI_API_KEY` with your Kie.ai API key for Production (and Preview if needed). This is strongly recommended for serverless reliability: a key entered only into an in-memory server session may not survive a cold start or be shared by separate serverless instances.
- Never add the key to `VITE_*` variables or frontend source files.

## Deploy from GitHub

1. Extract `KieGen-Creative-Studio-Spa-Analyzer-PWA.zip`.
2. Create or open the GitHub repository connected to the existing Vercel project.
3. Upload/replace the project files at the repository root. Do not upload the ZIP itself as the only repository file.
4. Commit and push to the connected branch.
5. In Vercel, verify Framework Preset = Vite, Build Command = `npm run build`, Output Directory = `dist`.
6. Add `KIE_AI_API_KEY` in Environment Variables, then redeploy.
7. Test `/api/health`, API key status, image analysis, and prompt generation on the deployed URL.

## Install on Android

1. Open the deployed HTTPS URL in Chrome.
2. Open the Chrome menu (⋮).
3. Choose **Install app** or **Add to Home screen**.
4. Confirm **Install** / **Add**. KieGen Creative Studio will appear on the home screen and launch in standalone app mode.

## Install on iPhone/iPad

1. Open the deployed HTTPS URL in Safari.
2. Tap **Share**.
3. Choose **Add to Home Screen** and confirm.

## Install on desktop

In Chrome or Edge, open the deployed URL and select the install icon in the address bar, or use the browser menu → **Install KieGen Creative Studio**.

The service worker caches the app shell only. API requests are never cached; live Kie.ai features require an internet connection.
