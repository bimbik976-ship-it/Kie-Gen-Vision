import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Layers,
  Info,
  Compass,
  History,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import { PromptOptions, GeneratedPromptItem, ReferenceAnalysis } from '../types';
import {
  CHAT_MODELS,
  DEFAULT_CHAT_MODEL_ID,
  BACKGROUND_OPTIONS,
  MOOD_OPTIONS,
  SUASANA_OPTIONS,
  KATEGORI_OPTIONS,
  DEKORASI_OPTIONS,
  FLOWER_OPTIONS,
  BASIN_OPTIONS,
  BAMBOO_OPTIONS,
  CAMERA_ANGLE_OPTIONS,
} from '../data/promptOptions';
import { requestPrompts, analyzeReference } from '../services/api';
import { PromptHistoryItem, getPromptHistory, savePromptHistory, deletePromptHistory, clearPromptHistory } from '../services/promptHistory';

const SOFT_COLOR_OPTIONS = [
  'Soft Ivory', 'Pearl White', 'Cream White', 'Vanilla Cream', 'Champagne', 'Soft Beige',
  'Warm Sand', 'Nude Beige', 'Soft Taupe', 'Soft Mocha', 'Blush Pink', 'Powder Pink',
  'Dusty Rose', 'Rose Beige', 'Soft Peach', 'Peach Cream', 'Soft Coral', 'Apricot Cream',
  'Lavender', 'Soft Lilac', 'Dusty Lavender', 'Soft Mauve', 'Powder Blue', 'Baby Blue',
  'Soft Sky Blue', 'Misty Blue', 'Sage Green', 'Soft Mint', 'Mint Cream', 'Pistachio',
  'Soft Olive', 'Seafoam Green', 'Dusty Teal', 'Soft Aqua', 'Butter Cream', 'Soft Lemon',
];

