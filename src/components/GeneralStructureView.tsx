import React, { useState } from 'react';
import { 
  Sparkles, 
  Ruler, 
  Compass, 
  Maximize2, 
  Layers, 
  Info, 
  CheckCircle2, 
  Sun,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface GeneralStructureViewProps {
  onGenerateAI: (presetName: string) => void;
}

export const GeneralStructureView: React.FC<GeneralStructureViewProps> = ({ onGenerateAI }) => {
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [highlightBed, setHighlightBed] = useState<'both' | 'bed10m' | 'bed6m'>('both');

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span>Plano 2 de 3 • Perspectiva Estructural General</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Segundo Plano: Toda la Estructura en General
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Vista general de conjunto que abarca el módulo completo: el cantero de 6 metros, el nuevo cantero de 10 metros, la techumbre de dos aguas con plástico de invernadero y malla sombra, postes y pasillos de trabajo en el terreno universitario.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onGenerateAI('estructura_general')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generar con Gemini 3 Pro (IA)</span>
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6 pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-stone-400 font-medium">Enfocar Cantero:</span>
            <div className="bg-stone-950 p-1 rounded-lg border border-stone-800 flex space-x-1">
              <button
                onClick={() => setHighlightBed('both')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightBed === 'both' ? 'bg-blue-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Ambos Canteros
              </button>
              <button
                onClick={() => setHighlightBed('bed10m')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightBed === 'bed10m' ? 'bg-blue-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Nuevo Cantero (10m)
              </button>
              <button
                onClick={() => setHighlightBed('bed6m')}
                className={`px-3 py-1 rounded-md transition-all font-medium ${
                  highlightBed === 'bed6m' ? 'bg-blue-600 text-white' : 'text-stone-400 hover:text-white'
                }`}
              >
                Cantero Base (6m)
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowDimensions(!showDimensions)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border font-medium transition-all ${
                showDimensions 
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/50' 
                  : 'bg-stone-800 text-stone-300 border-stone-700'
              }`}
            >
              <Ruler className="w-3.5 h-3.5 text-blue-400" />
              <span>{showDimensions ? 'Ocultar Cotas y Medidas' : 'Mostrar Cotas Técnicas'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Structural Visual Render (Wide Architectural Perspective) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden relative shadow-2xl min-h-[480px] flex flex-col justify-between">
          <div className="relative w-full h-full min-h-[450px] flex items-center justify-center bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 overflow-hidden">
            
            {/* SVG Isometric & Perspective Structural Render */}
            <svg 
              className="w-full h-full max-h-[500px] select-none" 
              viewBox="0 0 850 520" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="60%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#1c1917" />
                </linearGradient>

                <linearGradient id="roofPlastic" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.15" />
                </linearGradient>

                <linearGradient id="shadeNet" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#111827" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#1f2937" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Sky and Environment */}
              <rect width="850" height="240" fill="url(#skyGrad)" />
              {/* University Campus Tree Line in Background */}
              <path d="M0 220 Q 200 180 400 210 T 850 190 L 850 320 L 0 320 Z" fill="#14261b" />
              <circle cx="120" cy="190" r="45" fill="#1a3824"/>
              <circle cx="280" cy="180" r="55" fill="#22452d"/>
              <circle cx="680" cy="170" r="60" fill="#1b3a26"/>
              <circle cx="780" cy="195" r="40" fill="#203d29"/>

              {/* Ground Earth / University Field Grass */}
              <polygon points="0,270 850,270 850,520 0,520" fill="#26211c" />
              {/* Grassy patches */}
              <polygon points="0,270 850,270 850,330 0,330" fill="#203322" opacity="0.8" />

              {/* Concrete Pad / Compacted Dirt Operations Corridor */}
              <polygon points="120,330 740,330 810,510 60,510" fill="#322a24" stroke="#443830" strokeWidth="1"/>

              {/* Wooden Post Columns Framework (8 vertical pillars supporting the dual canteros structure) */}
              {/* Row A: Back Pillars */}
              <rect x="180" y="160" width="14" height="180" fill="#4a3525" stroke="#2d1f14" strokeWidth="1.5"/>
              <rect x="360" y="160" width="14" height="180" fill="#4a3525" stroke="#2d1f14" strokeWidth="1.5"/>
              <rect x="540" y="160" width="14" height="180" fill="#4a3525" stroke="#2d1f14" strokeWidth="1.5"/>
              <rect x="710" y="160" width="14" height="180" fill="#4a3525" stroke="#2d1f14" strokeWidth="1.5"/>

              {/* Upper Longitudinal Timber Beams */}
              <path d="M160 170 L 730 170 L 730 182 L 160 182 Z" fill="#5c4028"/>

              {/* CANTERO 1: Cantero Maduro (6m x 1m) - Ubicado al fondo izquierdo */}
              <g id="bed6m" opacity={highlightBed === 'bed10m' ? 0.35 : 1} className="transition-opacity">
                {/* Outer Concrete / Brick Walls */}
                <polygon points="190,300 460,300 450,345 170,345" fill="#a44222" stroke="#5a2211" strokeWidth="1.5"/>
                <polygon points="170,345 450,345 440,370 150,370" fill="#8c3316" stroke="#4a180b" strokeWidth="1.5"/>
                {/* Humus Bed interior */}
                <polygon points="180,310 450,310 440,335 170,335" fill="#1c120a" />
                {/* Bed label tag */}
                <rect x="230" y="318" width="170" height="20" rx="4" fill="#0c0a09" fillOpacity="0.85"/>
                <text x="240" y="332" fill="#fbbf24" fontSize="11" fontWeight="bold">Cantero A: 6.0 m (Maduro)</text>
              </g>

              {/* CANTERO 2: Cantero Nuevo de Salvador Velázquez (10m x 1m) - Ubicado al frente/derecha */}
              <g id="bed10m" opacity={highlightBed === 'bed6m' ? 0.35 : 1} className="transition-opacity">
                {/* Walls: Front Long Wall running from x=160 to x=680 */}
                <polygon points="210,380 690,380 670,440 180,440" fill="#a84324" stroke="#5a2211" strokeWidth="2"/>
                {/* Concrete top curb / cap */}
                <polygon points="210,380 690,380 705,392 225,392" fill="#78716c" stroke="#44403c" strokeWidth="1.5"/>
                {/* Front face with mortared brick joints and concrete buttresses */}
                <polygon points="180,440 670,440 650,470 150,470" fill="#7c2d12" stroke="#451a0a" strokeWidth="2"/>
                
                {/* Interior Humus Surface */}
                <polygon points="225,392 705,392 680,425 200,425" fill="#170f08" stroke="#0a0502" strokeWidth="1"/>
                
                {/* Concrete buttresses (pilastras de refuerzo de cemento como describe el video) */}
                <rect x="280" y="440" width="14" height="30" fill="#78716c"/>
                <rect x="420" y="440" width="14" height="30" fill="#78716c"/>
                <rect x="560" y="440" width="14" height="30" fill="#78716c"/>

                {/* Bed label tag */}
                <rect x="330" y="400" width="220" height="22" rx="4" fill="#0f172a" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="1"/>
                <text x="342" y="416" fill="#38bdf8" fontSize="12" fontWeight="bold">Cantero B: 10.0 m (Nuevo / Cemento)</text>
              </g>

              {/* Central Manuever Aisle (Pasillo de Carretillas) */}
              {/* Green Wheelbarrow and Tool in aisle */}
              <g id="toolsInAisle" transform="translate(100, 395)">
                <ellipse cx="40" cy="50" rx="9" ry="9" fill="#1e293b" stroke="#0f172a" strokeWidth="2"/>
                <polygon points="35,35 75,32 68,52 38,48" fill="#15803d" stroke="#14532d" strokeWidth="1.5"/>
                <line x1="38" y1="40" x2="10" y2="35" stroke="#94a3b8" strokeWidth="2.5"/>
                <line x1="38" y1="46" x2="10" y2="45" stroke="#94a3b8" strokeWidth="2.5"/>
              </g>

              {/* Row B: Front Structural Pillars */}
              <rect x="140" y="110" width="18" height="370" rx="3" fill="#6d4c33" stroke="#432c1c" strokeWidth="2"/>
              <rect x="340" y="110" width="18" height="370" rx="3" fill="#6d4c33" stroke="#432c1c" strokeWidth="2"/>
              <rect x="540" y="110" width="18" height="370" rx="3" fill="#6d4c33" stroke="#432c1c" strokeWidth="2"/>
              <rect x="730" y="110" width="18" height="370" rx="3" fill="#6d4c33" stroke="#432c1c" strokeWidth="2"/>

              {/* Front Top Longitudinal Timber Header Beam */}
              <path d="M120 120 L 760 120 L 760 135 L 120 135 Z" fill="#855734" stroke="#432c1c" strokeWidth="1.5"/>

              {/* Transverse Rafters connecting front to back (Pérgola Superior) */}
              <line x1="145" y1="120" x2="185" y2="170" stroke="#855734" strokeWidth="6"/>
              <line x1="345" y1="120" x2="365" y2="170" stroke="#855734" strokeWidth="6"/>
              <line x1="545" y1="120" x2="545" y2="170" stroke="#855734" strokeWidth="6"/>
              <line x1="735" y1="120" x2="715" y2="170" stroke="#855734" strokeWidth="6"/>

              {/* UPPER ROOF CANOPY: Agricultural UV Greenhouse Plastic & Black Shade Netting (Malla Sombra) */}
              {/* Sloped Roof Covering Whole Structure */}
              <polygon 
                points="110,95 770,95 780,140 100,140" 
                fill="url(#shadeNet)" 
                stroke="#374151" 
                strokeWidth="1.5"
              />
              {/* Translucent Greenhouse Sheeting Glaze / Plastic Reflective Highlight */}
              <polygon 
                points="110,88 770,88 775,108 105,108" 
                fill="url(#roofPlastic)" 
                stroke="#60a5fa" 
                strokeWidth="1" 
                strokeOpacity="0.4"
              />

              {/* Technical Dimensions Overlay (Cotas) */}
              {showDimensions && (
                <g id="dimensionLines">
                  {/* Length of Bed B (10m) */}
                  <line x1="180" y1="485" x2="670" y2="485" stroke="#38bdf8" strokeWidth="2"/>
                  <line x1="180" y1="475" x2="180" y2="495" stroke="#38bdf8" strokeWidth="2"/>
                  <line x1="670" y1="475" x2="670" y2="495" stroke="#38bdf8" strokeWidth="2"/>
                  <rect x="375" y="475" width="100" height="20" rx="3" fill="#0284c7"/>
                  <text x="390" y="489" fill="#ffffff" fontSize="11" fontWeight="bold">LARGO: 10.0 m</text>

                  {/* Width of Bed B (1m) */}
                  <line x1="690" y1="380" x2="715" y2="445" stroke="#f59e0b" strokeWidth="2"/>
                  <rect x="715" y="405" width="90" height="20" rx="3" fill="#d97706"/>
                  <text x="725" y="419" fill="#ffffff" fontSize="11" fontWeight="bold">ANCHO: 1.0 m</text>

                  {/* Height of Posts (2.3m) */}
                  <line x1="105" y1="120" x2="105" y2="470" stroke="#10b981" strokeWidth="2"/>
                  <line x1="95" y1="120" x2="115" y2="120" stroke="#10b981" strokeWidth="2"/>
                  <line x1="95" y1="470" x2="115" y2="470" stroke="#10b981" strokeWidth="2"/>
                  <rect x="50" y="280" width="100" height="20" rx="3" fill="#059669"/>
                  <text x="60" y="294" fill="#ffffff" fontSize="11" fontWeight="bold">ALTURA: 2.3 m</text>
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Card Bar */}
          <div className="bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-3 px-4 flex flex-wrap items-center justify-between text-xs text-stone-300">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-blue-400 font-mono font-medium">
                <span>Capacidad Total:</span>
                <span className="text-white">16 metros lineales (16 m²)</span>
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center space-x-1 text-emerald-400 font-mono font-medium">
                <span>Producción estimada:</span>
                <span className="text-white">~3.5 - 5 toneladas/año humus</span>
              </span>
            </div>
            <div className="text-stone-500 font-mono text-[11px] mt-1 sm:mt-0">
              *Estructura de sombra y plástico continuo para ambos canteros
            </div>
          </div>
        </div>

        {/* Structural Specs & Salvador's Construction Breakdown */}
        <div className="lg:col-span-4 flex flex-col space-y-4">
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Ingeniería Agronómica
                </span>
                <span className="text-xs text-stone-400 font-mono">Salvador Velázquez</span>
              </div>

              <h3 className="text-lg font-bold text-white mb-2">
                Especificaciones de los Dos Canteros
              </h3>

              <div className="space-y-3 mb-4">
                <div className="bg-stone-950/70 border border-stone-800/80 rounded-xl p-3 text-xs">
                  <div className="flex items-center justify-between text-stone-200 font-bold mb-1">
                    <span className="text-amber-400">Cantero Maduro (6 m x 1 m)</span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">En Producción</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Criadero con sobrepoblación activa. Funciona como banco de semilla biológica para inocular el nuevo cantero recién inaugurado.
                  </p>
                </div>

                <div className="bg-stone-950/70 border border-blue-900/40 rounded-xl p-3 text-xs">
                  <div className="flex items-center justify-between text-stone-200 font-bold mb-1">
                    <span className="text-blue-400">Nuevo Cantero (10 m x 1 m)</span>
                    <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">Construcción Reciente</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-relaxed">
                    Construido con cemento y tabique terminado hace pocos días. Mide 10 metros continuos bajo la techumbre de plástico de invernadero y malla sombra.
                  </p>
                </div>
              </div>

              {/* Structural Benefits List */}
              <div className="border-t border-stone-800 pt-3 space-y-2 text-xs">
                <div className="font-semibold text-stone-200">Factores Clave de la Estructura General:</div>
                <ul className="space-y-1.5 text-stone-400 text-[11px]">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Orientación Norte-Sur:</strong> Minimiza el impacto del sol lateral matutino y vespertino en el valle de Zapopan.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Plástico de invernadero superior:</strong> Esencial para la temporada de lluvias torrenciales de Jalisco (julio-septiembre).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Pasillo de 1.2 m:</strong> Permite carga ergonómica de residuos universitarios (hojarasca, podas y restos de cafetería).</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800">
              <button
                onClick={() => onGenerateAI('estructura_general')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs font-semibold transition-all border border-stone-700 hover:border-blue-500/50"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Generar Foto Fotorrealista de la Estructura</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
