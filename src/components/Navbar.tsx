import React from 'react';
import { 
  Compass, 
  Layers, 
  MapPin, 
  Sparkles, 
  Camera, 
  Maximize2, 
  Eye, 
  Sun, 
  Droplets, 
  HelpCircle,
  Sprout
} from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, 
  setActiveTab,
  onOpenQuickGuide
}) => {
  return (
    <header className="sticky top-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-emerald-600 to-lime-500 flex items-center justify-center shadow-lg shadow-emerald-950/40 text-stone-950 font-black">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold tracking-tight text-white text-base">Lombricultura</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-medium border border-emerald-500/30">
                  Centro Universitario
                </span>
              </div>
              <p className="text-xs text-stone-400 font-mono hidden sm:block">
                Metodología Biól. Salvador Velázquez • Zapopan, Jalisco
              </p>
            </div>
          </div>

          {/* Quick Coordinates Badge */}
          <div 
            onClick={() => setActiveTab('plan3_aerial')}
            className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 border border-stone-700/60 text-xs font-mono cursor-pointer transition-all hover:border-emerald-500/50 group"
            title="Ver coordenadas en la toma aérea"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="text-stone-300">20.7436, -103.3767</span>
            <span className="text-emerald-400 text-[10px] bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
              UdeG Belenes
            </span>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('ai_generator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'ai_generator'
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Generador</span> IA
            </button>

            <button
              onClick={() => setActiveTab('vision_analyzer')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'vision_analyzer'
                  ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20 font-semibold'
                  : 'text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-800'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Analizar</span> Foto
            </button>

            <button
              onClick={onOpenQuickGuide}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              title="Guía técnica y descripción de Salvador Velázquez"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Sub-Bar */}
        <div className="flex items-center space-x-1 overflow-x-auto py-2 border-t border-stone-800/80 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium ${
              activeTab === 'overview'
                ? 'bg-stone-800 text-white border border-stone-700'
                : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800/50'
            }`}
          >
            📋 Resumen y Contexto
          </button>

          <button
            onClick={() => setActiveTab('plan1_closeup')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === 'plan1_closeup'
                ? 'bg-amber-900/40 text-amber-300 border border-amber-600/50'
                : 'text-stone-400 hover:text-amber-200 hover:bg-stone-800/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>1. Primer Plano (Cantero y Lombriz)</span>
          </button>

          <button
            onClick={() => setActiveTab('plan2_structure')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === 'plan2_structure'
                ? 'bg-blue-900/40 text-blue-300 border border-blue-600/50'
                : 'text-stone-400 hover:text-blue-200 hover:bg-stone-800/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>2. Estructura General (10m x 1m y Malla)</span>
          </button>

          <button
            onClick={() => setActiveTab('plan3_aerial')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === 'plan3_aerial'
                ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-600/50'
                : 'text-stone-400 hover:text-emerald-200 hover:bg-stone-800/50'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>3. Toma Aérea (Coordenadas y Círculos)</span>
          </button>

          <button
            onClick={() => setActiveTab('gis_analysis')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all font-medium flex items-center space-x-1.5 ${
              activeTab === 'gis_analysis'
                ? 'bg-purple-900/40 text-purple-300 border border-purple-600/50'
                : 'text-stone-400 hover:text-purple-200 hover:bg-stone-800/50'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Estudio Técnico Territorial</span>
          </button>
        </div>
      </div>
    </header>
  );
};
