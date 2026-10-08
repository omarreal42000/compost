import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { CloseUpView } from './components/CloseUpView';
import { GeneralStructureView } from './components/GeneralStructureView';
import { AerialSatelliteView } from './components/AerialSatelliteView';
import { CoordinatesAnalysis } from './components/CoordinatesAnalysis';
import { ImageGeneratorPanel } from './components/ImageGeneratorPanel';
import { VisionAnalyzerPanel } from './components/VisionAnalyzerPanel';
import { QuickGuideModal } from './components/QuickGuideModal';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [generatorPreset, setGeneratorPreset] = useState<string>('primer_plano');

  const handleTriggerAIGeneration = (presetName: string) => {
    setGeneratorPreset(presetName);
    setActiveTab('ai_generator');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenQuickGuide={() => setIsGuideOpen(true)}
      />

      {/* Main Body Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <OverviewDashboard 
            onSelectTab={setActiveTab} 
            onGenerateAI={handleTriggerAIGeneration}
          />
        )}

        {activeTab === 'plan1_closeup' && (
          <CloseUpView onGenerateAI={handleTriggerAIGeneration} />
        )}

        {activeTab === 'plan2_structure' && (
          <GeneralStructureView onGenerateAI={handleTriggerAIGeneration} />
        )}

        {activeTab === 'plan3_aerial' && (
          <AerialSatelliteView 
            onGenerateAI={handleTriggerAIGeneration}
            onOpenAnalysis={() => setActiveTab('gis_analysis')}
          />
        )}

        {activeTab === 'gis_analysis' && (
          <CoordinatesAnalysis onGenerateAI={handleTriggerAIGeneration} />
        )}

        {activeTab === 'ai_generator' && (
          <ImageGeneratorPanel initialPreset={generatorPreset} />
        )}

        {activeTab === 'vision_analyzer' && (
          <VisionAnalyzerPanel />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-900 bg-stone-950/80 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-stone-400">Lombricultura Universitaria</span>
            <span>•</span>
            <span>Coordenadas: 20.7436° N, -103.3767° W (Zapopan, Jalisco)</span>
          </div>
          <div className="flex items-center space-x-4 text-stone-400">
            <span>Metodología Biól. Salvador Velázquez</span>
            <span>•</span>
            <span>Eisenia foetida</span>
          </div>
        </div>
      </footer>

      {/* Quick Guide Modal */}
      <QuickGuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </div>
  );
}
