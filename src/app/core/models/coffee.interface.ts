export type GrindType =
  | 'Em Grãos'
  | 'Moído Coado / Filtro'
  | 'Prensa Francesa'
  | 'Espresso';

export type ProductTabCategory = 'destaque' | 'premiados' | 'kits';

export interface CoffeeSize {
  readonly weight: string;
  readonly priceMultiplier: number;
}

export interface CoffeeProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly originalPrice?: number;
  readonly shortTaste: string;
  readonly image: string;
  readonly category: ProductTabCategory;
  readonly sizes: readonly CoffeeSize[];
  readonly grindTypes: readonly GrindType[];
  readonly rating: number;
  readonly reviewsCount?: number;
}
