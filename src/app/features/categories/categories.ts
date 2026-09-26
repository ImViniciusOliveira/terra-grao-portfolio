import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { QUICK_CATEGORIES } from '../../core/data/categories.mock';
import { QuickCategory } from '../../core/models/category.interface';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Categories implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private mm?: gsap.MatchMedia;

  readonly categories = signal<readonly QuickCategory[]>(QUICK_CATEGORIES);
  readonly page1Categories = computed(() => this.categories().slice(0, 3));
  readonly page2Categories = computed(() => this.categories().slice(3));
  readonly activePage = signal<number>(0);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initAnimation();
      });
    }
  }

  private initAnimation(): void {
    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const cardItems =
      this.elementRef.nativeElement.querySelectorAll('.category-card-item');

    if (cardItems.length === 0) return;

    // Desktop: bottom 90% (dispara com card 100% visivel)
    this.mm.add('(min-width: 1024px)', () => {
      gsap.fromTo(
        cardItems,
        { opacity: 0, x: -45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: this.elementRef.nativeElement,
            start: 'bottom 90%',
          },
        }
      );
    });

    // Tablet: top 70%
    this.mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
      gsap.fromTo(
        cardItems,
        { opacity: 0, x: -45 },
        {
          opacity: 1,
          x: 0,
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

    // Mobile: dispara exatamente quando os cards/textos chegarem no centro (50%) da tela
    this.mm.add('(max-width: 767px)', () => {
      const mobileTrigger =
        this.elementRef.nativeElement.querySelector('.category-card-item') ||
        this.elementRef.nativeElement;

      gsap.fromTo(
        cardItems,
        { opacity: 0, x: -45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: 0.12,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: mobileTrigger,
            start: 'center 50%',
          },
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.mm?.revert();
  }

  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const targetElement = this.document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target) return;
    const pageWidth = target.clientWidth;
    if (pageWidth <= 0) return;

    const page = Math.round(target.scrollLeft / pageWidth);
    this.activePage.set(Math.min(Math.max(page, 0), 1));
  }

  scrollToPage(page: number, container: HTMLElement): void {
    if (!container) return;
    const targetLeft = page * container.clientWidth;
    container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    this.activePage.set(page);
  }
}
