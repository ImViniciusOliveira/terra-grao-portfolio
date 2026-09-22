import { QuickCategory } from '../models/category.interface';

export const QUICK_CATEGORIES: readonly QuickCategory[] = [
  {
    id: 'graos',
    name: 'Café em Grãos',
    imageUrl: '/images/coffees/mantiqueira-dourada.webp',
    imageAlt: 'Café Especial em Grãos',
    targetSection: 'catalogo',
  },
  {
    id: 'moido',
    name: 'Café Moído',
    imageUrl: '/images/coffees/reserva-do-pouso.webp',
    imageAlt: 'Café Especial Moído',
    targetSection: 'catalogo',
  },
  {
    id: 'metodos',
    name: 'Cafeteiras & Métodos',
    imageUrl: '/images/coffees/flor-da-serra.webp',
    imageAlt: 'Cafeteiras e Métodos',
    targetSection: 'calculadora',
  },
  {
    id: 'moedores',
    name: 'Moedores & Acessórios',
    imageUrl: '/images/brand-hero.webp',
    imageAlt: 'Moedores e Acessórios',
    targetSection: 'catalogo',
  },
  {
    id: 'kits',
    name: 'Kits & Degustação',
    imageUrl: '/images/coffees/flor-da-serra.webp',
    imageAlt: 'Kits e Degustação',
    targetSection: 'catalogo',
  },
] as const;
