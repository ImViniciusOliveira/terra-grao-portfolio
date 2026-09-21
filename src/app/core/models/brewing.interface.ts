export type BrewingMethodId = 'v60' | 'french-press' | 'chemex' | 'aeropress';

export interface BrewingMethod {
  readonly id: BrewingMethodId;
  readonly name: string;
  readonly description: string;
  readonly defaultRatio: number;
  readonly minRatio: number;
  readonly maxRatio: number;
  readonly grindRecommendation: string;
  readonly temperature: string;
  readonly extractionTime: string;
}

export interface BrewingCalculation {
  readonly coffeeGrams: number;
  readonly waterMl: number;
  readonly ratio: number;
}

