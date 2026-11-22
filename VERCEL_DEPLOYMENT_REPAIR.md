# Vercel deployment repair notes

This package uses the application files at the repository root. Do not set the Vercel Root Directory to a nested folder.

## Changes in this repair

- Added explicit Vercel functions for `/api/health`, `/api/kie/key`, `/api/kie/status`, and `/api/kie/credit` so these critical endpoints do not depend on the catch-all Express function.
- Added explicit function entry points for Spa Analyzer image analysis and decoration-prompt generation while retaining the existing Express route implementation.
- Kept the catch-all Express API function for the rest of the existing application routes.
- Simplified the Vercel SPA fallback rewrite and declared function durations explicitly.
- Removed duplicate nested project copies (`kiefix` and `kiegen_redesign`) from this clean package. The root application is the canonical project.
- Removed the empty `bun.lock` (0 bytes) so Vercel does not mistake this npm project for a Bun-locked project.
- Compressed Spa Analyzer reference images in the browser before sending them to Vercel, reducing the risk of exceeding serverless request-body limits.
- Kept Royal Sapphire styling and the existing Prompt Generator / Spa Analyzer workflow. The Image Generator tab remains absent from navigation.

## Vercel settings

- Root Directory: `./`
- Framework: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 20 or newer

`KIE_AI_API_KEY` is optional if the user enters their key through the in-app API Key Manager. If configured as an environment variable, add it only in Vercel Project Settings, never in GitHub source files.

## Verification performed

- ZIP integrity checked after packaging.
- TypeScript/TSX transpile syntax check passed for all source files.
- `package.json`, `tsconfig.json`, and `vercel.json` parsed successfully.
- A full production build and live Kie.ai/Vercel test could not be completed in this environment because dependency installation timed out. Verify the Vercel build logs and test `/api/health` after deployment.
