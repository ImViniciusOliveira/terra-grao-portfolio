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

export interface GuaranteeItem {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly description: string;
  readonly badge: string;
}

@Component({
  selector: 'app-guarantees',
  standalone: true,
  imports: [],
  templateUrl: './guarantees.html',
  styleUrl: './guarantees.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Guarantees implements OnDestroy {
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
      this.elementRef.nativeElement.querySelectorAll('.guarantees-anim');

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
          stagger: 0.1,
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
          stagger: 0.1,
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
          stagger: 0.1,
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
  readonly guaranteeItems: readonly GuaranteeItem[] = [
    {
      id: 'torra-fresca',
      icon: '☕',
      title: 'Torra Artesanal Fresca Semanal',
      description:
        'Torramos semanalmente em pequenas fornadas artesanais. Seu café é embalado e despachado logo após a torra para garantir frescor absoluto.',
      badge: 'Torra Semanal',
    },
    {
      id: 'graos-especiais',
      icon: '🥇',
      title: 'Grãos 100% Arábica (84+ SCAA)',
      description:
        'Sem misturas ou defeitos. Apenas grãos colhidos no ápice da maturação em altitudes elevadas, classificados como café especial superior.',
      badge: 'Qualidade SCAA',
    },
    {
      id: 'embalagem-protegida',
      icon: '📦',
      title: 'Embalagem Válvula & Zip Lock',
      description:
        'Pacote com tripla camada e válvula desgaseificadora unidirecional. Libera os gases naturais da torra mantendo aromas e óleos essenciais intactos.',
      badge: 'Máxima Proteção',
    },
    {
      id: 'comercio-justo',
      icon: '🤝',
      title: 'Comércio Justo & Sustentável',
      description:
        'Relacionamento direto com pequenos produtores parceiros de Minas Gerais, garantindo preço justo e incentivando a agricultura sustentável.',
      badge: 'Origem Sustentável',
    },
  ];
}
