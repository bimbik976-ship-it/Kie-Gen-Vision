import { PromptOptions, GeneratedPromptItem, ReferenceAnalysis } from '../types';

export class KieChatError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.name = 'KieChatError';
    this.statusCode = statusCode;
  }
}

async function uploadReferenceImageToKie(apiKey: string, dataUrl: string, fileName?: string): Promise<string> {
  if (!/^data:image\/(jpeg|png|webp);base64,/i.test(dataUrl)) {
    throw new KieChatError('Reference image must be a JPG, PNG, or WebP data URL.', 400);
  }

  const response = await fetch('https://kieai.redpandaai.co/api/file-base64-upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey.trim()}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      base64Data: dataUrl,
      uploadPath: 'images/prompt-generator-reference',
      fileName: fileName || `reference-${Date.now()}.png`,
    }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok || !data?.success) {
    const msg = data?.msg || data?.message || data?.error?.message || `Reference image upload failed (HTTP ${response.status}).`;
    if (response.status === 401 || response.status === 403) {
      throw new KieChatError('Invalid Kie.ai API Key', 401);
    }
    throw new KieChatError(msg, response.status || 502);
  }

  const url = data?.data?.downloadUrl || data?.data?.fileUrl || data?.data?.url;
  if (!url || typeof url !== 'string') {
    throw new KieChatError('Kie.ai did not return a usable reference image URL.', 502);
  }
  return url;
}

function parseReferenceJson(raw: string): any | null {
  const text = String(raw || '').trim();
  if (!text) return null;
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidates = [fenced?.[1]?.trim(), text];
  for (const candidate of candidates) {
    if (!candidate) continue;
    try { return JSON.parse(candidate); } catch {}
    const start = candidate.indexOf('{');
    const end = candidate.lastIndexOf('}');
    if (start >= 0 && end > start) {
      try { return JSON.parse(candidate.slice(start, end + 1)); } catch {}
    }
  }
  return null;
}

export async function analyzeReferenceImage(
  apiKey: string,
  modelId: string,
  dataUrl: string,
  fileName?: string,
  suppliedReferenceImageUrl?: string
): Promise<ReferenceAnalysis> {
  // AI Studio preview URLs are not reliably reachable by Kie.ai. Use the provider
  // upload first, then fall back to a data URL, then the temporary app URL.
  const candidates: string[] = [];
  try {
    candidates.push(await uploadReferenceImageToKie(apiKey, dataUrl, fileName));
  } catch (uploadErr) {
    // Kie file upload can be unavailable in some deployments; continue with data URL.
  }
  candidates.push(dataUrl);
  if (suppliedReferenceImageUrl) candidates.push(suppliedReferenceImageUrl);

  let response: Response | null = null;
  let lastErrorText = '';
  for (const referenceImageUrl of candidates) {
    try {
      const candidateResponse = await fetch('https://api.kie.ai/codex/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      stream: false,
      input: [{
        role: 'user',
        content: [
          {
            type: 'input_text',
            text: `Analyze the uploaded image as a STRICT visual reference for a spa water-garden image generator. Return ONLY valid JSON. Do not invent objects that are not visibly present. Count every visible basin and identify its exact arrangement, size relationship, tiering, overlap, and placement. Count every visible decoration and identify its exact type and position, especially candles, spa towels, oil bottles, lanterns, flowers, stones, and butterflies. If a butterfly is visibly present, include it as a butterfly item with its actual count and position; if none is visible, do not add one. Analyze the actual camera perspective, not just framing: camera height relative to basin, horizontal orientation, left/right rotation, pitch, whether frontal/three-quarter/side/overhead, and shot distance.

Return exactly this shape:
{
  "background":"short visual description",
  "mood":"short visual mood",
  "suasana":"time/weather/illumination description",
  "kategori":"scene category",
  "dekorasi":"short canonical decoration summary",
  "flower":"visible flower/vegetation type or None visible",
  "basin":"None visible if no basin is visibly present; otherwise describe the visible basin(s)",
  "basinPresence":"present, absent, or uncertain",
  "bamboo":"visible bamboo feature or Tidak memakai bamboo",
  "basinCount":0,
  "basinArrangement":"exact spatial arrangement and stacking/order",
  "basinDetails":"shape, material, dimensions relationship, levels and overlap",
  "decorationItems":[{"name":"item","count":1,"position":"precise relative position"}],
  "decorationPlacement":"overall decoration placement relationship to the basins",
  "cameraAngle":"precise photographic perspective including viewpoint and rotation",
  "cameraFraming":"precise shot distance/framing",
  "cameraHeight":"precise camera height relative to basins",
  "cameraOrientation":"precise front/three-quarter/side direction and left/right orientation",
  "composition":"precise foreground-midground-background spatial layout"
}

BASIN DETECTION IS CRITICAL: Inspect the uploaded image itself before describing any basin. A basin means a distinct physical bowl, basin, or vessel with a visible rim/container. Do NOT count a pond, flat water surface, pool, fountain outlet, bamboo spout, stone platform, or water feature without a distinct basin vessel as a basin. If no distinct basin vessel is visible, return basinCount: 0, basinPresence: "absent", basin: "None visible", basinArrangement: "No basin visible", and basinDetails: "No basin vessel is visible; do not invent or add one". If visibility is genuinely obstructed, use basinPresence: "uncertain" and explain that uncertainty; do not assume a basin exists. If one or more distinct basins are visible, return basinPresence: "present" and count only those visible vessels. Never infer a basin merely because this is a spa/water-garden scene. Accuracy rules: basinCount must be the actual visible count; decorationItems must list each visible decoration type with actual count; positions must use image-relative language such as upper-left, lower-right, beside the front basin, behind the upper basin, etc. Do not normalize the scene into a generic spa. For basinArrangement and basinDetails, explicitly describe the relative size of EACH visible basin (for example largest/larger, medium, smallest/smaller), its exact tier/order, vertical/horizontal offset, overlap amount/relationship, front/back and left/right placement, and visible spacing. Never summarize different basin sizes as merely 'three stacked basins'. The cameraAngle must describe the actual view in the image.`,
          },
          { type: 'input_image', image_url: referenceImageUrl },
        ],
      }],
      reasoning: { effort: 'high' },
      }),
      });
      const candidateRaw = await candidateResponse.text();
      const candidateData = parseKieResponsesPayload(candidateRaw);
      if (candidateResponse.ok && candidateData) {
        response = new Response(JSON.stringify(candidateData), { status: candidateResponse.status });
        break;
      }
      lastErrorText = candidateData?.error?.message || candidateData?.message || candidateRaw.slice(0, 300);
    } catch (err: any) {
      lastErrorText = err?.message || 'Unable to submit reference image';
    }
  }

  if (!response) {
    throw new KieChatError(`Reference analysis failed. ${lastErrorText || 'Kie.ai could not read the uploaded image.'}`, 502);
  }
  const rawResponse = await response.text();
  const data = parseKieResponsesPayload(rawResponse);
  if (!response.ok || !data) {
    const msg = data?.error?.message || data?.message || `Reference analysis failed (HTTP ${response.status}).`;
    throw new KieChatError(msg, response.status || 502);
  }
  const raw = extractResponsesApiText(data);
  const parsed = parseReferenceJson(raw);
  if (!parsed) throw new KieChatError('Reference analysis returned invalid JSON.', 502);

  const decorationItems = Array.isArray(parsed.decorationItems)
    ? parsed.decorationItems.map((item: any) => ({
        name: String(item?.name || '').trim(),
        count: Math.max(1, Number(item?.count) || 1),
        position: String(item?.position || '').trim(),
      })).filter((item: ReferenceAnalysis['decorationItems'][number]) => item.name)
    : [];

  return {
    background: String(parsed.background || '').trim(),
    mood: String(parsed.mood || '').trim(),
    suasana: String(parsed.suasana || '').trim(),
    kategori: String(parsed.kategori || '').trim(),
    dekorasi: String(parsed.dekorasi || '').trim(),
    flower: String(parsed.flower || '').trim(),
    basin: String(parsed.basin || '').trim(),
    bamboo: String(parsed.bamboo || '').trim(),
    basinCount: Math.max(0, Number(parsed.basinCount) || 0),
    basinArrangement: String(parsed.basinArrangement || '').trim(),
    basinDetails: String(parsed.basinDetails || '').trim(),
    decorationItems,
    decorationPlacement: String(parsed.decorationPlacement || '').trim(),
    cameraAngle: String(parsed.cameraAngle || '').trim(),
    cameraFraming: String(parsed.cameraFraming || '').trim(),
    cameraHeight: String(parsed.cameraHeight || '').trim(),
    cameraOrientation: String(parsed.cameraOrientation || '').trim(),
    composition: String(parsed.composition || '').trim(),
  };
}

