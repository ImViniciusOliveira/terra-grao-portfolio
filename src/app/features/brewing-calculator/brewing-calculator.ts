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

if (typeof window !== 'undefined') {
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
    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const card =
      this.elementRef.nativeElement.querySelector('.brewing-calc-anim');

    if (!card) return;

    // Desktop: bottom 90% (dispara com o card 100% visivel)
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
            start: 'bottom 90%',
          },
        }
      );
    });

    // Mobile & Tablet: center 80% (dispara pelo meio)
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
            start: 'center 80%',
          },
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  protected readonly currentMethod = computed(() =>
    this.methods.find((m) => m.id === this.selectedId()) ?? this.methods[0]
  );

  protected readonly calculatedWater = computed(
    () => this.coffeeGrams() * this.currentMethod().defaultRatio
  );

  protected selectMethod(id: BrewingMethodId): void {
    this.selectedId.set(id);
  }

  protected onSliderChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.coffeeGrams.set(value);
  }
}
