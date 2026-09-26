import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  private readonly platformId = inject(PLATFORM_ID);

  readonly currentYear = signal<number>(new Date().getFullYear());

  /**
   * Rola suavemente ate uma secao da pagina pelo ID
   */
  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (sectionId === 'hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

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
}

