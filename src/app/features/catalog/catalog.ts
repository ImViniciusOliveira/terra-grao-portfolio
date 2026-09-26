import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';
import { COFFEE_PRODUCTS } from '../../core/data/coffee-catalog.mock';
import { CoffeeProduct, ProductTabCategory } from '../../core/models/coffee.interface';

export interface CatalogTab {
  readonly id: ProductTabCategory;
  readonly label: string;
}

@Component({
  selector: 'app-catalog',
  imports: [],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Catalog implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  @ViewChild('productGrid') productGrid?: ElementRef<HTMLDivElement>;

  readonly products = signal<readonly CoffeeProduct[]>(COFFEE_PRODUCTS);
  readonly activeTab = signal<ProductTabCategory>('destaque');
  readonly visibleCount = signal<number>(5);
  private revealInterval?: ReturnType<typeof setInterval>;

  ngOnDestroy(): void {
    if (this.revealInterval) {
      clearInterval(this.revealInterval);
    }
  }

  readonly tabs: readonly CatalogTab[] = [
    { id: 'destaque', label: 'EM DESTAQUE' },
    { id: 'premiados', label: 'RAROS E PREMIADOS' },
    { id: 'kits', label: 'KITS' },
  ];

  readonly filteredProducts = computed(() =>
    this.products().filter((product) => product.category === this.activeTab())
  );

  // Estados reativos por produto (tamanho, moagem e feedback de adição)
  readonly selectedSizes = signal<Record<string, string>>({
    'mantiqueira-dourada': '250g',
    'reserva-do-pouso': '250g',
    'flor-da-serra': '250g',
    'geisha-mantiqueira': '250g',
    'jacu-bird-mantiqueira': '100g',
    'santa-rita-salada-frutas': '250g',
    'mantiqueira-classico-premiado': '250g',
    'kit-barista-hario-v60': 'Kit Completo',
  });

  readonly selectedGrinds = signal<Record<string, string>>({
    'mantiqueira-dourada': 'Em Grãos',
    'reserva-do-pouso': 'Em Grãos',
    'flor-da-serra': 'Em Grãos',
    'geisha-mantiqueira': 'Em Grãos',
    'jacu-bird-mantiqueira': 'Em Grãos',
    'santa-rita-salada-frutas': 'Em Grãos',
    'mantiqueira-classico-premiado': 'Em Grãos',
    'kit-barista-hario-v60': 'Moído Coado / Filtro',
  });

  readonly addedStatus = signal<Record<string, boolean>>({});

  setTab(tab: ProductTabCategory): void {
    if (this.activeTab() === tab) return;

    if (this.revealInterval) {
      clearInterval(this.revealInterval);
    }

    this.visibleCount.set(0);
    this.activeTab.set(tab);

    const total = this.filteredProducts().length;
    let count = 0;

    const revealNext = () => {
      if (count < total) {
        count++;
        this.visibleCount.set(count);

        if (isPlatformBrowser(this.platformId)) {
          requestAnimationFrame(() => {
            const gridEl = this.productGrid?.nativeElement;
            if (!gridEl) return;
            const cards = gridEl.querySelectorAll('.product-card');
            const newCard = cards[count - 1];
            if (newCard) {
              const tl = gsap.timeline();
              // Fade-in ultra rapido: atinge 100% de opacidade na metade da subida (~150ms)
              tl.fromTo(
                newCard,
                { opacity: 0 },
                { opacity: 1, duration: 0.15, ease: 'power1.out' },
                0
              );
              // Movimento de subida: desce 20px e sobe ate o ponto final em 350ms
              tl.fromTo(
                newCard,
                { y: 20 },
                { y: 0, duration: 0.35, ease: 'power2.out' },
                0
              );
            }
          });
        }
      } else {
        if (this.revealInterval) {
          clearInterval(this.revealInterval);
        }
      }
    };

    // Revela e anima o 1º card imediatamente
    revealNext();

    // Dispara o proximo card a cada 65ms (sem esperar a animacao do anterior terminar)
    this.revealInterval = setInterval(() => {
      revealNext();
    }, 65);
  }

  getSelectedSize(productId: string): string {
    const product = this.products().find((p) => p.id === productId);
    const defaultWeight = product?.sizes[0]?.weight || '250g';
    return this.selectedSizes()[productId] || defaultWeight;
  }

  setSelectedSize(productId: string, weight: string): void {
    this.selectedSizes.update((current) => ({
      ...current,
      [productId]: weight,
    }));
  }

  getSelectedGrind(productId: string): string {
    return this.selectedGrinds()[productId] || 'Em Grãos';
  }

  setSelectedGrind(productId: string, grind: string): void {
    this.selectedGrinds.update((current) => ({
      ...current,
      [productId]: grind,
    }));
  }

  getCalculatedPrice(product: CoffeeProduct): string {
    const sizeWeight = this.getSelectedSize(product.id);
    const sizeConfig =
      product.sizes.find((s) => s.weight === sizeWeight) || product.sizes[0];
    const finalPrice = product.price * sizeConfig.priceMultiplier;
    return finalPrice.toFixed(2).replace('.', ',');
  }

  getOriginalPrice(product: CoffeeProduct): string | null {
    if (!product.originalPrice) return null;
    const sizeWeight = this.getSelectedSize(product.id);
    const sizeConfig =
      product.sizes.find((s) => s.weight === sizeWeight) || product.sizes[0];
    const finalPrice = product.originalPrice * sizeConfig.priceMultiplier;
    return finalPrice.toFixed(2).replace('.', ',');
  }

  getDiscountPercentage(product: CoffeeProduct): number | null {
    if (!product.originalPrice || product.originalPrice <= product.price) {
      return null;
    }
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    return discount > 0 ? discount : null;
  }

  getPixPrice(product: CoffeeProduct): string {
    const sizeWeight = this.getSelectedSize(product.id);
    const sizeConfig =
      product.sizes.find((s) => s.weight === sizeWeight) || product.sizes[0];
    const pixPrice = product.price * sizeConfig.priceMultiplier * 0.95;
    return pixPrice.toFixed(2).replace('.', ',');
  }

  getStarState(rating: number, starIndex: number): 'full' | 'half' | 'empty' {
    if (rating >= starIndex) return 'full';
    if (rating >= starIndex - 0.5) return 'half';
    return 'empty';
  }

  isAdded(productId: string): boolean {
    return !!this.addedStatus()[productId];
  }

  addToCart(product: CoffeeProduct): void {
    this.addedStatus.update((current) => ({
      ...current,
      [product.id]: true,
    }));

    setTimeout(() => {
      this.addedStatus.update((current) => ({
        ...current,
        [product.id]: false,
      }));
    }, 2000);
  }
}
