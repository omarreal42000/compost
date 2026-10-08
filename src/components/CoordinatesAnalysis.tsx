import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Compass, 
  Thermometer, 
  CloudRain, 
  Droplets, 
  Sun, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ExternalLink,
  ShieldCheck,
  Building2,
  TreePine,
  Sparkles
} from 'lucide-react';
import { SiteAnalysisData } from '../types';

interface CoordinatesAnalysisProps {
  onGenerateAI: (presetName: string) => void;
}

export const CoordinatesAnalysis: React.FC<CoordinatesAnalysisProps> = ({ onGenerateAI }) => {
  const [siteData, setSiteData] = useState<SiteAnalysisData | null>(null);

  useEffect(() => {
    fetch('/api/site-analysis')
      .then(res => res.json())
      .then(data => setSiteData(data))
      .catch(err => console.error('Error fetching site analysis:', err));
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Compass className="w-4 h-4 text-purple-400" />
              <span>Estudio Técnico Territorial & Dictamen Agronómico</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Análisis de Ubicación: Coordenadas 20.7436, -103.3767
            </h2>
            <p className="text-sm text-stone-300 max-w-2xl mt-1">
              Evaluación de las condiciones geográficas en el centro universitario de Zapopan, la zona de los círculos concéntricos, el invernadero anexo y la viabilidad agro-biológica para la cría de Lombriz Roja Californiana.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onGenerateAI('toma_aerea')}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-purple-500/20 transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generar Render Aéreo IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Technical Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Panel 1: Geographic Verification */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>1. Verificación Geográfica</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Predio Universitario en Zapopan
          </h3>
          <div className="space-y-2.5 text-xs text-stone-300">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="text-stone-400 text-[11px]">Coordenadas Decimales:</div>
              <div className="font-mono text-emerald-400 font-bold text-sm">20.7436° N, -103.3767° W</div>
              <div className="text-stone-500 font-mono text-[10px] mt-0.5">20°44'37.0"N 103°22'36.1"W</div>
            </div>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Localización:</strong> Zapopan, Jalisco, México. Franja agronómica y reserva de Los Belenes / predios universitarios UdeG.
            </p>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Vialidad Inmediata:</strong> <em>Prolongación José Parres Arias</em> corre a escasos 80 metros al poniente, permitiendo acceso vehicular directo para camionetas con camiones de estiércol y retiro de humus.
            </p>
          </div>
        </div>

        {/* Panel 2: The Circles & Surrounding Area */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>2. Zona de los Círculos</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Estructuras y Área de Administración
          </h3>
          <div className="space-y-2.5 text-xs text-stone-300">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="text-stone-400 text-[11px]">Topografía del Terreno:</div>
              <div className="font-mono text-cyan-400 font-bold text-sm">Plano y Nivelado (1,565 msnm)</div>
            </div>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Los círculos visibles:</strong> Son 4 módulos cilíndricos (tanques acuícolas/acuaponía o piletas de recirculación). El espacio <strong>aledaño inmediato hacia el este</strong> está desmontado y cuenta con firme de tierra compactada ideal para asentar los canteros de 6m y 10m sin necesidad de desmonte mayor.
            </p>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Caminos de maniobra:</strong> El sendero que bordea los círculos conecta directamente con el área libre, evitando interferir con otras prácticas agrícolas del campus.
            </p>
          </div>
        </div>

        {/* Panel 3: Invernadero & Agua */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>3. Invernadero y Suministro</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Infraestructura Hidráulica
          </h3>
          <div className="space-y-2.5 text-xs text-stone-300">
            <div className="bg-stone-950 p-3 rounded-xl border border-stone-800">
              <div className="text-stone-400 text-[11px]">Distancia a Fuente Hídrica:</div>
              <div className="font-mono text-blue-400 font-bold text-sm">~42 metros al Invernadero</div>
            </div>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Conexión de agua:</strong> La nave con techumbre semicircular azul al suroeste dispone de toma de agua de riego. Se puede tender una línea de polietileno de alta densidad (PEAD) de 25mm para suministrar presión a los microaspersores sin caídas de caudal.
            </p>
            <p className="leading-relaxed text-stone-400">
              <strong className="text-stone-200">Almacenamiento:</strong> El tejabán anexo con cubierta roja sirve como bodega segura para herramientas, básculas y sacos de humus cosechado.
            </p>
          </div>
        </div>
      </div>

      {/* Climatic & Biological Feasibility for Eisenia foetida in Zapopan */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div>
            <div className="flex items-center space-x-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Condiciones Microclimáticas en Zapopan para Lombriz Roja Californiana</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Por Qué la Descripción de Salvador Velázquez es Exacta para este Sitio
            </h3>
          </div>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full font-semibold hidden sm:inline">
            100% Factible
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-amber-400 font-bold">
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Radiación y Malla Sombra</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              En Zapopan la radiación UV en primavera (marzo a mayo) es muy intensa, elevando la temperatura del suelo a más de 40°C. La <strong>malla sombra al 80%</strong> que tiene Salvador es obligatoria para mantener el lecho bajo 25°C.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold">
              <CloudRain className="w-4 h-4 text-cyan-400" />
              <span>Lluvias y Techo Plástico</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Las tormentas monzónicas de verano en Jalisco descargan hasta 80 mm en pocas horas. El <strong>techo de plástico de invernadero</strong> evita el anegamiento letal, la fermentación anaeróbica y que las lombrices huyan arrastradas por el agua.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-blue-400 font-bold">
              <Droplets className="w-4 h-4 text-blue-400" />
              <span>Microaspersión 75% HR</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              La <em>Eisenia foetida</em> no posee pulmones: respira por difusión cutánea y requiere 75% a 80% de humedad permanente. El sistema de microaspersores humidifica de forma homogénea sin lavar los nutrientes ni formar charcos.
            </p>
          </div>

          <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Crecimiento Poblacional</span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              Como indica Salvador, cada 3 a 4 meses la población se duplica. Pasar de un cantero de 6m a uno nuevo de 10m permite absorber hasta <strong>25 a 30 kg de masa viva de lombriz</strong> y procesar 400 kg semanales de residuos orgánicos del campus.
            </p>
          </div>
        </div>

        {/* Summary Card with Concrete Engineering Actions */}
        <div className="bg-stone-950/70 border border-stone-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-stone-200">Recomendación Final para Administrar este Espacio:</div>
            <p className="text-stone-400">
              Implantar los dos canteros paralelos (6m x 1m y 10m x 1m) en el flanco oriente inmediato a los círculos, con techumbre común a dos aguas (2.3m cumbrera) y orientación Norte-Sur.
            </p>
          </div>
          <button
            onClick={() => onGenerateAI('toma_aerea')}
            className="shrink-0 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg font-medium border border-stone-700 transition-colors flex items-center space-x-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Generar Toma Aérea de esta Ubicación</span>
          </button>
        </div>
      </div>
    </div>
  );
};
