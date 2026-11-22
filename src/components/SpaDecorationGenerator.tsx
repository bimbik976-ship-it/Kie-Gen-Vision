import React, { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Copy, Download, Flower2, ImagePlus, Loader2, Sparkles, WandSparkles, X } from 'lucide-react';
import { analyzeReference, requestSpaDecorationPrompt } from '../services/api';
import { KieKeyStatus, ReferenceAnalysis } from '../types';

const flowers = [
  'White Lotus','Pink Water Lily','Cherry Blossoms (Sakura)','Frangipani (Plumeria)','Wild Mountain Orchid','Japanese Camellia (Tsubaki)',
  'Single White Peony','Purple Water Iris','Floating Gardenia Petals','Hibiscus','Bougainvillea','Lavender','Hydrangea','Jasmine','Magnolia','Rose',
  'Tropical Mixed Flowers','Wild Meadow Flowers','No Flowers','Mixed Seasonal Blossoms','White Frangipani + Water Flowers','Small Floating White Flowers',
  'Purple Orchid','White Orchid','Blue Hydrangea','White Gardenia','Bird of Paradise','Lotus','Water Lily','Pink Orchid','White Magnolia','Camellia','Blue Iris',
  'White Lisianthus','Pink Chrysanthemum','White Stephanotis','Pink Ranunculus','White Anemone','Sweet Pea','White Tuberose','Pink Carnation'
];
const placements = [
  'Floating on Water','Beside Water Basin','Beside Spa Towels','Beside Candles','Around Zen Stones','Bamboo Platform','On Decorative Tray',
  'Scattered Petals','Beside Oil Bottles','Around Water Fountain','Flower Vase','Stone Ledge','On Zen Stones','On Spa Towels'
];
const decorOptions = ['Spa Towels','Aromatherapy Oil Bottles','Zen Stones','Candles','Bamboo Water Feature','Spa Tray','Flower Petals'];
const colors = ['Natural / Original','White','Soft Pink','Pink','Red','Purple','Blue','Yellow','Mixed Natural Colors'];

interface Props { keyStatus: KieKeyStatus; onOpenKeyModal: () => void; }

