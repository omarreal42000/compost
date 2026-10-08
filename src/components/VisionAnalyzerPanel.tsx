import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Layers, 
  FileText,
  Search,
  Eye
} from 'lucide-react';

export const VisionAnalyzerPanel: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [customPrompt, setCustomPrompt] = useState<string>(
    'Analiza esta imagen detalladamente en el contexto del proyecto de lombricultura de Salvador Velázquez en el centro universitario de Zapopan.'
  );
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Pre-configured reference cases based on Dan's uploaded images
  const referenceCases = [
    {
      id: 'brick_bed',
      title: 'Cantero de Ladrillo y Bambú (Foto 1)',
      description: 'Cantero angosto de mampostería con postes rústicos y cubierta.',
      prompt: 'Analiza la estructura de este cantero de ladrillo, el ancho de 1 metro y la idoneidad de la cubierta superior de bambú y lámina para la cría de lombriz roja californiana.',
      // Synthetic visual preview thumbnail
      color: 'from-amber-800 to-orange-950',
      icon: '🧱'
    },
    {
      id: 'satellite_coords',
      title: 'Satelital: 20.7436, -103.3767 (Foto 2)',
      description: 'Vista aérea de Google Earth con los círculos y el invernadero.',
      prompt: 'Analiza las coordenadas 20.7436, -103.3767 en Zapopan. Evalúa la zona central donde están los círculos concéntricos y el invernadero del suroeste como sitio de administración del criadero de lombrices.',
      color: 'from-emerald-800 to-teal-950',
      icon: '🛰️'
    },
    {
      id: 'concrete_pickup',
      title: 'Cantero de Concreto y Malla (Foto 3)',
      description: 'Cantero de placas premoldeadas con malla sombra negra y camioneta.',
      prompt: 'Evalúa la estructura de placas de cemento/concreto y la cubierta de malla sombra monofilamento para soportar la radiación solar y la maniobra de camionetas con sustrato.',
      color: 'from-stone-700 to-stone-900',
      icon: '🚛'
    },
    {
      id: 'indoor_brick',
      title: 'Batería de Canteros Invernadero (Foto 4)',
      description: 'Múltiples canteros de tabique rojo con humus oscuro y postes.',
      prompt: 'Analiza la disposición en batería de canteros de ladrillo rojo, la altura de las paredes y la calidad del humus negro y aireación interior para reproducción intensiva de Eisenia foetida.',
      color: 'from-red-900 to-amber-950',
      icon: '🪴'
    },
    {
      id: 'sprinklers_outdoor',
      title: 'Canteros con Microaspersores (Foto 5)',
      description: 'Canteros al aire libre con tubería de riego y aspersores activos.',
      prompt: 'Examina la distribución de aspersores de riego, el drenaje de lixiviados y el control de humedad para evitar la compactación o asfixia de la lombriz en días calurosos.',
      color: 'from-cyan-900 to-blue-950',
      icon: '💧'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMimeType(file.type || 'image/jpeg');
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setAnalysisResult(null);
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectCase = (caseItem: typeof referenceCases[0]) => {
    setCustomPrompt(caseItem.prompt);
    // Create an informative canvas-based representation for the analysis payload
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#1c1917';
      ctx.fillRect(0, 0, 600, 400);
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText(`Estudio: ${caseItem.title}`, 40, 60);
      ctx.fillStyle = '#d6d3d1';
      ctx.font = '16px sans-serif';
      ctx.fillText(caseItem.description, 40, 100);
      ctx.fillStyle = '#38bdf8';
      ctx.fillText('Coordenadas: 20.7436, -103.3767 (Zapopan, Jalisco)', 40, 140);
      ctx.fillStyle = '#a8a29e';
      ctx.font = '14px monospace';
      ctx.fillText(`Prompt: ${caseItem.prompt.slice(0, 70)}...`, 40, 190);
      
      setSelectedImage(canvas.toDataURL('image/jpeg'));
      setMimeType('image/jpeg');
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMessage('Por favor sube una imagen o selecciona uno de los casos de referencia.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType,
          prompt: customPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al comunicarse con Gemini');
      }

      setAnalysisResult(data.analysis || 'Análisis completado sin texto de salida.');
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error al procesar el análisis de imagen.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Visión Computacional & Análisis Biológico</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Analizador de Fotos con Gemini 3.1 Pro Preview
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Sube cualquier fotografía de tus canteros de vermicompostaje, captura satelital o instalaciones del centro universitario para recibir una auditoría técnica en tiempo real.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & References */}
        <div className="lg:col-span-5 space-y-5">
          {/* File Upload Box */}
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
            <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
              <Upload className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cargar Imagen</span>
            </span>

            <label className="border-2 border-dashed border-stone-700 hover:border-emerald-500/60 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-stone-950/50 hover:bg-stone-950/80 group">
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              <div className="w-12 h-12 rounded-xl bg-stone-900 flex items-center justify-center text-stone-400 group-hover:text-emerald-400 group-hover:scale-110 transition-all mb-2">
                <Camera className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-stone-200">
                Haz clic para subir o arrastra una foto
              </p>
              <p className="text-[11px] text-stone-400 mt-1">
                PNG, JPG, WEBP hasta 20 MB
              </p>
            </label>

            {/* Quick-Select Reference Cases based on user's attached images */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="text-xs font-semibold text-stone-300 flex items-center justify-between">
                <span>O selecciona una referencia de Dan:</span>
                <span className="text-[10px] text-stone-500">5 Casos</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {referenceCases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCase(c)}
                    className="w-full text-left p-2.5 rounded-lg border border-stone-800 bg-stone-950/60 hover:bg-stone-800/60 hover:border-emerald-500/40 transition-all flex items-center space-x-2.5"
                  >
                    <span className="text-lg">{c.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-stone-200 truncate">{c.title}</div>
                      <div className="text-[10px] text-stone-400 truncate">{c.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt input */}
            <div className="space-y-1.5 pt-2 border-t border-stone-800">
              <label className="text-xs font-semibold text-stone-300">
                Pregunta o Instrucción para Gemini 3.1 Pro:
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
                className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 focus:outline-none focus:border-emerald-500/60 resize-none font-mono"
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition-all ${
                isAnalyzing
                  ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 shadow-emerald-500/20 hover:scale-[1.02]'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-stone-400" />
                  <span>Analizando con Gemini 3.1 Pro Preview...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-stone-950" />
                  <span>Auditar Imagen con Gemini 3.1 Pro</span>
                </>
              )}
            </button>

            {errorMessage && (
              <div className="bg-rose-950/40 border border-rose-800/60 rounded-xl p-3 text-xs text-rose-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="text-[11px]">{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview & Analysis Report */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl min-h-[520px] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-stone-300 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dictamen Técnico y Reporte de Visión</span>
              </span>
              <span className="text-[11px] text-stone-500 font-mono">
                {isAnalyzing ? 'Procesando...' : analysisResult ? 'Auditoría Lista' : 'Esperando Imagen'}
              </span>
            </div>

            {/* Image Preview Box */}
            {selectedImage && (
              <div className="mb-4 bg-stone-950 border border-stone-800 rounded-xl overflow-hidden max-h-56 flex items-center justify-center p-2 relative group">
                <img
                  src={selectedImage}
                  alt="Previsualización"
                  referrerPolicy="no-referrer"
                  className="max-h-52 object-contain rounded-lg"
                />
              </div>
            )}

            {/* Analysis Output Container */}
            {analysisResult ? (
              <div className="flex-1 bg-stone-950/80 border border-stone-800 rounded-xl p-4 text-xs text-stone-200 leading-relaxed font-sans overflow-y-auto max-h-[380px] whitespace-pre-line space-y-2">
                {analysisResult}
              </div>
            ) : isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-800 rounded-xl p-8 text-center bg-stone-950/40 space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <h4 className="text-sm font-bold text-stone-200">
                  Gemini 3.1 Pro Preview está examinando la fotografía...
                </h4>
                <p className="text-xs text-stone-400 max-w-sm">
                  Extrayendo materiales, evaluando el ancho de 1m, densidad de población de Eisenia foetida y condiciones de sombra.
                </p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-800 rounded-xl p-8 text-center bg-stone-950/40">
                <Search className="w-8 h-8 text-stone-600 mb-2" />
                <h4 className="text-sm font-bold text-stone-300">
                  Ningún análisis activo
                </h4>
                <p className="text-xs text-stone-500 max-w-xs mt-1">
                  Sube una foto de tu cantero o selecciona un caso de referencia a la izquierda para iniciar la auditoría biológica.
                </p>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
              <span>Modelo: gemini-3.1-pro-preview</span>
              <span>Lombricultura UdeG Belenes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