async function inferReferenceCameraAngle(
  apiKey: string,
  modelId: string,
  referenceImageUrl: string
): Promise<string | null> {
  const response = await fetch('https://api.kie.ai/codex/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      stream: false,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: `Analyze ONLY the camera perspective of this image. Do not describe the objects, mood, colors, or lighting. Return ONLY valid JSON in this exact shape: {"cameraAngle":"concise photographic camera perspective"}. Identify viewpoint/height, frontal or side orientation, degree of rotation, framing distance, and whether the view is overhead/top-down. Do not mention the words reference image in the value.`,
            },
            { type: 'input_image', image_url: referenceImageUrl },
          ],
        },
      ],
      reasoning: { effort: 'medium' },
    }),
  });

  const rawResponse = await response.text();
  const data = parseKieResponsesPayload(rawResponse);
  if (!response.ok || !data) return null;
  const raw = extractResponsesApiText(data);
  if (!raw) return null;

  try {
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    const jsonText = fenced?.[1]?.trim() || raw.trim();
    const parsed = JSON.parse(jsonText);
    const value = typeof parsed?.cameraAngle === 'string' ? parsed.cameraAngle.trim() : '';
    return value ? value.slice(0, 240) : null;
  } catch {
    const match = raw.match(/"cameraAngle"\s*:\s*"([^"]+)"/i);
    return match?.[1]?.trim()?.slice(0, 240) || null;
  }
}

function applyCameraAngleOverride(
  items: GeneratedPromptItem[],
  requestedCameraAngle: string,
  inferredReferenceCameraAngle?: string | null
): GeneratedPromptItem[] {
  const legacyLocked = 'Close environmental perspective, slightly above basin level, 3/4 front view, natural shallow depth of field';
  const referenceFollow = requestedCameraAngle === 'Follow Reference Image';
  const target = referenceFollow
    ? (inferredReferenceCameraAngle || legacyLocked)
    : requestedCameraAngle === 'Auto — AI Framing'
      ? null
      : requestedCameraAngle;

  if (!target) return items;

  return items.map((item) => {
    let prompt = item.prompt || '';
    const escapedLegacy = legacyLocked.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const legacyRegex = new RegExp(escapedLegacy, 'gi');
    prompt = prompt.replace(legacyRegex, target);

    if (!prompt.toLowerCase().includes(target.toLowerCase())) {
      prompt = `${prompt.trim()} Camera perspective: ${target}.`;
    }

    return {
      ...item,
      prompt,
      sceneDetails: {
        ...item.sceneDetails,
        composition: item.sceneDetails.composition,
      },
    };
  });
}

/**
 * Invokes the specified Chat Model (gpt-6-astra, gpt-5.6, or gpt-5.5)
 * through the Kie.ai API gateway to synthesize exactly 3 Text-to-Image prompts.
 *
 * Strict requirements:
 * - No silent fallback to other models.
 * - Explicit error reporting.
 * - Standalone prompt rule: No references to external images.
 * - Camera angle is controlled by the application layer; the legacy generation rules remain untouched.
 */
