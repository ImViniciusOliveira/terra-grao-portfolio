import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  imports: [],
  selector: 'app-coupon-banner',
  styleUrl: './coupon-banner.css',
  templateUrl: './coupon-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CouponBanner implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  readonly couponCode = signal('GRAO15OFF');
  readonly copied = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initAnimation();
      });
    }
  }

  private initAnimation(): void {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const card =
      this.elementRef.nativeElement.querySelector('.coupon-banner-card');

    if (!card) return;

    // Desktop: top 75% (dispara suavemente quando o topo do banner entra na tela)
    this.mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

    // Mobile & Tablet: top 70% (dispara pelo topo do banner)
    this.mm.add('(max-width: 1023px)', () => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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

  copyCoupon(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard?.writeText(this.couponCode());
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2500);
    }
  }
}
