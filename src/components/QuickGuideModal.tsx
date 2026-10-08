import React from 'react';
import { X, Video, Sprout, CheckCircle2, ShieldCheck, Thermometer, Droplets } from 'lucide-react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 text-stone-100 relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Video className="w-4 h-4" />
          <span>Ficha Técnica • Salvador Velázquez</span>
        </div>

        <h3 className="text-xl font-bold text-white tracking-tight">
          Lombricultura y Metodología Biológica
        </h3>

        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 text-xs text-stone-300 space-y-2 leading-relaxed">
          <p className="font-semibold text-emerald-400">
            "Mi nombre es Salvador Velázquez. Yo soy biólogo y me dedico a la crianza y reproducción de Lombriz Roja Californiana..."
          </p>
          <p className="text-stone-400">
            • <strong>Cantero 1 (Maduro):</strong> Mide 6 m de largo por 1 m de ancho con protección de malla sombra. Presenta sobrepoblación activa (&gt;3 kg/m²).
          </p>
          <p className="text-stone-400">
            • <strong>Cantero 2 (Nuevo):</strong> Mide 10 m de largo por 1 m de ancho, construido de cemento y tabique. Cuenta con techo de plástico de invernadero y malla sombra.
          </p>
          <p className="text-stone-400">
            • <strong>Objetivo:</strong> Inoculación y división poblacional hacia el nuevo cantero para duplicar la producción de humus y biomasa.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          <div className="font-bold text-stone-200">Factores Críticos para el Centro Universitario:</div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              <span className="text-stone-400">Temperatura óptima:</span>
              <div className="font-bold text-amber-400 font-mono">18°C a 25°C</div>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              <span className="text-stone-400">Humedad requerida:</span>
              <div className="font-bold text-cyan-400 font-mono">75% a 80%</div>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              <span className="text-stone-400">pH del sustrato:</span>
              <div className="font-bold text-emerald-400 font-mono">6.8 a 7.2 (Neutro)</div>
            </div>
            <div className="bg-stone-950 p-2.5 rounded-lg border border-stone-800">
              <span className="text-stone-400">Malla sombra:</span>
              <div className="font-bold text-purple-400 font-mono">80% monofilamento</div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-stone-950 rounded-xl font-bold text-xs transition-colors"
          >
            Entendido, volver a los planos
          </button>
        </div>
      </div>
    </div>
  );
};