export async function generateSpaDecorationPrompts(
  apiKey: string,
  modelId: string,
  input: {
    referenceImageData: string;
    referenceImageName?: string;
    referenceAnalysis: ReferenceAnalysis;
    selectedFlowers: string[];
    flowerColor: string;
    selectedPlacements: string[];
    selectedDecor: string[];
    quantity: string;
    arrangement: string;
    customNotes?: string;
  }
): Promise<string[]> {
  if (!apiKey || apiKey.trim().length < 6) throw new KieChatError('Invalid Kie.ai API Key', 401);
  if (!/^data:image\/(jpeg|png|webp);base64,/i.test(input.referenceImageData)) {
    throw new KieChatError('Reference image must be a JPG, PNG, or WebP data URL.', 400);
  }
  if (input.referenceImageData.length > 15_000_000) throw new KieChatError('Reference image is too large.', 400);

  const modelMap: Record<string, string> = {
    'gpt-6-astra': 'gpt-6-astra',
    'gpt-5.6': 'gpt-5-6-sol',
    'gpt-5.5': 'gpt-5-5',
  };
  const model = modelMap[modelId] || modelMap['gpt-5.5'];
  let imageForModel = input.referenceImageData;
  try {
    imageForModel = await uploadReferenceImageToKie(apiKey, input.referenceImageData, input.referenceImageName);
  } catch {
    // The Responses endpoint can also accept a data URL if provider file upload is unavailable.
  }

  const analysis = input.referenceAnalysis;
  const flowerChoices = input.selectedFlowers.filter((flower) => flower !== 'No Flowers');
  const flowerInstruction = input.selectedFlowers.includes('No Flowers')
    ? 'Do not add flowers or petals.'
    : `Selected flowers: ${flowerChoices.join(', ')}. Color: ${input.flowerColor}. Quantity: ${input.quantity}. Arrangement: ${input.arrangement}. Exact requested placements: ${input.selectedPlacements.join(', ')}.`;
  const decorInstruction = input.selectedDecor.length
    ? `Selected supporting spa decorations to include or emphasize: ${input.selectedDecor.join(', ')}.`
    : 'Do not add non-floral decorations beyond those already visible.';
  const userNotes = input.customNotes?.trim() ? `Additional user instructions: ${input.customNotes.slice(0, 1800)}` : '';

  const instruction = `You are a senior photorealistic spa-scene art director. Create exactly THREE polished, standalone image-generation prompts that preserve the uploaded image's identity and visual composition while applying the user's selected decoration changes.

REFERENCE ANALYSIS (ground truth; do not contradict):
${JSON.stringify(analysis)}

USER DECORATION SELECTIONS:
${flowerInstruction}
${decorInstruction}
${userNotes}

STRICT VISUAL RULES:
1. Preserve the original scene's camera viewpoint, framing, perspective, background, lighting direction, overall color atmosphere, water feature, basin count, basin shape, and spatial composition. Do not redesign the scene.
2. Add or emphasize only the decorations the user selected. Place each selected flower in the requested locations. In particular, "On Zen Stones" means a flower placed directly and naturally on a visible stone; "On Spa Towels" means a flower resting on or tucked into the folds of a visible spa towel. Do not confuse these with beside the object.
3. If Spa Towels are selected, use neatly folded or rolled spa towels in a believable spa arrangement; do not invent excessive towels. If Oil Bottles are selected, use realistic small aromatherapy glass bottles. If Zen Stones are selected, use natural smooth stacked or arranged stones without changing existing stone architecture.
4. Do not remove or duplicate existing objects. Preserve exact visible basin count and existing major object positions. Add only requested decor in available negative space without obscuring focal objects.
5. Keep flower species and colors faithful to the selections. If "No Flowers" is selected, no flower, blossom, or petal may appear.
6. Keep the result photorealistic, refined, uncluttered, and suitable for a luxury spa / Japanese water-garden visual. No text, labels, logos, watermark, collage, or graphic layout.
7. Write natural descriptive prompts, not parameter lists. Each prompt must be independently usable by an image generator and must not mention analysis, JSON, or the existence of a reference image.
8. All three prompts must preserve the same scene and requested decoration placement; vary only subtle descriptive phrasing and minor photographic texture detail, not the composition or decoration plan.

Return ONLY valid JSON in this exact shape: {"prompts":["prompt 1","prompt 2","prompt 3"]}.`;

  const response = await fetch('https://api.kie.ai/codex/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey.trim()}`, 'Accept': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      input: [{ role: 'user', content: [ { type: 'input_text', text: instruction }, { type: 'input_image', image_url: imageForModel } ] }],
      reasoning: { effort: 'high' },
    }),
  });
  const rawResponse = await response.text();
  const payload = parseKieResponsesPayload(rawResponse);
  if (!response.ok || !payload) {
    const message = payload?.error?.message || payload?.message || rawResponse.slice(0, 300) || `Kie.ai request failed (${response.status}).`;
    throw new KieChatError(message, response.status || 502);
  }
  const parsed = parseReferenceJson(extractResponsesApiText(payload));
  const prompts = Array.isArray(parsed?.prompts) ? parsed.prompts.map((value: unknown) => String(value || '').trim()).filter(Boolean) : [];
  if (prompts.length !== 3) throw new KieChatError('The selected model did not return exactly three valid prompts. Please try again.', 502);
  return prompts;
}

