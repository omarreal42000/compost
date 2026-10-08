export type ActiveTab = 'overview' | 'plan1_closeup' | 'plan2_structure' | 'plan3_aerial' | 'gis_analysis' | 'ai_generator' | 'vision_analyzer';

export interface ViewAnnotation {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  title: string;
  category: 'estructura' | 'biologia' | 'riego' | 'cobertura';
  description: string;
  detail: string;
}

export interface SiteAnalysisData {
  coordinates: {
    lat: number;
    lng: number;
    formatted: string;
    municipality: string;
    zone: string;
    accessRoad: string;
  };
  climaticProfile: {
    classification: string;
    averageTempAnnual: string;
    tempRangeVermiculture: string;
    summerPeakTemp: string;
    winterMinTemp: string;
    rainySeason: string;
  };
  topographyAndZoning: {
    elevation: string;
    structuresIdentified: Array<{
      name: string;
      description: string;
      recommendation: string;
      dimensions?: string;
    }>;
    biologicalSpecs: {
      species: string;
      densityTarget: string;
      substrateHeight: string;
      moistureTarget: string;
      lixiviateDrainage: string;
    };
  };
}

export type AspectRatioType = '1:1' | '2:3' | '3:2' | '3:4' | '4:3' | '9:16' | '16:9' | '21:9';
export type ImageSizeType = '1K' | '2K' | '4K';
