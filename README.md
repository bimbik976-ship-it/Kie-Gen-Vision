# KieGen Creative Studio

## Royal Sapphire UI + API routing update

- The application theme is Royal Sapphire (sapphire navy, royal blue, and ice blue) with a responsive mobile-first layout for Android/PWA screens.
- The top navigation and API-key controls reflow for narrow screens; cards, forms, selectors, and image previews use a single-column mobile layout with no intentional horizontal overflow.
- The Spa Decor Analyzer API client now tries the app-local, parent, and origin API paths, retries after HTML/404 responses, and reports an actionable JSON-vs-HTML route error instead of exposing a raw JSON parse exception.
- The analyzer endpoint validates supported image data URLs and payload size before forwarding to Kie.ai.
- The service worker cache was bumped so installed PWAs can fetch the updated app shell.



KieGen Creative Studio is a Vite + React application with an Express API backend for Kie.ai. The Image → Video Generator tab has been replaced by **AI Spa Decoration Analyzer**.

## New Spa Decoration workflow

1. Upload a JPG, PNG, or WebP reference image (up to 10 MB).
2. The selected Kie.ai chat model analyzes the scene, camera, lighting, composition, and visible decorations. This stage returns analysis only and does not generate an image prompt.
3. Select one or more flowers from the expanded flower catalog, flower color, quantity, and arrangement.
4. Select flower placement locations, including **On Zen Stones** and **On Spa Towels**, as well as water, basin, candles, oil bottles, bamboo platform, tray, fountain, and other placements.
5. Select supporting spa decorations such as spa towels, aromatherapy oil bottles, zen stones, candles, bamboo water feature, and tray.
6. Press **Generate Spa Decoration Prompts**. The app then creates three prompt variations through Kie.ai.

The prompt-generation endpoint validates that analysis exists and, when flowers are selected, that at least one placement is selected. The Kie.ai API key remains server-side.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
cp .env.example .env
npm run dev
```

Connect the Kie.ai API key through the app's API Key Manager. Alternatively, set `KIE_AI_API_KEY` in `.env` for a server-side default.

## Build

```bash
npm run build
npm run start
```

## Deploy online with Vercel

This project includes `vercel.json` and a Vercel serverless Express entry at `api/[...path].ts`.

1. Extract the ZIP on your computer.
2. Push the extracted project to a GitHub repository (keep the `api`, `src`, `public`, `server.ts`, `package.json`, and `vercel.json` files at the repository root).
3. In Vercel, choose **Add New → Project**, import that GitHub repository, and keep the detected Vite framework settings.
4. Set Node.js to 20.x or newer in Project Settings if Vercel asks.
5. Add the Environment Variable `KIE_AI_API_KEY` for reliable production use. A key entered in the app UI is stored in this browser and sent to the same-origin API as a request header for each operation; it is not stored in shared server memory.
6. Deploy. After a successful deployment, open `/api/health` and confirm it returns JSON with `success: true`; then test API Key connection, Spa Decor Analyzer image analysis, and prompt generation. If `/api/health` shows the application HTML instead of JSON, inspect the Vercel Function logs and API routing before testing Kie.ai.
7. For future updates, push commits to the connected GitHub branch; Vercel will redeploy automatically.

Do not put a Kie.ai API key in frontend source code, `VITE_` variables, or public files.

## Install as an app (PWA)

The project includes a web app manifest, icons, and a service worker. After deploying to HTTPS:

- Android Chrome: open the deployed URL → browser menu (⋮) → **Install app** or **Add to Home screen**.
- iPhone/iPad Safari: open the deployed URL → Share → **Add to Home Screen**.
- Desktop Chrome/Edge: use the install icon in the address bar or browser menu → **Install KieGen Creative Studio**.

The service worker caches the app shell only; `/api/` requests are always sent to the live server and are not cached. An internet connection is required for Kie.ai analysis and prompt generation.

## Existing modules

Prompt Generator, Spa Decor Analyzer, Kie.ai API Key Manager, and seamless-loop prompt analysis remain available. The Image Generator menu and its prompt handoff controls are removed from the visible workflow.
