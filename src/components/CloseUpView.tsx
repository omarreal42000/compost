import React, { useState } from 'react';
import { 
  Droplets, 
  Sun, 
  Layers, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  Maximize2,
  Thermometer,
  Wrench,
  CheckCircle2,
  ZoomIn
} from 'lucide-react';
import { ViewAnnotation } from '../types';

interface CloseUpViewProps {
  onGenerateAI: (presetName: string) => void;
}

export const CloseUpView: React.FC<CloseUpViewProps> = ({ onGenerateAI }) => {
  const [activeLayer, setActiveLayer] = useState<'normal' | 'cross_section' | 'moisture'>('normal');
  const [isWatering, setIsWatering] = useState<boolean>(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>('lombriz');

  const annotations: ViewAnnotation[] = [
    {
      id: 'cantero',
      x: 25,
      y: 65,
      title: 'Pared de Mampostería (Ladrillo / Cemento)',
      category: 'estructura',
      description: 'Muros de 1.0 m de ancho interior por 0.65 m de alto.',
      detail: 'Construido con tabique rojo recocido o placas de concreto premoldeadas como describe Salvador Velázquez. La masa térmica del cemento y ladrillo amortigua la oscilación de temperatura de Zapopan (que puede oscilar de 12°C por la madrugada a 32°C al mediodía), protegiendo el nido de la lombriz.'
    },
    {
      id: 'lombriz',
      x: 52,
      y: 55,
      title: 'Lecho Biológico de Lombriz Roja (Eisenia foetida)',
      category: 'biologia',
      description: 'Sustrato orgánico enriquecido y humus vermicompostado.',
      detail: 'Salvador destaca que en el cantero maduro la población ya excedió el límite de sobrepoblación (más de 3 kg de biomasa por metro cuadrado). El sustrato luce oscuro, esponjoso, con textura de café molido, pH neutro (6.8 a 7.2) y rico en auxinas, giberelinas y microorganismos benéficos.'
    },
    {
      id: 'riego',
      x: 78,
      y: 45,
      title: 'Línea de Microaspersores y Nebulización',
      category: 'riego',
      description: 'Tubería de PE con boquillas microaspersoras a cada 1.5 metros.',
      detail: 'Mantiene el sustrato al 75-80% de humedad relativa sin compactar la tierra. Como la lombriz respira a través de su cutícula húmeda, la falta de humedad detiene la reproducción y el exceso de agua anega el sustrato provocando asfixia.'
    },
    {
      id: 'mallasombra',
      x: 50,
      y: 18,
      title: 'Malla Sombra 80% + Plástico de Invernadero',
      category: 'cobertura',
      description: 'Doble techumbre suspendida sobre postes de madera tratada o bambú.',
      detail: 'El plástico superior desvía los aguaceros intensos del verano tapatío (evitando el lavado de nutrientes y escape de lombrices), mientras la malla sombra reduce la radiación UV en un 80%, creando un microclima sombreado y fresco imprescindible en un centro universitario.'
    }
  ];

  const currentHotspotData = annotations.find(a => a.id === selectedHotspot) || annotations[1];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>Plano 1 de 3 • Perspectiva de Detalle</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Primer Plano: Cantero y Lecho de Lombriz Roja
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Visualización a nivel de ojos del criadero de 1 metro de ancho. Muestra el sustrato biológico maduro, el muro de tabique/cemento, la malla sombra cenital y el sistema de riego por microaspersión descritos por Salvador Velázquez.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onGenerateAI('primer_plano')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-semibold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Generar con Gemini 3 Pro (IA)</span>
            </button>
          </div>
        </div>

        {/* View Mode Toolbar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-stone-400 font-medium">Modo de visualización:</span>
            <div className="bg-stone-950 p-1 rounded-lg border border-stone-800 flex space-x-1">
              <button
                onClick={() => setActiveLayer('normal')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  activeLayer === 'normal' 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                Perspectiva Real
              </button>
              <button
                onClick={() => setActiveLayer('cross_section')}
                className={`px-3 py-1 rounded-md transition-all font-medium flex items-center space-x-1 ${
                  activeLayer === 'cross_section' 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>Corte de Capas</span>
              </button>
              <button
                onClick={() => setActiveLayer('moisture')}
                className={`px-3 py-1 rounded-md transition-all font-medium flex items-center space-x-1 ${
                  activeLayer === 'moisture' 
                    ? 'bg-amber-500 text-stone-950 shadow-sm' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Droplets className="w-3 h-3" />
                <span>Gradiente de Humedad</span>
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWatering(!isWatering)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                isWatering
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 animate-pulse'
                  : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:text-cyan-300 hover:border-cyan-500/40'
              }`}
            >
              <Droplets className={`w-3.5 h-3.5 ${isWatering ? 'text-cyan-400 animate-bounce' : 'text-stone-400'}`} />
              <span>{isWatering ? 'Riego Activo (75% HR)' : 'Simular Microaspersión'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Visual Display & Interactive Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Frame */}
        <div className="lg:col-span-8 bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden relative shadow-2xl group min-h-[460px] flex flex-col justify-between">
          {/* Natural Environmental SVG Illustration & Architectural Macro Render */}
          <div className="relative w-full h-full min-h-[440px] flex items-center justify-center bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 overflow-hidden">
            
            {/* Background University Vegetation */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-950/60 via-stone-950 to-stone-950"></div>
            
            {/* SVG Illustration of the Vermiculture Bed in Close-up */}
            <svg 
              className="w-full h-full max-h-[500px] select-none" 
              viewBox="0 0 800 500" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Brick Pattern */}
                <pattern id="brickPattern" width="40" height="20" patternUnits="userSpaceOnUse">
                  <rect width="40" height="20" fill="#a44222"/>
                  <rect x="0.5" y="0.5" width="39" height="9" fill="#bd5332" stroke="#692411" strokeWidth="1"/>
                  <rect x="20.5" y="10.5" width="39" height="9" fill="#9c3c1e" stroke="#692411" strokeWidth="1"/>
                </pattern>
                
                {/* Compost Humus Texture */}
                <linearGradient id="humusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c1d11" />
                  <stop offset="50%" stopColor="#1a110a" />
                  <stop offset="100%" stopColor="#100b06" />
                </linearGradient>

                {/* Shade Mesh Canopy Gradient */}
                <linearGradient id="meshGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1a1c1e" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0.8" />
                </linearGradient>

                {/* Sunlight Rays Filtered by Mesh */}
                <linearGradient id="sunbeam" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.0" />
                </linearGradient>

                {/* Moisture Mist Gradient */}
                <radialGradient id="mistGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Sky and University Background Trees */}
              <rect x="0" y="0" width="800" height="200" fill="#1c2522" opacity="0.6"/>
              <path d="M0 160 Q 150 130 300 150 T 600 140 T 800 160 L 800 240 L 0 240 Z" fill="#1b3022" opacity="0.8"/>
              <circle cx="120" cy="120" r="45" fill="#2d4a34" opacity="0.7"/>
              <circle cx="210" cy="110" r="60" fill="#233d2a" opacity="0.8"/>
              <circle cx="680" cy="115" r="55" fill="#2d4a34" opacity="0.7"/>

              {/* Wooden Structural Posts / Timber Posts */}
              {/* Back Left Post */}
              <rect x="110" y="40" width="22" height="260" rx="3" fill="#6d4c33" stroke="#4a311d" strokeWidth="2"/>
              {/* Back Right Post */}
              <rect x="670" y="40" width="22" height="260" rx="3" fill="#6d4c33" stroke="#4a311d" strokeWidth="2"/>
              {/* Front Left Post (Prominent) */}
              <rect x="60" y="10" width="28" height="420" rx="4" fill="#8d5b38" stroke="#5a371c" strokeWidth="2"/>
              {/* Bamboo/wood rings */}
              <line x1="60" y1="80" x2="88" y2="80" stroke="#5a371c" strokeWidth="2"/>
              <line x1="60" y1="160" x2="88" y2="160" stroke="#5a371c" strokeWidth="2"/>
              <line x1="60" y1="240" x2="88" y2="240" stroke="#5a371c" strokeWidth="2"/>
              <line x1="60" y1="320" x2="88" y2="320" stroke="#5a371c" strokeWidth="2"/>

              {/* Overhead Canopy: Wooden Rafters */}
              <path d="M50 30 L 740 50 L 730 65 L 45 45 Z" fill="#5a371c"/>
              <path d="M70 20 L 400 5 L 750 35 L 720 50 L 390 22 L 55 35 Z" fill="#6d4c33"/>

              {/* Greenhouse Translucent Plastic Roof & Black Shade Netting (Malla Sombra) */}
              <polygon points="50,15 760,35 730,75 35,55" fill="url(#meshGrad)" stroke="#374151" strokeWidth="1.5"/>
              {/* Mesh Texture Gridlines */}
              <path d="M60 25 L 740 45 M 70 35 L 720 55 M 80 45 L 700 65" stroke="#4b5563" strokeWidth="0.8" strokeDasharray="3 3"/>
              
              {/* Filtered Golden Sunlight Rays */}
              <polygon points="120,45 280,240 200,240 80,45" fill="url(#sunbeam)"/>
              <polygon points="400,50 560,250 480,250 360,50" fill="url(#sunbeam)"/>

              {/* The Vermiculture Bed (Perspective view looking inside the 1m wide criadero) */}
              {/* Bed Outer/Back Foundation */}
              <polygon points="180,220 620,220 580,280 220,280" fill="#4a1d0f" stroke="#2b1109" strokeWidth="2"/>
              
              {/* Bed Floor and Ground Dirt Path */}
              <path d="M0 320 L 800 320 L 800 500 L 0 500 Z" fill="#2d2621"/>
              {/* Natural soil texture variations */}
              <circle cx="140" cy="380" r="6" fill="#1f1a16"/>
              <circle cx="700" cy="390" r="9" fill="#1f1a16"/>

              {/* Bed Internal Volume / Humus Mass (6m-10m bed running in perspective) */}
              <polygon 
                points="130,280 670,280 760,460 40,460" 
                fill="url(#humusGrad)" 
                stroke="#170e06" 
                strokeWidth="2"
              />

              {/* Left Front Brick Wall (1m wide headwall) */}
              <path 
                d="M40 340 L 40 460 L 140 460 L 140 340 Z" 
                fill="#bd5332" 
                stroke="#4a1a0c" 
                strokeWidth="2"
              />
              {/* Left wall brick rows */}
              <line x1="40" y1="365" x2="140" y2="365" stroke="#5a2211" strokeWidth="2"/>
              <line x1="40" y1="390" x2="140" y2="390" stroke="#5a2211" strokeWidth="2"/>
              <line x1="40" y1="415" x2="140" y2="415" stroke="#5a2211" strokeWidth="2"/>
              <line x1="40" y1="440" x2="140" y2="440" stroke="#5a2211" strokeWidth="2"/>
              {/* Vertical mortared joints */}
              <line x1="90" y1="340" x2="90" y2="365" stroke="#5a2211" strokeWidth="2"/>
              <line x1="65" y1="365" x2="65" y2="390" stroke="#5a2211" strokeWidth="2"/>
              <line x1="115" y1="365" x2="115" y2="390" stroke="#5a2211" strokeWidth="2"/>
              <line x1="90" y1="390" x2="90" y2="415" stroke="#5a2211" strokeWidth="2"/>
              <line x1="65" y1="415" x2="65" y2="440" stroke="#5a2211" strokeWidth="2"/>
              <line x1="115" y1="415" x2="115" y2="440" stroke="#5a2211" strokeWidth="2"/>

              {/* Long Side Brick Wall Perspective (Length of the 10m/6m cantero) */}
              <polygon 
                points="40,340 140,340 670,260 620,260" 
                fill="#9e3d20" 
                stroke="#5a2211" 
                strokeWidth="1.5"
              />
              
              {/* Right Side Wall Edge */}
              <polygon 
                points="660,340 760,460 760,470 660,350" 
                fill="#823118" 
                stroke="#4a1a0c" 
                strokeWidth="1"
              />

              {/* Micro-Sprinkler Irrigation Pipe along the left and overhead */}
              <path 
                d="M50 330 L 635 255" 
                stroke="#0284c7" 
                strokeWidth="6" 
                strokeLinecap="round"
              />
              {/* Sprinkler Nozzles with blue connector tabs */}
              <circle cx="160" cy="316" r="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5"/>
              <circle cx="320" cy="296" r="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5"/>
              <circle cx="480" cy="276" r="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5"/>

              {/* Animated / Simulated Irrigation Water Spraying */}
              {isWatering && (
                <g className="animate-pulse">
                  {/* Mist circles over nozzles */}
                  <circle cx="160" cy="316" r="45" fill="url(#mistGrad)"/>
                  <circle cx="320" cy="296" r="45" fill="url(#mistGrad)"/>
                  <circle cx="480" cy="276" r="40" fill="url(#mistGrad)"/>
                  
                  {/* Droplet arcs */}
                  <path d="M160 316 Q 190 300 240 330 M 160 316 Q 130 305 100 340 M 160 316 Q 170 280 200 310" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <path d="M320 296 Q 350 280 400 310 M 320 296 Q 290 285 260 320 M 320 296 Q 330 260 360 290" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <path d="M480 276 Q 510 260 550 285 M 480 276 Q 450 265 420 300" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="3 3"/>
                </g>
              )}

              {/* Visualizing Substrate Organic Texture & Red Worms (Eisenia foetida) */}
              <g id="organicSubstrateDetails">
                {/* Dark humus lumps */}
                <ellipse cx="260" cy="370" rx="35" ry="12" fill="#1b120a"/>
                <ellipse cx="440" cy="360" rx="45" ry="14" fill="#24170d"/>
                <ellipse cx="580" cy="380" rx="40" ry="15" fill="#190f08"/>
                <ellipse cx="360" cy="420" rx="60" ry="18" fill="#150d06"/>
                <ellipse cx="520" cy="430" rx="55" ry="16" fill="#1f140b"/>

                {/* Visible Red Californian Worms (Eisenia foetida) wriggling in humus */}
                <path d="M 230 365 Q 242 360 255 368 T 270 364" stroke="#e11d48" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M 330 405 Q 345 398 355 407 T 375 402" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M 420 375 Q 432 383 445 377 T 460 384" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M 500 415 Q 512 408 525 418 T 540 412" stroke="#be123c" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                <path d="M 380 435 Q 395 442 410 436 T 425 444" stroke="#fb7185" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
                <path d="M 280 420 Q 292 412 305 422 T 320 418" stroke="#e11d48" strokeWidth="3.2" strokeLinecap="round" fill="none"/>
              </g>

              {/* Layer Overlay: Cross-Section View */}
              {activeLayer === 'cross_section' && (
                <g id="crossSectionOverlay">
                  <rect x="180" y="320" width="440" height="130" rx="8" fill="#0c0a09" fillOpacity="0.88" stroke="#f59e0b" strokeWidth="2"/>
                  <line x1="180" y1="355" x2="620" y2="355" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4"/>
                  <line x1="180" y1="400" x2="620" y2="400" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4"/>
                  
                  <text x="200" y="345" fill="#fef08a" fontSize="13" fontWeight="bold">Capas de 0 a 15 cm: Alimento fresco + Alta densidad de lombrices</text>
                  <text x="200" y="385" fill="#fed7aa" fontSize="13" fontWeight="bold">Capas de 15 a 40 cm: Humus en maduración y capullos (cocones)</text>
                  <text x="200" y="430" fill="#cbd5e1" fontSize="13" fontWeight="bold">Fondo con 1.5% pendiente: Drenaje de lixiviado hacia colector</text>
                </g>
              )}

              {/* Layer Overlay: Moisture Heatmap */}
              {activeLayer === 'moisture' && (
                <g id="moistureOverlay">
                  <polygon points="130,280 670,280 760,460 40,460" fill="#0284c7" fillOpacity="0.45"/>
                  <rect x="220" y="340" width="360" height="80" rx="8" fill="#0369a1" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="2"/>
                  <text x="240" y="375" fill="#ffffff" fontSize="15" fontWeight="bold">Humedad Medida: 78.4% HR (Zona Óptima)</text>
                  <text x="240" y="402" fill="#bae6fd" fontSize="12">Rango recomendado por biólogo: 70% - 85% para Eisenia foetida</text>
                </g>
              )}
            </svg>

            {/* Interactive Hotspot Markers */}
            {annotations.map((anno) => {
              const isSelected = selectedHotspot === anno.id;
              return (
                <button
                  key={anno.id}
                  onClick={() => setSelectedHotspot(anno.id)}
                  style={{ left: `${anno.x}%`, top: `${anno.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110 z-20'
                  }`}
                  title={anno.title}
                >
                  <span className="relative flex h-8 w-8 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      anno.category === 'biologia' ? 'bg-rose-400' :
                      anno.category === 'riego' ? 'bg-cyan-400' :
                      anno.category === 'estructura' ? 'bg-amber-400' : 'bg-purple-400'
                    }`}></span>
                    <span className={`relative inline-flex rounded-full h-7 w-7 items-center justify-center text-xs font-bold shadow-lg border-2 border-white ${
                      anno.category === 'biologia' ? 'bg-rose-600 text-white' :
                      anno.category === 'riego' ? 'bg-cyan-600 text-white' :
                      anno.category === 'estructura' ? 'bg-amber-600 text-stone-950' : 'bg-purple-600 text-white'
                    }`}>
                      {anno.category === 'biologia' ? '🪱' :
                       anno.category === 'riego' ? '💧' :
                       anno.category === 'estructura' ? '🧱' : '☂️'}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Overlay Legend */}
          <div className="bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-3 px-4 flex flex-wrap items-center justify-between text-xs text-stone-300">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-amber-400 font-mono font-medium">
                <span>Ancho:</span>
                <span className="text-white">1.0 metro</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center space-x-1 text-rose-400 font-mono font-medium">
                <span>Especie:</span>
                <span className="text-white italic">Eisenia foetida</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center space-x-1 text-cyan-400 font-mono font-medium">
                <span>Humedad:</span>
                <span className="text-white">75% - 80%</span>
              </span>
            </div>
            <div className="text-stone-500 font-mono text-[11px] mt-1 sm:mt-0">
              *Toca los pines de colores para inspeccionar cada elemento
            </div>
          </div>
        </div>

        {/* Technical Detail Card for Selected Element */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  currentHotspotData.category === 'biologia' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                  currentHotspotData.category === 'riego' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                  currentHotspotData.category === 'estructura' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {currentHotspotData.category}
                </span>
                <span className="text-xs text-stone-400 font-mono">Biól. S. Velázquez</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {currentHotspotData.title}
              </h3>
              
              <p className="text-xs font-semibold text-amber-400/90 mb-3">
                {currentHotspotData.description}
              </p>

              <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-3.5 text-xs text-stone-300 leading-relaxed mb-4">
                {currentHotspotData.detail}
              </div>

              {/* Operational specs list */}
              <div className="space-y-2 border-t border-stone-800 pt-3">
                <div className="text-xs font-semibold text-stone-200">Parámetros Críticos en Primer Plano:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-stone-950 p-2 rounded-lg border border-stone-800/60">
                    <div className="text-stone-400">Profundidad lecho</div>
                    <div className="text-stone-100 font-bold font-mono">40 - 55 cm</div>
                  </div>
                  <div className="bg-stone-950 p-2 rounded-lg border border-stone-800/60">
                    <div className="text-stone-400">Población crítica</div>
                    <div className="text-rose-400 font-bold font-mono">&gt; 3 kg/m² (Saturado)</div>
                  </div>
                  <div className="bg-stone-950 p-2 rounded-lg border border-stone-800/60">
                    <div className="text-stone-400">Sombra filtrada</div>
                    <div className="text-amber-400 font-bold font-mono">80% malla monofilamento</div>
                  </div>
                  <div className="bg-stone-950 p-2 rounded-lg border border-stone-800/60">
                    <div className="text-stone-400">Material paredes</div>
                    <div className="text-stone-100 font-bold font-mono">Tabique / Cemento</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Action Box */}
            <div className="mt-4 pt-3 border-t border-stone-800">
              <button
                onClick={() => onGenerateAI('primer_plano')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-all border border-stone-700 hover:border-amber-500/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Generar Foto Fotorrealista de este Primer Plano</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
