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

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OurHistoryHighlight {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly metric: string;
  readonly metricLabel: string;
}

// --------------------------------------------------------------------------
// Componente: Nossa História
// --------------------------------------------------------------------------
@Component({
  selector: 'app-our-history',
  imports: [],
  templateUrl: './our-history.html',
  styleUrl: './our-history.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OurHistory implements OnDestroy {
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

  // --------------------------------------------------------------------------
  // Animações de Scroll com GSAP ScrollTrigger e MatchMedia
  // --------------------------------------------------------------------------
  private initScrollAnimation(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const items =
      this.elementRef.nativeElement.querySelectorAll('.our-history-anim');

    if (items.length === 0) return;

    // Desktop: dispara a animação quando o topo da seção atinge 70% da viewport
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
            start: 'top 70%',
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

  // --------------------------------------------------------------------------
  // Dados dos Pilares Institucionais e Métricas de Qualidade
  // --------------------------------------------------------------------------
  readonly highlights: readonly OurHistoryHighlight[] = [
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
