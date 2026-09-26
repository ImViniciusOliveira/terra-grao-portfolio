import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'contents',
  },
})
export class Header implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private observer?: IntersectionObserver;
  private readonly manualScrollingInProgress = false;
  private tl?: gsap.core.Timeline;

  @ViewChild('menuOverlay') menuOverlay?: ElementRef<HTMLDivElement>;

  readonly isMenuOpen = signal<boolean>(false);
  readonly isMenuVisible = signal<boolean>(false);
  readonly activeSection = signal<string>('hero');
  readonly isDarkMode = signal<boolean>(false);
  readonly isScrolled = signal<boolean>(false);
  readonly isHeaderHidden = signal<boolean>(false);
  private lastScrollY = 0;

  constructor() {
    // 1. Trava o scroll do body quando o menu mobile estiver aberto
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
      }
    });

    // 2. Inicializa o Scroll Spy no navegador
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initIntersectionObserver();
        this.checkScrollPosition();
      });
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    if (isPlatformBrowser(this.platformId)) {
      const currentScrollY = window.scrollY;
      const scrolled = currentScrollY > 0;

      if (this.isScrolled() !== scrolled) {
        this.isScrolled.set(scrolled);
      }

      // Auto-hide header ao rolar para baixo, reexibir ao rolar para cima (Mobile / Tablet / Desktop)
      if (currentScrollY > 80) {
        if (currentScrollY > this.lastScrollY + 5) {
          if (!this.isHeaderHidden()) {
            this.isHeaderHidden.set(true);
          }
        } else if (currentScrollY < this.lastScrollY - 5) {
          if (this.isHeaderHidden()) {
            this.isHeaderHidden.set(false);
          }
        }
      } else {
        if (this.isHeaderHidden()) {
          this.isHeaderHidden.set(false);
        }
      }

      this.lastScrollY = Math.max(0, currentScrollY);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    this.tl?.kill();
  }

  /**
   * Configura o rastreador de seções ativas na tela para navegação suave
   */
  private initIntersectionObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const sections = ['hero', 'catalogo', 'calculadora', 'origem', 'garantias'];

    this.observer = new IntersectionObserver(
      (entries) => {
        if (this.manualScrollingInProgress) {
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        this.observer?.observe(el);
      }
    });
  }

  /**
   * Abre o menu mobile com timeline e efeito stagger via GSAP
   */
  openMenu(): void {
    this.isMenuVisible.set(true);
    this.isMenuOpen.set(true);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    requestAnimationFrame(() => {
      const overlay = this.menuOverlay?.nativeElement;
      if (!overlay) {
        return;
      }

      const items = overlay.querySelectorAll('.mobile-menu-item');

      this.tl?.kill();
      this.tl = gsap.timeline();

      // Fade-in do fundo overlay
      this.tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );

      // Entrada em cascata escalonada dos links
      this.tl.fromTo(
        items,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: 'power3.out' },
        '-=0.15'
      );
    });
  }

  /**
   * Fecha o menu mobile suavemente com GSAP e executa callback de rolagem
   */
  closeMenu(onClosed?: () => void): void {
    if (!this.isMenuVisible()) {
      onClosed?.();
      return;
    }

    this.isMenuOpen.set(false);

    if (!isPlatformBrowser(this.platformId)) {
      this.isMenuVisible.set(false);
      onClosed?.();
      return;
    }

    const overlay = this.menuOverlay?.nativeElement;
    const items = overlay?.querySelectorAll('.mobile-menu-item');

    if (!overlay || !items || items.length === 0) {
      this.isMenuVisible.set(false);
      onClosed?.();
      return;
    }

    this.tl?.kill();
    this.tl = gsap.timeline({
      onComplete: () => {
        this.isMenuVisible.set(false);
        onClosed?.();
      },
    });

    // Saída rápida dos links
    this.tl.to(items, {
      opacity: 0,
      y: 12,
      duration: 0.12,
      stagger: 0.02,
      ease: 'power2.in',
    });

    // Saída do fundo logo em seguida
    this.tl.to(
      overlay,
      {
        opacity: 0,
        duration: 0.16,
        ease: 'power2.in',
      },
      '-=0.06'
    );
  }

  /**
   * Rola suavemente até a seção com compensação da altura do header
   */
  scrollToSection(sectionId: string): void {
    this.activeSection.set(sectionId);

    const performScroll = () => {
      if (typeof window === 'undefined') {
        return;
      }

      if (sectionId === 'hero') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementRect = element.getBoundingClientRect();
          const navOffset = 80;
          let targetY: number;

          if (elementRect.height < window.innerHeight) {
            targetY =
              elementRect.top +
              window.scrollY -
              (window.innerHeight - elementRect.height) / 2;
          } else {
            targetY = elementRect.top + window.scrollY - navOffset;
          }

          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
          });
        }
      }
    };

    if (this.isMenuOpen()) {
      this.closeMenu(performScroll);
    } else {
      performScroll();
    }
  }

  /**
   * Alterna entre modo claro e escuro (mock de interface)
   */
  toggleTheme(): void {
    this.isDarkMode.update((dark) => !dark);
  }

  /**
   * Alterna entre abrir e fechar o menu mobile
   */
  toggleMenu(): void {
    if (this.isMenuOpen()) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
}

