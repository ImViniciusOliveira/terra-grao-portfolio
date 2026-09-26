import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OriginHighlight {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly metricLabel: string;
}

@Component({
  selector: 'app-origin',
  standalone: true,
  imports: [],
  templateUrl: './origin.html',
  styleUrl: './origin.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Origin implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initScrollAnimation();
      });
    }
  }

  private initScrollAnimation(): void {
    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const items =
      this.elementRef.nativeElement.querySelectorAll('.origin-anim');

    if (items.length === 0) return;

    // Desktop: center 70%
    this.mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'center 70%',
          },
        }
      );
    });

    // Tablet: top 55%
    this.mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'top 55%',
          },
        }
      );
    });

    // Mobile: top 55%
    this.mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'top 55%',
          },
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }
  readonly highlights: readonly OriginHighlight[] = [
    {
      id: 'secagem',
      icon: '☀️',
      title: 'Secagem Natural ao Sol',
      description:
        'Grãos secados ao sol em terreiros para preservar os açúcares naturais e intensificar a doçura e acidez equilibrada.',
      metric: '100% Natural',
      metricLabel: 'Secagem ao Sol',
    },
    {
      id: 'colheita',
      icon: '🤲',
      title: 'Colheita 100% Manual & Seletiva',
      description:
        'A colheita é inteiramente artesanal. Nossos produtores parceiros colhem apenas os frutos no ponto perfeito de maturação.',
      metric: '100%',
      metricLabel: 'Seleção Artesanal',
    },
    {
      id: 'rastreabilidade',
      icon: '📜',
      title: 'Rastreabilidade & Origem Garantida',
      description:
        'Cada lote possui rastreabilidade total desde a fazenda parceira até a torra, garantindo procedência e controle de qualidade.',
      metric: '84+',
      metricLabel: 'Pontos SCAA',
    },
  ];
}
