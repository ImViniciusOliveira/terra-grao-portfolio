export type GrindType =
  | 'Em Grãos'
  | 'Moído Coado / Filtro'
  | 'Prensa Francesa'
  | 'Espresso';

export interface CoffeeSize {
  readonly weight: '250g' | '500g' | '1kg';
  readonly priceMultiplier: number;
}

export interface CoffeeProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly shortTaste: string;
  readonly image: string;
  readonly sizes: readonly CoffeeSize[];
  readonly grindTypes: readonly GrindType[];
}

