export interface RegionData {
  id: string;
  name: string;
  soilTypes: string[];
  climateZone: string;
}

export interface CropData {
  id: string;
  name: string;
  scientificName: string;
  benefits: string[];
  marketTrend: {
    price: number;
    demand: 'high' | 'medium' | 'low';
    growth: number;
  };
  suitableRegions: string[];
  harvestPeriod: number;
}

export interface HealthProfile {
  dosha: 'vata' | 'pitta' | 'kapha';
  concerns: string[];
  goals: string[];
}