interface PromptGeneratorProps {
}

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({
}) => {
  // Config state
  const [chatModel, setChatModel] = useState(DEFAULT_CHAT_MODEL_ID);
  const [background, setBackground] = useState('Auto — AI / Reference');
  const [mood, setMood] = useState('Auto — AI / Reference');
  const [suasana, setSuasana] = useState('Auto — AI / Reference');
  const [kategori, setKategori] = useState('Auto — AI / Reference');
  const [dekorasi, setDekorasi] = useState('Auto — AI / Reference');
  const [flower, setFlower] = useState('Auto — AI / Reference');
  const [basin, setBasin] = useState('Auto — AI / Reference');
  const [bamboo, setBamboo] = useState('Auto — AI / Reference');
  const [cameraAngle, setCameraAngle] = useState('Auto — AI Framing');
  const [referenceImageData, setReferenceImageData] = useState<string | null>(null);
  const [referenceImageName, setReferenceImageName] = useState<string>('');
  const [referenceAnalysis, setReferenceAnalysis] = useState<ReferenceAnalysis | null>(null);
  const [isAnalyzingReference, setIsAnalyzingReference] = useState(false);
  const [referenceColor, setReferenceColor] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPromptItem[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generationCount, setGenerationCount] = useState(0);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyItems, setHistoryItems] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    setHistoryItems(getPromptHistory());
  }, []);

  const handleGenerate = async () => {
    if (isAnalyzingReference) {
      setErrorMessage('Reference image masih dianalisis. Tunggu sampai Reference Matched sebelum Generate.');
      return;
    }
    if (referenceImageData && !referenceAnalysis) {
      setErrorMessage('Reference image belum berhasil dianalisis. Upload ulang atau tunggu sampai Reference Matched.');
      return;
    }
    if (referenceAnalysis && !referenceColor) {
      setErrorMessage('Pilih 1 warna soft untuk Basin + Dekorasi sebelum Generate.');
      return;
    }
    setIsGenerating(true);
    setErrorMessage(null);

    const options: PromptOptions = {
      chatModel,
      background,
      mood,
      suasana,
      kategori,
      dekorasi,
      flower,
      basin,
      bamboo,
      cameraAngle,
      referenceImageData: referenceImageData || undefined,
      referenceImageName: referenceImageName || undefined,
      referenceAnalysis: referenceAnalysis || undefined,
      referenceColor: referenceColor || undefined,
    };

    try {
      const prompts = await requestPrompts(options);
      setGeneratedPrompts(prompts);
      const saved = savePromptHistory(prompts, options);
      setHistoryItems((prev) => [saved, ...prev].slice(0, 100));
      setGenerationCount((prev) => prev + 1);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to generate prompts. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const optionsWithCurrent = (options: string[], current: string) =>
    current && !options.includes(current) ? [current, ...options] : options;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex flex-col gap-2 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-800 text-xs font-bold">
              01
            </span>
            <h1 className="text-xl font-bold tracking-tight text-stone-900">PROMPT GENERATOR</h1>
          </div>
          <p className="mt-1 text-xs text-stone-500">
            Produces three distinctly architectural, non-repetitive image prompts with multi-level basin variation and selectable camera perspective.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {generationCount > 0 && (
            <div className="hidden sm:flex items-center space-x-2 rounded-xl bg-stone-100 px-3 py-1.5 text-xs text-stone-600">
              <Layers className="h-3.5 w-3.5 text-stone-500" />
              <span>Generation Cycle #{generationCount}</span>
            </div>
          )}
          <button type="button" onClick={() => setHistoryOpen(true)} className="flex items-center gap-1.5 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-700 shadow-xs hover:bg-stone-50">
            <History className="h-3.5 w-3.5" />
            <span>History ({historyItems.length})</span>
          </button>
        </div>
      </div>

      {/* Control Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Parameter Selection */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs lg:col-span-1 space-y-5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <span className="text-xs font-bold tracking-wider text-stone-800 uppercase flex items-center space-x-1.5">
              <Sliders className="h-3.5 w-3.5 text-stone-500" />
              <span>Scene Configuration</span>
            </span>
            <span className="text-[11px] text-stone-400 font-medium">AI Auto-Fill Compliant</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Optional Reference Image */}
            <div className="space-y-2 rounded-xl border border-stone-200 bg-stone-50/70 p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <ImageIcon className="h-3.5 w-3.5 text-stone-600" />
                  <span className="font-medium text-stone-700">Reference Image</span>
                </div>
                <span className="text-[10px] text-stone-400">Optional</span>
              </div>
              <p className="text-[10px] leading-relaxed text-stone-500">Upload an image as visual guidance. AI creates a similar visual direction, not an identical copy.</p>
              {!referenceImageData ? (
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-stone-300 bg-white px-3 py-3 text-xs font-semibold text-stone-700 hover:bg-stone-50">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload Reference Image</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
                        setErrorMessage('Reference image must be JPG, PNG, or WebP.');
                        e.currentTarget.value = '';
                        return;
                      }
                      if (file.size > 10 * 1024 * 1024) {
                        setErrorMessage('Reference image must be 10MB or smaller.');
                        e.currentTarget.value = '';
                        return;
                      }
                      setErrorMessage(null);
                      const reader = new FileReader();
                      reader.onload = async () => {
                        const dataUrl = typeof reader.result === 'string' ? reader.result : null;
                        if (!dataUrl) return;
                        setReferenceImageData(dataUrl);
                        setReferenceImageName(file.name);
                        setReferenceAnalysis(null);
      setReferenceColor('');
                        setIsAnalyzingReference(true);
                        try {
                          const analysis = await analyzeReference({
                            chatModel,
                            referenceImageData: dataUrl,
                            referenceImageName: file.name,
                          });
                          setReferenceAnalysis(analysis);
                          if (analysis.background) setBackground(analysis.background);
                          if (analysis.mood) setMood(analysis.mood);
                          if (analysis.suasana) setSuasana(analysis.suasana);
                          if (analysis.kategori) setKategori(analysis.kategori);
                          if (analysis.dekorasi) setDekorasi(analysis.dekorasi);
                          if (analysis.flower) setFlower(analysis.flower);
                          if (analysis.basin) setBasin(analysis.basin);
                          if (analysis.bamboo) setBamboo(analysis.bamboo);
                          if (analysis.cameraAngle || analysis.cameraFraming) {
                            setCameraAngle(`Reference — ${[analysis.cameraAngle, analysis.cameraFraming].filter(Boolean).join(' | ')}`);
                          }
                          setErrorMessage(null);
                        } catch (err: any) {
                          setErrorMessage(err.message || 'Reference image analysis failed.');
                        } finally {
                          setIsAnalyzingReference(false);
                        }
                      };
                      reader.readAsDataURL(file);
                      e.currentTarget.value = '';
                    }}
                  />
                </label>
              ) : (
                <div className="overflow-hidden rounded-xl border border-stone-200 bg-white">
                  <img src={referenceImageData} alt="Reference preview" className="h-40 w-full object-cover" />
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="min-w-0 truncate text-[10px] font-medium text-stone-600">{referenceImageName || 'Reference image'}</span>
                    <button
                      type="button"
                      onClick={() => { setReferenceImageData(null); setReferenceImageName(''); setReferenceAnalysis(null); setReferenceColor(''); setIsAnalyzingReference(false); setBackground('Auto — AI / Reference'); setMood('Auto — AI / Reference'); setSuasana('Auto — AI / Reference'); setKategori('Auto — AI / Reference'); setDekorasi('Auto — AI / Reference'); setFlower('Auto — AI / Reference'); setBasin('Auto — AI / Reference'); setBamboo('Auto — AI / Reference'); setCameraAngle('Auto — AI Framing'); }}
                      className="flex shrink-0 items-center gap-1 rounded-lg border border-stone-200 px-2 py-1 text-[10px] font-semibold text-stone-600 hover:bg-stone-50"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Model — TEXT PROMPT GENERATION ONLY */}
            <div className="space-y-1.5">
              <label htmlFor="select-chat-model" className="font-medium text-stone-700">
                Chat Model
              </label>
              <select
                id="select-chat-model"
                value={chatModel}
                onChange={(e) => setChatModel(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {CHAT_MODELS.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-stone-400">Text-to-image prompt generation only. This does not generate images.</p>
            </div>

            {/* Background */}
            <div className="space-y-1.5">
              <label htmlFor="select-background" className="font-medium text-stone-700">
                Background
              </label>
              <select
                id="select-background"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(BACKGROUND_OPTIONS, background).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood */}
            <div className="space-y-1.5">
              <label htmlFor="select-mood" className="font-medium text-stone-700">
                Mood
              </label>
              <select
                id="select-mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(MOOD_OPTIONS, mood).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Suasana */}
            <div className="space-y-1.5">
              <label htmlFor="select-suasana" className="font-medium text-stone-700">
                Suasana
              </label>
              <select
                id="select-suasana"
                value={suasana}
                onChange={(e) => setSuasana(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(SUASANA_OPTIONS, suasana).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Kategori */}
            <div className="space-y-1.5">
              <label htmlFor="select-kategori" className="font-medium text-stone-700">
                Kategori
              </label>
              <select
                id="select-kategori"
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(KATEGORI_OPTIONS, kategori).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Dekorasi */}
            <div className="space-y-1.5">
              <label htmlFor="select-dekorasi" className="font-medium text-stone-700">
                Dekorasi
              </label>
              <select
                id="select-dekorasi"
                value={dekorasi}
                onChange={(e) => setDekorasi(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(DEKORASI_OPTIONS, dekorasi).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Flower */}
            <div className="space-y-1.5">
              <label htmlFor="select-flower" className="font-medium text-stone-700">
                Flower
              </label>
              <select
                id="select-flower"
                value={flower}
                onChange={(e) => setFlower(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden"
              >
                {optionsWithCurrent(FLOWER_OPTIONS, flower).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Basin */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="select-basin" className="font-medium text-stone-700">
                  Basin
                </label>
                <span className="text-[10px] text-stone-400">3-Level Variance</span>
              </div>
              <select
                id="select-basin"
                value={basin}
                onChange={(e) => setBasin(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden cursor-pointer"
              >
                {optionsWithCurrent(BASIN_OPTIONS, basin).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Bamboo */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="select-bamboo" className="font-medium text-stone-700">
                  Bamboo
                </label>
                <span className="text-[10px] text-stone-400">Hydro Dynamics</span>
              </div>
              <select
                id="select-bamboo"
                value={bamboo}
                onChange={(e) => setBamboo(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3 py-2 text-stone-800 focus:border-stone-900 focus:bg-white focus:outline-hidden cursor-pointer"
              >
                {optionsWithCurrent(BAMBOO_OPTIONS, bamboo).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Camera Distance */}
            <div className="space-y-1.5 rounded-xl border border-stone-200 bg-stone-100/70 p-3">
              <div className="flex items-center justify-between">
                <label htmlFor="select-camera-distance" className="font-medium text-stone-800 flex items-center space-x-1">
                  <Compass className="h-3.5 w-3.5 text-stone-600" />
                  <span>Camera Framing / Angle</span>
                </label>
                <span className="text-[10px] text-stone-400">{referenceAnalysis ? 'Reference Matched' : referenceImageData ? 'Analyzing' : 'Selectable'}</span>
              </div>
              <select
                id="select-camera-distance"
                value={cameraAngle}
                onChange={(e) => setCameraAngle(e.target.value)}
                disabled={Boolean(referenceImageData && (referenceAnalysis || isAnalyzingReference))}
                className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-stone-800 focus:border-stone-900 focus:outline-hidden cursor-pointer disabled:cursor-not-allowed disabled:bg-stone-50 disabled:text-stone-500"
              >
                {optionsWithCurrent(CAMERA_ANGLE_OPTIONS, cameraAngle).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <p className="text-[11px] leading-relaxed text-stone-600">
                {referenceImageData
                  ? 'Reference image is provided, so the generated prompts will follow its camera distance and framing.'
                  : 'With a reference image, AI fills the actual camera angle, height, orientation, and framing from the image.'}
              </p>
            </div>
          </div>

          {/* AI Auto-Fill Banner */}
          <div className="rounded-xl bg-amber-50/80 p-3 border border-amber-200/70 text-[11px] text-amber-900 leading-relaxed">
            {referenceImageData ? (
              <>
                <strong>{isAnalyzingReference ? 'Reference Analysis:' : 'Reference Auto-Fill:'}</strong> {isAnalyzingReference ? 'AI sedang membaca background, basin, jumlah basin, dekorasi, posisi objek, dan camera angle.' : 'Parameter diisi langsung dari analisis gambar dan dikunci konsisten pada semua 3 prompt. Jumlah basin, susunan basin, jumlah/posisi lilin, spa towel, oil bottle, serta camera perspective mengikuti gambar.'}
              </>
            ) : (
              <>
                <strong>AI Auto Rule:</strong> Fixed selections are strictly preserved. Parameters set to Auto are determined intelligently from the overall configuration; they are never randomized.
              </>
            )}
          </div>

          {referenceAnalysis && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-[10px] leading-relaxed text-emerald-950">
              <div className="mb-1 font-bold">Reference Structure Detected</div>
              <div><strong>Basin:</strong> {referenceAnalysis.basinCount} visible basin{referenceAnalysis.basinCount === 1 ? '' : 's'} — {referenceAnalysis.basinArrangement || referenceAnalysis.basinDetails}</div>
              <div><strong>Camera:</strong> {referenceAnalysis.cameraAngle || referenceAnalysis.cameraFraming}</div>
              {referenceAnalysis.decorationItems.length > 0 && (
                <div><strong>Decorations:</strong> {referenceAnalysis.decorationItems.map((item) => `${item.count}× ${item.name} (${item.position})`).join(' • ')}</div>
              )}
            </div>
          )}


          {referenceAnalysis && (
            <div className="rounded-xl border border-violet-200 bg-violet-50/70 p-4">
              <div className="mb-1 text-xs font-bold text-violet-950">SOFT COLOR — BASIN + DECORATION</div>
              <p className="mb-3 text-[10px] leading-relaxed text-violet-900">Pilih 1 warna setelah analisis referensi berhasil. Warna ini diterapkan konsisten pada basin dan dekorasi. Butterfly ikut berubah warna hanya jika terdeteksi pada referensi.</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {SOFT_COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setReferenceColor(color)}
                    className={`rounded-lg border px-2 py-2 text-[10px] font-medium transition-all ${referenceColor === color ? 'border-violet-700 bg-violet-700 text-white shadow-sm' : 'border-stone-200 bg-white text-stone-700 hover:border-violet-300 hover:bg-violet-50'}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
              <div className="mt-2 text-[10px] text-stone-500">36 pilihan warna soft • {referenceColor ? `Dipilih: ${referenceColor}` : 'Belum dipilih'}</div>
            </div>
          )}

          {/* Submit Action */}
          <button
            id="btn-generate-3-prompts"
            onClick={handleGenerate}
            disabled={isGenerating || isAnalyzingReference}
            className="w-full flex items-center justify-center space-x-2 rounded-xl bg-stone-900 py-3 text-xs font-semibold text-white shadow-sm hover:bg-stone-800 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-amber-400" />
                <span>Synthesizing Scene Prompts...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>GENERATE 3 PROMPTS</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Prompts Output */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Prompt Output (Exactly 3 High-Variance Scenes)
            </span>
            {generatedPrompts.length > 0 && (
              <button
                onClick={handleGenerate}
                disabled={isGenerating || isAnalyzingReference}
                className="flex items-center space-x-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>Generate Again</span>
              </button>
            )}
          </div>

          {errorMessage && (
            <div className="rounded-xl bg-rose-50 p-4 border border-rose-200 text-xs text-rose-700">
              {errorMessage}
            </div>
          )}

          {generatedPrompts.length === 0 && !isGenerating && (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-12 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-xs border border-stone-200 text-stone-400">
                <Sparkles className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-stone-800">Ready to Design Scenes</h2>
              <p className="mt-1 max-w-sm text-xs text-stone-500">
                Configure your garden parameters or leave them on Auto, then click &quot;Generate 3 Prompts&quot; to synthesize standalone visual scenes.
              </p>
            </div>
          )}

          {isGenerating && (
            <div className="space-y-4">
              {[1, 2, 3].map((num) => (
                <div key={num} className="animate-pulse rounded-2xl border border-stone-200 bg-white p-5 space-y-3">
                  <div className="h-4 w-28 rounded-md bg-stone-200" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded-md bg-stone-100" />
                    <div className="h-3 w-5/6 rounded-md bg-stone-100" />
                    <div className="h-3 w-4/6 rounded-md bg-stone-100" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {generatedPrompts.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-md space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="flex h-6 w-16 items-center justify-center rounded-md bg-stone-900 text-[11px] font-bold text-white uppercase tracking-wider">
                    PROMPT 0{item.index}
                  </span>
                  <span className="text-xs font-semibold text-stone-800">
                    {item.sceneDetails.composition}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopy(item.id, item.prompt)}
                    className="flex items-center space-x-1.5 rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-stone-500" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>

                </div>
              </div>

              {/* Standalone Prompt Output */}
              <div className="rounded-xl bg-stone-50 p-4 border border-stone-200/70">
                <p className="text-xs leading-relaxed text-stone-800 font-serif selection:bg-amber-100">
                  {item.prompt}
                </p>
              </div>

              {/* Scene Design Dimensional Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 sm:grid-cols-4 pt-1">
                <div className="rounded-lg bg-stone-100/70 p-2">
                  <span className="block font-medium text-stone-500 text-[10px] uppercase">Bamboo Form & Pos</span>
                  <span className="text-stone-800 font-medium">{item.sceneDetails.bambooPosition}</span>
                </div>
                <div className="rounded-lg bg-stone-100/70 p-2">
                  <span className="block font-medium text-stone-500 text-[10px] uppercase">Basin Variation (3-Lvl)</span>
                  <span className="text-stone-800 font-medium truncate block" title={item.sceneDetails.basinDetails}>
                    {item.sceneDetails.basinDetails}
                  </span>
                </div>
                <div className="rounded-lg bg-stone-100/70 p-2">
                  <span className="block font-medium text-stone-500 text-[10px] uppercase">Atmosphere & Light</span>
                  <span className="text-stone-800 font-medium truncate block" title={item.sceneDetails.lightingAndAtmosphere}>
                    {item.sceneDetails.lightingAndAtmosphere}
                  </span>
                </div>
                <div className="rounded-lg bg-stone-100/70 p-2">
                  <span className="block font-medium text-stone-500 text-[10px] uppercase">Camera DNA</span>
                  <span className="text-stone-800 font-medium">{referenceImageData ? 'Reference Matched' : cameraAngle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {historyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setHistoryOpen(false)}>
          <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <h2 className="flex items-center gap-2 text-sm font-bold text-stone-900"><History className="h-4 w-4" /> Prompt History</h2>
                <p className="mt-1 text-[11px] text-stone-500">Setiap hasil Generate 3 Prompts disimpan sebagai satu riwayat.</p>
              </div>
              <div className="flex items-center gap-2">
                {historyItems.length > 0 && <button type="button" onClick={() => { clearPromptHistory(); setHistoryItems([]); }} className="flex items-center gap-1 rounded-lg border border-rose-200 px-2.5 py-1.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-50"><Trash2 className="h-3 w-3" /> Clear All</button>}
                <button type="button" onClick={() => setHistoryOpen(false)} className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"><X className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="overflow-y-auto p-4">
              {historyItems.length === 0 ? (
                <div className="rounded-xl border-2 border-dashed border-stone-200 p-10 text-center text-xs text-stone-500">Belum ada riwayat. Generate 3 prompts terlebih dahulu.</div>
              ) : (
                <div className="space-y-3">
                  {historyItems.map((entry, historyIndex) => (
                    <div key={entry.id} className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-stone-800">Generation #{historyItems.length - historyIndex}</div>
                          <div className="text-[10px] text-stone-500">{new Date(entry.createdAt).toLocaleString()}</div>
                        </div>
                        <button type="button" onClick={() => { deletePromptHistory(entry.id); setHistoryItems((prev) => prev.filter((x) => x.id !== entry.id)); }} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" title="Delete history"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                      <div className="space-y-2">
                        {entry.prompts.map((item) => (
                          <div key={item.id} className="rounded-lg border border-stone-200 bg-white p-3">
                            <div className="mb-1"><span className="text-[10px] font-bold text-stone-500">PROMPT 0{item.index}</span></div>
                            <p className="text-[11px] leading-relaxed text-stone-700">{item.prompt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
