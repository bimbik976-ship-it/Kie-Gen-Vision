# KieGen Creative Studio — Royal Sapphire Update

## Included changes

- Reworked the shared application shell and navigation for narrow Android screens and installed PWA mode.
- Applied the Royal Sapphire palette: sapphire navy, royal blue, and ice blue across the existing modules.
- Added compact mobile navigation and API-key/balance controls that reflow instead of forcing a wide desktop header.
- Added responsive single-column form behavior, safe-area spacing, and a mobile service-worker cache version bump.
- Improved API URL fallback for nested Google AI Studio preview paths.
- Changed Spa Decor Analyzer response handling to parse JSON safely and show a clear diagnostic when an HTML page is returned instead of API JSON.
- Added supported-image MIME and payload-size validation to `/api/analyze-reference`.
- Preserved a true zero-basin result in visual analysis and corrected an existing scene-details type fallback.
- Excluded archived nested `kiefix/` and `kiegen_redesign/` copies from the root TypeScript project; the deployable app remains the root project.

## Important validation status

The ZIP archive is structurally validated. A full dependency install/build could not be completed in this environment because `npm install` timed out. The TypeScript check was therefore blocked by unavailable dependencies; no successful production build or live Kie.ai request is claimed.

After importing this ZIP, run the app preview and check `/api/health`. It must return JSON (`success: true`). Then test API Key connection, Spa Decor Analyzer analysis, prompt generation, Prompt Generator, Image Generator, and PWA installation on Android.