export async function invokeKieChatModel(
  apiKey: string,
  modelId: string,
  options: PromptOptions
): Promise<GeneratedPromptItem[]> {
  if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length < 6) {
    throw new KieChatError('Invalid Kie.ai API Key', 401);
  }

  // UI IDs are stable aliases; these are the actual Kie.ai Responses API model IDs.
  // GPT-5.6 is represented by the flagship Sol tier.
  const modelMap: Record<string, { apiId: string; name: string }> = {
    'gpt-6-astra': { apiId: 'gpt-6-astra', name: 'GPT-6 Astra' },
    'gpt-5.6': { apiId: 'gpt-5-6-sol', name: 'GPT-5.6' },
    'gpt-5.5': { apiId: 'gpt-5-5', name: 'GPT-5.5' },
  };

  const selected = modelMap[modelId] || modelMap['gpt-5.5'];
  const cleanModelId = selected.apiId;
  const modelName = selected.name;

  let referenceImageUrls: string[] = [];
  if (options.referenceImageData) {
    if (options.referenceImageData.length > 15_000_000) {
      throw new KieChatError('Reference image is too large. Please use an image under 10MB.', 400);
    }
    try {
      referenceImageUrls.push(await uploadReferenceImageToKie(
        apiKey,
        options.referenceImageData,
        options.referenceImageName
      ));
    } catch {
      // Fall through to data URL / temporary URL transport.
    }
    referenceImageUrls.push(options.referenceImageData);
    if (options.referenceImageUrl) referenceImageUrls.push(options.referenceImageUrl);
  }
  referenceImageUrls = [...new Set(referenceImageUrls.filter(Boolean))];
  const referenceImageUrl = referenceImageUrls[0];

  // Reference analysis is authoritative for camera perspective when available.
  // The generation call must not reinterpret the camera independently.
  const effectiveCameraAngle = referenceImageUrl
    ? (options.referenceAnalysis?.cameraAngle
        ? `Reference — ${options.referenceAnalysis.cameraAngle}${options.referenceAnalysis.cameraFraming ? ` | ${options.referenceAnalysis.cameraFraming}` : ''}`
        : 'Follow Reference Image')
    : (options.cameraAngle || 'Auto — AI Framing');
  const inferredReferenceCameraAngle = options.referenceAnalysis?.cameraAngle || null;

  const systemPrompt = `You are an elite Japanese Zen Garden & Hydro-Aesthetic Visual Director specialized in crafting production-ready Text-to-Image prompts for advanced photorealistic diffusion models.

Your task is to generate EXACTLY 3 DISTINCT Text-to-Image prompts based on the user's category configuration.

MANDATORY ARCHITECTURAL RULES:
1. FIXED VS AUTO / REFERENCE-AWARE ENFORCEMENT:
   - Any parameter that has a specific value (NOT "Auto — AI / Reference") MUST be strictly honored in all 3 prompts, including Background, Mood, Suasana, Dekorasi, Flower, Kategori, Basin, and Bamboo.
   - When a reference image is supplied, any parameter set to "Auto — AI / Reference" or left empty MUST NOT be treated as an unrelated random choice. First infer the most appropriate Mood, Suasana, Kategori, Background, Dekorasi, Flower, Basin, Bamboo characteristics, and other relevant visual attributes directly from the reference image.
   - Use the reference-derived interpretation as the visual baseline, then create 3 meaningfully different prompts that remain recognizably connected to that baseline.
   - When there is NO reference image, parameters set to Auto MUST be intelligently resolved from the full configuration; NEVER use random parameter selection.

2. CAMERA PERSPECTIVE ENFORCEMENT:
   - Without a reference image, use the selected camera framing.
   - With a reference image, reproduce the analyzed camera perspective, height, orientation, pitch/yaw and framing as closely as possible. Do not fall back to a legacy camera angle.

3. ATMOSPHERE SEPARATION:
   - Treat "Suasana" as a distinct environmental/time/weather/illumination layer, separate from "Mood".
   - If Suasana is fixed, preserve it in all 3 prompts. If Auto, infer it intelligently from the overall configuration or reference image without randomizing it.
   - Do not let Mood override a fixed Suasana; combine them naturally.

4. STANDALONE PROMPT RULE:
   - NEVER use phrases like "reference image", "based on reference", "same as reference", "as shown in the reference", or "same composition as reference".
   - The prompts must be 100% self-contained and descriptive so any image generator can generate the image without conversation history.

5. REFERENCE IMAGE ANALYSIS — SIMILAR, NOT IDENTICAL:
   - When a reference image is supplied, analyze it before composing the prompts. Automatically understand and internally classify its Mood, Suasana, Kategori, Background character, Dekorasi, Flower/vegetation, Basin form/material, Bamboo characteristics, color relationships, lighting, materials, spatial relationships, water behavior, and other relevant visual elements.
   - If Mood, Suasana, or Kategori is Auto/empty, derive those attributes from the reference image instead of inventing an unrelated direction. The same principle applies to other Auto/empty visual controls when the reference clearly provides enough evidence.
   - The reference image is the authoritative structural blueprint when it is supplied. Do NOT change the visible object count, basin count, basin arrangement, decoration count, decoration positions, or camera perspective.
   - The 3 prompts may vary only in non-structural micro-details such as water texture, subtle surface reflections, atmospheric nuance, or material texture while preserving the exact visible structure.
   - Never invent, remove, merge, duplicate, relocate, or substitute a visible basin or decoration from the reference.
   - Never mention the reference image, image analysis, inferred attributes, or reference-based reasoning inside the final prompts.

6. SELECTED SOFT COLOR OVERRIDE:
   - When a user-selected soft color is supplied, it has higher priority than the original colors visible in the reference analysis.
   - Recolor every visible basin and every visible decorative object to the selected soft color family while preserving each object's material identity, shape, size, count, position, arrangement, and physical details.
   - Recolor a detected butterfly to the same selected soft color family while preserving its species, count, size, position, wing pattern, and silhouette.
   - Do NOT preserve, repeat, or copy the original basin/decorative-object color from the reference analysis. The original object color is explicitly overridden.
   - The selected soft color must be stated explicitly in every prompt wherever a recolored basin, decoration, or butterfly is described.
   - Do not recolor flowers, bamboo, background, water, lighting, or unrelated scene elements.
   - If a soft color is selected, never describe a recolored object with a conflicting color adjective.

7. COMPOSITION & NARRATIVE DIVERSITY:
   - Each of the 3 prompts MUST feature a different compositional framework:
     * Prompt 1: Asymmetric Rule of Thirds anchor with crisp foreground tactile textures
     * Prompt 2: Centered contemplative balance with serene water reflections
     * Prompt 3: Dynamic diagonal hydro-flow or sheltered alcove depth
   - DO NOT use repetitive sentence structures or prompt templates. Write 3 rich, naturally flowing photographic descriptions.

8. HYDRO-AESTHETIC & MATERIAL FIDELITY:
   - Detail the basin's material (chiselled granite, weathered basalt, porous volcanic rock, glazed ceramic), form, and surface condition (water-smoothed rim, velvety moss, mineral streaks).
   - Detail the bamboo's characteristics (green bamboo, aged golden flume, node rings), position, and water dynamics (glassy laminar trickle, rhythmic droplets, gentle cascade).
   - Describe water clarity, surface ripples, floating blossoms/petals, and lighting (Kelvin color temperature, diffuse softbox, dusk glow, or dappled sunbeams).

OUTPUT FORMAT:
You MUST respond with a valid JSON object matching this schema with EXACTLY 3 prompts:
{
  "prompts": [
    {
      "index": 1,
      "title": "Prompt 01 — <Descriptive Theme / Subtitle>",
      "prompt": "<Full, highly descriptive standalone Text-to-Image prompt>",
      "sceneDetails": {
        "composition": "<e.g., Asymmetric Tactile Anchor (Rule of Thirds)>",
        "bambooPosition": "<Bamboo location and hydro-dynamics>",
        "basinDetails": "<Material, form, and surface condition>",
        "lightingAndAtmosphere": "<Lighting and atmospheric mood>",
        "focalPoint": "<Primary focal element description>"
      }
    },
    {
      "index": 2,
      "title": "Prompt 02 — <Descriptive Theme / Subtitle>",
      "prompt": "<Full, highly descriptive standalone Text-to-Image prompt>",
      "sceneDetails": {
        "composition": "<e.g., Centered Contemplative Balance>",
        "bambooPosition": "<Bamboo location and hydro-dynamics>",
        "basinDetails": "<Material, form, and surface condition>",
        "lightingAndAtmosphere": "<Lighting and atmospheric mood>",
        "focalPoint": "<Primary focal element description>"
      }
    },
    {
      "index": 3,
      "title": "Prompt 03 — <Descriptive Theme / Subtitle>",
      "prompt": "<Full, highly descriptive standalone Text-to-Image prompt>",
      "sceneDetails": {
        "composition": "<e.g., Dynamic Diagonal Hydro-Flow>",
        "bambooPosition": "<Bamboo location and hydro-dynamics>",
        "basinDetails": "<Material, form, and surface condition>",
        "lightingAndAtmosphere": "<Lighting and atmospheric mood>",
        "focalPoint": "<Primary focal element description>"
      }
    }
  ]
}`;

  const softColorDescriptions: Record<string, string> = {
    'Soft Ivory': 'soft ivory white, creamy, low-saturation',
    'Pearl White': 'soft pearl white, luminous but low-saturation',
    'Cream White': 'soft creamy white, warm and low-saturation',
    'Vanilla Cream': 'soft vanilla cream, warm and low-saturation',
    'Champagne': 'soft champagne beige, muted and elegant',
    'Soft Beige': 'soft beige, warm, muted, low-saturation',
    'Warm Sand': 'soft warm sand, muted beige-gold',
    'Nude Beige': 'soft nude beige, muted and low-saturation',
    'Soft Taupe': 'soft taupe, muted warm gray-beige',
    'Soft Mocha': 'soft mocha brown, muted and low-saturation',
    'Blush Pink': 'soft blush pink, pale and low-saturation',
    'Powder Pink': 'soft powder pink, pale and muted',
    'Dusty Rose': 'soft dusty rose, muted pink-rose',
    'Rose Beige': 'soft rose beige, muted and elegant',
    'Soft Peach': 'soft peach, pale and low-saturation',
    'Peach Cream': 'soft peach cream, warm and muted',
    'Soft Coral': 'soft coral, pale and low-saturation',
    'Apricot Cream': 'soft apricot cream, warm and muted',
    'Lavender': 'soft lavender, pale and low-saturation',
    'Soft Lilac': 'soft lilac, pale and muted',
    'Dusty Lavender': 'soft dusty lavender, muted purple-lavender',
    'Soft Mauve': 'soft mauve, muted pink-purple',
    'Powder Blue': 'soft powder blue, pale and low-saturation',
    'Baby Blue': 'soft baby blue, pale and muted',
    'Soft Sky Blue': 'soft sky blue, pale powder-blue and low-saturation',
    'Misty Blue': 'soft misty blue, pale and muted',
    'Sage Green': 'soft sage green, muted and low-saturation',
    'Soft Mint': 'soft mint green, pale and muted',
    'Mint Cream': 'soft mint cream, pale and low-saturation',
    'Pistachio': 'soft pistachio green, muted and pale',
    'Soft Olive': 'soft olive green, muted and low-saturation',
    'Seafoam Green': 'soft seafoam green, pale and muted',
    'Dusty Teal': 'soft dusty teal, muted blue-green',
    'Soft Aqua': 'soft aqua, pale and low-saturation',
    'Butter Cream': 'soft butter cream yellow, pale and muted',
    'Soft Lemon': 'soft lemon yellow, pale and low-saturation',
  };
  const selectedSoftColor = options.referenceColor?.trim() || '';
  const selectedSoftColorDescription = softColorDescriptions[selectedSoftColor] || selectedSoftColor || 'none';

  const userPrompt = `Generate 3 distinct Text-to-Image prompts using the following configuration:
- Active Chat Model: ${modelName} (ID: ${cleanModelId})
- Background: ${options.background}
- Mood: ${options.mood}
- Suasana: ${options.suasana || 'Auto — AI / Reference'}
- Kategori: ${options.kategori}
- Dekorasi: ${options.dekorasi}
- Flower: ${options.flower}
- Basin: ${options.basin}
- Bamboo: ${options.bamboo || 'Auto — AI / Reference'}
- Camera Angle: ${effectiveCameraAngle}
- Reference Image: ${options.referenceImageData ? 'Provided separately as visual guidance for similarity-with-variation analysis.' : 'None'}
- REFERENCE ANALYSIS (authoritative extracted facts): ${options.referenceAnalysis ? JSON.stringify(options.referenceAnalysis) : 'None'}
- BASIN STRUCTURE LOCK: ${options.referenceAnalysis ? `Exactly ${options.referenceAnalysis.basinCount} visible basin(s). Arrangement: ${options.referenceAnalysis.basinArrangement || 'preserve exactly'}. Basin details and relative dimensions/levels/overlap: ${options.referenceAnalysis.basinDetails || 'preserve exactly'}. These facts are mandatory; do not equalize basin sizes, change tier order, alter overlap, or reposition any basin.` : 'No reference structure lock.'}

COLOR OVERRIDE — HIGHEST PRIORITY WHEN A SOFT COLOR IS SELECTED:
- Selected soft color: ${selectedSoftColor || 'None'}
- Required visual color: ${selectedSoftColorDescription}
- This is a deliberate recoloring operation, NOT color preservation. The original basin and decoration colors visible in the reference analysis MUST be replaced by the selected soft color.
- NEVER repeat or preserve original color words from the reference analysis for basin/decorations (for example pink, red, green, blue, yellow, purple, white, etc.) when they describe the objects being recolored.
- In every generated prompt, explicitly describe every visible basin using the selected soft color family and every visible decorative object using the same selected soft color family, while preserving each object's original material identity.
- If butterfly is detected, recolor the butterfly with the same selected soft color family; preserve species, count, size, position, wing pattern and silhouette.
- Keep flower identity/color, bamboo color, background colors, water color, lighting and camera unchanged unless they are part of the basin/decorations/butterfly themselves.
- The selected soft color must appear explicitly in the prompt text and in sceneDetails.basinDetails / focalPoint whenever those fields describe the recolored objects.

Requirements:
- Preserve all fixed selections strictly.
- REFERENCE AUTO-FILL RULE: When a reference image is provided, every parameter that is empty or still set to Auto is an AUTO-FILL parameter, NOT a request for randomness. Infer one canonical value or visual direction for each such parameter directly from the uploaded reference image.
- The AUTO-FILL parameters include Background, Mood, Suasana, Kategori, Dekorasi, Flower, Basin, and Bamboo. Analyze the reference image holistically and infer the most appropriate value/characteristics for each parameter from what is actually visible.
- After inference, KEEP each inferred parameter consistent across all 3 prompts. Do not randomly change an inferred Background, Mood, Suasana, Kategori, Dekorasi, Flower, Basin, or Bamboo between prompts.
- If the user explicitly selected a parameter value, that explicit selection overrides the reference-derived value for that parameter and must remain fixed across all 3 prompts.
- Camera Distance/Framing is always AUTO-FILLED from the reference image when a reference is supplied, unless the user explicitly requests an override outside this automatic reference workflow.
- Do not let any unfilled/Auto parameter produce an unrelated scene when a reference image supplies clear visual evidence.
- If REFERENCE ANALYSIS is present, it is authoritative for object identity, object count, object placement, basin presence/absence, basin count, basin arrangement, basin relative size, basin tier order, basin overlap, decoration counts/positions, and camera perspective. Do not contradict it.\n- BASIN ABSENCE LOCK — HIGHEST PRIORITY: ${options.referenceAnalysis && options.referenceAnalysis.basinCount === 0 ? `The uploaded reference has ZERO visible basin vessels. Do not generate, mention, imply, or add any basin, bowl, tiered basin, stacked bowl, or basin fountain in any of the 3 prompts. Describe only the actually visible pond/water surface and other objects. The fact that this is a spa or water-garden scene does not authorize adding a basin. This absence rule overrides all Auto defaults, templates, generic scene conventions, and basin presets.` : `If the reference analysis says basinCount is 0 or basinPresence is absent, no basin may be added. If a basin is visible, reproduce only the actual visible count and geometry.`}
- Never let a generic phrase such as 'three-tier fountain', 'stacked basins', 'three bowls', or a canonical basin preset override the reference-derived dimensions and arrangement. The reference-derived basinArrangement and basinDetails are the final structural specification.
- BASIN STRUCTURE LOCK — HIGHEST PRIORITY: The reference-derived basin geometry is authoritative and must be reproduced literally in all 3 prompts. Visible basin count: ${options.referenceAnalysis?.basinCount ?? 'the reference-derived count'}. Exact arrangement/order: ${options.referenceAnalysis?.basinArrangement || 'preserve the analyzed arrangement exactly'}. Exact basin form/material/relative dimensions/levels/overlap: ${options.referenceAnalysis?.basinDetails || 'preserve the analyzed basin details exactly'}. Do NOT reinterpret, simplify, equalize, resize, restack, reorder, center, spread, rotate, or reposition the basins. Do NOT make all basins the same size if the reference shows different sizes. Preserve the exact front/back, left/right, upper/lower, tier-by-tier relationship and the visible amount of overlap/gap between each basin. If one basin is larger/smaller than another in the reference, that relative size difference is mandatory. If the reference shows a vertical stack, keep the same vertical stacking; if it shows offset/overlap, keep the same offset/overlap.
- The visible basin count MUST remain exactly ${options.referenceAnalysis?.basinCount ?? 'the reference-derived count'} in all 3 prompts. Do not add, remove, merge, duplicate, or invent basins. Preserve their relative size, tier order, overlap, spacing, and left/right/front/back placement.
- Preserve every reference decoration item and its count and placement, especially candles, spa towels, oil bottles, lanterns, flowers, stones, and butterflies. Do not replace, add, remove, duplicate, merge, or relocate decorative objects.
- COLOR-ONLY TRANSFORMATION: After the reference has been analyzed, perform an explicit recoloring pass on ONLY the visible basin and visible decorations. The user-selected soft color is authoritative: ${selectedSoftColor || 'No color selected'} (${selectedSoftColorDescription}). This overrides the original object colors in the reference analysis. Preserve shapes, materials, sizes, counts, positions, arrangement, and identity, but replace the objects' original colors with the selected soft color.
- COLOR WORD BAN FOR RECOLORED OBJECTS: Do not write the original basin/decorative-object colors from the reference analysis. Do not describe a recolored basin or decoration as pink, red, green, blue, yellow, purple, white, etc. unless that is the selected color. Use only the selected soft color family for those objects.
- If a butterfly is present in the reference analysis/decorationItems, also recolor ONLY the butterfly to ${selectedSoftColorDescription}, preserving its species/appearance, count, size, position, wing pattern and silhouette. If no butterfly is present in the analysis, do NOT add a butterfly and do not mention one.
- Do not apply this color transformation to the background, flower identity, bamboo, camera, basin structure, or decoration placement unless required by an explicit user selection. The requested update is strictly color-only for basin + decorations + butterfly when present.
- Preserve the analyzed cameraAngle, cameraFraming, cameraHeight, cameraOrientation and composition. Do not substitute the legacy camera perspective.
- Generate exactly 3 prompts that are similar to the reference's visual DNA but not identical copies. Keep the inferred/fixed parameters stable; create variation only through secondary composition details, object micro-arrangement, water behavior, textures, and other non-parameter-defining details.
- If no reference image is provided, Auto controls must be resolved intelligently from the selected configuration and MUST NOT be randomly varied.
- Ensure all 3 prompts are standalone without reference image phrases.
- Return ONLY valid JSON with exactly 3 prompts in the "prompts" array.`;

  // Kie.ai OpenAI-compatible chat models use the unified Responses API.
  // Do not use /v1/chat/completions here: that route does not accept these model IDs.
  const endpoint = 'https://api.kie.ai/codex/v1/responses';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: cleanModelId,
        stream: false,
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: `${systemPrompt}\n\n${userPrompt}`,
              },
              ...(referenceImageUrl ? [{ type: 'input_image', image_url: referenceImageUrl }] : []),
            ],
          },
        ],
        reasoning: { effort: 'high' },
      }),
    });

    if (response.status === 401 || response.status === 403) {
      throw new KieChatError('Invalid Kie.ai API Key', 401);
    }

    if (response.status === 402) {
      throw new KieChatError('Insufficient Kie.ai Credits', 402);
    }

    const rawResponse = await response.text();
    const data = parseKieResponsesPayload(rawResponse);
    if (!response.ok) {
      const rawText = data ? JSON.stringify(data) : rawResponse;
      const lowerText = rawText.toLowerCase();
      if (lowerText.includes('insufficient') || lowerText.includes('credit')) {
        throw new KieChatError('Insufficient Kie.ai Credits', 402);
      }
      if (lowerText.includes('invalid') && (lowerText.includes('key') || lowerText.includes('token') || lowerText.includes('auth'))) {
        throw new KieChatError('Invalid Kie.ai API Key', 401);
      }
      const msg = data?.error?.message || data?.message || data?.msg || `HTTP ${response.status}`;
      throw new KieChatError(`Chat Model (${modelName}) error: ${msg}`, response.status);
    }

    if (!data) {
      throw new KieChatError(`Chat Model (${modelName}) returned an empty response.`, 502);
    }

    const rawContent = extractResponsesApiText(data);
    if (!rawContent) {
      throw new KieChatError(`Chat Model (${modelName}) returned no generated content.`, 502);
    }

    const parsedItems = parseChatModelPrompts(rawContent, modelName, options)
      .map((item) => enforceReferenceBasinStructure(item, options))
      .map((item) => enforceSelectedSoftColor(item, options));
    if (parsedItems.length < 3) {
      throw new KieChatError(`Chat Model (${modelName}) returned only ${parsedItems.length} of 3 prompts. Please try generating again.`, 502);
    }

    // The model already receives the authoritative camera specification. Do not
    // apply a legacy post-processing angle that could overwrite the reference view.
    return parsedItems.slice(0, 3);
  } catch (err: any) {
    if (err instanceof KieChatError) throw err;
    throw new KieChatError(
      err?.message || `Unable to reach Chat Model (${modelName}) via Kie.ai.`,
      500
    );
  }
}