export const SpaDecorationGenerator: React.FC<Props> = ({ keyStatus, onOpenKeyModal }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageData, setImageData] = useState('');
  const [imageName, setImageName] = useState('');
  const [analysis, setAnalysis] = useState<ReferenceAnalysis | null>(null);
  const [model, setModel] = useState('gpt-5.5');
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [selectedPlacements, setSelectedPlacements] = useState<string[]>([]);
  const [selectedDecor, setSelectedDecor] = useState<string[]>(['Spa Towels','Zen Stones']);
  const [flowerColor, setFlowerColor] = useState('Natural / Original');
  const [quantity, setQuantity] = useState('Natural / Balanced');
  const [arrangement, setArrangement] = useState('Natural and organic');
  const [customNotes, setCustomNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<number | null>(null);

  const toggle = (value: string, values: string[], setter: (v: string[]) => void) => {
    setter(values.includes(value) ? values.filter(x => x !== value) : [...values, value]);
  };
  const detectedItems = useMemo(() => analysis?.decorationItems || [], [analysis]);

  const prepareImageForApi = async (file: File): Promise<string> => {
    const objectUrl = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.src = objectUrl;
      await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error('Gambar tidak dapat dibaca. Coba gunakan file JPG, PNG, atau WebP lain.'));
      });

      // Vercel Functions have a much smaller request-body limit than the local
      // Express server. Compress the reference image before base64 JSON upload.
      const maxBinaryBytes = 2.7 * 1024 * 1024;
      const dimensions = [1800, 1600, 1400, 1200, 1000];
      const qualities = [0.84, 0.76, 0.68, 0.60, 0.52];

      for (const maxDimension of dimensions) {
        const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
        const context = canvas.getContext('2d');
        if (!context) throw new Error('Browser tidak dapat memproses gambar ini.');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        for (const quality of qualities) {
          const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', quality));
          if (!blob) continue;
          if (blob.size <= maxBinaryBytes) {
            return await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(String(reader.result || ''));
              reader.onerror = () => reject(new Error('Gagal menyiapkan gambar untuk dikirim ke server.'));
              reader.readAsDataURL(blob);
            });
          }
        }
      }
      throw new Error('Gambar masih terlalu besar setelah kompresi. Pilih gambar dengan resolusi lebih kecil.');
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const upload = (file?: File) => {
    if (!file) return;
    if (!['image/jpeg','image/png','image/webp'].includes(file.type)) { setError('Gunakan gambar JPG, PNG, atau WebP.'); return; }
    if (file.size > 10 * 1024 * 1024) { setError('Ukuran gambar maksimal 10 MB.'); return; }
    setIsAnalyzing(true);
    setError('');
    void (async () => {
      try {
        const data = await prepareImageForApi(file);
        setImageData(data); setImageName(file.name); setAnalysis(null); setResult([]);
        const response = await analyzeReference({ chatModel: model, referenceImageData: data, referenceImageName: file.name });
        setAnalysis(response);
      } catch (e: any) {
        setError(e?.message || 'Analisis gambar gagal. Periksa koneksi API Kie.ai.');
      } finally {
        setIsAnalyzing(false);
      }
    })();
  };

  const generate = async () => {
    if (!imageData || !analysis) { setError('Upload dan analisis gambar terlebih dahulu.'); return; }
    if (!selectedFlowers.length && !selectedDecor.length) { setError('Pilih setidaknya satu bunga atau dekorasi.'); return; }
    const activeFlowers = selectedFlowers.filter(f => f !== 'No Flowers');
    if (activeFlowers.length && !selectedPlacements.length) { setError('Pilih lokasi penempatan untuk bunga.'); return; }
    setIsGenerating(true); setError(''); setResult([]);
    try {
      const data = await requestSpaDecorationPrompt({
        chatModel: model, referenceImageData: imageData, referenceImageName: imageName, referenceAnalysis: analysis,
        selectedFlowers, flowerColor, selectedPlacements, selectedDecor, quantity, arrangement, customNotes,
      });
      setResult(data.prompts || []);
      if (!data.prompts?.length) throw new Error('AI tidak mengembalikan prompt. Silakan coba lagi.');
    } catch (e: any) { setError(e?.message || 'Gagal membuat prompt.'); }
    finally { setIsGenerating(false); }
  };

  const copy = async (text: string, index: number) => { await navigator.clipboard.writeText(text); setCopied(index); window.setTimeout(() => setCopied(null), 1600); };

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button type="button" key={label} onClick={onClick} className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${active ? 'border-emerald-700 bg-emerald-50 text-emerald-900 shadow-sm' : 'border-stone-200 bg-white text-stone-600 hover:border-stone-400'}`}>{label}</button>
  );

  return <div className="space-y-6">
    <div className="flex flex-col gap-2 border-b border-stone-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div><div className="flex items-center gap-2"><Flower2 className="h-5 w-5 text-emerald-700"/><h1 className="text-lg font-semibold text-stone-900">AI Spa Decoration Analyzer</h1></div><p className="mt-1 text-xs text-stone-500">Analyze a spa image, choose your decorations, then generate a matching image prompt.</p></div>
      <span className={`rounded-full px-3 py-1 text-[11px] font-semibold ${keyStatus.connected ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>{keyStatus.connected ? 'Kie.ai API Connected' : 'API Key Required'}</span>
    </div>

    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-3 flex items-center justify-between"><div><h2 className="text-sm font-semibold text-stone-900">01 · Upload Reference Image</h2><p className="mt-1 text-xs text-stone-500">AI will analyze the image only. No prompt is generated at this stage.</p></div><span className="text-[10px] font-medium uppercase tracking-wide text-stone-400">Max 10 MB</span></div>
      {!imageData ? <button type="button" onClick={() => fileRef.current?.click()} className="flex min-h-44 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50/60 p-6 text-center hover:border-emerald-500 hover:bg-emerald-50/30"><ImagePlus className="mb-2 h-8 w-8 text-stone-400"/><span className="text-sm font-semibold text-stone-700">Upload spa reference image</span><span className="mt-1 text-xs text-stone-400">JPG, PNG, WebP · Click or select a file</span></button> : <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]"><div className="overflow-hidden rounded-xl border border-stone-200 bg-stone-100"><img src={imageData} alt="Spa reference" className="max-h-[360px] w-full object-contain"/></div><div className="flex flex-col justify-between gap-3"><div><p className="break-all text-xs font-semibold text-stone-700">{imageName}</p><p className="mt-2 text-xs text-stone-500">{analysis ? 'Image analysis completed. Choose decorations below when ready.' : isAnalyzing ? 'Analyzing image details…' : 'Image uploaded.'}</p></div><div className="space-y-2"><button type="button" onClick={() => fileRef.current?.click()} className="w-full rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700">Replace Image</button><button type="button" onClick={() => {setImageData('');setImageName('');setAnalysis(null);setResult([]);setError('');}} className="w-full rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700">Remove Image</button></div></div></div>}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={e => upload(e.target.files?.[0])}/>
      {isAnalyzing && <div className="mt-4 flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-xs font-medium text-blue-800"><Loader2 className="h-4 w-4 animate-spin"/> AI is analyzing composition, lighting, colors, objects, and decoration positions. Prompt generation is not running.</div>}
      {analysis && !isAnalyzing && <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4"><div className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-900"><CheckCircle2 className="h-4 w-4"/> Image Analysis Complete</div><div className="grid gap-3 text-xs sm:grid-cols-2"><div><span className="font-semibold text-stone-600">Scene / Background</span><p className="mt-1 text-stone-700">{analysis.background || analysis.kategori || 'Not specified'}</p></div><div><span className="font-semibold text-stone-600">Mood & Lighting</span><p className="mt-1 text-stone-700">{[analysis.mood,analysis.suasana].filter(Boolean).join(' · ') || 'Not specified'}</p></div><div><span className="font-semibold text-stone-600">Composition & Camera</span><p className="mt-1 text-stone-700">{[analysis.composition,analysis.cameraAngle,analysis.cameraFraming].filter(Boolean).join(' · ') || 'Not specified'}</p></div><div><span className="font-semibold text-stone-600">Detected Existing Decorations</span><p className="mt-1 text-stone-700">{detectedItems.length ? detectedItems.map(x => `${x.name} (${x.count}) — ${x.position}`).join('; ') : analysis.dekorasi || 'No clear decoration detected'}</p></div></div><p className="mt-3 border-t border-emerald-200 pt-3 text-[11px] font-semibold text-emerald-800">Analysis only · No prompt has been created.</p></div>}
    </section>

    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4"><h2 className="text-sm font-semibold text-stone-900">02 · Choose Flower Decorations</h2><p className="mt-1 text-xs text-stone-500">Select one or multiple flower types. The catalog follows your uploaded flower reference chart, with additional options.</p></div>
      <details className="mb-4 overflow-hidden rounded-xl border border-stone-200 bg-stone-50">
        <summary className="cursor-pointer px-3 py-2.5 text-xs font-semibold text-stone-700">View original flower catalog reference</summary>
        <img src="/flower-catalog-reference.png" alt="Flower catalog reference provided by the user" className="w-full object-contain" />
      </details>
      <div className="mb-4 flex flex-wrap gap-2">{flowers.map(f => chip(f, selectedFlowers.includes(f), () => setSelectedFlowers(current => f === 'No Flowers' ? (current.includes(f) ? [] : [f]) : (current.includes(f) ? current.filter(x => x !== f) : [...current.filter(x => x !== 'No Flowers'), f]))))}</div>
      <div className="grid gap-3 sm:grid-cols-3"><label className="text-xs font-medium text-stone-600">Flower color<select value={flowerColor} onChange={e=>setFlowerColor(e.target.value)} className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs">{colors.map(c=><option key={c}>{c}</option>)}</select></label><label className="text-xs font-medium text-stone-600">Flower quantity<select value={quantity} onChange={e=>setQuantity(e.target.value)} className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"><option>Minimal / Few</option><option>Natural / Balanced</option><option>Abundant / Lush</option></select></label><label className="text-xs font-medium text-stone-600">Arrangement style<select value={arrangement} onChange={e=>setArrangement(e.target.value)} className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"><option>Natural and organic</option><option>Minimalist</option><option>Symmetrical</option><option>Scattered naturally</option><option>Elegant floral arrangement</option></select></label></div>
    </section>

    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold text-stone-900">03 · Choose Flower Placement</h2><p className="mb-3 mt-1 text-xs text-stone-500">Choose where each selected flower or flower group should appear. Multiple locations are allowed.</p>
      <div className="flex flex-wrap gap-2">{placements.map(p=>chip(p,selectedPlacements.includes(p),()=>toggle(p,selectedPlacements,setSelectedPlacements)))}</div>
      <div className="mt-4 rounded-lg bg-stone-50 p-3 text-xs text-stone-600">Selected placements: <span className="font-semibold text-stone-800">{selectedPlacements.length ? selectedPlacements.join(' · ') : 'None selected'}</span></div>
    </section>

    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <h2 className="text-sm font-semibold text-stone-900">04 · Additional Spa Decorations</h2><p className="mb-3 mt-1 text-xs text-stone-500">Choose supporting decor to add or emphasize in the final image prompt.</p>
      <div className="flex flex-wrap gap-2">{decorOptions.map(d=>chip(d,selectedDecor.includes(d),()=>toggle(d,selectedDecor,setSelectedDecor)))}</div>
      <label className="mt-4 block text-xs font-medium text-stone-600">Additional instructions (optional)<textarea value={customNotes} onChange={e=>setCustomNotes(e.target.value)} rows={3} placeholder="Example: Place two neatly folded white spa towels beside the candle, keep the basin count unchanged…" className="mt-1.5 w-full rounded-lg border border-stone-200 p-3 text-xs outline-none focus:border-emerald-500"/></label>
    </section>

    <section className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid gap-3 sm:grid-cols-[1fr_220px]"><div><h2 className="text-sm font-semibold text-stone-900">05 · Generate Prompt</h2><p className="mt-1 text-xs text-stone-500">This is the only step that sends a prompt-generation request. It uses your reference image analysis and selected decorations.</p></div><label className="text-xs font-medium text-stone-600">Chat Model<select value={model} onChange={e=>setModel(e.target.value)} className="mt-1.5 w-full rounded-lg border border-stone-200 bg-white p-2.5 text-xs"><option value="gpt-5.5">GPT-5.5</option><option value="gpt-5.6">GPT-5.6</option><option value="gpt-6-astra">GPT-6 Astra</option></select></label></div>
      {error && <div className="mt-4 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-800"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0"/>{error}</div>}
      {!keyStatus.connected && <button type="button" onClick={onOpenKeyModal} className="mt-4 w-full rounded-lg border border-amber-300 bg-amber-50 py-2.5 text-xs font-semibold text-amber-900">Connect Kie.ai API Key</button>}
      <button type="button" disabled={!keyStatus.connected || !analysis || isAnalyzing || isGenerating} onClick={generate} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-xs font-bold tracking-wide text-white hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-40"><WandSparkles className="h-4 w-4 text-emerald-300"/>{isGenerating ? 'GENERATING PROMPTS…' : 'GENERATE SPA DECORATION PROMPTS'}</button>
    </section>

    {result.length > 0 && <section className="space-y-3 rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm sm:p-5"><div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-700"/><h2 className="text-sm font-semibold text-stone-900">Generated Prompt Results</h2></div>{result.map((prompt,i)=><article key={i} className="rounded-xl border border-stone-200 bg-stone-50 p-4"><div className="mb-2 flex items-center justify-between"><span className="text-xs font-bold text-stone-700">Prompt {i+1}</span><button type="button" onClick={()=>copy(prompt,i)} className="flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-stone-700">{copied===i?<CheckCircle2 className="h-3.5 w-3.5"/>:<Copy className="h-3.5 w-3.5"/>}{copied===i?'Copied':'Copy'}</button></div><p className="whitespace-pre-wrap text-xs leading-6 text-stone-700">{prompt}</p></article>)}</section>}
  </div>;
};
