import React, { useState } from 'react';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Sliders, 
  Download, 
  Maximize2, 
  RefreshCw, 
  AlertCircle, 
  Check, 
  ExternalLink,
  Wand2,
  Copy,
  Info
} from 'lucide-react';
import { AspectRatioType, ImageSizeType } from '../types';

interface ImageGeneratorPanelProps {
  initialPreset?: string;
}

export const ImageGeneratorPanel: React.FC<ImageGeneratorPanelProps> = ({ initialPreset }) => {
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('16:9');
  const [imageSize, setImageSize] = useState<ImageSizeType>('2K');
  const [useStudioQuality, setUseStudioQuality] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<Array<{
    id: string;
    url: string;
    prompt: string;
    aspectRatio: string;
    imageSize: string;
    planeName: string;
    timestamp: string;
  }>>([]);
  const [selectedPreset, setSelectedPreset] = useState<string>(initialPreset || 'primer_plano');

  const presets = [
    {
      id: 'primer_plano',
      name: '1. Primer Plano (Cantero y Lombrices)',
      badge: 'Primer Plano',
      prompt: 'Detailed close-up eye-level perspective of an artisanal vermiculture bed (criadero de lombriz roja californiana) in an agricultural university research station. A rectangular raised bed built of red clay bricks and cement mortar, 1 meter wide, filled with deep rich dark organic earthworm humus and compost with visible red Californian worms (Eisenia foetida). Sturdy wooden posts support an overhead canopy made of agricultural black shade mesh (malla sombra) and translucent greenhouse plastic sheet that filters the bright sunlight. Visible micro-sprinkler irrigation tubing along the edge keeping the substrate moist. Lush grass and trees in the soft background. Realistic high-detail agricultural photography, bright daytime natural lighting.',
      description: 'Vista cercana del lecho de 1 metro de ancho, muros de tabique y la lombriz roja alimentándose bajo la sombra filtrada.'
    },
    {
      id: 'estructura_general',
      name: '2. Segundo Plano (Estructura General 10m)',
      badge: 'Segundo Plano',
      prompt: 'Mid-range wide shot of an open-air vermicomposting facility at a university agricultural experimental field. Two long parallel raised vermiculture beds (one mature bed 6 meters long, and one new bed 10 meters long) constructed from concrete slabs and red brick, 1 meter wide, under a rustic agricultural shelter structure with sturdy timber posts, black shade netting (malla sombra) roof canopy, and clear greenhouse plastic sheeting. An overhead micro-irrigation misting system is visible. A green wheelbarrow and garden tools rest on the dirt path. In the background, open green university campus fields, eucalyptus and acacia trees under a sunny blue sky. Photorealistic documentary style.',
      description: 'Vista de conjunto del módulo completo: el cantero de 6m y el nuevo de 10m con postes y techumbre de plástico y malla sombra.'
    },
    {
      id: 'toma_aerea',
      name: '3. Tercer Plano (Toma Aérea Coordenadas 20.7436, -103.3767)',
      badge: 'Toma Aérea',
      prompt: 'Low-altitude aerial drone perspective (bird\'s-eye view angled at 45 degrees) over a university agricultural campus field in Zapopan (coordinates 20.7436, -103.3767). Showing the agricultural station layout: a curved-roof greenhouse facility at one side, dirt access paths, distinct circular experimental ground tanks in the center, and adjacent to them, the newly established vermiculture module with long rectangular raised beds (6m and 10m long) sheltered under dark shade mesh and greenhouse plastic canopies. Surrounding green grass fields, scattered trees, and dirt service roads under bright daylight. Crisp photorealistic aerial photography.',
      description: 'Toma aérea a media altura sobre el predio del campus: muestra los círculos, el invernadero y los canteros en su ubicación exacta.'
    }
  ];

  const currentPresetData = presets.find(p => p.id === selectedPreset) || presets[0];
  const [customPrompt, setCustomPrompt] = useState<string>(currentPresetData.prompt);

  const handleSelectPreset = (id: string) => {
    setSelectedPreset(id);
    const p = presets.find(item => item.id === id);
    if (p) {
      setCustomPrompt(p.prompt);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: customPrompt,
          aspectRatio,
          imageSize,
          useStudioQuality
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'No se pudo generar la imagen con el modelo');
      }

      if (data.imageUrl) {
        setGeneratedImages(prev => [
          {
            id: Date.now().toString(),
            url: data.imageUrl,
            prompt: customPrompt,
            aspectRatio,
            imageSize,
            planeName: currentPresetData.badge,
            timestamp: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error durante la llamada a Gemini.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Estudio de Generación de Imágenes Fotográficas</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Generador IA de Vermicomposta y Entorno Universitario
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Produce las tres perspectivas fotográficas exactas solicitadas con <strong>gemini-3-pro-image-preview</strong> (calidad de estudio con resolución 1K, 2K o 4K) y relación de aspecto configurable (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9).
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Configuration Column */}
        <div className="lg:col-span-5 space-y-5">
          {/* Preset Selector */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                <span>Planos Solicitados por Dan</span>
              </span>
              <span className="text-[10px] text-stone-500 font-mono">3 Presets Listos</span>
            </div>

            <div className="space-y-2">
              {presets.map((preset) => {
                const isSelected = selectedPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-sm'
                        : 'bg-stone-950/60 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-stone-100">{preset.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-800 text-stone-400'
                      }`}>
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Prompt Editor */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <label className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>Prompt Fotorrealista:</span>
                <span className="text-[10px] text-stone-500">Español / Inglés para mayor fidelidad</span>
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={4}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-amber-500/60 resize-none font-mono"
              />
            </div>

            {/* Aspect Ratio Selector (Mandatory Affordance) */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300">
                  Relación de Aspecto (Aspect Ratio):
                </label>
                <span className="text-xs font-mono font-bold text-amber-400">{aspectRatio}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'] as AspectRatioType[]).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-medium transition-all ${
                      aspectRatio === ratio
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                        : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-white'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Resolution / Size Selector (Mandatory Affordance for Gemini 3 Pro Image) */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-stone-300">
                  Resolución / Tamaño (Image Size):
                </label>
                <span className="text-xs font-mono font-bold text-emerald-400">{imageSize}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['1K', '2K', '4K'] as ImageSizeType[]).map((size) => (
                  <button
                    key={size}
                    onClick={() => setImageSize(size)}
                    className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all ${
                      imageSize === size
                        ? 'bg-emerald-500 text-stone-950 font-bold shadow-sm'
                        : 'bg-stone-950 text-stone-400 border border-stone-800 hover:text-white'
                    }`}
                  >
                    {size} ({size === '1K' ? '1024px' : size === '2K' ? '2048px' : '4096px Ultra HD'})
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selector Toggle */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-stone-200">Modelo de Generación:</div>
                <div className="text-[11px] text-stone-400 font-mono">
                  {useStudioQuality ? 'gemini-3-pro-image-preview' : 'gemini-3.1-flash-image-preview'}
                </div>
              </div>
              <button
                onClick={() => setUseStudioQuality(!useStudioQuality)}
                className="px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700 text-[11px]"
              >
                {useStudioQuality ? 'Calidad Estudio Pro' : 'Modo Rápido Flash'}
              </button>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all ${
                isGenerating
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-stone-950 shadow-amber-500/20 hover:scale-[1.02]'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-400" />
                  <span>Sintetizando Imagen con Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Generar {currentPresetData.badge} en {imageSize} ({aspectRatio})</span>
                </>
              )}
            </button>

            {/* Error Message if Quota or API limit reached */}
            {errorMessage && (
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-3 text-xs text-rose-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <div>
                  <div className="font-bold">Aviso de Cuota / API:</div>
                  <div className="text-[11px] text-rose-200/90 mt-0.5">{errorMessage}</div>
                  <div className="text-[10px] text-rose-300/70 mt-1">
                    *Nota: Puedes visualizar la reconstrucción arquitectónica y de cotas en tiempo real directamente en las pestañas del visor superior (Plano 1, 2 y 3).
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Generated Showcase & Interactive Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl min-h-[520px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span>Resultados y Galería Generada ({generatedImages.length})</span>
              </span>
              <span className="text-[11px] text-stone-400 font-mono">
                {generatedImages.length > 0 ? 'Listas para descarga' : 'Esperando generación'}
              </span>
            </div>

            {generatedImages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-800 rounded-xl p-8 text-center bg-stone-950/40">
                <div className="w-16 h-16 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-500 mb-3 shadow-inner">
                  <ImageIcon className="w-8 h-8 text-amber-500/60" />
                </div>
                <h4 className="text-sm font-bold text-stone-200 mb-1">
                  Listo para renderizar los 3 planos
                </h4>
                <p className="text-xs text-stone-400 max-w-md leading-relaxed mb-4">
                  Selecciona cualquiera de los tres presets (Primer Plano, Estructura General de 10m o Toma Aérea en 20.7436, -103.3767) y presiona "Generar".
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => handleSelectPreset('primer_plano')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700"
                  >
                    Probar 1. Primer Plano
                  </button>
                  <button
                    onClick={() => handleSelectPreset('estructura_general')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700"
                  >
                    Probar 2. Estructura 10m
                  </button>
                  <button
                    onClick={() => handleSelectPreset('toma_aerea')}
                    className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium border border-stone-700"
                  >
                    Probar 3. Toma Aérea
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 flex-1">
                {/* Main featured result */}
                <div className="bg-stone-950 border border-stone-800 rounded-xl overflow-hidden shadow-2xl relative group">
                  <img
                    src={generatedImages[0].url}
                    alt={generatedImages[0].planeName}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-[420px] object-contain bg-black mx-auto"
                  />
                  <div className="p-3 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white mr-2">{generatedImages[0].planeName}</span>
                      <span className="text-stone-400 font-mono">
                        {generatedImages[0].aspectRatio} • {generatedImages[0].imageSize} • {generatedImages[0].timestamp}
                      </span>
                    </div>
                    <a
                      href={generatedImages[0].url}
                      download={`vermicomposta_${generatedImages[0].planeName.toLowerCase().replace(/\s+/g, '_')}.png`}
                      className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 flex items-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Descargar</span>
                    </a>
                  </div>
                </div>

                {/* Thumbnail strip if multiple images */}
                {generatedImages.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {generatedImages.slice(1).map((item) => (
                      <div key={item.id} className="relative rounded-lg overflow-hidden border border-stone-800 bg-stone-950 aspect-video group">
                        <img
                          src={item.url}
                          alt={item.planeName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <span className="text-[10px] font-bold text-white bg-stone-900/90 px-2 py-0.5 rounded">
                            {item.planeName}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