/**
 * Kie.ai currently documents /codex/v1/responses as returning text/event-stream
 * even when the request uses stream:false. Accept both normal JSON and SSE so
 * the app does not turn a valid model response into a generic server exception.
 */
function parseKieResponsesPayload(raw: string): any | null {
  const text = String(raw || '').trim();
  if (!text) return null;

  try {
    return JSON.parse(text);
  } catch {
    // Continue with SSE parsing.
  }

  const events: any[] = [];
  const dataLines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trim())
    .filter((line) => line && line !== '[DONE]');

  for (const line of dataLines) {
    try {
      events.push(JSON.parse(line));
    } catch {
      // Ignore non-JSON SSE lines.
    }
  }

  if (!events.length) return null;

  // Prefer a final response object if the stream contains one.
  const finalEvent = [...events].reverse().find((event) =>
    event?.output || event?.output_text || event?.status === 'completed' || event?.type === 'response.completed'
  );
  if (finalEvent?.response?.output || finalEvent?.response?.output_text) {
    return finalEvent.response;
  }
  if (finalEvent?.output || finalEvent?.output_text) return finalEvent;

  // Otherwise reconstruct the assistant text from output_text deltas.
  const deltas = events
    .filter((event) => typeof event?.delta === 'string')
    .map((event) => event.delta)
    .join('');
  if (deltas) return { output_text: deltas };

  return events[events.length - 1] || null;
}

