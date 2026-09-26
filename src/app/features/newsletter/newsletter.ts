import { isPlatformBrowser } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletter implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private autoHideTimeout?: ReturnType<typeof setTimeout>;
  private toastTimeline?: gsap.core.Timeline;
  private mm?: gsap.MatchMedia;

  @ViewChild('toastCard') toastCard?: ElementRef<HTMLElement>;

  readonly email = signal('');
  readonly showToast = signal(false);
  readonly isToastError = signal(false);
  readonly toastMessage = signal('Cadastro realizado com sucesso!');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        this.initScrollAnimation();
      });
    }
  }

  private initScrollAnimation(): void {
    this.mm = gsap.matchMedia(this.elementRef.nativeElement);
    const card = this.elementRef.nativeElement.querySelector('.newsletter-card-anim');

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
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    this.toastTimeline?.kill();
    this.mm?.revert();
  }

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input?.value ?? '');
  }

  onSubmit(): void {
    const emailVal = this.email().trim();
    const isValid = emailVal.length > 0 && emailVal.includes('@');

    if (isValid) {
      this.email.set('');
      this.isToastError.set(false);
      this.toastMessage.set('Cadastro realizado com sucesso!');
    } else {
      this.isToastError.set(true);
      this.toastMessage.set('Por favor, digite um e-mail válido.');
    }

    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    this.showToast.set(true);

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        const el = this.toastCard?.nativeElement;
        if (!el) return;

        this.toastTimeline?.kill();
        this.toastTimeline = gsap.timeline();

        // Entrada: Desliza suavemente de cima para baixo (y: -24px -> 0) com fade-in rapido
        this.toastTimeline.fromTo(
          el,
          { opacity: 0, y: -24 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );

        this.autoHideTimeout = setTimeout(() => {
          this.closeToast();
        }, 4000);
      });
    }
  }

  closeToast(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }

    if (isPlatformBrowser(this.platformId) && this.showToast()) {
      const el = this.toastCard?.nativeElement;
      if (el) {
        this.toastTimeline?.kill();
        this.toastTimeline = gsap.timeline({
          onComplete: () => {
            this.showToast.set(false);
          },
        });

        // Saida: Desvanecimento suave (fade-out) sem se mover
        this.toastTimeline.to(el, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        });
        return;
      }
    }

    this.showToast.set(false);
  }
}
