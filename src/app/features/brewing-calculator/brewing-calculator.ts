import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREWING_METHODS } from '../../core/data/brewing-methods.mock';
import { BrewingMethodId } from '../../core/models/brewing.interface';

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-brewing-calculator',
  templateUrl: './brewing-calculator.html',
  styleUrl: './brewing-calculator.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrewingCalculator implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  protected readonly methods = BREWING_METHODS;
  protected readonly selectedId = signal<BrewingMethodId>('v60');
  protected readonly coffeeGrams = signal(20);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initScrollAnimation();
      });
    }
  }

  private initScrollAnimation(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const card =
      this.elementRef.nativeElement.querySelector('.brewing-calc-anim');

    if (!card) return;

    // Desktop: dispara a animação quando o topo do componente atinge 75% da viewport
    this.mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'top 75%',
          },
        }
      );
    });

    // Mobile e Tablet: dispara a animação quando o topo do componente atinge 70% da viewport
    this.mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'top 70%',
          },
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  /** Método de preparo selecionado (V60, Prensa Francesa, Espresso, Aeropress ou Chemex) */
  protected readonly currentMethod = computed(() =>
    this.methods.find((m) => m.id === this.selectedId()) ?? this.methods[0]
  );

  /** Cálculo em tempo real do volume ideal de água (gramas de café × proporção de extração) */
  protected readonly calculatedWater = computed(
    () => this.coffeeGrams() * this.currentMethod().defaultRatio
  );

  /** Seleciona o método de extração ativo */
  protected selectMethod(id: BrewingMethodId): void {
    this.selectedId.set(id);
  }

  /** Atualiza a quantidade de gramas de café a partir do controle deslizante (slider) */
  protected onSliderChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.coffeeGrams.set(value);
  }
}