/** Extract text from Kie.ai's Responses API output format. */
function extractResponsesApiText(data: any): string {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim();
  }

  const output = Array.isArray(data?.output) ? data.output : [];
  const parts: string[] = [];
  for (const item of output) {
    if (!Array.isArray(item?.content)) continue;
    for (const content of item.content) {
      if (typeof content?.text === 'string' && content.text.trim()) {
        parts.push(content.text);
      }
    }
  }
  return parts.join('\n').trim();
}

/**
 * Robust parser extracting exactly 3 prompts from Chat Model output.
 * Handles pure JSON, markdown-wrapped JSON, or structured text blocks.
 */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Deterministic final color pass for reference-driven prompts.
 * The model may still copy a color adjective from the reference even when the
 * instruction says to recolor. This pass changes color words only when they
 * occur in a basin/decorative-object phrase, then adds an explicit override
 * line so the downstream image model receives an unambiguous instruction.
 */
function enforceReferenceBasinStructure(
  item: GeneratedPromptItem,
  options: PromptOptions,
): GeneratedPromptItem {
  const ref = options.referenceAnalysis;
  if (!ref || !ref.basinCount) return item;

  const arrangement = ref.basinArrangement?.trim() || 'preserve the analyzed basin arrangement exactly';
  const details = ref.basinDetails?.trim() || 'preserve the analyzed basin shapes, materials, relative dimensions, levels, overlap, and spacing exactly';
  const basinDescription = ref.basin?.trim() || 'the analyzed basin design';
  const structureLock = `MANDATORY REFERENCE BASIN GEOMETRY: reproduce ${ref.basinCount} visible basin(s), each with this analyzed design: ${basinDescription}. Exact arrangement/order: ${arrangement}. Exact shape, material, relative dimensions, levels, overlap and spacing: ${details}. These are literal geometry requirements, not loose inspiration. Preserve each individual basin's silhouette and aspect ratio, each tier's own width/height, relative size differences, exact upper/lower/front/back/left/right relationships, offsets, overlap and gaps. Do not replace the analyzed shape with a generic bowl, oval, round basin, or preset. Do not equalize sizes, resize, restack, reorder, center, spread, rotate, merge, duplicate, crop, or reposition any basin.`;

  let prompt = item.prompt || '';
  // Always place the exact analyzed geometry at the start, where image models
  // are more likely to honor it than a late appended note.
  prompt = `${structureLock} ${prompt.trim()}`.trim();

  const sceneDetails: GeneratedPromptItem['sceneDetails'] = item.sceneDetails || {
    composition: '', bambooPosition: '', basinDetails: '', lightingAndAtmosphere: '', focalPoint: '',
  };
  const existing = sceneDetails.basinDetails?.trim() || '';
  return {
    ...item,
    prompt,
    sceneDetails: {
      ...sceneDetails,
      basinDetails: `${basinDescription}; ${details}; ${arrangement}`,
    },
  };
}

