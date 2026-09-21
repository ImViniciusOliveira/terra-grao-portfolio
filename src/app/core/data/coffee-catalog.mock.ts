import { CoffeeProduct } from '../models/coffee.interface';

export const COFFEE_PRODUCTS: readonly CoffeeProduct[] = [
  {
    id: 'mantiqueira-dourada',
    name: 'Mantiqueira Dourada',
    price: 44.9,
    shortTaste: 'Notas de Mel e Frutas Amarelas',
    image: '/images/coffees/mantiqueira-dourada.webp',
    sizes: [
      { weight: '250g', priceMultiplier: 1.0 },
      { weight: '500g', priceMultiplier: 1.85 },
      { weight: '1kg', priceMultiplier: 3.5 },
    ],
    grindTypes: [
      'Em Grãos',
      'Moído Coado / Filtro',
      'Prensa Francesa',
      'Espresso',
    ],
  },
  {
    id: 'reserva-do-pouso',
    name: 'Reserva do Pouso',
    price: 46.9,
    shortTaste: 'Notas de Cacau 70% e Melaço',
    image: '/images/coffees/reserva-do-pouso.webp',
    sizes: [
      { weight: '250g', priceMultiplier: 1.0 },
      { weight: '500g', priceMultiplier: 1.85 },
      { weight: '1kg', priceMultiplier: 3.5 },
    ],
    grindTypes: [
      'Em Grãos',
      'Moído Coado / Filtro',
      'Prensa Francesa',
      'Espresso',
    ],
  },
  {
    id: 'flor-da-serra',
    name: 'Flor da Serra',
    price: 42.9,
    shortTaste: 'Notas Florais e Bergamota',
    image: '/images/coffees/flor-da-serra.webp',
    sizes: [
      { weight: '250g', priceMultiplier: 1.0 },
      { weight: '500g', priceMultiplier: 1.85 },
      { weight: '1kg', priceMultiplier: 3.5 },
    ],
    grindTypes: [
      'Em Grãos',
      'Moído Coado / Filtro',
      'Prensa Francesa',
      'Espresso',
    ],
  },
  {
    id: 'geisha-mantiqueira',
    name: 'Geisha Edição Especial',
    price: 64.9,
    shortTaste: 'Notas de Jasmim e Pêssego Nobre',
    image: '/images/coffees/geisha-especial.webp',
    sizes: [
      { weight: '250g', priceMultiplier: 1.0 },
      { weight: '500g', priceMultiplier: 1.85 },
      { weight: '1kg', priceMultiplier: 3.5 },
    ],
    grindTypes: [
      'Em Grãos',
      'Moído Coado / Filtro',
      'Prensa Francesa',
      'Espresso',
    ],
  },
];
