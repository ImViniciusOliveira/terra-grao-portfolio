import { BrewingMethod } from '../models/brewing.interface';

export const BREWING_METHODS: readonly BrewingMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60',
    description: 'Extração por gotejamento com cone de 60 graus que realça a acidez e notas florais.',
    defaultRatio: 16,
    minRatio: 14,
    maxRatio: 18,
    grindRecommendation: 'Moagem Média',
    temperature: '92°C a 94°C',
    extractionTime: '2min 30s',
  },
  {
    id: 'french-press',
    name: 'Prensa Francesa',
    description: 'Método de infusão total com filtro metálico que preserva os óleos essenciais e o corpo do café.',
    defaultRatio: 15,
    minRatio: 12,
    maxRatio: 17,
    grindRecommendation: 'Moagem Grossa',
    temperature: '94°C',
    extractionTime: '4min 00s',
  },
  {
    id: 'chemex',
    name: 'Chemex',
    description: 'Filtro triplo espesso que proporciona uma xícara extremamente límpida, doce e sem sedimentos.',
    defaultRatio: 16,
    minRatio: 14,
    maxRatio: 18,
    grindRecommendation: 'Moagem Média-Grossa',
    temperature: '93°C',
    extractionTime: '3min 30s',
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    description: 'Preparo sob pressão manual e infusão rápida, resultando em um café encorpado e aveludado.',
    defaultRatio: 14,
    minRatio: 11,
    maxRatio: 16,
    grindRecommendation: 'Moagem Média-Fina',
    temperature: '88°C a 90°C',
    extractionTime: '1min 45s',
  },
];