function enforceSelectedSoftColor(
  item: GeneratedPromptItem,
  options: PromptOptions,
): GeneratedPromptItem {
  const selected = options.referenceColor?.trim();
  const ref = options.referenceAnalysis;
  if (!selected || !ref) return item;
  // Never let the color-only post-pass reintroduce a basin absent from the reference.
  if (ref.basinCount === 0 || ref.basinPresence === 'absent') return item;

  const colorDescriptions: Record<string, string> = {
    'Soft Ivory': 'soft ivory', 'Pearl White': 'soft pearl white', 'Cream White': 'soft cream white',
    'Vanilla Cream': 'soft vanilla cream', 'Champagne': 'soft champagne beige', 'Soft Beige': 'soft beige',
    'Warm Sand': 'soft warm sand', 'Nude Beige': 'soft nude beige', 'Soft Taupe': 'soft taupe',
    'Soft Mocha': 'soft mocha brown', 'Blush Pink': 'soft blush pink', 'Powder Pink': 'soft powder pink',
    'Dusty Rose': 'soft dusty rose', 'Rose Beige': 'soft rose beige', 'Soft Peach': 'soft peach',
    'Peach Cream': 'soft peach cream', 'Soft Coral': 'soft coral', 'Apricot Cream': 'soft apricot cream',
    'Lavender': 'soft lavender', 'Soft Lilac': 'soft lilac', 'Dusty Lavender': 'soft dusty lavender',
    'Soft Mauve': 'soft mauve', 'Powder Blue': 'soft powder blue', 'Baby Blue': 'soft baby blue',
    'Soft Sky Blue': 'soft sky blue', 'Misty Blue': 'soft misty blue', 'Sage Green': 'soft sage green',
    'Soft Mint': 'soft mint green', 'Mint Cream': 'soft mint cream', 'Pistachio': 'soft pistachio green',
    'Soft Olive': 'soft olive green', 'Seafoam Green': 'soft seafoam green', 'Dusty Teal': 'soft dusty teal',
    'Soft Aqua': 'soft aqua', 'Butter Cream': 'soft butter cream yellow', 'Soft Lemon': 'soft lemon yellow',
  };
  const selectedPhrase = colorDescriptions[selected] || selected.toLowerCase();
  const hasButterfly = (ref.decorationItems || []).some((d) => /butterfl/i.test(d.name));
  const decorationList = (ref.decorationItems || []).map((d) => `${d.count} ${d.name} at ${d.position}`).join('; ');

  // Put the selected color instruction first and state precisely what is and is
  // not recolored. Never rely on the model to infer this from the color palette.
  const overrideLine = `MANDATORY COLOR OVERRIDE — SELECTED COLOR: ${selected} (${selectedPhrase}). Every visible basin and each detected decorative object must be explicitly described as ${selectedPhrase}; recolor every visible basin AND every visible decorative object to ${selectedPhrase}. The original basin/decor colors are explicitly replaced and must not appear in descriptions of those objects. Keep the basin and decor material, shape, size, count, position, arrangement, surface detail and identity unchanged. ${hasButterfly ? `Butterflies were detected (${decorationList}); recolor every detected butterfly to ${selectedPhrase}, preserving count, species, silhouette, wing pattern and position.` : 'No butterfly was detected; do not add or mention butterflies.'} Do NOT recolor flowers/plants, bamboo, background, water, reflections, lighting, or other non-decoration elements. This selected color overrides all conflicting color words for basin and decor.`;

  let prompt = item.prompt || '';
  // Deterministic post-processing: replace source color adjectives only when they
  // directly describe a basin or a decorative object. The old regex only handled
  // a few word orders (e.g. "purple stone basin") and missed phrases such as
  // "glossy smooth purple stone basins" and "lavender rolled spa towels".
  // Do this after geometry locking so the reference geometry cannot reintroduce
  // conflicting colors into the final prompt.
  const colorWords = String.raw`(?:orange[ -]and[ -]black|purple[ -]lavender|lavender[ -]purple|pink[ -]purple|blue[ -]green|yellow[ -]green|soft[ -]sky[ -]blue|powder[ -]blue|baby[ -]blue|misty[ -]blue|sage[ -]green|seafoam[ -]green|soft[ -]mint|mint[ -]green|soft[ -]coral|soft[ -]peach|dusty[ -]rose|rose[ -]beige|warm[ -]sand|soft[ -]beige|soft[ -]ivory|pearl[ -]white|cream[ -]white|vanilla[ -]cream|soft[ -]mocha|soft[ -]taupe|dusty[ -]lavender|soft[ -]lilac|soft[ -]mauve|pistachio[ -]green|soft[ -]olive|butter[ -]cream|soft[ -]lemon|champagne(?:[ -]beige)?|lavender|purple|pink|blush|rose|red|green|blue|yellow|orange|white|ivory|cream|beige|golden|silver|teal|aqua|mint|coral|peach|lilac|mauve|sage|pistachio|brown|black|gray|grey)`;
  const targetNouns = String.raw`(?:basins?|bowls?|candles?|lanterns?|towels?|shells?|butterfly|butterflies|benches?|ornaments?|bottles?|spoons?|trays?)`;
  const recolorObjectPhrases = (text: string): string => {
    if (!text) return text;
    // Match a color term followed by a longer descriptive/material phrase and an object
    // noun. This handles forms such as “lavender-purple stone or ceramic bowl basins”.
    const colorBeforeObject = new RegExp(
      String.raw`\b(${colorWords})(\s+(?:(?!and\b|with\b|beside\b|behind\b|above\b|below\b|near\b|in\b|on\b|at\b)[a-z][a-z-]*\s+){0,10}${targetNouns})\b`,
      'gi',
    );
    let output = text.replace(colorBeforeObject, (_match, _color: string, suffix: string) => `${selectedPhrase}${suffix}`);

    // Handle color phrases after the object noun too, e.g. "basins are lavender" or
    // "butterfly with orange-and-black wings", without touching flower colors.
    const colorAfterObject = new RegExp(
      String.raw`(\b${targetNouns}\b[^.;:!?]{0,80}?\b(?:are|is|finished in|colored|coloured|with|in)\s+)(${colorWords})\b`,
      'gi',
    );
    output = output.replace(colorAfterObject, (_match, prefix: string) => `${prefix}${selectedPhrase}`);

    // Make the selected color explicit even for detected decorations that the model
    // described without a color adjective (for example, "three candles" or "rolled
    // towels"). Avoid adding color to objects explicitly excluded by a negative clause.
    const nounPattern = new RegExp(String.raw`\b(${targetNouns})\b`, 'gi');
    output = output.replace(nounPattern, (noun, _captured, offset: number, whole: string) => {
      const before = whole.slice(Math.max(0, offset - 100), offset);
      const lastBoundary = Math.max(before.lastIndexOf('.'), before.lastIndexOf(';'), before.lastIndexOf(':'), before.lastIndexOf(','));
      const clause = before.slice(lastBoundary + 1);
      if (/\b(?:do not|don't|never|without|no)\b[^.!?]{0,55}$/i.test(clause)) return noun;
      const tailWords = clause.trim().split(/\s+/).slice(-14).join(' ');
      if (tailWords.toLowerCase().includes(selectedPhrase.toLowerCase())) return noun;
      return `${selectedPhrase} ${noun}`;
    });
    return output;
  };

  prompt = recolorObjectPhrases(item.prompt || '');
  prompt = `${overrideLine} ${prompt}`.trim();

  const basinDescription = recolorObjectPhrases(ref.basin?.trim() || 'the analyzed basin design');
  const basinDetails = recolorObjectPhrases(ref.basinDetails?.trim() || 'preserve the analyzed basin shape, material, relative dimensions, levels, overlap, and spacing');
  const arrangement = ref.basinArrangement?.trim() || 'preserve the analyzed basin arrangement exactly';
  // Metadata must not reintroduce the reference's old basin color.
  const colorBasinDetails = `Selected color: ${selectedPhrase}. Basin description: ${basinDescription}; preserve material identity, silhouette, relative dimensions, tier levels (${basinDetails}), and exact arrangement/overlap/spacing (${arrangement}); replace all original basin colors with ${selectedPhrase}.`;
  const focalPoint = recolorObjectPhrases(item.sceneDetails?.focalPoint || '');
  const colorFocalPoint = `${selectedPhrase} basin and decorative objects${hasButterfly ? `, including ${selectedPhrase} butterflies` : ''}${focalPoint ? `; focal composition: ${focalPoint}` : ''}`;

  return {
    ...item,
    prompt,
    sceneDetails: {
      ...item.sceneDetails,
      basinDetails: colorBasinDetails,
      focalPoint: colorFocalPoint,
    },
  };
}

function parseChatModelPrompts(
  content: string,
  modelName: string,
  options: PromptOptions
): GeneratedPromptItem[] {
  const cleanContent = content.trim();

  // 1. Try extracting JSON
  let jsonString = cleanContent;
  const jsonMatch = cleanContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
  if (jsonMatch && jsonMatch[1]) {
    jsonString = jsonMatch[1].trim();
  }

  try {
    const parsed = JSON.parse(jsonString);
    const rawList = Array.isArray(parsed) ? parsed : parsed.prompts;

    if (Array.isArray(rawList) && rawList.length >= 3) {
      return rawList.slice(0, 3).map((item: any, idx: number) => {
        const index = idx + 1;
        const promptText = String(item.prompt || item.text || item.description || '').trim();
        return {
          id: `prompt_${Date.now()}_${index}`,
          index,
          title: item.title || `Prompt 0${index} — ${modelName}`,
          prompt: promptText,
          chatModelUsed: modelName,
          sceneDetails: {
            composition: item.sceneDetails?.composition || (index === 1 ? 'Asymmetric Tactile Anchor' : index === 2 ? 'Centered Contemplative Balance' : 'Dynamic Diagonal Hydro-Flow'),
            bambooPosition: item.sceneDetails?.bambooPosition || options.bamboo || 'Organic Placement',
            basinDetails: item.sceneDetails?.basinDetails || options.basin || 'Hand-carved Stone Basin',
            lightingAndAtmosphere: item.sceneDetails?.lightingAndAtmosphere || options.mood || 'Ambient Lighting',
            focalPoint: item.sceneDetails?.focalPoint || 'Water cascade and floating petals',
          },
          timestamp: Date.now(),
        };
      });
    }
  } catch {
    // Fall back to regex block parsing
  }

  // 2. Regex block parser for PROMPT 1 / PROMPT 2 / PROMPT 3
  const results: GeneratedPromptItem[] = [];
  const promptRegex = /(?:PROMPT\s*(?:0?[1-3]|\bI{1,3}\b)[:\s\-\*#]+)([\s\S]*?)(?=(?:PROMPT\s*(?:0?[1-3]|\bI{1,3}\b)[:\s\-\*#]+)|$)/gi;
  let match: RegExpExecArray | null;

  while ((match = promptRegex.exec(cleanContent)) !== null) {
    const block = match[1].trim();
    if (block.length > 30) {
      const idx = results.length + 1;
      // Strip scene detail labels if mixed in prompt
      const promptOnly = block
        .replace(/Title:.*$/im, '')
        .replace(/Scene Details:[\s\S]*$/im, '')
        .trim();

      results.push({
        id: `prompt_${Date.now()}_${idx}`,
        index: idx,
        title: `Prompt 0${idx} — ${modelName}`,
        prompt: promptOnly || block,
        chatModelUsed: modelName,
        sceneDetails: {
          composition: idx === 1 ? 'Asymmetric Tactile Anchor' : idx === 2 ? 'Centered Contemplative Balance' : 'Dynamic Diagonal Hydro-Flow',
          bambooPosition: options.bamboo || 'Natural Bamboo Conduit',
          basinDetails: options.basin || 'Hand-carved Stone Basin',
          lightingAndAtmosphere: options.mood || 'Soft Ambient Lighting',
          focalPoint: 'Water surface reflections and natural petals',
        },
        timestamp: Date.now(),
      });
    }
  }

  return results;
}
