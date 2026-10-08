import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Eye, 
  Layers, 
  Compass, 
  CheckCircle2, 
  Camera, 
  ArrowRight,
  Droplets,
  Sun,
  ShieldCheck,
  Video
} from 'lucide-react';
import { ActiveTab } from '../types';

interface OverviewDashboardProps {
  onSelectTab: (tab: ActiveTab) => void;
  onGenerateAI: (presetName: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ 
  onSelectTab,
  onGenerateAI 
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Banner with Executive Overview */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none -mr-28 -mt-28"></div>

        <div className="max-w-3xl relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Video className="w-3.5 h-3.5" />
            <span>Basado en el video de Salvador Velázquez • Lombricultura Universitaria</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Estudio Visual y Territorial de Criaderos de Lombriz Roja Californiana
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Hemos analizado las <strong>coordenadas satelitales (20.7436, -103.3767 en Zapopan)</strong>, la zona de las estructuras circulares y el invernadero, junto con la descripción técnica de Salvador Velázquez (cantero de 6m maduro, nuevo cantero de 10m de cemento, malla sombra y techo de plástico de invernadero). A continuación tienes los <strong>3 planos visuales completos</strong> y el estudio de ubicación.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectTab('plan1_closeup')}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center space-x-2 hover:scale-105"
            >
              <span>Explorar 1. Primer Plano</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onSelectTab('plan3_aerial')}
              className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold rounded-xl text-xs border border-stone-700 transition-all flex items-center space-x-2"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ver 3. Toma Aérea (20.7436, -103.3767)</span>
            </button>

            <button
              onClick={() => onSelectTab('ai_generator')}
              className="px-4 py-2.5 bg-stone-800/80 hover:bg-stone-700 text-stone-300 font-medium rounded-xl text-xs border border-stone-700 transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Generar con Gemini Pro</span>
            </button>
          </div>
        </div>

        {/* Quick Meta Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-stone-800/80 text-xs">
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <div className="text-stone-400 text-[11px]">Ubicación</div>
            <div className="text-stone-100 font-bold mt-0.5">Zapopan, Jalisco</div>
            <div className="text-emerald-400 font-mono text-[10px]">20.7436, -103.3767</div>
          </div>
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <div className="text-stone-400 text-[11px]">Especie Cría</div>
            <div className="text-stone-100 font-bold mt-0.5 italic">Eisenia foetida</div>
            <div className="text-rose-400 text-[10px]">Lombriz Roja Californiana</div>
          </div>
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <div className="text-stone-400 text-[11px]">Canteros Totales</div>
            <div className="text-stone-100 font-bold mt-0.5">6m + 10m x 1m</div>
            <div className="text-amber-400 text-[10px]">Tabique, cemento y malla</div>
          </div>
          <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/60">
            <div className="text-stone-400 text-[11px]">Protección Clima</div>
            <div className="text-stone-100 font-bold mt-0.5">Malla 80% + Plástico</div>
            <div className="text-cyan-400 text-[10px]">Lluvias y sol intenso</div>
          </div>
        </div>
      </div>

      {/* The 3 Requested Master Visual Plans Showcase Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Las 3 Vistas Solicitadas por Dan
            </span>
            <h2 className="text-xl font-bold text-white">
              Perspectivas Arquitectónicas y Territoriales
            </h2>
          </div>
          <span className="text-xs text-stone-400 font-mono hidden sm:inline">
            Interactivas y listas para renderizado IA
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Primer Plano */}
          <div 
            onClick={() => onSelectTab('plan1_closeup')}
            className="group bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Plano 1 de 3
                </span>
                <span className="text-xs text-stone-500 font-mono">Macro Detalle</span>
              </div>

              {/* Graphic Preview Container */}
              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-amber-950/60 via-stone-950 to-stone-950 border border-stone-800 flex items-center justify-center p-4 relative overflow-hidden mb-4 group-hover:border-amber-500/30 transition-colors">
                <div className="text-center space-y-2">
                  <div className="text-3xl">🪱</div>
                  <div className="text-xs font-bold text-stone-200">Primer Plano del Cantero</div>
                  <div className="text-[10px] text-amber-400/90 font-mono">1m ancho • Pared tabique • Lombrices</div>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors mb-1.5">
                1. Primer Plano: Lecho y Lombrices
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Vista cercana y a nivel de ojos de cómo se vería el criadero: pared de ladrillo rojo, sustrato orgánico oscuro con <em>Eisenia foetida</em>, boquillas de microaspersión y malla sombra filtrando la luz solar.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Inspeccionar modelo</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Segundo Plano */}
          <div 
            onClick={() => onSelectTab('plan2_structure')}
            className="group bg-stone-900 border border-stone-800 hover:border-blue-500/50 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Plano 2 de 3
                </span>
                <span className="text-xs text-stone-500 font-mono">Vista General</span>
              </div>

              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-blue-950/60 via-stone-950 to-stone-950 border border-stone-800 flex items-center justify-center p-4 relative overflow-hidden mb-4 group-hover:border-blue-500/30 transition-colors">
                <div className="text-center space-y-2">
                  <div className="text-3xl">🏗️</div>
                  <div className="text-xs font-bold text-stone-200">Toda la Estructura en General</div>
                  <div className="text-[10px] text-blue-400/90 font-mono">Canteros 6m y 10m • Malla • Techo plástico</div>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors mb-1.5">
                2. Segundo Plano: Estructura Completa
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Perspectiva de conjunto donde se aprecian los dos canteros paralelos (6m y 10m), la techumbre protectora a dos aguas con plástico de invernadero y malla sombra, postes y pasillo de carretillas.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Ver cotas y estructura</span>
              <ArrowRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Tercer Plano */}
          <div 
            onClick={() => onSelectTab('plan3_aerial')}
            className="group bg-stone-900 border border-stone-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-xl cursor-pointer transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Plano 3 de 3
                </span>
                <span className="text-xs text-stone-500 font-mono">Toma Aérea Drone</span>
              </div>

              <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-emerald-950/60 via-stone-950 to-stone-950 border border-stone-800 flex items-center justify-center p-4 relative overflow-hidden mb-4 group-hover:border-emerald-500/30 transition-colors">
                <div className="text-center space-y-2">
                  <div className="text-3xl">🛰️</div>
                  <div className="text-xs font-bold text-stone-200">Toma Aérea Georreferenciada</div>
                  <div className="text-[10px] text-emerald-400/90 font-mono">20.7436, -103.3767 • Círculos e Invernadero</div>
                </div>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors mb-1.5">
                3. Tercer Plano: Ubicación en Campus
              </h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Toma aérea no muy lejana centrada en las coordenadas exactas: muestra la zona de los círculos concéntricos, el invernadero anexo y el área aledaña óptima para administrar la lombricultura.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Ver mapa y senderos</span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Direct Analysis of Dan's Consultation on the Coordinates */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-5">
        <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-4 h-4 text-purple-400" />
          <span>Respuesta a tu Consulta sobre las Coordenadas y los Círculos</span>
        </div>

        <h3 className="text-xl font-bold text-white">
          Dictamen: ¿Cómo y Dónde se Administraría este Espacio en el Centro Universitario?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 space-y-2">
            <div className="font-bold text-stone-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zona de los Círculos Concéntricos</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Las estructuras circulares del centro son excelentes referencias. El terreno inmediatamente <strong>aledaño hacia el este</strong> está plano, despejado y cuenta con acceso directo de terracería sin necesidad de talar arbolado ni realizar desmontes costosos.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 space-y-2">
            <div className="font-bold text-stone-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              <span>Suministro de Agua (Invernadero a 42m)</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              La nave con techo curvo azul al suroeste es clave: alberga la red de riego y almacenamiento. Una tubería subterránea de 42 metros suministra presión ideal para la microaspersión continua requerida por las lombrices.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 space-y-2">
            <div className="font-bold text-stone-200 flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Malla Sombra y Techo de Plástico</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              En Zapopan (latitud 20.7° N), la radiación solar y los temporales de lluvia obligan a la doble protección descrita por Salvador: plástico de invernadero arriba para desviar tormentas y malla sombra al 80% debajo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
