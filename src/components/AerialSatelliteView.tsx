import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Compass, 
  Maximize2, 
  Navigation, 
  Layers, 
  CheckCircle2, 
  SunMedium, 
  Trees, 
  Footprints,
  Info,
  Droplet
} from 'lucide-react';

interface AerialSatelliteViewProps {
  onGenerateAI: (presetName: string) => void;
  onOpenAnalysis: () => void;
}

export const AerialSatelliteView: React.FC<AerialSatelliteViewProps> = ({ 
  onGenerateAI,
  onOpenAnalysis 
}) => {
  const [showOverlays, setShowOverlays] = useState<boolean>(true);
  const [highlightZone, setHighlightZone] = useState<'vermicomposta' | 'circulos' | 'invernadero' | 'acceso'>('vermicomposta');
  const [zoomLevel, setZoomLevel] = useState<'drone' | 'satellite'>('drone');

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Plano 3 de 3 • Toma Aérea Georreferenciada</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Toma Aérea: Ubicación en Campus (20.7436, -103.3767)
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Perspectiva aérea cenital a baja altura sobre el predio del centro universitario en Zapopan. Integra la zona de los círculos concéntricos, el invernadero anexo y el emplazamiento idóneo para los canteros de 6m y 10m bajo malla sombra.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onGenerateAI('toma_aerea')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-stone-950 font-semibold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-stone-950" />
              <span>Generar con Gemini 3 Pro (IA)</span>
            </button>
            <button
              onClick={onOpenAnalysis}
              className="flex items-center space-x-1.5 px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-medium border border-stone-700"
            >
              <Compass className="w-3.5 h-3.5 text-purple-400" />
              <span>Ver Estudio de Suelo y Clima</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-stone-400 font-medium">Elementos en el mapa:</span>
            <div className="bg-stone-950 p-1 rounded-lg border border-stone-800 flex flex-wrap gap-1">
              <button
                onClick={() => setHighlightZone('vermicomposta')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightZone === 'vermicomposta' ? 'bg-emerald-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                📍 Módulo Vermicomposta (Propuesto)
              </button>
              <button
                onClick={() => setHighlightZone('circulos')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightZone === 'circulos' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                ⭕ Zona de Círculos
              </button>
              <button
                onClick={() => setHighlightZone('invernadero')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightZone === 'invernadero' ? 'bg-blue-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                🏠 Invernadero / Agua
              </button>
              <button
                onClick={() => setHighlightZone('acceso')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightZone === 'acceso' ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                🛣️ Acceso Parres Arias
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowOverlays(!showOverlays)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showOverlays ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' : 'bg-stone-800 text-stone-300 border-stone-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showOverlays ? 'Ocultar Capas GIS' : 'Mostrar Capas GIS'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Satellite & Drone Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden relative shadow-2xl min-h-[500px] flex flex-col justify-between">
          <div className="relative w-full h-full min-h-[480px] flex items-center justify-center bg-stone-950 overflow-hidden">
            
            {/* SVG Reconstruction of the Aerial Coordinates 20.7436, -103.3767 */}
            <svg 
              className="w-full h-full max-h-[540px] select-none" 
              viewBox="0 0 850 560" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Terrain Grass and Soil Texture Gradient */}
                <radialGradient id="fieldGrad" cx="45%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="#324a30" />
                  <stop offset="40%" stopColor="#2b3f2a" />
                  <stop offset="70%" stopColor="#233423" />
                  <stop offset="100%" stopColor="#1a271a" />
                </radialGradient>

                {/* Dirt Road Texture */}
                <linearGradient id="dirtRoad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#63594b" />
                  <stop offset="50%" stopColor="#7a6f5e" />
                  <stop offset="100%" stopColor="#574e41" />
                </linearGradient>

                {/* Greenhouse curved roof metallic finish */}
                <linearGradient id="greenhouseRoof" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e3a5f" />
                  <stop offset="30%" stopColor="#2563eb" />
                  <stop offset="70%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#0f2744" />
                </linearGradient>
              </defs>

              {/* Base University Agricultural Field Terrain */}
              <rect width="850" height="560" fill="url(#fieldGrad)" />

              {/* Surrounding Forested Patches & Native Trees (Zapopan valley flora) */}
              {/* Bottom dense tree canopy */}
              <path d="M0 450 Q 200 420 400 460 T 850 440 L 850 560 L 0 560 Z" fill="#142415" />
              <circle cx="150" cy="500" r="45" fill="#1b331d"/>
              <circle cx="280" cy="480" r="55" fill="#18301a"/>
              <circle cx="480" cy="510" r="60" fill="#1c361e"/>
              <circle cx="680" cy="490" r="50" fill="#182e1a"/>

              {/* Scattered Trees across field matching satellite image */}
              <circle cx="150" cy="280" r="30" fill="#1b321c" opacity="0.9"/>
              <circle cx="450" cy="120" r="22" fill="#1b321c" opacity="0.85"/>
              <circle cx="560" cy="180" r="26" fill="#1f3820" opacity="0.85"/>
              <circle cx="630" cy="300" r="28" fill="#1d351e" opacity="0.85"/>
              <circle cx="730" cy="200" r="24" fill="#1b321c" opacity="0.8"/>
              <circle cx="340" cy="70" r="20" fill="#1f3820" opacity="0.8"/>

              {/* Western Perimeter Road: "Prolongación José Parres Arias" */}
              <path 
                d="M 120 0 L 0 350 L 0 560 L 60 560 L 140 300 L 160 0 Z" 
                fill="#423d37" 
                stroke="#2b2824" 
                strokeWidth="2"
              />
              {/* Road edge markers */}
              <line x1="120" y1="0" x2="0" y2="350" stroke="#78716c" strokeWidth="1" strokeDasharray="6 6"/>

              {/* Internal Dirt Loop Trails (Senderos y caminos de terracería del predio) */}
              {/* North Loop Road */}
              <path 
                d="M 140 160 Q 280 180 450 140 T 640 60 T 700 140 L 680 160 Q 640 90 450 165 T 140 185 Z" 
                fill="url(#dirtRoad)" 
                opacity="0.85"
              />
              {/* East South Connecting Trail */}
              <path 
                d="M 680 150 L 690 340 L 740 370 L 650 380 L 640 560 L 610 560 L 620 370 L 660 340 L 650 160 Z" 
                fill="url(#dirtRoad)" 
                opacity="0.85"
              />
              {/* Central Path connecting to the Circles and Greenhouse */}
              <path 
                d="M 230 380 L 320 350 L 410 350 L 410 320 L 320 320 L 230 360 Z" 
                fill="url(#dirtRoad)" 
                opacity="0.9"
              />

              {/* FACILITY 1: The Greenhouse with Curved Blue Roof & Red Shed Roof (South-West) */}
              <g id="greenhouseFacility" opacity={highlightZone === 'invernadero' || highlightZone === 'vermicomposta' ? 1 : 0.6}>
                {/* Red Roof Annex */}
                <polygon points="90,370 140,375 135,425 85,420" fill="#991b1b" stroke="#7f1d1d" strokeWidth="1.5"/>
                {/* Curved Greenhouse Roof (Blue ribbed agricultural canopy) */}
                <polygon points="138,375 225,385 218,435 133,425" fill="url(#greenhouseRoof)" stroke="#1e40af" strokeWidth="2"/>
                {/* Greenhouse longitudinal structural arches */}
                <line x1="150" y1="376" x2="145" y2="426" stroke="#93c5fd" strokeWidth="1" opacity="0.7"/>
                <line x1="165" y1="378" x2="160" y2="428" stroke="#93c5fd" strokeWidth="1" opacity="0.7"/>
                <line x1="180" y1="380" x2="175" y2="430" stroke="#93c5fd" strokeWidth="1" opacity="0.7"/>
                <line x1="195" y1="382" x2="190" y2="432" stroke="#93c5fd" strokeWidth="1" opacity="0.7"/>
                <line x1="210" y1="384" x2="205" y2="434" stroke="#93c5fd" strokeWidth="1" opacity="0.7"/>
                
                {/* Label Tag */}
                <rect x="100" y="345" width="130" height="20" rx="4" fill="#0f172a" fillOpacity="0.85" stroke="#3b82f6" strokeWidth="1"/>
                <text x="110" y="359" fill="#93c5fd" fontSize="10" fontWeight="bold">Nave / Invernadero</text>
              </g>

              {/* FACILITY 2: The Distinct Circular Structures in the Center ("la zona donde estan los circulos") */}
              <g id="circularStructures" opacity={highlightZone === 'circulos' || highlightZone === 'vermicomposta' ? 1 : 0.6}>
                {/* Hardened circular perimeter pads */}
                <rect x="290" y="270" width="145" height="95" rx="8" fill="#4a4237" opacity="0.4"/>
                
                {/* Top North Circle */}
                <circle cx="330" cy="290" r="17" fill="#6b5f4c" stroke="#d97706" strokeWidth="2.5"/>
                <circle cx="330" cy="290" r="10" fill="#2d261e"/>

                {/* Bottom Row: 3 Linked Circles (as seen in satellite photo) */}
                {/* Left circle */}
                <circle cx="320" cy="345" r="18" fill="#6b5f4c" stroke="#d97706" strokeWidth="2.5"/>
                <circle cx="320" cy="345" r="11" fill="#362f27"/>
                
                {/* Middle circle */}
                <circle cx="360" cy="350" r="18" fill="#6b5f4c" stroke="#d97706" strokeWidth="2.5"/>
                <circle cx="360" cy="350" r="11" fill="#362f27"/>
                
                {/* Right circle */}
                <circle cx="400" cy="350" r="18" fill="#6b5f4c" stroke="#d97706" strokeWidth="2.5"/>
                <circle cx="400" cy="350" r="11" fill="#362f27"/>

                {/* Connecting access concrete corridor between circles */}
                <rect x="360" y="315" width="10" height="30" fill="#78716c"/>

                {/* Circular Area Tag */}
                <rect x="300" y="240" width="140" height="20" rx="4" fill="#451a03" fillOpacity="0.85" stroke="#f59e0b" strokeWidth="1"/>
                <text x="310" y="254" fill="#fbbf24" fontSize="10" fontWeight="bold">⭕ Zona de Círculos</text>
              </g>

              {/* FACILITY 3: The Proposed Vermiculture Module (Aledaño a los círculos con orientación Norte-Sur) */}
              <g id="proposedVermicultureUnit" className="cursor-pointer">
                {/* Cleared and shaded footprint boundary */}
                <polygon 
                  points="455,270 565,270 575,370 465,370" 
                  fill="#10b981" 
                  fillOpacity="0.18" 
                  stroke="#10b981" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                />

                {/* Overhead Black Shade Mesh & Plastic Roof Canopy */}
                <polygon 
                  points="465,280 555,280 562,360 472,360" 
                  fill="#090d0b" 
                  stroke="#34d399" 
                  strokeWidth="2"
                />

                {/* Dual Beds inside: Bed A (6m) & Bed B (10m) */}
                {/* Bed A: 6m length oriented North-South */}
                <rect x="485" y="295" width="14" height="50" rx="2" fill="#b45309" stroke="#f59e0b" strokeWidth="1.2"/>
                {/* Bed B: 10m length oriented North-South */}
                <rect x="525" y="288" width="14" height="66" rx="2" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.2"/>

                {/* Water Irrigation Supply Line Pipe from Greenhouse */}
                <path 
                  d="M 225 410 Q 350 420 440 370 T 470 330" 
                  stroke="#38bdf8" 
                  strokeWidth="2" 
                  strokeDasharray="3 3"
                />
                <circle cx="470" cy="330" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5"/>

                {/* Location Pulsing Pin */}
                <g transform="translate(510, 310)">
                  <circle cx="0" cy="0" r="16" fill="#10b981" fillOpacity="0.3" className="animate-ping"/>
                  <circle cx="0" cy="0" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2"/>
                </g>

                {/* Banner Label for Vermicomposting Site */}
                <rect x="440" y="380" width="180" height="26" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5"/>
                <text x="450" y="397" fill="#a7f3d0" fontSize="11" fontWeight="bold">📍 Lombricultura (6m + 10m)</text>
              </g>

              {/* GIS Overlays: Compass, Coordinate Scale & Grid */}
              {showOverlays && (
                <g id="gisOverlays">
                  {/* Compass Rose (North Arrow) */}
                  <g transform="translate(800, 60)">
                    <circle cx="0" cy="0" r="24" fill="#0c0a09" fillOpacity="0.8" stroke="#44403c" strokeWidth="1.5"/>
                    <path d="M 0 -20 L 7 0 L 0 5 L -7 0 Z" fill="#ef4444"/>
                    <path d="M 0 20 L 7 0 L 0 -5 L -7 0 Z" fill="#94a3b8"/>
                    <text x="-4" y="-8" fill="#ffffff" fontSize="11" fontWeight="bold">N</text>
                  </g>

                  {/* Satellite Scale Bar (1:1,055 matching Dan's screenshot) */}
                  <g transform="translate(30, 525)">
                    <rect x="0" y="0" width="160" height="24" rx="4" fill="#0c0a09" fillOpacity="0.85" stroke="#292524" strokeWidth="1"/>
                    <line x1="15" y1="12" x2="145" y2="12" stroke="#ffffff" strokeWidth="2"/>
                    <line x1="15" y1="8" x2="15" y2="16" stroke="#ffffff" strokeWidth="2"/>
                    <line x1="145" y1="8" x2="145" y2="16" stroke="#ffffff" strokeWidth="2"/>
                    <text x="45" y="16" fill="#ffffff" fontSize="10" fontFamily="monospace">Escala: 20 metros</text>
                  </g>

                  {/* Street Label for Prolongación José Parres Arias */}
                  <g transform="translate(60, 200) rotate(-70)">
                    <rect x="-10" y="-12" width="230" height="18" rx="3" fill="#0c0a09" fillOpacity="0.85"/>
                    <text x="0" y="0" fill="#e7e5e4" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      Prolongación José Parres Arias
                    </text>
                  </g>

                  {/* Coordinates overlay box */}
                  <g transform="translate(25, 25)">
                    <rect x="0" y="0" width="220" height="34" rx="6" fill="#0c0a09" fillOpacity="0.9" stroke="#44403c" strokeWidth="1"/>
                    <circle cx="16" cy="17" r="4" fill="#ef4444"/>
                    <text x="28" y="16" fill="#94a3b8" fontSize="9" fontFamily="monospace">COORDENADAS VERIFICADAS:</text>
                    <text x="28" y="28" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      20.7436, -103.3767
                    </text>
                  </g>

                  {/* Distance Line from Greenhouse Water Source to Vermiculture Unit */}
                  <g>
                    <line x1="225" y1="410" x2="470" y2="330" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4"/>
                    <rect x="325" y="375" width="65" height="16" rx="3" fill="#0c0a09" fillOpacity="0.85"/>
                    <text x="330" y="387" fill="#38bdf8" fontSize="9" fontFamily="monospace">~42 metros</text>
                  </g>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Card Bar */}
          <div className="bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-3 px-4 flex flex-wrap items-center justify-between text-xs text-stone-300">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-emerald-400 font-mono font-medium">
                <span>Predio:</span>
                <span className="text-white">Centro Universitario (Zapopan)</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center space-x-1 text-amber-400 font-mono font-medium">
                <span>Zona ancla:</span>
                <span className="text-white">Aledaño a estructuras circulares</span>
              </span>
            </div>
            <div className="text-stone-500 font-mono text-[11px] mt-1 sm:mt-0">
              *Toma aérea media: permite ver claramente accesos y el entorno
            </div>
          </div>
        </div>

        {/* Location & Logistical Analysis Panel */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Análisis Territorial GIS
                </span>
                <span className="text-xs text-stone-400 font-mono">Zapopan, JAL</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Dictamen de Ubicación en el Campus
              </h3>

              <div className="space-y-3 mb-4">
                <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-3 text-xs">
                  <div className="text-amber-400 font-bold mb-1 flex items-center space-x-1">
                    <span>1. La zona de los círculos</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Las 3 a 4 estructuras circulares en el centro corresponden a módulos concéntricos (antiguas piletas/biodigestores o camas circulares). El terreno inmediatamente aledaño (al este de los círculos) está <strong>completamente plano, desmontado y limpio</strong>, siendo el área óptima para montar la techumbre de 10m y 6m.
                  </p>
                </div>

                <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-3 text-xs">
                  <div className="text-blue-400 font-bold mb-1 flex items-center space-x-1">
                    <span>2. Invernadero y suministro hídrico</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Ubicado a 42 metros al suroeste. Permite derivar una manguera de polietileno de 3/4" para alimentar la microaspersión continua de las lombrices sin necesidad de bombeo a larga distancia.
                  </p>
                </div>

                <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-3 text-xs">
                  <div className="text-emerald-400 font-bold mb-1 flex items-center space-x-1">
                    <span>3. Acceso y logística de residuos</span>
                  </div>
                  <p className="text-stone-300 text-[11px] leading-relaxed">
                    Conectado con el sendero vehicular y Prolongación José Parres Arias. Facilita la entrada de camionetas con estiércol maduro, restos vegetales de podas y sustrato orgánico universitario.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-800">
              <button
                onClick={() => onGenerateAI('toma_aerea')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-stone-950 rounded-xl text-xs font-semibold transition-all shadow-md shadow-emerald-600/20"
              >
                <Sparkles className="w-3.5 h-3.5 text-stone-950" />
                <span>Generar Foto Aérea Fotorrealista (IA)</span>
              </button>

              <button
                onClick={onOpenAnalysis}
                className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-xl text-xs font-medium transition-all border border-stone-700"
              >
                <Compass className="w-3.5 h-3.5 text-purple-400" />
                <span>Consultar Reporte Climático Completo</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
