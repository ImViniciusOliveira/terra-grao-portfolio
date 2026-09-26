import { isPlatformBrowser } from '@angular/common';
import {
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
import gsap from 'gsap';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule],
  templateUrl: './newsletter.html',
  styleUrl: './newsletter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Newsletter implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private autoHideTimeout?: ReturnType<typeof setTimeout>;
  private toastTimeline?: gsap.core.Timeline;

  @ViewChild('toastCard') toastCard?: ElementRef<HTMLDivElement>;

  readonly email = signal('');
  readonly showToast = signal(false);

  ngOnDestroy(): void {
    if (this.autoHideTimeout) {
      clearTimeout(this.autoHideTimeout);
    }
    this.toastTimeline?.kill();
  }

  onEmailInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.email.set(input?.value ?? '');
  }

  onSubmit(): void {
    const emailVal = this.email().trim();
    if (!emailVal?.includes('@')) {
      return;
    }

    this.email.set('');
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
